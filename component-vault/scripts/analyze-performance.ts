#!/usr/bin/env tsx

import { readFileSync, existsSync, statSync } from 'fs'
import { glob } from 'glob'

interface PerformanceIssue {
  file: string
  line: number
  type: 'inline-function' | 'missing-memo' | 'missing-callback' | 'large-component' | 'missing-key'
  severity: 'high' | 'medium' | 'low'
  issue: string
  fix: string
}

interface BundleInfo {
  name: string
  size: number
  percentage: number
}

interface ComponentMetrics {
  file: string
  lines: number
  complexity: number
  hooks: number
  props: number
  reRenderRisk: 'high' | 'medium' | 'low'
}

/**
 * Analyze bundle size
 */
async function analyzeBundleSize(): Promise<BundleInfo[]> {
  console.log('📦 Analyzing bundle size...\n')

  // Check if dist exists
  if (!existsSync('dist')) {
    console.log('⚠️  No dist folder found. Run npm run build first.\n')
    return []
  }

  const bundles: BundleInfo[] = []
  const files = glob.sync('dist/**/*.{js,mjs}')

  let totalSize = 0
  for (const file of files) {
    const stats = statSync(file)
    totalSize += stats.size
  }

  for (const file of files) {
    const stats = statSync(file)
    const name = file.replace('dist/', '')
    bundles.push({
      name,
      size: stats.size,
      percentage: (stats.size / totalSize) * 100
    })
  }

  // Sort by size descending
  bundles.sort((a, b) => b.size - a.size)

  return bundles
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Detect re-render issues in component files
 */
function detectReRenderIssues(): PerformanceIssue[] {
  console.log('🔍 Detecting re-render issues...\n')

  const issues: PerformanceIssue[] = []
  const componentFiles = glob.sync('components/**/*.{tsx,jsx}', {
    ignore: ['**/*.test.*', '**/*.stories.*']
  })

  for (const file of componentFiles) {
    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')

    lines.forEach((line, idx) => {
      const lineNumber = idx + 1

      // Detect inline functions in JSX
      if (/={.*=>/.test(line) && !line.includes('useCallback') && !line.includes('useMemo')) {
        issues.push({
          file,
          line: lineNumber,
          type: 'inline-function',
          severity: 'high',
          issue: 'Inline function in JSX causes re-renders',
          fix: 'Use useCallback to memoize the function'
        })
      }

      // Detect inline object creation in JSX
      if (/=\{\{/.test(line)) {
        issues.push({
          file,
          line: lineNumber,
          type: 'inline-function',
          severity: 'medium',
          issue: 'Inline object creation causes re-renders',
          fix: 'Move object outside component or use useMemo'
        })
      }

      // Detect missing key in lists
      if (/\.map\(/.test(line)) {
        const nextLines = lines.slice(idx, idx + 5).join('\n')
        if (!nextLines.includes('key=')) {
          issues.push({
            file,
            line: lineNumber,
            type: 'missing-key',
            severity: 'high',
            issue: 'Missing key prop in list',
            fix: 'Add unique key prop to list items'
          })
        }
      }
    })

    // Check for missing React.memo
    const hasProps = content.includes('Props')
    const hasMemo = content.includes('React.memo') || content.includes('memo(')
    const isLarge = lines.length > 100

    if (hasProps && !hasMemo && isLarge) {
      issues.push({
        file,
        line: 1,
        type: 'missing-memo',
        severity: 'medium',
        issue: 'Large component without React.memo',
        fix: 'Wrap component export with React.memo()'
      })
    }

    // Check for missing useCallback on event handlers
    const hasOnClick = content.includes('onClick')
    const hasUseCallback = content.includes('useCallback')

    if (hasOnClick && !hasUseCallback && hasProps) {
      issues.push({
        file,
        line: 1,
        type: 'missing-callback',
        severity: 'medium',
        issue: 'Event handlers without useCallback',
        fix: 'Wrap event handlers with useCallback'
      })
    }
  }

  return issues
}

/**
 * Analyze component complexity
 */
function analyzeComplexity(): ComponentMetrics[] {
  console.log('📊 Analyzing component complexity...\n')

  const metrics: ComponentMetrics[] = []
  const componentFiles = glob.sync('components/**/*.{tsx,jsx}', {
    ignore: ['**/*.test.*', '**/*.stories.*']
  })

  for (const file of componentFiles) {
    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')

    // Count lines of code
    const loc = lines.filter(l => l.trim() && !l.trim().startsWith('//')).length

    // Count hooks
    const hookMatches = content.match(/use[A-Z]\w+/g) || []
    const hooks = new Set(hookMatches).size

    // Estimate complexity (simplified)
    const complexity = (content.match(/if|else|switch|case|for|while|&&|\|\|/g) || []).length

    // Count props
    const propsMatch = content.match(/interface \w+Props \{([^}]+)\}/)
    const props = propsMatch
      ? propsMatch[1].split('\n').filter(l => l.trim() && !l.trim().startsWith('//')).length
      : 0

    // Determine re-render risk
    let reRenderRisk: 'high' | 'medium' | 'low' = 'low'
    if (loc > 200 || complexity > 20 || hooks > 5) {
      reRenderRisk = 'high'
    } else if (loc > 100 || complexity > 10 || hooks > 3) {
      reRenderRisk = 'medium'
    }

    if (loc > 50) {
      metrics.push({
        file,
        lines: loc,
        complexity,
        hooks,
        props,
        reRenderRisk
      })
    }
  }

  // Sort by lines descending
  metrics.sort((a, b) => b.lines - a.lines)

  return metrics
}

/**
 * Generate optimization suggestions
 */
function generateSuggestions(issues: PerformanceIssue[], metrics: ComponentMetrics[]): void {
  console.log('\n💡 Optimization Suggestions:\n')

  // High severity issues
  const highSeverity = issues.filter(i => i.severity === 'high')
  if (highSeverity.length > 0) {
    console.log(`🔴 HIGH Priority (${highSeverity.length} issues):`)
    highSeverity.slice(0, 5).forEach(issue => {
      console.log(`   - ${issue.file}:${issue.line}`)
      console.log(`     ${issue.issue}`)
      console.log(`     Fix: ${issue.fix}\n`)
    })
  }

  // Components that need optimization
  const highRiskComponents = metrics.filter(m => m.reRenderRisk === 'high')
  if (highRiskComponents.length > 0) {
    console.log(`🟡 Components Needing Optimization (${highRiskComponents.length}):`)
    highRiskComponents.slice(0, 5).forEach(metric => {
      console.log(`   - ${metric.file} (${metric.lines} lines, complexity: ${metric.complexity})`)
      console.log(`     Consider: React.memo, code splitting, or refactoring\n`)
    })
  }

  // General recommendations
  console.log('📝 General Recommendations:')
  console.log('   1. Use React.memo() for components that receive same props often')
  console.log('   2. Wrap callbacks with useCallback to prevent re-renders')
  console.log('   3. Use useMemo for expensive computations')
  console.log('   4. Implement code splitting for large components')
  console.log('   5. Always add key props to list items')
  console.log('   6. Avoid inline functions and object creation in JSX\n')
}

/**
 * Command: analyze (full analysis)
 */
async function commandAnalyze(): Promise<void> {
  console.log('🚀 Performance Analysis\n')
  console.log('=' .repeat(50) + '\n')

  // Bundle size analysis
  const bundles = await analyzeBundleSize()
  if (bundles.length > 0) {
    console.log('📦 Bundle Size:')
    const totalSize = bundles.reduce((sum, b) => sum + b.size, 0)
    console.log(`   Total: ${formatBytes(totalSize)}\n`)

    console.log('   Top 5 largest files:')
    bundles.slice(0, 5).forEach(bundle => {
      console.log(`   - ${bundle.name}: ${formatBytes(bundle.size)} (${bundle.percentage.toFixed(1)}%)`)
    })
    console.log()
  }

  // Re-render issues
  const issues = detectReRenderIssues()
  console.log(`🔍 Re-Render Issues: ${issues.length} found`)
  const byType = issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  for (const [type, count] of Object.entries(byType)) {
    console.log(`   - ${type}: ${count}`)
  }
  console.log()

  // Component complexity
  const metrics = analyzeComplexity()
  console.log(`📊 Component Complexity:`)
  console.log(`   Total components analyzed: ${metrics.length}`)
  console.log(`   Large components (>200 lines): ${metrics.filter(m => m.lines > 200).length}`)
  console.log(`   High complexity (>20): ${metrics.filter(m => m.complexity > 20).length}`)
  console.log(`   High re-render risk: ${metrics.filter(m => m.reRenderRisk === 'high').length}`)

  // Suggestions
  generateSuggestions(issues, metrics)

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:\n')
  console.log(`   Bundle Size: ${bundles.length > 0 ? formatBytes(bundles.reduce((s, b) => s + b.size, 0)) : 'N/A'}`)
  console.log(`   Performance Issues: ${issues.length}`)
  console.log(`   Components Needing Attention: ${metrics.filter(m => m.reRenderRisk === 'high').length}`)
  console.log()
}

/**
 * Command: bundle
 */
async function commandBundle(): Promise<void> {
  const bundles = await analyzeBundleSize()

  if (bundles.length === 0) {
    return
  }

  const totalSize = bundles.reduce((sum, b) => sum + b.size, 0)

  console.log(`📦 Bundle Size Analysis\n`)
  console.log(`Total Size: ${formatBytes(totalSize)}\n`)

  console.log('Files:')
  bundles.forEach((bundle, idx) => {
    console.log(`${idx + 1}. ${bundle.name}`)
    console.log(`   Size: ${formatBytes(bundle.size)} (${bundle.percentage.toFixed(1)}%)\n`)
  })

  // Recommendations
  if (totalSize > 500000) {
    console.log('⚠️  Bundle size is large (>500KB)')
    console.log('💡 Consider:')
    console.log('   - Code splitting')
    console.log('   - Tree shaking unused imports')
    console.log('   - Lazy loading heavy components')
    console.log('   - Using lighter alternatives for dependencies\n')
  } else {
    console.log('✅ Bundle size is acceptable (<500KB)\n')
  }
}

/**
 * Command: renders
 */
function commandRenders(): void {
  const issues = detectReRenderIssues()

  console.log(`🔍 Re-Render Analysis\n`)
  console.log(`Total Issues Found: ${issues.length}\n`)

  if (issues.length === 0) {
    console.log('✅ No re-render issues detected!\n')
    return
  }

  // Group by severity
  const high = issues.filter(i => i.severity === 'high')
  const medium = issues.filter(i => i.severity === 'medium')
  const low = issues.filter(i => i.severity === 'low')

  if (high.length > 0) {
    console.log(`🔴 HIGH Severity (${high.length}):`)
    high.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line}`)
      console.log(`   → ${issue.issue}`)
      console.log(`   ✓ ${issue.fix}\n`)
    })
  }

  if (medium.length > 0) {
    console.log(`🟡 MEDIUM Severity (${medium.length}):`)
    medium.slice(0, 10).forEach(issue => {
      console.log(`   ${issue.file}:${issue.line}`)
      console.log(`   → ${issue.issue}`)
      console.log(`   ✓ ${issue.fix}\n`)
    })
    if (medium.length > 10) {
      console.log(`   ... and ${medium.length - 10} more\n`)
    }
  }

  console.log('💡 Quick Fixes:')
  console.log('   1. Wrap inline functions with useCallback')
  console.log('   2. Wrap inline objects with useMemo')
  console.log('   3. Add React.memo() to large components')
  console.log('   4. Always use key props in lists\n')
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  console.log('\n⚡ Performance Auditor\n')

  if (command === 'bundle') {
    await commandBundle()
  } else if (command === 'renders') {
    commandRenders()
  } else if (command === 'analyze' || !command) {
    await commandAnalyze()
  } else {
    console.log('Usage:')
    console.log('  npm run performance:audit        - Full performance analysis')
    console.log('  npm run performance:bundle       - Bundle size analysis')
    console.log('  npm run performance:renders      - Re-render issues detection\n')
  }
}

main().catch(console.error)
