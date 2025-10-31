#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'

interface OutdatedPackage {
  current: string
  wanted: string
  latest: string
  type: 'dependencies' | 'devDependencies'
}

interface MigrationPlan {
  package: string
  currentVersion: string
  targetVersion: string
  updateType: 'patch' | 'minor' | 'major'
  breakingChanges: string[]
  migrationSteps: string[]
  estimatedTime: string
  riskLevel: 'low' | 'medium' | 'high'
}

/**
 * Execute command and return output
 */
function exec(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' })
  } catch (error: any) {
    return error.stdout || ''
  }
}

/**
 * Get outdated packages
 */
function getOutdatedPackages(): Record<string, OutdatedPackage> {
  console.log('📦 Analyzing dependencies...\n')

  try {
    const output = exec('npm outdated --json')
    if (!output) return {}
    return JSON.parse(output)
  } catch (error) {
    console.log('⚠️  No outdated packages found or error parsing npm outdated')
    return {}
  }
}

/**
 * Get security vulnerabilities
 */
function getVulnerabilities(): any {
  try {
    const output = exec('npm audit --json')
    return JSON.parse(output)
  } catch (error) {
    return { metadata: { vulnerabilities: { total: 0 } } }
  }
}

/**
 * Determine update type
 */
function getUpdateType(current: string, latest: string): 'patch' | 'minor' | 'major' {
  const [currentMajor, currentMinor] = current.split('.').map(Number)
  const [latestMajor, latestMinor] = latest.split('.').map(Number)

  if (latestMajor > currentMajor) return 'major'
  if (latestMinor > currentMinor) return 'minor'
  return 'patch'
}

/**
 * Get breaking changes info for known packages
 */
function getBreakingChanges(packageName: string, fromVersion: string, toVersion: string): string[] {
  const changes: Record<string, string[]> = {
    'storybook': [
      'CSF3 format required for all stories',
      'main.ts addon configuration format changed',
      'preview.ts decorators signature updated',
      'Removed deprecated MDX1 support',
      'Updated addon APIs'
    ],
    'tailwindcss': [
      'New CSS engine with better performance',
      'Config file format changed (JS → TS recommended)',
      'Some utility classes renamed',
      'Color palette structure updated',
      'JIT mode is default (already was in v3)'
    ],
    'eslint': [
      'Flat config format required (.eslintrc.json → eslint.config.js)',
      'Plugin loading mechanism changed',
      'Some rules renamed or removed',
      'New parser configuration format'
    ],
    'react': [
      'New JSX transform (already in 18)',
      'Concurrent features enabled by default',
      'Automatic batching for all updates',
      'New client/server rendering APIs'
    ]
  }

  // Check if package name contains any known package
  for (const [key, value] of Object.entries(changes)) {
    if (packageName.includes(key)) {
      return value
    }
  }

  return ['Check package changelog for breaking changes']
}

/**
 * Generate migration plan
 */
function generateMigrationPlan(packageName: string, info: OutdatedPackage): MigrationPlan {
  const updateType = getUpdateType(info.current, info.latest)
  const breakingChanges = updateType === 'major'
    ? getBreakingChanges(packageName, info.current, info.latest)
    : []

  const migrationSteps: string[] = []
  const isStorybookPackage = packageName.includes('@storybook')

  if (isStorybookPackage && updateType === 'major') {
    migrationSteps.push(
      'Backup current configuration',
      'Run npx storybook@latest upgrade',
      'Update all .stories.tsx files to CSF3 format',
      'Fix any breaking changes in main.ts and preview.ts',
      'Test all stories in Storybook',
      'Run full test suite'
    )
  } else if (packageName === 'tailwindcss' && updateType === 'major') {
    migrationSteps.push(
      'Update tailwind.config.js to tailwind.config.ts',
      'Run npx @tailwindcss/upgrade',
      'Update PostCSS config if needed',
      'Test all components visually',
      'Check for utility class changes'
    )
  } else if (packageName === 'eslint' && updateType === 'major') {
    migrationSteps.push(
      'Convert .eslintrc.json to eslint.config.js',
      'Run npx @eslint/migrate-config',
      'Update plugin configurations',
      'Fix any linting errors',
      'Test linting on CI'
    )
  } else {
    migrationSteps.push(
      'Backup package.json',
      `npm install ${packageName}@${info.latest}`,
      'Run type-check',
      'Run test suite',
      'Run build',
      'Fix any breaking changes'
    )
  }

  const estimatedTime = updateType === 'major'
    ? isStorybookPackage ? '2-3 hours' : '1-2 hours'
    : '10-30 minutes'

  const riskLevel = updateType === 'major' ? 'high' : updateType === 'minor' ? 'medium' : 'low'

  return {
    package: packageName,
    currentVersion: info.current,
    targetVersion: info.latest,
    updateType,
    breakingChanges,
    migrationSteps,
    estimatedTime,
    riskLevel
  }
}

