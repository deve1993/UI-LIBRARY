#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { createInterface } from 'readline'

type VersionBump = 'patch' | 'minor' | 'major'

interface PackageJson {
  name: string
  version: string
  [key: string]: any
}

interface ChangelogEntry {
  type: 'added' | 'changed' | 'fixed' | 'removed' | 'breaking'
  message: string
  scope?: string
}

/**
 * Execute command and return output
 */
function exec(command: string, silent = false): string {
  try {
    return execSync(command, {
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit'
    })
  } catch (error: any) {
    if (!silent) throw error
    return error.stdout || ''
  }
}

/**
 * Ask user for confirmation
 */
function askConfirmation(question: string): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(question + ' (y/n): ', answer => {
      rl.close()
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')
    })
  })
}

/**
 * Get current package.json
 */
function getPackageJson(): PackageJson {
  return JSON.parse(readFileSync('package.json', 'utf-8'))
}

/**
 * Update package.json version
 */
function updatePackageVersion(newVersion: string): void {
  const pkg = getPackageJson()
  pkg.version = newVersion
  writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
}

/**
 * Calculate new version
 */
function calculateNewVersion(current: string, bump: VersionBump): string {
  const [major, minor, patch] = current.split('.').map(Number)

  switch (bump) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
  }
}

/**
 * Get git commits since last tag
 */
function getCommitsSinceLastTag(): string[] {
  try {
    const lastTag = exec('git describe --tags --abbrev=0', true).trim()
    const commits = exec(`git log ${lastTag}..HEAD --oneline`, true)
      .trim()
      .split('\n')
      .filter(Boolean)
    return commits
  } catch (error) {
    // No tags yet, get all commits
    const commits = exec('git log --oneline', true)
      .trim()
      .split('\n')
      .filter(Boolean)
    return commits
  }
}

/**
 * Parse conventional commit message
 */
function parseCommit(commit: string): ChangelogEntry | null {
  // Format: "hash type(scope): message" or "hash type: message"
  const match = commit.match(/^\w+\s+(\w+)(?:\(([^)]+)\))?:\s*(.+)$/)

  if (!match) return null

  const [, rawType, scope, message] = match
  const type = rawType.toLowerCase()

  if (type === 'feat') {
    return { type: 'added', message, scope }
  } else if (type === 'fix') {
    return { type: 'fixed', message, scope }
  } else if (type === 'refactor' || type === 'perf') {
    return { type: 'changed', message, scope }
  } else if (type === 'breaking' || message.includes('BREAKING CHANGE')) {
    return { type: 'breaking', message, scope }
  }

  return null
}

/**
 * Generate changelog
 */
function generateChangelog(newVersion: string): string {
  const commits = getCommitsSinceLastTag()
  const entries = commits.map(parseCommit).filter(Boolean) as ChangelogEntry[]

  const today = new Date().toISOString().split('T')[0]

  let changelog = `## [${newVersion}] - ${today}\n\n`

  // Group by type
  const added = entries.filter(e => e.type === 'added')
  const changed = entries.filter(e => e.type === 'changed')
  const fixed = entries.filter(e => e.type === 'fixed')
  const breaking = entries.filter(e => e.type === 'breaking')
  const removed = entries.filter(e => e.type === 'removed')

  if (breaking.length > 0) {
    changelog += '### ⚠️  BREAKING CHANGES\n\n'
    breaking.forEach(e => {
      const scope = e.scope ? `**${e.scope}**: ` : ''
      changelog += `- ${scope}${e.message}\n`
    })
    changelog += '\n'
  }

  if (added.length > 0) {
    changelog += '### Added\n\n'
    added.forEach(e => {
      const scope = e.scope ? `**${e.scope}**: ` : ''
      changelog += `- ${scope}${e.message}\n`
    })
    changelog += '\n'
  }

  if (changed.length > 0) {
    changelog += '### Changed\n\n'
    changed.forEach(e => {
      const scope = e.scope ? `**${e.scope}**: ` : ''
      changelog += `- ${scope}${e.message}\n`
    })
    changelog += '\n'
  }

  if (fixed.length > 0) {
    changelog += '### Fixed\n\n'
    fixed.forEach(e => {
      const scope = e.scope ? `**${e.scope}**: ` : ''
      changelog += `- ${scope}${e.message}\n`
    })
    changelog += '\n'
  }

  if (removed.length > 0) {
    changelog += '### Removed\n\n'
    removed.forEach(e => {
      const scope = e.scope ? `**${e.scope}**: ` : ''
      changelog += `- ${scope}${e.message}\n`
    })
    changelog += '\n'
  }

  return changelog
}

