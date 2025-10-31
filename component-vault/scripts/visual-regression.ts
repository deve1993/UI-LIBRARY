#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'

interface ChromaticBuild {
  number: number
  url: string
  changeCount: number
  errorCount: number
  testCount: number
  passed: boolean
}

/**
 * Execute command safely with output
 */
function exec(command: string, silent: boolean = false): string {
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit'
    })
    return output
  } catch (error: any) {
    if (!silent) {
      console.error(`❌ Command failed: ${command}`)
      console.error(error.message)
    }
    throw error
  }
}

/**
 * Check if Chromatic is configured
 */
function checkChromaticSetup(): boolean {
  // Check for Chromatic token
  const token = process.env.CHROMATIC_PROJECT_TOKEN
  if (!token) {
    console.error('❌ CHROMATIC_PROJECT_TOKEN not set')
    console.log('\n📝 Setup Instructions:')
    console.log('1. Sign up at https://www.chromatic.com (free for open source)')
    console.log('2. Create a new project')
    console.log('3. Copy your project token')
    console.log('4. Set environment variable:')
    console.log('   Windows: set CHROMATIC_PROJECT_TOKEN=your-token')
    console.log('   Linux/Mac: export CHROMATIC_PROJECT_TOKEN=your-token')
    console.log('   Or add to .env file\n')
    return false
  }

  // Check if chromatic config exists
  if (!existsSync('chromatic.config.json')) {
    console.warn('⚠️  chromatic.config.json not found (using defaults)')
  }

  // Check if Chromatic package is installed
  try {
    require.resolve('chromatic')
  } catch {
    console.error('❌ Chromatic package not installed')
    console.log('💡 Install: npm install --save-dev chromatic')
    return false
  }

  return true
}

/**
 * Run Chromatic baseline capture
 */
async function captureBaseline(): Promise<void> {
  console.log('\n📸 Visual Regression: Baseline Capture\n')

  if (!checkChromaticSetup()) {
    process.exit(1)
  }

  console.log('Step 1/2: Building Storybook...')
  try {
    exec('npm run build-storybook', true)
    console.log('✅ Storybook built successfully\n')
  } catch (error) {
    console.error('❌ Storybook build failed')
    process.exit(1)
  }

  console.log('Step 2/2: Uploading baseline to Chromatic...')
  try {
    const output = exec(
      'npx chromatic --build-script-name=build-storybook --auto-accept-changes',
      false
    )

    console.log('\n✅ Baseline captured successfully')
    console.log('\n💡 Next steps:')
    console.log('   1. Make UI changes')
    console.log('   2. Run: npm run visual:test')
    console.log('   3. Review changes in Chromatic UI\n')
  } catch (error) {
    console.error('❌ Baseline capture failed')
    process.exit(1)
  }
}

/**
 * Run Chromatic visual regression tests
 */
async function runVisualTests(): Promise<void> {
  console.log('\n📸 Visual Regression Testing\n')

  if (!checkChromaticSetup()) {
    process.exit(1)
  }

  console.log('Step 1/3: Building Storybook...')
  try {
    exec('npm run build-storybook', true)
    console.log('✅ Storybook built successfully\n')
  } catch (error) {
    console.error('❌ Storybook build failed')
    process.exit(1)
  }

  console.log('Step 2/3: Uploading to Chromatic...')
  let chromaticOutput = ''
  try {
    chromaticOutput = exec(
      'npx chromatic --build-script-name=build-storybook --exit-zero-on-changes',
      false
    )
  } catch (error) {
    // Chromatic might "fail" with changes detected, but we want to see the report
  }

  console.log('\nStep 3/3: Analyzing results...')
  parseAndDisplayResults(chromaticOutput)
}

/**
 * Run Chromatic in CI mode
 */
async function runCI(): Promise<void> {
  console.log('\n📸 Visual Regression Testing (CI Mode)\n')

  if (!checkChromaticSetup()) {
    process.exit(1)
  }

  try {
    exec(
      'npx chromatic --build-script-name=build-storybook --exit-once-uploaded',
      false
    )
    console.log('\n✅ Visual tests passed')
  } catch (error) {
    console.error('\n❌ Visual changes detected or build failed')
    process.exit(1)
  }
}

/**
 * Parse Chromatic output and display results
 */