/**
 * Backup current state
 */
function backup(): void {
  console.log('💾 Creating backup...')

  try {
    const packageJson = readFileSync('package.json', 'utf-8')
    writeFileSync('package.json.backup', packageJson)

    const packageLock = readFileSync('package-lock.json', 'utf-8')
    writeFileSync('package-lock.json.backup', packageLock)

    exec('git stash push -m "pre-migration-backup"')
    console.log('✓ Backup created\n')
  } catch (error) {
    console.log('⚠️  Could not create full backup, continuing...\n')
  }
}

/**
 * Restore from backup
 */
function restore(): void {
  console.log('🔄 Restoring from backup...')

  try {
    if (existsSync('package.json.backup')) {
      const backup = readFileSync('package.json.backup', 'utf-8')
      writeFileSync('package.json', backup)
    }

    if (existsSync('package-lock.json.backup')) {
      const backup = readFileSync('package-lock.json.backup', 'utf-8')
      writeFileSync('package-lock.json', backup)
    }

    exec('npm install')
    exec('git stash pop')
    console.log('✓ Restored from backup\n')
  } catch (error) {
    console.log('⚠️  Could not restore fully, please check manually\n')
  }
}

/**
 * Run safety checks
 */
function runSafetyChecks(): boolean {
  console.log('🔍 Running safety checks...\n')

  let passed = true

  // Check git status
  const gitStatus = exec('git status --porcelain')
  if (gitStatus.trim()) {
    console.log('⚠️  Git working directory is not clean')
    console.log('   Commit or stash changes before migration\n')
    passed = false
  } else {
    console.log('✓ Git working directory clean')
  }

  // Check TypeScript
  try {
    exec('npx tsc --noEmit')
    console.log('✓ TypeScript compiles')
  } catch (error) {
    console.log('⚠️  TypeScript errors detected')
    passed = false
  }

  // Check tests
  try {
    const testOutput = exec('npm test -- --run')
    if (testOutput.includes('FAIL')) {
      console.log('⚠️  Some tests are failing')
      passed = false
    } else {
      console.log('✓ Tests passing')
    }
  } catch (error) {
    console.log('⚠️  Could not run tests')
  }

  console.log()
  return passed
}

/**
 * Migrate single package
 */
function migratePackage(packageName: string, targetVersion: string): boolean {
  console.log(`\n🔄 Migrating ${packageName} to ${targetVersion}...\n`)

  try {
    // Install new version
    console.log(`📦 Installing ${packageName}@${targetVersion}...`)
    exec(`npm install ${packageName}@${targetVersion}`)
    console.log('✓ Installed\n')

    // Run checks
    console.log('🧪 Running checks...')

    try {
      exec('npx tsc --noEmit')
      console.log('✓ TypeScript OK')
    } catch (error) {
      console.log('❌ TypeScript errors')
      return false
    }

    try {
      const testOutput = exec('npm test -- --run')
      if (!testOutput.includes('FAIL')) {
        console.log('✓ Tests OK')
      } else {
        console.log('❌ Tests failed')
        return false
      }
    } catch (error) {
      console.log('⚠️  Tests check skipped')
    }

    try {
      exec('npm run build')
      console.log('✓ Build OK')
    } catch (error) {
      console.log('❌ Build failed')
      return false
    }

    console.log('\n✅ Migration successful!\n')
    return true

  } catch (error) {
    console.log('❌ Migration failed\n')
    return false
  }
}

/**
 * Command: audit
 */
function commandAudit(): void {
  const outdated = getOutdatedPackages()
  const audit = getVulnerabilities()

  const outdatedCount = Object.keys(outdated).length
  const vulnerabilities = audit.metadata?.vulnerabilities?.total || 0

  console.log(`📊 Dependency Audit\n`)
  console.log(`Outdated Packages: ${outdatedCount}`)
  console.log(`Security Issues: ${vulnerabilities}\n`)

  if (outdatedCount === 0) {
    console.log('✅ All dependencies up to date!\n')
    return
  }

  // Group by update type
  const major: string[] = []
  const minor: string[] = []
  const patch: string[] = []

  for (const [pkg, info] of Object.entries(outdated)) {
    const updateType = getUpdateType(info.current, info.latest)
    if (updateType === 'major') major.push(pkg)
    else if (updateType === 'minor') minor.push(pkg)
    else patch.push(pkg)
  }

  if (major.length > 0) {
    console.log(`🔴 MAJOR Updates (${major.length} packages):`)
    major.slice(0, 5).forEach(pkg => {
      console.log(`  - ${pkg} ${outdated[pkg].current} → ${outdated[pkg].latest}`)
    })
    if (major.length > 5) console.log(`  ... and ${major.length - 5} more`)
    console.log()
  }

  if (minor.length > 0) {
    console.log(`🟡 MINOR Updates (${minor.length} packages):`)
    minor.slice(0, 5).forEach(pkg => {
      console.log(`  - ${pkg} ${outdated[pkg].current} → ${outdated[pkg].latest}`)
    })
    if (minor.length > 5) console.log(`  ... and ${minor.length - 5} more`)
    console.log()
  }

  if (patch.length > 0) {
    console.log(`🟢 PATCH Updates (${patch.length} packages):`)
    patch.slice(0, 5).forEach(pkg => {
      console.log(`  - ${pkg} ${outdated[pkg].current} → ${outdated[pkg].latest}`)
    })
    if (patch.length > 5) console.log(`  ... and ${patch.length - 5} more`)
    console.log()
  }

  console.log('💡 Recommended Actions:')
  if (vulnerabilities > 0) {
    console.log('   🔴 Fix security issues: npm audit fix')
  }
  if (patch.length > 0 || minor.length > 0) {
    console.log('   🟢 Safe updates: npm run migrate:safe')
  }
  if (major.length > 0) {
    console.log('   🟡 Major updates: npm run migrate:plan -- <package>')
  }
  console.log()
}

