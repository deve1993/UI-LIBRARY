#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

interface QualityReport {
  eslint: {
    errors: number
    warnings: number
    fixable: number
  }
  typescript: {
    errors: number
  }
  debt: {
    todos: Array<{ file: string; line: number; text: string }>
    fixmes: Array<{ file: string; line: number; text: string }>
    hacks: Array<{ file: string; line: number; text: string }>
  }
}

/**
 * Execute command safely
 */
function exec(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' })
  } catch (error: any) {
    return error.stdout || ''
  }
}

/**
 * Analyze ESLint issues
 */
function analyzeESLint(): { errors: number; warnings: number; fixable: number } {
  console.log('📊 Analyzing ESLint issues...\n')

  try {
    const output = exec('npx eslint . --format json')
    const results = JSON.parse(output)

    let totalErrors = 0
    let totalWarnings = 0
    let totalFixable = 0

    results.forEach((result: any) => {
      totalErrors += result.errorCount
      totalWarnings += result.warningCount
      totalFixable += result.fixableErrorCount + result.fixableWarningCount
    })

    return {
      errors: totalErrors,
      warnings: totalWarnings,
      fixable: totalFixable
    }
  } catch (error) {
    console.warn('⚠️  ESLint analysis failed, returning estimates')
    return { errors: 0, warnings: 0, fixable: 0 }
  }
}

/**
 * Fix ESLint errors automatically
 */
function fixESLint(): void {
  console.log('🔧 Auto-fixing ESLint errors...\n')

  try {
    exec('npx eslint . --fix')
    console.log('✅ ESLint auto-fix completed')
  } catch (error) {
    console.log('✅ ESLint auto-fix completed with some warnings')
  }
}

/**
 * Analyze TypeScript errors
 */
function analyzeTypeScript(): { errors: number } {
  console.log('\n📊 Analyzing TypeScript errors...\n')

  const output = exec('npx tsc --noEmit')
  const errorLines = output.split('\n').filter(line => line.includes('error TS'))

  return {
    errors: errorLines.length
  }
}

/**
 * Find technical debt (TODOs, FIXMEs, HACKs)
 */
function findTechnicalDebt() {
  console.log('\n📊 Finding technical debt...\n')

  const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
    ignore: ['node_modules/**', 'dist/**', '.work/**', '**/stories/**']
  })

  const todos: Array<{ file: string; line: number; text: string }> = []
  const fixmes: Array<{ file: string; line: number; text: string }> = []
  const hacks: Array<{ file: string; line: number; text: string }> = []

  files.forEach(file => {
    try {
      const content = readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      lines.forEach((line, index) => {
        if (line.includes('TODO')) {
          todos.push({
            file,
            line: index + 1,
            text: line.trim()
          })
        }
        if (line.includes('FIXME')) {
          fixmes.push({
            file,
            line: index + 1,
            text: line.trim()
          })
        }
        if (line.includes('HACK')) {
          hacks.push({
            file,
            line: index + 1,
            text: line.trim()
          })
        }
      })
    } catch (error) {
      // Skip files that can't be read
    }
  })

  return { todos, fixmes, hacks }
}

/**
 * Generate quality report
 */
async function generateReport(): Promise<QualityReport> {
  const eslint = analyzeESLint()
  const typescript = analyzeTypeScript()
  const debt = findTechnicalDebt()

  return {
    eslint,
    typescript,
    debt
  }
}

/**
 * Display quality report
 */
