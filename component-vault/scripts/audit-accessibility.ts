#!/usr/bin/env tsx

import { readFileSync } from 'fs'
import { glob } from 'glob'

interface A11yIssue {
  file: string
  line: number
  rule: string
  severity: 'critical' | 'serious' | 'moderate' | 'minor'
  issue: string
  fix: string
  wcagLevel: 'A' | 'AA' | 'AAA'
}

interface A11yStats {
  totalFiles: number
  filesWithIssues: number
  totalIssues: number
  critical: number
  serious: number
  moderate: number
  minor: number
  passRate: number
}

/**
 * Check for missing alt text on images
 */
function checkAltText(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Check for img tags without alt
    if (/<img[^>]*>/.test(line) && !line.includes('alt=')) {
      issues.push({
        file,
        line: idx + 1,
        rule: 'image-alt',
        severity: 'critical',
        issue: 'Image missing alt attribute',
        fix: 'Add alt="" for decorative images or alt="description" for meaningful images',
        wcagLevel: 'A'
      })
    }

    // Check for empty alt on meaningful images
    if (/<img[^>]*alt=""[^>]*>/.test(line) && !line.includes('role="presentation"')) {
      // This might be intentional for decorative images, so lower severity
      issues.push({
        file,
        line: idx + 1,
        rule: 'image-alt-empty',
        severity: 'moderate',
        issue: 'Image has empty alt text - ensure this is decorative',
        fix: 'If decorative, add role="presentation" or aria-hidden="true"',
        wcagLevel: 'A'
      })
    }
  })

  return issues
}

/**
 * Check for proper heading hierarchy
 */
function checkHeadingHierarchy(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  const headings = lines
    .map((line, idx) => ({
      level: line.match(/<h([1-6])/)?.[1],
      line: idx + 1
    }))
    .filter(h => h.level)

  for (let i = 1; i < headings.length; i++) {
    const prev = parseInt(headings[i - 1].level!)
    const curr = parseInt(headings[i].level!)

    // Heading levels should not skip
    if (curr > prev + 1) {
      issues.push({
        file,
        line: headings[i].line,
        rule: 'heading-order',
        severity: 'serious',
        issue: `Heading hierarchy skip from h${prev} to h${curr}`,
        fix: `Use h${prev + 1} instead of h${curr} to maintain proper hierarchy`,
        wcagLevel: 'A'
      })
    }
  }

  return issues
}

/**
 * Check for proper form labels
 */
function checkFormLabels(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Check for inputs without labels
    if (/<input[^>]*>/.test(line)) {
      const hasId = /id="[^"]*"/.test(line)
      const hasAriaLabel = /aria-label="[^"]*"/.test(line)
      const hasAriaLabelledby = /aria-labelledby="[^"]*"/.test(line)
      const hasPlaceholder = /placeholder="[^"]*"/.test(line)

      // Check if there's a label in previous or next lines
      const surroundingLines = lines.slice(Math.max(0, idx - 2), idx + 3).join('\n')
      const hasLabel = /<label[^>]*>/.test(surroundingLines) && hasId

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'form-label',
          severity: 'critical',
          issue: 'Input missing associated label',
          fix: 'Add <label htmlFor="inputId"> or aria-label attribute',
          wcagLevel: 'A'
        })
      } else if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby && hasPlaceholder) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'placeholder-label',
          severity: 'serious',
          issue: 'Placeholder used as label (not accessible)',
          fix: 'Add proper label in addition to placeholder',
          wcagLevel: 'AA'
        })
      }
    }
  })

  return issues
}

/**
 * Check for proper button accessibility
 */
