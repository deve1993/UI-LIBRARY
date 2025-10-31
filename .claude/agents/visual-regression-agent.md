# Visual Regression Agent

**Priority:** 🔴 HIGH
**Status:** ✅ Operational
**Category:** Testing & Quality Assurance

## Purpose

Automated visual regression testing using Chromatic to catch UI bugs, CSS regressions, and styling inconsistencies before they reach production.

## Problem Solved

- **Visual Bugs Undetected**: CSS changes can break layouts without failing unit tests
- **Manual Screenshot Comparison**: Time-consuming and error-prone
- **Storybook Stories Unused**: 53 existing stories not leveraged for visual testing
- **No Visual History**: No baseline to compare against for UI changes
- **Cross-Browser Issues**: Layout differences across browsers not caught

## Prerequisites

- Chromatic account and project token (free for open source)
- Storybook configured (✅ Already have 53 stories)
- Git repository (for baseline tracking)

## Setup

### 1. Get Chromatic Project Token

```bash
# Sign up at https://www.chromatic.com (free for open source)
# Create new project
# Copy project token
```

### 2. Set Environment Variable

```bash
# Windows
set CHROMATIC_PROJECT_TOKEN=your-token-here

# Linux/Mac
export CHROMATIC_PROJECT_TOKEN=your-token-here

# Or add to .env file (recommended)
echo "CHROMATIC_PROJECT_TOKEN=your-token-here" >> .env
```

### 3. Run Baseline Capture

```bash
npm run visual:baseline
```

## Commands

### Capture Baseline
```bash
npm run visual:baseline
```
**What it does:**
- Builds Storybook
- Captures screenshots of all 53 stories
- Uploads to Chromatic as baseline
- Creates visual snapshot history

### Run Visual Tests
```bash
npm run visual:test
```
**What it does:**
- Builds Storybook
- Captures new screenshots
- Compares with baseline
- Reports visual changes
- Generates diff reports

### Accept Changes
```bash
npm run visual:approve
```
**What it does:**
- Reviews pending changes in Chromatic UI
- Accepts approved changes
- Updates baseline

### Test Specific Component
```bash
npm run visual:test -- --only-story-names="Button/*"
```

### CI Mode (No Interactive)
```bash
npm run visual:ci
```
**What it does:**
- Runs in CI mode (auto-exit)
- Fails build on visual changes
- Generates report for PR

## Integration with Other Agents

### Works With:
- **Component Documenter** - Uses Storybook stories as test cases
- **CI/CD Pipeline Agent** - Runs visual tests in PR checks
- **Test Generator** - Complements unit tests with visual validation
- **A11y Auditor** - Visual regression + accessibility = comprehensive QA

### Blocks:
- **Release Manager** - Blocks releases if visual regressions detected

## Configuration

### chromatic.config.json
```json
{
  "projectToken": "CHROMATIC_PROJECT_TOKEN",
  "buildScriptName": "build-storybook",
  "exitZeroOnChanges": false,
  "exitOnceUploaded": false,
  "autoAcceptChanges": false,
  "onlyChanged": true,
  "traceChanged": "expanded",
  "externals": ["**/*.md", "**/*.json"],
  "ignoreLastBuildOnBranch": "master"
}
```

### Key Settings:
- `exitZeroOnChanges: false` - Fail build on visual changes
- `autoAcceptChanges: false` - Manual approval required (safety)
- `onlyChanged: true` - Only test changed stories (faster)
- `traceChanged: expanded` - Show full change history

## Workflow

### Daily Development
```bash
# 1. Make UI changes to component
# 2. Update Storybook story if needed
npm run storybook

# 3. Run visual tests locally (optional)
npm run visual:test

# 4. Push to PR
git push origin feature-branch

# 5. CI runs visual tests automatically
# 6. Review changes in Chromatic UI
# 7. Approve or reject changes
```

### PR Review Process
1. **CI runs** `visual:ci` automatically
2. **Chromatic reports** visual changes as PR comment
3. **Reviewer checks** diff screenshots in Chromatic UI
4. **Approve/Reject** visual changes
5. **Baseline updates** on merge to main