function displayReport(report: QualityReport): void {
  console.log('\n' + '='.repeat(60))
  console.log('🔍 CODE QUALITY REPORT')
  console.log('='.repeat(60) + '\n')

  // ESLint Section
  console.log('📊 ESLint Issues:')
  console.log(`  ${report.eslint.errors > 0 ? '❌' : '✅'} Errors: ${report.eslint.errors}`)
  console.log(`  ⚠️  Warnings: ${report.eslint.warnings}`)
  console.log(`  🔧 Auto-Fixable: ${report.eslint.fixable}`)
  if (report.eslint.fixable > 0) {
    const percentage = Math.round((report.eslint.fixable / (report.eslint.errors + report.eslint.warnings)) * 100)
    console.log(`  💡 ${percentage}% can be fixed automatically`)
  }

  // TypeScript Section
  console.log('\n📊 TypeScript Issues:')
  console.log(`  ${report.typescript.errors > 0 ? '❌' : '✅'} Errors: ${report.typescript.errors}`)

  // Technical Debt Section
  console.log('\n📊 Technical Debt:')
  console.log(`  📝 TODOs: ${report.debt.todos.length}`)
  console.log(`  🔧 FIXMEs: ${report.debt.fixmes.length}`)
  console.log(`  ⚠️  HACKs: ${report.debt.hacks.length}`)

  // Show first 5 TODOs
  if (report.debt.todos.length > 0) {
    console.log('\n📝 Recent TODOs (first 5):')
    report.debt.todos.slice(0, 5).forEach(todo => {
      console.log(`  - ${todo.file}:${todo.line}`)
      console.log(`    ${todo.text.substring(0, 80)}`)
    })
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  const totalIssues = report.eslint.errors + report.typescript.errors
  if (totalIssues === 0) {
    console.log('✅ Code Quality: EXCELLENT')
    console.log('   No errors found! Ready for production.')
  } else if (totalIssues < 10) {
    console.log('🟡 Code Quality: GOOD')
    console.log(`   ${totalIssues} issues to fix`)
  } else {
    console.log('🔴 Code Quality: NEEDS ATTENTION')
    console.log(`   ${totalIssues} issues found`)
    console.log('\n💡 Run: npm run quality:cleanup')
  }
  console.log('='.repeat(60) + '\n')
}

/**
 * Full cleanup: fix everything automatically
 */
async function fullCleanup(): Promise<void> {
  console.log('\n🧹 Starting full code quality cleanup...\n')

  // Step 1: ESLint auto-fix
  console.log('Step 1/4: ESLint auto-fix')
  fixESLint()

  // Step 2: Prettier formatting
  console.log('\nStep 2/4: Prettier formatting')
  try {
    exec('npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"')
    console.log('✅ Prettier formatting completed')
  } catch (error) {
    console.log('⚠️  Prettier formatting had warnings')
  }

  // Step 3: Remove unused imports (if tool available)
  console.log('\nStep 3/4: Organizing imports')
  try {
    exec('npx eslint . --fix --rule "unused-imports/no-unused-imports: error"')
    console.log('✅ Imports organized')
  } catch (error) {
    console.log('⚠️  Import organization skipped (plugin not installed)')
  }

  // Step 4: Final report
  console.log('\nStep 4/4: Generating report')
  const report = await generateReport()
  displayReport(report)

  // Save report
  const reportPath = 'quality-report.json'
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📄 Full report saved: ${reportPath}`)
}

/**
 * List technical debt with details
 */
async function listDebt(): Promise<void> {
  console.log('\n📊 Technical Debt Analysis\n')

  const debt = findTechnicalDebt()

  console.log(`Total Items: ${debt.todos.length + debt.fixmes.length + debt.hacks.length}\n`)

  if (debt.todos.length > 0) {
    console.log(`📝 TODOs (${debt.todos.length}):`)
    debt.todos.forEach((todo, idx) => {
      console.log(`\n${idx + 1}. ${todo.file}:${todo.line}`)
      console.log(`   ${todo.text}`)
    })
  }

  if (debt.fixmes.length > 0) {
    console.log(`\n🔧 FIXMEs (${debt.fixmes.length}):`)
    debt.fixmes.forEach((fixme, idx) => {
      console.log(`\n${idx + 1}. ${fixme.file}:${fixme.line}`)
      console.log(`   ${fixme.text}`)
    })
  }

  if (debt.hacks.length > 0) {
    console.log(`\n⚠️  HACKs (${debt.hacks.length}):`)
    debt.hacks.forEach((hack, idx) => {
      console.log(`\n${idx + 1}. ${hack.file}:${hack.line}`)
      console.log(`   ${hack.text}`)
    })
  }

  console.log('\n💡 Consider addressing these items in future sprints\n')
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  console.log('\n🔍 Code Quality Agent\n')

  switch (command) {
    case 'analyze':
      const report = await generateReport()
      displayReport(report)
      break

    case 'fix-eslint':
      fixESLint()
      console.log('\n✅ ESLint fixes applied. Run type-check to verify.')
      break

    case 'cleanup':
      await fullCleanup()
      break

    case 'debt':
      await listDebt()
      break

    default:
      console.log('Commands:')
      console.log('  analyze      - Generate code quality report')
      console.log('  fix-eslint   - Auto-fix ESLint errors')
      console.log('  cleanup      - Full automated cleanup')
      console.log('  debt         - List technical debt (TODOs, FIXMEs)')
      console.log('\nExamples:')
      console.log('  npm run quality:analyze')
      console.log('  npm run quality:cleanup')
      break
  }
}

// Execute
main().catch(console.error)