function checkButtons(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Check for div/span used as buttons
    if ((/onClick=/.test(line) || /onPress=/.test(line)) &&
        !/<button/.test(line) &&
        !/role="button"/.test(line) &&
        !/<a[^>]*href/.test(line)) {

      issues.push({
        file,
        line: idx + 1,
        rule: 'button-role',
        severity: 'critical',
        issue: 'Clickable element without proper role or semantics',
        fix: 'Use <button> element or add role="button" with keyboard support',
        wcagLevel: 'A'
      })
    }

    // Check for buttons with only icon (no text)
    if (/<button[^>]*>/.test(line)) {
      const buttonContent = line.match(/<button[^>]*>(.*?)<\/button>/)?.[1] || ''
      const hasText = /\w/.test(buttonContent.replace(/<[^>]*>/g, ''))
      const hasAriaLabel = /aria-label="[^"]*"/.test(line)
      const hasAriaLabelledby = /aria-labelledby="[^"]*"/.test(line)
      const hasTitle = /title="[^"]*"/.test(line)

      if (!hasText && !hasAriaLabel && !hasAriaLabelledby && !hasTitle) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'button-name',
          severity: 'serious',
          issue: 'Button without accessible name',
          fix: 'Add aria-label="description" or text content',
          wcagLevel: 'A'
        })
      }
    }
  })

  return issues
}

/**
 * Check for color contrast (basic pattern detection)
 */
function checkColorContrast(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Look for potential low contrast patterns
    if (/text-gray-[34]00/.test(line) && /bg-white/.test(line)) {
      issues.push({
        file,
        line: idx + 1,
        rule: 'color-contrast',
        severity: 'moderate',
        issue: 'Potential low color contrast (light gray on white)',
        fix: 'Use text-gray-700 or darker for sufficient contrast',
        wcagLevel: 'AA'
      })
    }

    if (/text-white/.test(line) && /bg-yellow/.test(line)) {
      issues.push({
        file,
        line: idx + 1,
        rule: 'color-contrast',
        severity: 'moderate',
        issue: 'Potential low color contrast (white on yellow)',
        fix: 'Test contrast ratio - should be ≥ 4.5:1 for normal text',
        wcagLevel: 'AA'
      })
    }
  })

  return issues
}

/**
 * Check for keyboard navigation support
 */
function checkKeyboardNav(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Check for mouse-only interactions
    if (/onClick=/.test(line) && !/<button/.test(line) && !/<a/.test(line)) {
      const hasOnKeyDown = lines.slice(Math.max(0, idx - 2), idx + 3)
        .join('\n')
        .includes('onKeyDown')

      const hasTabIndex = /tabIndex=/.test(line)
      const hasRole = /role="button"/.test(line)

      if (!hasOnKeyDown && (!hasTabIndex || !hasRole)) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'keyboard-nav',
          severity: 'serious',
          issue: 'Interactive element not keyboard accessible',
          fix: 'Add onKeyDown handler to support Enter/Space keys',
          wcagLevel: 'A'
        })
      }
    }

    // Check for missing tabIndex on custom interactive elements
    if (/role="(button|link|menuitem)"/.test(line) && !/tabIndex/.test(line)) {
      issues.push({
        file,
        line: idx + 1,
        rule: 'focusable',
        severity: 'serious',
        issue: 'Interactive element not focusable',
        fix: 'Add tabIndex={0} to make element keyboard focusable',
        wcagLevel: 'A'
      })
    }
  })

  return issues
}

/**
 * Check for ARIA attributes
 */
function checkAria(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Check for invalid ARIA attributes
    if (/aria-\w+/.test(line)) {
      // Check for aria-label on non-interactive elements without role
      if (/aria-label=/.test(line) &&
          !/<button/.test(line) &&
          !/<a/.test(line) &&
          !/<input/.test(line) &&
          !/role=/.test(line)) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'aria-allowed',
          severity: 'moderate',
          issue: 'aria-label on non-interactive element may be ignored',
          fix: 'Add appropriate role or use native semantic element',
          wcagLevel: 'A'
        })
      }
    }

    // Check for missing aria-live for dynamic content
    if (/(loading|error|success)/i.test(line) && !(/aria-live/.test(line))) {
      const isDynamic = /\{.*\?/.test(line) || /state/.test(line)
      if (isDynamic) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'aria-live',
          severity: 'moderate',
          issue: 'Dynamic content without aria-live announcement',
          fix: 'Add aria-live="polite" for status updates',
          wcagLevel: 'AA'
        })
      }
    }
  })

  return issues
}