## Metrics Tracked

- **Stories Tested**: Number of Storybook stories captured
- **Visual Changes**: Count of UI changes detected
- **Browsers Tested**: Chrome, Firefox, Safari, Edge
- **Viewport Sizes**: Desktop, Tablet, Mobile
- **Baseline Age**: Time since last baseline update
- **Change Detection Rate**: % of PRs with visual changes

## Expected Outcomes

### Before Agent
```
Visual Testing: Manual screenshot comparison
Coverage: ~10% of UI components
Time: 2-3 hours per release
Bugs Caught: Low (visual bugs slip through)
```

### After Agent
```
Visual Testing: Automated via Chromatic
Coverage: 100% (all 53 stories tested)
Time: < 5 minutes per PR
Bugs Caught: High (catches all visual regressions)
```

## Chromatic Features Used

### 1. Visual Snapshot Testing
- Pixel-perfect screenshot comparison
- Detects layout shifts, color changes, font changes
- Cross-browser rendering differences

### 2. Responsive Testing
- Tests multiple viewport sizes
- Mobile, tablet, desktop layouts
- Orientation changes

### 3. Component Library Mode
- Organizes by component
- Shows component variants
- Tracks component evolution

### 4. CI/CD Integration
- GitHub Actions integration
- PR comments with visual changes
- Build status checks

### 5. Collaboration
- Review UI for team approvals
- Comment on specific changes
- Change history tracking

## Example Output

```bash
$ npm run visual:test

📸 Visual Regression Testing

Building Storybook...
✅ Storybook built successfully

Uploading to Chromatic...
✅ 53 stories captured

Comparing with baseline...
🔍 Analyzing visual changes...

Results:
  ✅ Passed: 50 stories
  🔴 Changed: 3 stories
     - Button/Primary (2px padding change)
     - Card/Elevated (shadow color shift)
     - Modal/Large (border radius updated)

📊 Report: https://chromatic.com/build?appId=xxx&number=123

⚠️  Visual changes detected
💡 Review changes: https://chromatic.com/build?appId=xxx&number=123
```

## Troubleshooting

### Chromatic Build Failed
```bash
# Check token
echo $CHROMATIC_PROJECT_TOKEN

# Re-run with verbose logging
npm run visual:test -- --debug
```

### False Positives (Flaky Tests)
```bash
# Ignore specific elements
# Add to .storybook/preview.js:
export const parameters = {
  chromatic: {
    // Ignore specific elements
    ignoreSelectors: ['.timestamp', '.random-id'],
    // Delay before capture
    delay: 300,
    // Disable animations
    disableSnapshot: false
  }
};
```

### Too Many Changes Detected
- **Gradual Adoption**: Start with critical components only
- **Use `onlyChanged: true`**: Test only changed stories
- **Batch Approvals**: Approve multiple changes at once in UI

## Best Practices

1. **Baseline Hygiene**: Update baseline on every main branch merge
2. **Story Coverage**: Every component should have Storybook story
3. **Variant Testing**: Test all component variants (sizes, colors, states)
4. **Responsive Design**: Include mobile/tablet viewports in stories
5. **Animation Handling**: Disable animations or use fixed timestamps
6. **Review Discipline**: Always review visual changes before approving

## Pricing

**Free Tier** (Perfect for this project):
- 5,000 snapshots/month
- Unlimited collaborators
- Open source projects: **Unlimited snapshots**

**This Project Usage**:
- 53 stories × 3 browsers × 2 viewports = ~318 snapshots/build
- Estimated builds/month: ~30-40
- Total snapshots: ~10,000/month
- **Status**: ✅ Qualifies for open source unlimited plan

## Agent Status

✅ **Operational** - Ready for visual regression testing
🔴 **High Priority** - Prevents visual bugs in production
⚡ **Fast** - Results in < 5 minutes
🌐 **Cross-Browser** - Tests Chrome, Firefox, Safari, Edge

---

**Created**: 2025-10-31
**Last Updated**: 2025-10-31
**Maintained By**: Claude AI Agent System
**Integration**: CI/CD Pipeline, Storybook, GitHub Actions