/**
 * Update CHANGELOG.md file
 */
function updateChangelogFile(newContent: string): void {
  let changelog = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n'

  try {
    const existing = readFileSync('CHANGELOG.md', 'utf-8')
    // Insert new content after the header
    const lines = existing.split('\n')
    const headerEnd = lines.findIndex(l => l.startsWith('##'))
    if (headerEnd !== -1) {
      lines.splice(headerEnd, 0, newContent)
      changelog = lines.join('\n')
    } else {
      changelog = existing + '\n' + newContent
    }
  } catch (error) {
    // File doesn't exist, create new
    changelog += newContent
  }

  writeFileSync('CHANGELOG.md', changelog)
}

/**
 * Run pre-release checks
 */
function runPreReleaseChecks(): boolean {
  console.log('🔍 Running pre-release checks...\n')

  let passed = true

  // Check git status
  console.log('1. Checking git status...')
  const gitStatus = exec('git status --porcelain', true)
  if (gitStatus.trim()) {
    console.log('   ❌ Git working directory is not clean')
    console.log('   Please commit or stash changes first\n')
    return false
  }
  console.log('   ✅ Git working directory clean\n')

  // Check on main branch
  console.log('2. Checking git branch...')
  const branch = exec('git branch --show-current', true).trim()
  if (branch !== 'main' && branch !== 'master') {
    console.log(`   ⚠️  Not on main/master branch (current: ${branch})`)
    console.log('   Releases should be done from main/master\n')
  } else {
    console.log(`   ✅ On ${branch} branch\n`)
  }

  // TypeScript check
  console.log('3. Running TypeScript check...')
  try {
    exec('npx tsc --noEmit', true)
    console.log('   ✅ TypeScript compiles\n')
  } catch (error) {
    console.log('   ❌ TypeScript errors detected\n')
    passed = false
  }

  // Run tests
  console.log('4. Running tests...')
  try {
    exec('npm test -- --run --reporter=verbose', true)
    console.log('   ✅ Tests passing\n')
  } catch (error) {
    console.log('   ⚠️  Some tests failing\n')
  }

  // Build
  console.log('5. Building package...')
  try {
    exec('npm run build', true)
    console.log('   ✅ Build successful\n')
  } catch (error) {
    console.log('   ❌ Build failed\n')
    passed = false
  }

  // Lint
  console.log('6. Running linter...')
  try {
    exec('npm run lint', true)
    console.log('   ✅ Linting passed\n')
  } catch (error) {
    console.log('   ⚠️  Linting issues detected\n')
  }

  return passed
}

/**
 * Command: prepare
 */
async function commandPrepare(bump: VersionBump): Promise<void> {
  console.log(`\n🚀 Preparing ${bump.toUpperCase()} release\n`)
  console.log('='.repeat(50) + '\n')

  const pkg = getPackageJson()
  const currentVersion = pkg.version
  const newVersion = calculateNewVersion(currentVersion, bump)

  console.log(`Current version: ${currentVersion}`)
  console.log(`New version: ${newVersion}\n`)

  // Run checks
  if (!runPreReleaseChecks()) {
    console.log('❌ Pre-release checks failed\n')
    console.log('Please fix the issues and try again\n')
    return
  }

  // Generate changelog preview
  const changelogContent = generateChangelog(newVersion)

  console.log('='.repeat(50))
  console.log('\n📝 Changelog Preview:\n')
  console.log(changelogContent)
  console.log('='.repeat(50) + '\n')

  // Show what will be published
  console.log('📦 Package Info:\n')
  console.log(`Name: ${pkg.name}`)
  console.log(`Version: ${newVersion}`)
  console.log(`Description: ${pkg.description}`)
  console.log(`License: ${pkg.license}\n`)

  // Ask for confirmation
  const confirmed = await askConfirmation('Proceed with release?')

  if (!confirmed) {
    console.log('\n❌ Release cancelled\n')
    return
  }

  console.log('\n✅ Release preparation complete!')
  console.log('\n📝 Next Steps:')
  console.log('   1. Review the changelog above')
  console.log('   2. Run: npm run release:publish')
  console.log('   3. Or manually:')
  console.log(`      - Update version: npm version ${newVersion} --no-git-tag-version`)
  console.log('      - Update CHANGELOG.md')
  console.log(`      - Commit: git commit -am "chore: release v${newVersion}"`)
  console.log(`      - Tag: git tag v${newVersion}`)
  console.log('      - Push: git push && git push --tags')
  console.log('      - Publish: npm publish\n')

  // Store info for publish command
  writeFileSync('.release-info.json', JSON.stringify({
    version: newVersion,
    changelog: changelogContent,
    bump
  }, null, 2))
}

