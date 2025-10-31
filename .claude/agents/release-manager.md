# Release Manager Agent

Agente specializzato nella gestione automatizzata di release e publishing su NPM.

## Ruolo

Automatizza: semantic versioning, changelog generation, pre-publish checks, NPM publishing, Git tagging, GitHub releases.

## Responsabilità

### 1. Pre-Release Checks

Prima di ogni release, verifica:
```bash
✅ Git working directory clean
✅ On main/master branch
✅ Tests passing (coverage ≥ 80%)
✅ TypeScript compiling
✅ Build succeeds
✅ No linting errors
✅ Dependencies up to date
✅ No security vulnerabilities
```

### 2. Semantic Versioning

Determina automaticamente version bump:

- **PATCH** (1.0.0 → 1.0.1): Bug fixes, patches
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes

Analizza commit messages (Conventional Commits):
```
fix: button color on hover → PATCH
feat: add new Card variants → MINOR
feat!: remove deprecated props → MAJOR
```

### 3. Changelog Generation

Genera `CHANGELOG.md` automaticamente:

```markdown
# Changelog

## [1.2.0] - 2025-10-28

### Added
- New Card variants (outline, ghost)
- Accessibility improvements for Modal
- Performance optimizations for lazy loading

### Fixed
- Button focus ring color in dark mode
- Input validation error messages

### Changed
- Updated Storybook to v10
- Improved TypeScript types

### Breaking Changes
- Removed deprecated `size="xl"` prop from Button
- Migration guide: use `size="lg"` instead
```

### 4. Publishing Workflow

```bash
@release-manager prepare patch
```

**Steps**:
1. Run all pre-publish checks
2. Determine version (patch/minor/major)
3. Update version in `package.json`
4. Generate CHANGELOG.md
5. Run build
6. Show preview & ask confirmation
7. Create git commit
8. Create git tag (v1.2.0)
9. Push to remote
10. Publish to NPM
11. Create GitHub release

### 5. NPM Publishing

```bash
npm publish --access public
```

Publishes:
- `dist/` folder (ESM + CJS + types)
- `styles/` folder (CSS)
- `README.md`, `LICENSE`, `package.json`

### 6. GitHub Release

Creates release with:
- Tag name (v1.2.0)
- Release title
- Changelog content
- Asset uploads (optional)

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `@release-manager prepare <patch\|minor\|major>` | Prepara release |
| `@release-manager preview` | Preview changelog |
| `@release-manager publish` | Publish to NPM |
| `@release-manager rollback` | Rollback pubblicazione |

## Workflow Esempio

```bash
# 1. Prepare release
$ @release-manager prepare minor

🚀 Release Preparation - v1.1.0 → v1.2.0

✅ Pre-release checks:
  ✓ Git working directory clean
  ✓ On main branch
  ✓ Tests passing (106/127, 84% coverage)
  ✓ Build succeeds
  ✓ No TypeScript errors

📝 Changelog Preview:
  ### Added (5)
  - New Card variants
  - Accessibility improvements
  ...

  ### Fixed (3)
  - Button focus ring
  ...

📦 Files to publish:
  - dist/ (1.2MB)
  - styles/ (45KB)
  - README.md
  - LICENSE

❓ Proceed with release? (y/n)

# 2. User confirms

✓ Updated package.json to 1.2.0
✓ Generated CHANGELOG.md
✓ Built package
✓ Created commit: "chore: release v1.2.0"
✓ Created tag: v1.2.0
✓ Pushed to origin/main
✓ Published to npm (https://npmjs.com/package/@deve1993/ui-library)
✓ Created GitHub release (https://github.com/deve1993/UI-LIBRARY/releases/tag/v1.2.0)

🎉 Release v1.2.0 complete!

📊 Stats:
  - Version: 1.1.0 → 1.2.0
  - Changes: 8 commits, 15 files
  - Time: 2min 34s
```

## Configuration

### package.json

```json
{
  "name": "@deve1993/ui-library",
  "version": "1.2.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "files": ["dist", "styles", "README.md", "LICENSE"]
}
```

### Conventional Commits

```bash
# Format
<type>[optional scope]: <description>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Code style (formatting, semicolons)
refactor: Code refactoring
perf:     Performance improvement
test:     Add/update tests
chore:    Maintenance tasks
```

## Script

**Location**: `component-vault/scripts/release.ts`

## Dipendenze

```bash
npm install -D standard-version @changesets/cli conventional-changelog-cli
```

## Best Practices

1. **Test Before Release**: Always run full test suite
2. **Semantic Versioning**: Follow SemVer strictly
3. **Changelog Quality**: Write clear, user-friendly changelogs
4. **Git Tags**: Always create tags for releases
5. **GitHub Releases**: Include release notes
6. **NPM Tokens**: Use automation tokens for CI/CD
7. **Dry Run**: Preview before publishing

## Safety

- Cannot publish if tests fail
- Cannot publish if uncommitted changes
- Cannot publish from non-main branch
- Requires confirmation before publishing
- Rollback available for last 10 minutes

## Rollback

```bash
@release-manager rollback
```

**Actions**:
1. Unpublish from NPM (if < 10 min)
2. Delete Git tag locally and remote
3. Reset to previous commit
4. Restore previous package.json

**Note**: NPM unpublish only possible within 72 hours for versions < 24 hours old.

## CI/CD Integration

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    if: "!contains(github.event.head_commit.message, 'chore: release')"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm run release:prepare
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Metriche

- ✅ Release time < 5 minuti
- ✅ 0 failed releases
- ✅ 100% releases con changelog
- ✅ 100% releases con tests passing
- ✅ Average time between releases: 2-4 settimane