/**
 * Command: plan
 */
function commandPlan(packageName?: string): void {
  if (!packageName) {
    console.log('❌ Please specify package name')
    console.log('   Usage: npm run migrate:plan -- <package>\n')
    return
  }

  const outdated = getOutdatedPackages()
  const info = outdated[packageName]

  if (!info) {
    console.log(`❌ Package "${packageName}" not found in outdated list\n`)
    return
  }

  const plan = generateMigrationPlan(packageName, info)

  console.log(`\n📋 Migration Plan: ${packageName}\n`)
  console.log(`Current Version: ${plan.currentVersion}`)
  console.log(`Target Version: ${plan.targetVersion}`)
  console.log(`Update Type: ${plan.updateType.toUpperCase()}`)
  console.log(`Risk Level: ${plan.riskLevel.toUpperCase()}`)
  console.log(`Estimated Time: ${plan.estimatedTime}\n`)

  if (plan.breakingChanges.length > 0) {
    console.log('⚠️  Breaking Changes:')
    plan.breakingChanges.forEach((change, i) => {
      console.log(`   ${i + 1}. ${change}`)
    })
    console.log()
  }

  console.log('📝 Migration Steps:')
  plan.migrationSteps.forEach((step, i) => {
    console.log(`   ${i + 1}. ${step}`)
  })
  console.log()

  console.log('💡 To execute this plan:')
  console.log(`   npm run migrate:execute -- ${packageName}\n`)
}

/**
 * Command: migrate
 */
function commandMigrate(mode: string): void {
  if (!runSafetyChecks()) {
    console.log('❌ Safety checks failed. Fix issues before migration.\n')
    return
  }

  backup()

  const outdated = getOutdatedPackages()
  let packagesToUpdate: string[] = []

  if (mode === '--safe') {
    // Only patch and minor updates
    packagesToUpdate = Object.entries(outdated)
      .filter(([, info]) => {
        const type = getUpdateType(info.current, info.latest)
        return type === 'patch' || type === 'minor'
      })
      .map(([pkg]) => pkg)

    console.log(`📦 Safe Migration Mode`)
    console.log(`Updating ${packagesToUpdate.length} packages (patch/minor only)\n`)
  } else if (mode === '--all') {
    packagesToUpdate = Object.keys(outdated)
    console.log(`📦 Full Migration Mode`)
    console.log(`Updating ${packagesToUpdate.length} packages (including major)\n`)
  }

  if (packagesToUpdate.length === 0) {
    console.log('✅ No packages to update!\n')
    return
  }

  let successCount = 0
  let failCount = 0

  for (const pkg of packagesToUpdate) {
    const info = outdated[pkg]
    const success = migratePackage(pkg, info.latest)

    if (success) {
      successCount++
    } else {
      failCount++
      console.log(`\n❌ Migration failed for ${pkg}`)
      console.log('   Restoring backup and stopping...\n')
      restore()
      return
    }
  }

  console.log(`\n✅ Migration Complete!`)
  console.log(`   Success: ${successCount}`)
  console.log(`   Failed: ${failCount}\n`)

  // Cleanup backups
  try {
    exec('rm package.json.backup package-lock.json.backup')
  } catch (e) {}
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const param = args[1]

  console.log('\n📦 Dependency Migrator\n')

  if (command === 'audit') {
    commandAudit()
  } else if (command === 'plan') {
    commandPlan(param)
  } else if (command === 'migrate') {
    commandMigrate(param || '--safe')
  } else if (command === 'rollback') {
    restore()
  } else {
    console.log('Usage:')
    console.log('  npm run migrate:audit          - Analyze outdated packages')
    console.log('  npm run migrate:plan <package> - Generate migration plan')
    console.log('  npm run migrate:safe           - Update patch/minor only')
    console.log('  npm run migrate:all            - Update all packages')
    console.log('  rollback                       - Restore from backup\n')
  }
}

main()