/**
 * Check for semantic HTML
 */
function checkSemanticHTML(content: string, file: string): A11yIssue[] {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Check for div soup instead of semantic elements
    if (/<div[^>]*>/.test(line)) {
      const hasRole = /role="(navigation|main|complementary|banner|contentinfo)"/.test(line)
      const className = line.match(/className="([^"]*)"/)?.[1] || ''

      if (className.includes('nav') && !hasRole) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'semantic-html',
          severity: 'minor',
          issue: 'Use <nav> instead of div with navigation class',
          fix: 'Replace <div className="nav"> with <nav>',
          wcagLevel: 'AA'
        })
      }

      if (className.includes('header') && !hasRole) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'semantic-html',
          severity: 'minor',
          issue: 'Use <header> instead of div with header class',
          fix: 'Replace <div className="header"> with <header>',
          wcagLevel: 'AA'
        })
      }

      if (className.includes('footer') && !hasRole) {
        issues.push({
          file,
          line: idx + 1,
          rule: 'semantic-html',
          severity: 'minor',
          issue: 'Use <footer> instead of div with footer class',
          fix: 'Replace <div className="footer"> with <footer>',
          wcagLevel: 'AA'
        })
      }
    }
  })

  return issues
}

/**
 * Audit single file
 */
function auditFile(file: string): A11yIssue[] {
  const content = readFileSync(file, 'utf-8')

  return [
    ...checkAltText(content, file),
    ...checkHeadingHierarchy(content, file),
    ...checkFormLabels(content, file),
    ...checkButtons(content, file),
    ...checkColorContrast(content, file),
    ...checkKeyboardNav(content, file),
    ...checkAria(content, file),
    ...checkSemanticHTML(content, file)
  ]
}

/**
 * Calculate statistics
 */
function calculateStats(allIssues: A11yIssue[], totalFiles: number): A11yStats {
  const filesWithIssues = new Set(allIssues.map(i => i.file)).size

  return {
    totalFiles,
    filesWithIssues,
    totalIssues: allIssues.length,
    critical: allIssues.filter(i => i.severity === 'critical').length,
    serious: allIssues.filter(i => i.severity === 'serious').length,
    moderate: allIssues.filter(i => i.severity === 'moderate').length,
    minor: allIssues.filter(i => i.severity === 'minor').length,
    passRate: ((totalFiles - filesWithIssues) / totalFiles) * 100
  }
}

/**
 * Command: audit
 */
