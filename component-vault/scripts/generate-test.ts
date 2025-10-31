#!/usr/bin/env tsx

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { Project } from 'ts-morph'
import { glob } from 'glob'

interface ComponentInfo {
  name: string
  path: string
  hasTest: boolean
  hasStory: boolean
  hasTypes: boolean
  props: PropInfo[]
  events: string[]
  variants: Record<string, string[]>
}

interface PropInfo {
  name: string
  type: string
  required: boolean
  defaultValue?: string
}

/**
 * Analyze all components and their test status
 */
async function analyzeComponents(): Promise<ComponentInfo[]> {
  const components: ComponentInfo[] = []
  const componentFiles = glob.sync('components/**/*.tsx', {
    ignore: ['**/*.test.tsx', '**/*.stories.tsx', '**/examples/**'],
  })

  console.log(`\n📁 Found ${componentFiles.length} components\n`)

  for (const file of componentFiles) {
    // Extract component name from path (works with both / and \ separators)
    const name = file.split(/[/\\]/).pop()?.replace('.tsx', '') || ''
    // Get directory using string manipulation to handle both path separators
    const lastSep = Math.max(file.lastIndexOf('/'), file.lastIndexOf('\\'))
    const dir = file.substring(0, lastSep)

    const testFile = `${dir}/${name}.test.tsx`
    const typesFile = `${dir}/${name}.types.ts`
    const storyFile = `${dir}/${name}.stories.tsx`

    const hasTest = existsSync(testFile) || existsSync(testFile.replace(/\//g, '\\'))
    const hasTypes = existsSync(typesFile) || existsSync(typesFile.replace(/\//g, '\\'))
    const hasStory = existsSync(storyFile) || existsSync(storyFile.replace(/\//g, '\\'))

    let props: PropInfo[] = []
    if (hasTypes) {
      props = extractPropsFromTypes(typesFile, name)
    }

    const events = extractEvents(file)
    const variants = hasStory ? extractVariantsFromStory(storyFile) : {}

    components.push({
      name,
      path: file,
      hasTest,
      hasStory,
      hasTypes,
      props,
      events,
      variants,
    })
  }

  return components
}

/**
 * Extract props from .types.ts file using ts-morph
 */
function extractPropsFromTypes(typesFile: string, componentName: string): PropInfo[] {
  const props: PropInfo[] = []

  try {
    const project = new Project()
    const sourceFile = project.addSourceFileAtPath(typesFile)
    const propsInterfaceName = `${componentName}Props`

    const propsInterface = sourceFile.getInterface(propsInterfaceName)
    if (!propsInterface) {
      return []
    }

    for (const prop of propsInterface.getProperties()) {
      const name = prop.getName()
      const type = prop.getType().getText()
      const required = !prop.hasQuestionToken()
      const initializer = prop.getInitializer()
      const defaultValue = initializer?.getText()

      props.push({
        name,
        type: simplifyType(type),
        required,
        defaultValue,
      })
    }
  } catch (error) {
    console.warn(`⚠️  Could not parse types for ${componentName}:`, error)
  }

  return props
}

/**
 * Simplify complex TypeScript types for easier mock generation
 */
function simplifyType(type: string): string {
  // Remove import references
  type = type.replace(/import\(".*?"\)\./g, '')

  // Simplify React types
  if (type.includes('ReactNode')) return 'ReactNode'
  if (type.includes('ReactElement')) return 'ReactElement'
  if (type.includes('MouseEvent')) return 'MouseEventHandler'
  if (type.includes('ChangeEvent')) return 'ChangeEventHandler'
  if (type.includes('FormEvent')) return 'FormEventHandler'
  if (type.includes('KeyboardEvent')) return 'KeyboardEventHandler'

  // Keep basic types
  if (['string', 'number', 'boolean'].includes(type)) return type

  // Union types
  if (type.includes('|')) {
    const options = type.split('|').map(t => t.trim().replace(/['"]/g, ''))
    return options[0] // Use first option as default
  }

  return type
}

/**
 * Extract event handlers from component
 */
function extractEvents(componentFile: string): string[] {
  const content = readFileSync(componentFile, 'utf-8')
  const events: string[] = []

  // Find event handler props (onClick, onChange, etc.)
  const eventRegex = /on[A-Z]\w+/g
  const matches = content.match(eventRegex)

  if (matches) {
    events.push(...new Set(matches))
  }

  return events
}

/**
 * Extract variants from .stories.tsx
 */
function extractVariantsFromStory(storyFile: string): Record<string, string[]> {
  const content = readFileSync(storyFile, 'utf-8')
  const variants: Record<string, string[]> = {}

  // Look for argTypes with options
  const argTypesMatch = content.match(/argTypes:\s*{([^}]+)}/s)
  if (argTypesMatch) {
    const argTypesContent = argTypesMatch[1]
    const optionsRegex = /(\w+):\s*{[^}]*options:\s*\[([^\]]+)\]/g
    let match

    while ((match = optionsRegex.exec(argTypesContent)) !== null) {
      const [, propName, optionsStr] = match
      const options = optionsStr
        .split(',')
        .map(o => o.trim().replace(/['"]/g, ''))
      variants[propName] = options
    }
  }

  return variants
}

/**
 * Generate mock value for a prop based on its type
 */
function generateMockValue(prop: PropInfo): string {
  const { type, required } = prop

  if (type === 'string') return "'Test'"
  if (type === 'number') return '42'
  if (type === 'boolean') return 'true'
  if (type === 'ReactNode' || type === 'ReactElement') return "'Test Content'"
  if (type.includes('EventHandler')) return 'vi.fn()'
  if (type.startsWith('"') || type.startsWith("'")) return type

  // For complex types, return undefined for optional props
  if (!required) return 'undefined'

  return '{}'
}

/**
 * Generate test file content
 */
function generateTestContent(component: ComponentInfo): string {
  const { name, props, events, variants } = component
  const hasProps = props.length > 0
  const hasEvents = events.length > 0
  const hasVariants = Object.keys(variants).length > 0

  const defaultPropsObj = props
    .filter(p => p.required || p.defaultValue)
    .map(p => `    ${p.name}: ${generateMockValue(p)},`)
    .join('\n')

  const imports = `import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ${name} } from './${name}'
${hasProps ? `import type { ${name}Props } from './${name}.types'` : ''}

expect.extend(toHaveNoViolations)`

  const setup = hasProps
    ? `
  const defaultProps: ${name}Props = {
${defaultPropsObj}
  }`
    : ''

  const renderingTests = `
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<${name} ${hasProps ? '{...defaultProps}' : ''} />)
      expect(screen.getByTestId('${name.toLowerCase()}')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<${name} ${hasProps ? '{...defaultProps}' : ''}>{testContent}</${name}>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })${hasVariants ? generateVariantTests(name, variants) : ''}
  })`

  const propsTests =
    hasProps && props.filter(p => !p.name.startsWith('on')).length > 0
      ? `

  describe('Props', () => {${generatePropTests(name, props)}
  })`
      : ''

  const interactionTests =
    hasEvents
      ? `

  describe('Interactions', () => {${generateEventTests(name, events)}
  })`
      : ''

  const accessibilityTests = `

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<${name} ${hasProps ? '{...defaultProps}' : ''} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<${name} ${hasProps ? '{...defaultProps}' : ''} />)
      await user.tab()
      const focusedElement = screen.getByTestId('${name.toLowerCase()}')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<${name} ${hasProps ? '{...defaultProps}' : ''} />)
      const element = screen.getByTestId('${name.toLowerCase()}')
      expect(element).toHaveAttribute('role')
    })
  })`

  const snapshotTests = `

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<${name} ${hasProps ? '{...defaultProps}' : ''} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })`

  return `${imports}

describe('${name}', () => {${setup}
${renderingTests}${propsTests}${interactionTests}${accessibilityTests}${snapshotTests}
})
`
}

/**
 * Generate variant tests
 */
function generateVariantTests(name: string, variants: Record<string, string[]>): string {
  let tests = ''

  for (const [propName, options] of Object.entries(variants)) {
    for (const option of options.slice(0, 3)) {
      // Test first 3 variants
      tests += `

    it('renders ${propName}="${option}" correctly', () => {
      render(<${name} {...defaultProps} ${propName}="${option}" />)
      expect(screen.getByTestId('${name.toLowerCase()}')).toHaveAttribute('data-${propName}', '${option}')
    })`
    }
  }

  return tests
}

/**
 * Generate prop tests
 */
function generatePropTests(name: string, props: PropInfo[]): string {
  const testableProps = props
    .filter(p => !p.name.startsWith('on') && !p.name.includes('children'))
    .slice(0, 5) // Test first 5 props

  return testableProps
    .map(
      prop => `

    it('applies ${prop.name} prop correctly', () => {
      const testValue = ${generateMockValue(prop)}
      render(<${name} {...defaultProps} ${prop.name}={testValue} />)
      const element = screen.getByTestId('${name.toLowerCase()}')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })`
    )
    .join('')
}

/**
 * Generate event tests
 */
function generateEventTests(name: string, events: string[]): string {
  return events
    .slice(0, 3) // Test first 3 events
    .map(
      event => `

    it('handles ${event} correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<${name} {...defaultProps} ${event}={handler} />)

      const element = screen.getByTestId('${name.toLowerCase()}')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })`
    )
    .join('')
}

/**
 * Generate test file for a component
 */
async function generateTest(component: ComponentInfo): Promise<boolean> {
  const { name, path, hasTest } = component

  if (hasTest) {
    console.log(`⏭️  ${name} - test already exists`)
    return false
  }

  try {
    const testContent = generateTestContent(component)
    // Get the directory of the component file
    const componentDir = path.substring(0, path.lastIndexOf('/') + 1) || path.substring(0, path.lastIndexOf('\\') + 1)
    const testPath = `${componentDir}${name}.test.tsx`

    writeFileSync(testPath, testContent, 'utf-8')
    console.log(`✅ ${name} - test generated (${testPath})`)

    return true
  } catch (error) {
    console.error(`❌ ${name} - failed to generate test:`, error)
    return false
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const target = args[1]

  console.log('\n🧪 Test Generator\n')

  const components = await analyzeComponents()

  if (command === 'analyze') {
    // Show analysis
    const withoutTests = components.filter(c => !c.hasTest)
    const withTests = components.filter(c => c.hasTest)

    console.log(`📊 Test Coverage Analysis\n`)
    console.log(`Total components: ${components.length}`)
    console.log(`With tests: ${withTests.length} (${((withTests.length / components.length) * 100).toFixed(1)}%)`)
    console.log(`Without tests: ${withoutTests.length}\n`)

    console.log(`🔴 HIGH Priority (UI Components):`)
    withoutTests
      .filter(c => c.path.includes('/ui/'))
      .slice(0, 10)
      .forEach(c => console.log(`  - ${c.name}`))

    console.log(`\n🟡 MEDIUM Priority (Sections):`)
    withoutTests
      .filter(c => c.path.includes('/sections/'))
      .slice(0, 10)
      .forEach(c => console.log(`  - ${c.name}`))

    console.log(`\n💡 Run: npm run generate:test -- generate --all`)
    console.log(`   Or: npm run generate:test -- generate <ComponentName>`)
    return
  }

  if (command === 'generate') {
    let targetComponents: ComponentInfo[] = []

    if (target === '--all') {
      targetComponents = components.filter(c => !c.hasTest)
    } else if (target === '--priority') {
      const level = args[2] || 'high'
      if (level === 'high') {
        targetComponents = components.filter(c => !c.hasTest && c.path.includes('/ui/'))
      } else if (level === 'medium') {
        targetComponents = components.filter(c => !c.hasTest && c.path.includes('/sections/'))
      } else {
        targetComponents = components.filter(c => !c.hasTest && c.path.includes('/effects/'))
      }
    } else if (target) {
      targetComponents = components.filter(c => c.name === target && !c.hasTest)
      if (targetComponents.length === 0) {
        console.error(`❌ Component "${target}" not found or already has tests`)
        process.exit(1)
      }
    } else {
      console.error('Usage: npm run generate:test -- generate <ComponentName|--all|--priority high>')
      process.exit(1)
    }

    console.log(`\n🎯 Generating tests for ${targetComponents.length} components...\n`)

    let generated = 0
    for (const component of targetComponents) {
      const success = await generateTest(component)
      if (success) generated++
    }

    console.log(`\n✨ Generated ${generated} test files!`)
    console.log(`\n🧪 Run tests: npm test`)
    console.log(`📊 Check coverage: npm run test:coverage`)
  } else {
    console.log('Commands:')
    console.log('  analyze           - Analyze test coverage')
    console.log('  generate <name>   - Generate test for component')
    console.log('  generate --all    - Generate tests for all components')
    console.log('  generate --priority <high|medium|low> - Generate by priority')
  }
}

// Execute
main().catch(console.error)