/**
 * Command: preview
 */
function commandPreview(): void {
  const pkg = getPackageJson()
  const newVersion = calculateNewVersion(pkg.version, 'patch')
  const changelogContent = generateChangelog(newVersion)

  console.log('\n📝 Changelog Preview (for next patch release):\n')
  console.log(changelogContent)
}

/**
 * Command: publish
 */
async function commandPublish(): Promise<void> {
  console.log('\n📦 Publishing to NPM\n')

  // Read release info
  let releaseInfo
  try {
    releaseInfo = JSON.parse(readFileSync('.release-info.json', 'utf-8'))
  } catch (error) {
    console.log('❌ No release info found')
    console.log('   Run: npm run release:prepare first\n')
    return
  }

  const { version, changelog } = releaseInfo

  console.log(`Publishing version ${version}...\n`)

  // Update version
  console.log('1. Updating version...')
  updatePackageVersion(version)
  console.log(`   ✅ Version updated to ${version}\n`)

  // Update changelog
  console.log('2. Updating CHANGELOG.md...')
  updateChangelogFile(changelog)
  console.log('   ✅ CHANGELOG.md updated\n')

  // Git commit
  console.log('3. Creating git commit...')
  exec('git add package.json CHANGELOG.md')
  exec(`git commit -m "chore: release v${version}

${changelog}"`)
  console.log('   ✅ Commit created\n')

  // Git tag
  console.log('4. Creating git tag...')
  exec(`git tag v${version}`)
  console.log(`   ✅ Tag v${version} created\n`)

  // Push
  console.log('5. Pushing to remote...')
  exec('git push')
  exec('git push --tags')
  console.log('   ✅ Pushed to remote\n')

  // Publish to NPM
  console.log('6. Publishing to NPM...')
  const confirmed = await askConfirmation('Ready to publish to NPM?')

  if (!confirmed) {
    console.log('\n❌ NPM publish cancelled')
    console.log('   Code is committed and tagged')
    console.log('   To publish later, run: npm publish\n')
    return
  }

  try {
    exec('npm publish --access public')
    console.log('   ✅ Published to NPM\n')
  } catch (error) {
    console.log('   ❌ NPM publish failed\n')
    console.log('   You can try publishing manually: npm publish --access public\n')
    return
  }

  // Cleanup
  exec('rm .release-info.json')

  console.log('='.repeat(50))
  console.log('\n🎉 Release Complete!\n')
  console.log(`✅ Version ${version} published successfully\n`)
  console.log('📝 Next Steps:')
  console.log(`   - View on NPM: https://npmjs.com/package/${getPackageJson().name}`)
  console.log(`   - Create GitHub release: https://github.com/deve1993/UI-LIBRARY/releases/new`)
  console.log(`   - Announce the release to your team\n`)
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const bump = args[1] as VersionBump

  console.log('\n🚀 Release Manager\n')

  if (command === 'prepare') {
    if (!bump || !['patch', 'minor', 'major'].includes(bump)) {
      console.log('Usage: npm run release:prepare -- <patch|minor|major>')
      console.log('\nVersion Bump Types:')
      console.log('  patch - Bug fixes (1.0.0 → 1.0.1)')
      console.log('  minor - New features (1.0.0 → 1.1.0)')
      console.log('  major - Breaking changes (1.0.0 → 2.0.0)\n')
      return
    }
    await commandPrepare(bump)
  } else if (command === 'preview') {
    commandPreview()
  } else if (command === 'publish') {
    await commandPublish()
  } else {
    console.log('Usage:')
    console.log('  npm run release:prepare -- <patch|minor|major> - Prepare release')
    console.log('  npm run release:preview                        - Preview changelog')
    console.log('  npm run release:publish                        - Publish to NPM\n')
  }
}

main().catch(console.error)