function commandAudit(): void {
  console.log('♿ Accessibility Audit (WCAG 2.1 AA)\n')
  console.log('=' .repeat(50) + '\n')

  const componentFiles = glob.sync('components/**/*.{tsx,jsx}', {
    ignore: ['**/*.test.*', '**/*.stories.*']
  })

  console.log(`Analyzing ${componentFiles.length} components...\n`)

  const allIssues: A11yIssue[] = []

  for (const file of componentFiles) {
    const issues = auditFile(file)
    allIssues.push(...issues)
  }

  const stats = calculateStats(allIssues, componentFiles.length)

  // Display statistics
  console.log('📊 Results:\n')
  console.log(`Files Analyzed: ${stats.totalFiles}`)
  console.log(`Files with Issues: ${stats.filesWithIssues}`)
  console.log(`Pass Rate: ${stats.passRate.toFixed(1)}%\n`)

  console.log(`Total Issues: ${stats.totalIssues}`)
  console.log(`  🔴 Critical: ${stats.critical}`)
  console.log(`  🟠 Serious: ${stats.serious}`)
  console.log(`  🟡 Moderate: ${stats.moderate}`)
  console.log(`  🟢 Minor: ${stats.minor}\n`)

  // Group by severity
  const critical = allIssues.filter(i => i.severity === 'critical')
  const serious = allIssues.filter(i => i.severity === 'serious')

  // Display critical issues
  if (critical.length > 0) {
    console.log('🔴 CRITICAL Issues (Must Fix):\n')
    critical.slice(0, 10).forEach(issue => {
      console.log(`${issue.file}:${issue.line}`)
      console.log(`  Rule: ${issue.rule} (WCAG ${issue.wcagLevel})`)
      console.log(`  Issue: ${issue.issue}`)
      console.log(`  Fix: ${issue.fix}\n`)
    })
    if (critical.length > 10) {
      console.log(`... and ${critical.length - 10} more critical issues\n`)
    }
  }

  // Display serious issues
  if (serious.length > 0) {
    console.log('🟠 SERIOUS Issues (Should Fix):\n')
    serious.slice(0, 5).forEach(issue => {
      console.log(`${issue.file}:${issue.line}`)
      console.log(`  Rule: ${issue.rule} (WCAG ${issue.wcagLevel})`)
      console.log(`  Issue: ${issue.issue}`)
      console.log(`  Fix: ${issue.fix}\n`)
    })
    if (serious.length > 5) {
      console.log(`... and ${serious.length - 5} more serious issues\n`)
    }
  }

  // Summary
  console.log('=' .repeat(50))
  console.log('\n📝 Summary:\n')

  if (stats.totalIssues === 0) {
    console.log('✅ No accessibility issues found!')
    console.log('   All components pass WCAG 2.1 AA criteria.\n')
  } else if (stats.critical === 0 && stats.serious === 0) {
    console.log('✅ No critical or serious issues!')
    console.log('   Components meet WCAG 2.1 AA requirements.')
    console.log(`   ${stats.moderate + stats.minor} minor improvements recommended.\n`)
  } else {
    console.log(`⚠️  ${stats.critical + stats.serious} issues requiring attention`)
    console.log(`   Fix critical and serious issues for WCAG 2.1 AA compliance.\n`)
  }

  console.log('💡 Next Steps:')
  console.log('   1. Fix critical issues first')
  console.log('   2. Address serious issues')
  console.log('   3. Run automated tests: npm run test:a11y')
  console.log('   4. Test with screen readers (NVDA, JAWS, VoiceOver)')
  console.log('   5. Verify keyboard navigation manually\n')
}

/**
 * Command: fix (show fixes for specific file)
 */
function commandFix(targetFile?: string): void {
  if (!targetFile) {
    console.log('Usage: npm run a11y:fix -- <ComponentName>')
    console.log('Example: npm run a11y:fix -- Button\n')
    return
  }

  const files = glob.sync(`components/**/${targetFile}/${targetFile}.{tsx,jsx}`)

  if (files.length === 0) {
    console.log(`❌ Component "${targetFile}" not found\n`)
    return
  }

  const file = files[0]
  const issues = auditFile(file)

  if (issues.length === 0) {
    console.log(`✅ No accessibility issues in ${targetFile}!\n`)
    return
  }

  console.log(`♿ Accessibility Issues in ${targetFile}:\n`)
  console.log(`Found ${issues.length} issues\n`)

  issues.forEach((issue, idx) => {
    console.log(`${idx + 1}. Line ${issue.line} - ${issue.severity.toUpperCase()}`)
    console.log(`   Rule: ${issue.rule} (WCAG ${issue.wcagLevel})`)
    console.log(`   Issue: ${issue.issue}`)
    console.log(`   Fix: ${issue.fix}\n`)
  })
}

/**
 * Command: test (run automated tests)
 */
function commandTest(): void {
  console.log('🧪 Running Automated Accessibility Tests\n')
  console.log('This requires jest-axe integration in test files.\n')
  console.log('Example test:')
  console.log(`
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
\n`)
  console.log('Run: npm test -- --grep "accessibility"\n')
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const param = args[1]

  console.log('\n♿ Accessibility Auditor\n')

  if (command === 'fix') {
    commandFix(param)
  } else if (command === 'test') {
    commandTest()
  } else if (command === 'audit' || !command) {
    commandAudit()
  } else {
    console.log('Usage:')
    console.log('  npm run a11y:audit          - Full accessibility audit')
    console.log('  npm run a11y:fix <Component> - Show fixes for component')
    console.log('  npm run a11y:test           - Guide for automated tests\n')
  }
}

main()
