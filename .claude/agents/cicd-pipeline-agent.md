# CI/CD Pipeline Agent

**Priority:** 🔴 CRITICAL
**Status:** ✅ Operational
**Category:** DevOps & Automation

## Purpose

Automated continuous integration and deployment pipeline for Component Vault library. Manages GitHub Actions workflows, automated testing, Storybook deployment, NPM publishing, and PR validation.

## Problem Solved

- **Manual Deployments**: Time-consuming manual NPM publish process
- **No PR Validation**: PRs merged without automated quality checks
- **Storybook Hosting**: Manual Storybook deployment to GitHub Pages
- **Inconsistent Tests**: Tests not run consistently before merges
- **Release Coordination**: Complex multi-step release process
- **Environment Setup**: Developers need to configure CI manually
- **Preview Environments**: No way to preview changes before merge

## Prerequisites

- Git repository
- GitHub account (for GitHub Actions)
- NPM account (for publishing)
- GitHub Pages enabled (for Storybook hosting)
- Repository secrets configured:
  - `NPM_TOKEN` - NPM authentication token
  - `CHROMATIC_PROJECT_TOKEN` - Chromatic token for visual testing
  - `GITHUB_TOKEN` - Automatically provided by GitHub

## Commands

### Initialize CI/CD Pipeline
```bash
npm run cicd:init
```
**What it creates:**
- `.github/workflows/ci.yml` - CI pipeline
- `.github/workflows/release.yml` - Release pipeline
- `.github/workflows/storybook.yml` - Storybook deployment
- `.github/workflows/pr-checks.yml` - PR validation
- Repository configuration recommendations

### Validate Pipeline Configuration
```bash
npm run cicd:validate
```
**What it checks:**
- GitHub Actions workflow syntax
- Required secrets present
- Dependencies up to date
- Branch protection rules
- Workflow permissions

### Test Pipeline Locally
```bash
npm run cicd:test
```
**What it runs:**
- Simulates CI environment
- Runs all quality checks
- Validates build process
- Tests deployment steps

### Deploy Storybook to GitHub Pages
```bash
npm run cicd:deploy-storybook
```
**What it does:**
- Builds Storybook
- Publishes to GitHub Pages
- Updates deployment URL
- Verifies deployment

### Generate Status Report
```bash
npm run cicd:status
```
**Output:** Pipeline health report with:
- Recent workflow runs
- Success/failure rates
- Build times
- Deployment status
- Recommendations

## CI/CD Workflows

### 1. Pull Request Checks (`pr-checks.yml`)
**Triggers:** On every PR to main/master
**Steps:**
1. Checkout code
2. Setup Node.js 18
3. Install dependencies
4. Run linting (ESLint)
5. Type checking (TypeScript)
6. Run tests with coverage
7. Component validation
8. Dependency checks
9. Security audit
10. Build library
11. Comment PR with results

**Exit Conditions:**
- ❌ Fails if linting errors found
- ❌ Fails if TypeScript errors found
- ❌ Fails if test coverage < 60%
- ❌ Fails if critical/high security vulnerabilities
- ❌ Fails if build fails

### 2. Continuous Integration (`ci.yml`)
**Triggers:** On push to main/master, PRs
**Steps:**
1. Test on multiple OS (Ubuntu, Windows, macOS)
2. Test on multiple Node versions (18, 20, 22)
3. Run full test suite
4. Generate coverage report
5. Upload coverage to Codecov
6. Run visual regression tests (Chromatic)
7. Accessibility audit
8. Performance benchmarks
9. Build for production

**Matrix Strategy:**
```yaml
matrix:
  os: [ubuntu-latest, windows-latest, macos-latest]
  node-version: [18.x, 20.x, 22.x]
```

### 3. Release Pipeline (`release.yml`)
**Triggers:** Manual workflow dispatch or semantic version tags
**Steps:**
1. Validate version bump
2. Run full test suite
3. Security audit (must pass)
4. Build library
5. Generate changelog
6. Create GitHub release
7. Publish to NPM
8. Deploy Storybook
9. Create git tag
10. Notify on success/failure

**Approval Required:** Manual approval before NPM publish

### 4. Storybook Deployment (`storybook.yml`)
**Triggers:** Push to main, manual dispatch
**Steps:**
1. Build Storybook
2. Optimize assets
3. Deploy to GitHub Pages
4. Update CNAME (if custom domain)
5. Verify deployment
6. Comment with URL