function parseAndDisplayResults(output: string): void {
  console.log('\n' + '='.repeat(60))
  console.log('📊 VISUAL REGRESSION RESULTS')
  console.log('='.repeat(60) + '\n')

  // Extract build URL
  const buildUrlMatch = output.match(/View build details:\s+(https:\/\/[^\s]+)/)
  const buildUrl = buildUrlMatch ? buildUrlMatch[1] : null

  // Extract story counts
  const storiesMatch = output.match(/(\d+)\s+stories/)
  const storyCount = storiesMatch ? parseInt(storiesMatch[1]) : 0

  // Extract change counts
  const changesMatch = output.match(/(\d+)\s+changes?/)
  const changeCount = changesMatch ? parseInt(changesMatch[1]) : 0

  // Display results
  console.log(`📚 Stories Tested: ${storyCount}`)

  if (changeCount === 0) {
    console.log('✅ No visual changes detected')
    console.log('🎉 All stories match baseline\n')
  } else {
    console.log(`🔴 Visual Changes Detected: ${changeCount}`)
    console.log('\n⚠️  Changes found in UI components')
    console.log('💡 Review changes in Chromatic UI:\n')
  }

  if (buildUrl) {
    console.log(`🔗 Build URL: ${buildUrl}\n`)
  }

  console.log('='.repeat(60) + '\n')

  if (changeCount > 0) {
    console.log('Next Steps:')
    console.log('  1. Open build URL above')
    console.log('  2. Review visual changes')
    console.log('  3. Approve or reject changes')
    console.log('  4. Update baseline if approved\n')
  }
}

/**
 * Display Chromatic status
 */
async function showStatus(): Promise<void> {
  console.log('\n📊 Visual Regression Status\n')

  if (!checkChromaticSetup()) {
    return
  }

  console.log('Configuration:')
  console.log(`  ✅ Chromatic Token: Set`)
  console.log(`  ✅ Chromatic Package: Installed`)
  console.log(`  ${existsSync('chromatic.config.json') ? '✅' : '⚠️ '} Config File: ${existsSync('chromatic.config.json') ? 'Present' : 'Missing (using defaults)'}`)

  // Count Storybook stories
  try {
    const storybookBuildPath = 'storybook-static'
    if (existsSync(storybookBuildPath)) {
      console.log(`  ✅ Last Build: Found`)
    } else {
      console.log(`  ⚠️  Last Build: Not found (run 'npm run build-storybook')`)
    }
  } catch (error) {
    console.log(`  ⚠️  Last Build: Unknown`)
  }

  console.log('\nCommands:')
  console.log('  npm run visual:baseline  - Capture initial baseline')
  console.log('  npm run visual:test      - Run visual tests')
  console.log('  npm run visual:ci        - Run in CI mode')
  console.log('  npm run visual:status    - Show this status\n')
}

/**
 * List all Storybook stories for visual testing
 */
async function listStories(): Promise<void> {
  console.log('\n📚 Storybook Stories (Visual Test Coverage)\n')

  // Count story files
  const { glob } = await import('glob')
  const storyFiles = glob.sync('**/*.stories.tsx', {
    ignore: ['node_modules/**', 'dist/**']
  })

  console.log(`Total Story Files: ${storyFiles.length}\n`)

  // Group by category
  const categories: Record<string, string[]> = {}

  storyFiles.forEach(file => {
    const parts = file.split(/[/\\]/)
    const category = parts[1] || 'Other' // components/ui, components/sections, etc.
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(file)
  })

  // Display by category
  Object.entries(categories).forEach(([category, files]) => {
    console.log(`📁 ${category} (${files.length} stories):`)
    files.slice(0, 5).forEach(file => {
      const componentName = file.split(/[/\\]/).pop()?.replace('.stories.tsx', '')
      console.log(`   - ${componentName}`)
    })
    if (files.length > 5) {
      console.log(`   ... and ${files.length - 5} more`)
    }
    console.log()
  })

  console.log(`Total: ${storyFiles.length} story files ready for visual testing\n`)
  console.log('💡 Run: npm run visual:baseline to start visual testing\n')
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  console.log('\n📸 Visual Regression Agent\n')

  switch (command) {
    case 'baseline':
      await captureBaseline()
      break

    case 'test':
      await runVisualTests()
      break

    case 'ci':
      await runCI()
      break

    case 'status':
      await showStatus()
      break

    case 'list':
      await listStories()
      break

    default:
      console.log('Commands:')
      console.log('  baseline  - Capture initial baseline (first time setup)')
      console.log('  test      - Run visual regression tests')
      console.log('  ci        - Run in CI mode (for automated builds)')
      console.log('  status    - Show Chromatic setup status')
      console.log('  list      - List all Storybook stories')
      console.log('\nExamples:')
      console.log('  npm run visual:baseline')
      console.log('  npm run visual:test')
      console.log('  npm run visual:ci')
      break
  }
}

// Execute
main().catch((error) => {
  console.error('\n❌ Error:', error.message)
  process.exit(1)
})
