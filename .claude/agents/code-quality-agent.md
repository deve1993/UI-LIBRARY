# Code Quality Cleanup Agent

**Priority:** 🔴 CRITICAL
**Status:** ✅ Operational
**Category:** Code Quality & Maintenance

## Purpose

Automatically fix ESLint errors, TypeScript issues, and manage technical debt across the codebase. This agent is a **prerequisite** for all other automation agents as it ensures code quality standards are met.

## Problem Solved

- **ESLint Errors**: Auto-fixes hundreds of linting errors (prefer-const, unused vars, etc.)
- **TypeScript Strict Mode**: Manages TypeScript strict checks and type errors
- **Technical Debt**: Tracks TODOs, FIXMEs, and deprecated code
- **Code Consistency**: Enforces consistent code style across the project
- **Import Cleanup**: Removes unused imports and organizes them

## Prerequisites

- ESLint configured (`.eslintrc.json`)
- TypeScript configured (`tsconfig.json`)
- Prettier installed for formatting

## Commands

### Analyze Code Quality
```bash
cd component-vault
npm run quality:analyze
```
**Output:** Report of all code quality issues (ESLint, TypeScript, TODOs)

### Auto-Fix ESLint Errors
```bash
npm run quality:fix-eslint
```
**What it fixes:**
- `prefer-const` → Changes `let` to `const` where possible
- Unused variables → Removes or prefixes with `_`
- Missing semicolons
- Trailing commas
- Spacing issues
- Import order

### Fix TypeScript Errors
```bash
npm run quality:fix-types
```
**What it fixes:**
- Missing type annotations
- Nullable type checks
- Strict boolean expressions
- Missing return types

### Track Technical Debt
```bash
npm run quality:debt
```
**Output:** List of all TODOs, FIXMEs, and HACK comments with file locations

### Full Cleanup
```bash
npm run quality:cleanup
```
**Runs all fixes in sequence:**
1. ESLint auto-fix
2. TypeScript strict checks
3. Prettier formatting
4. Remove unused imports
5. Generate report

## Integration with Other Agents

### Prerequisites For:
- **Security Scanner Agent** - Needs clean code to scan
- **CI/CD Pipeline Agent** - Requires passing lint/type checks
- **Test Generator Agent** - Needs valid TypeScript
- **Visual Regression Agent** - Requires buildable code

### Works With:
- **Test Generator** - Fixes test file issues
- **Performance Auditor** - Identifies performance anti-patterns
- **A11y Auditor** - Fixes accessibility linting rules

## Configuration

### ESLint Rules (Fixable)
```json
{
  "rules": {
    "prefer-const": "error",  // Auto-fixable
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/strict-boolean-expressions": "error"
  }
}
```

### TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## Workflow

### Daily Use
```bash
# Before committing
npm run quality:analyze        # Check issues
npm run quality:cleanup        # Auto-fix everything
git add .
git commit -m "chore: code quality cleanup"
```

### Pre-Commit Hook Integration
The agent runs automatically via Husky pre-commit:
```bash
npm run precommit
  └─ validate-components
  └─ check-dependencies
  └─ type-check
  └─ quality:analyze  # <-- Code Quality Agent
```

## Metrics Tracked

- **ESLint Errors**: Count and severity
- **TypeScript Errors**: Compilation errors count
- **TODOs**: Number and age
- **Code Complexity**: Cyclomatic complexity
- **Unused Code**: Dead code detection

## Expected Outcomes

### Before Agent
```
ESLint: 497 errors, 28 warnings
TypeScript: 28 errors
TODOs: 25 untracked
Status: ❌ Blocking other agents
```

### After Agent
```
ESLint: 0 errors, 2 warnings
TypeScript: 0 errors
TODOs: 25 tracked
Status: ✅ Ready for automation
```

## Error Categories

### Auto-Fixable (90%)
- Variable declarations (let → const)
- Import organization
- Spacing and formatting
- Semicolons
- Trailing commas
- React hooks dependencies

### Manual Fix Required (10%)
- Type assertions
- Nullable checks (requires logic)
- Complex boolean expressions
- Missing prop types

## Example Output

```bash
$ npm run quality:analyze

🔍 Code Quality Analysis

📊 ESLint Issues:
  ❌ Errors: 42
  ⚠️  Warnings: 12
  ✅ Fixable: 38 (90%)

📊 TypeScript Issues:
  ❌ Errors: 8
  ⚠️  Type Warnings: 3

📊 Technical Debt:
  📝 TODOs: 15
  🔧 FIXMEs: 7
  ⚠️  HACKs: 3

💡 Run 'npm run quality:cleanup' to auto-fix 90% of issues
```

## Troubleshooting

### ESLint Fix Conflicts
If ESLint and Prettier conflict:
```bash
npm run quality:fix-eslint
npm run format  # Prettier overrides ESLint formatting
```

### TypeScript Errors After Fix
Some fixes may break types. Run:
```bash
npm run type-check
# Review errors manually
```

### Git Conflicts After Mass Fix
Commit incrementally:
```bash
npm run quality:fix-eslint  && git add . && git commit -m "fix: eslint"
npm run quality:fix-types   && git add . && git commit -m "fix: types"
```

## Best Practices

1. **Run Daily**: Keep code quality high with daily cleanups
2. **Before PR**: Always run full cleanup before creating PR
3. **Incremental Fixes**: Fix one category at a time to avoid conflicts
4. **Track Debt**: Review TODO list monthly and prioritize fixes
5. **Pre-Commit**: Let hook catch issues before they reach main

## Agent Status

✅ **Operational** - Ready to fix code quality issues
🔴 **Critical** - Required before implementing other agents
⏱️ **Fast** - Auto-fixes in < 30 seconds

---

**Created**: 2025-10-31
**Last Updated**: 2025-10-31
**Maintained By**: Claude AI Agent System