**Output URL:** `https://<username>.github.io/<repo-name>/`

## Integration with Other Agents

### Depends On:
- **Code Quality Agent** - Must pass before CI
- **Test Generator** - Tests must exist for coverage
- **Security Scanner** - Blocks release on critical vulnerabilities
- **A11y Auditor** - Accessibility checks in CI
- **Visual Regression** - Visual tests in CI

### Blocks:
- **Release Manager** - Only releases if CI passes
- **NPM Publish** - Blocks if tests/security fail

## Workflow Files Generated

### `.github/workflows/pr-checks.yml`
```yaml
name: PR Checks

on:
  pull_request:
    branches: [main, master]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - run: npm run validate-components
      - run: npm run security:audit
      - run: npm run build
```

### `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18.x, 20.x]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### `.github/workflows/release.yml`
```yaml
name: Release

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version bump type'
        required: true
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run security:audit
      - run: npm test
      - run: npm run build
      - run: npm version ${{ github.event.inputs.version }}
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      - run: git push --follow-tags
```

### `.github/workflows/storybook.yml`
```yaml
name: Deploy Storybook

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## Branch Protection Rules

Recommended settings for `main` branch:

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "PR Checks",
      "CI / test (ubuntu-latest, 18.x)",
      "CI / test (ubuntu-latest, 20.x)"
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

## GitHub Repository Secrets

Required secrets (Settings → Secrets → Actions):

### NPM_TOKEN
```bash
# Generate NPM token
npm login
npm token create --read-only=false

# Add to GitHub Secrets as NPM_TOKEN
```

### CHROMATIC_PROJECT_TOKEN
```bash
# Get from Chromatic dashboard
# https://www.chromatic.com/

# Add to GitHub Secrets as CHROMATIC_PROJECT_TOKEN
```

### Optional: CODECOV_TOKEN
```bash
# Get from Codecov.io
# https://codecov.io/

# Add to GitHub Secrets as CODECOV_TOKEN
```

## Metrics Tracked

- **Build Success Rate**: % of successful builds
- **Build Duration**: Average time per build
- **Test Pass Rate**: % of tests passing
- **Coverage Trend**: Test coverage over time
- **Deployment Frequency**: Releases per week/month
- **Time to Deploy**: Average time from commit to production
- **Failed Builds**: Count and reasons
- **Pipeline Efficiency**: Total CI time vs changes

## Expected Outcomes

### Before Agent
```
Deployments: Manual, error-prone
PR Checks: Manual review only
Storybook: Deployed manually
Testing: Inconsistent
Status: ⚠️  High risk of bugs in production
```

### After Agent
```
Deployments: Automated, reliable
PR Checks: Automated, blocking
Storybook: Auto-deployed on merge
Testing: Every commit tested
Status: ✅ Confident deployments
```

## Pipeline Stages

### Stage 1: Quality Gates (Fast - 2-3 minutes)
- ✅ Linting (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Component validation
- ✅ Dependency checks

### Stage 2: Testing (Medium - 3-5 minutes)
- 🧪 Unit tests (Vitest)
- 🧪 Component tests (React Testing Library)
- 🧪 Accessibility tests (jest-axe)
- 📊 Coverage report (minimum 60%)

### Stage 3: Security & Performance (Medium - 2-4 minutes)
- 🔒 Vulnerability scan (npm audit)
- 🔐 Secrets detection
- 📜 License compliance
- ⚡ Bundle size analysis

### Stage 4: Integration (Slow - 5-10 minutes)
- 🎭 Visual regression (Chromatic)
- 🌐 E2E tests (Playwright)
- 📸 Visual snapshots
- 🏗️ Production build

### Stage 5: Deployment (Fast - 2-3 minutes)
- 📦 Build library
- 📚 Build Storybook
- 🚀 Publish to NPM
- 🌐 Deploy to GitHub Pages

**Total Pipeline Time:** ~15-25 minutes

## Caching Strategy

Optimize CI speed with caching:

```yaml
- uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      node_modules
      .next/cache
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

**Speed Improvement:** 40-60% faster builds

## Failure Notifications

Configure notifications for:

### Slack Integration
```yaml
- name: Notify Slack on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notifications
GitHub automatically emails on workflow failures

### GitHub Status Checks
Visible in PR interface automatically

## Rollback Strategy

If deployment fails:

1. **Automated Rollback**: Previous version remains on NPM
2. **Storybook**: GitHub Pages keeps previous version
3. **Git Tags**: Can revert to previous tag
4. **Manual Recovery**:
   ```bash
   npm unpublish @deve1993/ui-library@<bad-version>
   npm publish # publishes last good version
   ```

## Environment Variables

### CI Environment Detection
```typescript
const isCI = process.env.CI === 'true';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

if (isCI) {
  // Skip interactive prompts
  // Use non-TTY output
  // Fail fast on errors
}
```

### Available Variables
- `GITHUB_ACTOR` - User who triggered workflow
- `GITHUB_REF` - Branch or tag ref
- `GITHUB_SHA` - Commit SHA
- `GITHUB_REPOSITORY` - Owner/repo name
- `GITHUB_RUN_ID` - Unique workflow run ID

## Preview Environments

For PRs, create preview deployments:

```yaml
- name: Deploy PR Preview
  if: github.event_name == 'pull_request'
  run: |
    npm run build-storybook
    npx surge ./storybook-static pr-${{ github.event.number }}.surge.sh
```

**Preview URLs:** `pr-123.surge.sh` for PR #123

## Cost Optimization

### GitHub Actions Free Tier
- **Public repos**: Unlimited minutes ✅
- **Private repos**: 2,000 minutes/month

### Optimization Tips
1. **Cache dependencies**: Save 2-3 minutes per build
2. **Parallel jobs**: Run tests concurrently
3. **Conditional workflows**: Skip unnecessary runs
4. **Artifact cleanup**: Delete old artifacts automatically

```yaml
- uses: actions/upload-artifact@v3
  with:
    retention-days: 7 # Auto-delete after 1 week
```

## Debugging Failed Builds

### View Logs
```bash
# Using GitHub CLI
gh run list
gh run view <run-id>
gh run view <run-id> --log
```

### Re-run Failed Jobs
```bash
gh run rerun <run-id>
gh run rerun <run-id> --failed # Only failed jobs
```

### Debug Locally
```bash
# Simulate CI environment
npm run cicd:test

# Or use act (GitHub Actions locally)
brew install act
act pull_request
```

## Security Best Practices

1. **Never commit secrets** - Use GitHub Secrets only
2. **Least privilege** - Limit workflow permissions
3. **Pin action versions** - Use `@v4` not `@latest`
4. **Audit dependencies** - Run security scan before deploy
5. **Sign commits** - Require GPG signatures (optional)
6. **CODEOWNERS file** - Require specific reviewers

```yaml
# Limit permissions
permissions:
  contents: read
  pull-requests: write
  packages: write
```

## Performance Benchmarks

Track CI performance over time:

```typescript
// In CI script
console.log('::set-output name=build-time::', Date.now() - startTime);
```

**GitHub Action Output:**
- Build time: 3m 24s
- Test time: 2m 15s
- Total time: 8m 42s

## Status Badges

Add to README:

```markdown
![CI](https://github.com/deve1993/UI-LIBRARY/workflows/CI/badge.svg)
![Coverage](https://codecov.io/gh/deve1993/UI-LIBRARY/branch/main/graph/badge.svg)
![NPM Version](https://img.shields.io/npm/v/@deve1993/ui-library)
```

## Troubleshooting

### Workflow Not Triggering
- Check `.github/workflows/` directory exists
- Verify YAML syntax
- Check branch name matches trigger

### Tests Pass Locally, Fail in CI
- Different Node version
- Missing environment variables
- File path case sensitivity (Windows vs Linux)
- Missing dependencies in `package.json`

### Deployment Fails
- Check NPM_TOKEN is valid
- Verify package.json version is unique
- Check NPM registry connection
- Review build output for errors

### Slow Builds
- Add caching (see Caching Strategy)
- Parallelize jobs
- Use smaller action runners
- Skip unnecessary steps with conditionals

## Agent Status

✅ **Operational** - Ready for CI/CD automation
🔴 **Critical** - Required for production-ready workflow
⚡ **Fast** - Average pipeline time 15-20 minutes
🔄 **Automated** - Zero-touch deployments after setup

---

**Created**: 2025-10-31
**Last Updated**: 2025-10-31
**Maintained By**: Claude AI Agent System
**Integration**: GitHub Actions, NPM Registry, GitHub Pages
