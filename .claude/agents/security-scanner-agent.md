# Security Scanner Agent

**Priority:** 🔴 CRITICAL
**Status:** ✅ Operational
**Category:** Security & Compliance

## Purpose

Automated security vulnerability scanning, license compliance checking, and secrets detection to ensure the component library is safe for production use and NPM publication.

## Problem Solved

- **Vulnerable Dependencies**: Unknown security vulnerabilities in 1000+ dependencies
- **License Compliance**: Risk of incompatible licenses (GPL, AGPL) for commercial use
- **Secrets in Code**: API keys, tokens accidentally committed to repository
- **Supply Chain Risk**: Compromised packages in dependency tree
- **Manual Security Audits**: Time-consuming and often missed
- **Pre-Publication Safety**: No automated security checks before NPM publish

## Prerequisites

- npm (for `npm audit`)
- Git repository
- Optional: Snyk account for advanced scanning (free for open source)

## Commands

### Full Security Audit
```bash
npm run security:audit
```
**What it checks:**
- Dependency vulnerabilities (npm audit)
- License compliance
- Secrets in codebase
- Deprecated packages
- Known malicious packages

### Vulnerability Scan Only
```bash
npm run security:vulns
```
**Output:** List of vulnerable packages with severity levels

### License Compliance Check
```bash
npm run security:licenses
```
**What it checks:**
- Identifies all dependency licenses
- Flags incompatible licenses (GPL, AGPL, proprietary)
- Generates license report
- Checks license compatibility for commercial use

### Secrets Detection
```bash
npm run security:secrets
```
**What it scans:**
- API keys
- Access tokens
- Private keys
- AWS credentials
- Database passwords
- OAuth tokens

### Auto-Fix Vulnerabilities
```bash
npm run security:fix
```
**What it does:**
- Runs `npm audit fix`
- Attempts automatic patches
- Reports unfixable vulnerabilities
- Creates backup before fixing

### Generate Security Report
```bash
npm run security:report
```
**Output:** JSON report with:
- Vulnerability summary
- License compliance status
- Secrets detection results
- Recommendations

## Integration with Other Agents

### Blocks:
- **Release Manager** - Blocks NPM publish if critical vulnerabilities found
- **CI/CD Pipeline** - Fails build on security issues
- **Dependency Migrator** - Prioritizes security updates

### Works With:
- **Code Quality Agent** - Security linting rules
- **Test Generator** - Security test cases
- **A11y Auditor** - Comprehensive quality checks

## Configuration

### Severity Thresholds
```json
{
  "security": {
    "blockOnCritical": true,
    "blockOnHigh": true,
    "blockOnModerate": false,
    "blockOnLow": false,
    "allowedLicenses": [
      "MIT",
      "Apache-2.0",
      "BSD-2-Clause",
      "BSD-3-Clause",
      "ISC",
      "0BSD"
    ],
    "blockedLicenses": [
      "GPL-3.0",
      "AGPL-3.0",
      "LGPL-3.0",
      "SSPL",
      "Proprietary"
    ]
  }
}
```

### Secrets Patterns
Scans for:
- `AKIA[0-9A-Z]{16}` - AWS Access Key
- `sk_live_[0-9a-zA-Z]{24}` - Stripe Secret Key
- `ghp_[0-9a-zA-Z]{36}` - GitHub Personal Access Token
- `AIza[0-9A-Za-z\\-_]{35}` - Google API Key
- `[0-9a-f]{32}` - Generic API keys
- Private SSH keys
- Database connection strings

## Workflow

### Pre-Commit Hook (Automatic)
```bash
# Runs automatically on git commit
git commit -m "feat: new feature"
  └─ security:secrets (quick scan)
  └─ Blocks commit if secrets found
```

### Pre-Release (Manual)
```bash
# Before publishing to NPM
npm run security:audit
# Review report
# Fix critical/high vulnerabilities
npm run security:fix
# Verify fixes
npm audit
# Proceed with release
npm run release:publish
```

### CI/CD Pipeline (Automatic)
```yaml
# Runs on every PR
- name: Security Scan
  run: npm run security:audit
```

## Metrics Tracked

- **Vulnerability Count**: By severity (critical, high, moderate, low)
- **Vulnerable Packages**: Count and list
- **License Violations**: Incompatible licenses found
- **Secrets Detected**: Count and types
- **Fix Success Rate**: % of auto-fixable vulnerabilities
- **Scan Frequency**: Daily, per-PR, pre-release
- **Mean Time to Remediate**: Average time to fix vulnerabilities

## Expected Outcomes

### Before Agent
```
Security Audits: Manual, infrequent
Vulnerabilities: Unknown
License Compliance: Not checked
Secrets: Risk of accidental commits
Status: ⚠️  High security risk
```

### After Agent
```
Security Audits: Automated, daily
Vulnerabilities: 0 critical, 0 high
License Compliance: 100% compliant
Secrets: Blocked pre-commit
Status: ✅ Production-ready
```

## Vulnerability Severity Levels

### 🔴 Critical
- **Impact**: Remote code execution, data breach
- **Action**: Fix immediately (< 24 hours)
- **Blocks**: NPM publish, production deployment

### 🟠 High
- **Impact**: Privilege escalation, authentication bypass
- **Action**: Fix within 1 week
- **Blocks**: NPM publish

### 🟡 Moderate
- **Impact**: Information disclosure, DoS
- **Action**: Fix within 1 month
- **Blocks**: None (warning only)

### 🟢 Low
- **Impact**: Minor issues, best practice violations
- **Action**: Fix eventually
- **Blocks**: None

## Example Output

```bash
$ npm run security:audit

🔒 Security Scanner Agent

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 DEPENDENCY VULNERABILITIES

Scanning 1,033 packages...
✅ 0 Critical
✅ 0 High
🟡 2 Moderate
🟢 1 Low

Moderate Severity:
  ┌─ semver <7.5.2
  │  Severity: moderate
  │  Path: @storybook/react > semver
  │  Fix: npm audit fix
  │
  └─ tough-cookie <4.1.3
     Severity: moderate
     Path: jsdom > tough-cookie
     Fix: Awaiting upstream fix

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📜 LICENSE COMPLIANCE

Analyzing 248 dependencies...
✅ All licenses compatible

Breakdown:
  MIT: 201 packages (81%)
  Apache-2.0: 23 packages (9%)
  ISC: 14 packages (6%)
  BSD-3-Clause: 10 packages (4%)

⚠️  Unknown License: 2 packages
  - custom-package@1.0.0 (review manually)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 SECRETS DETECTION

Scanning 847 files...
✅ No secrets detected

Patterns checked:
  ✓ AWS Keys
  ✓ API Tokens
  ✓ Private Keys
  ✓ Database URLs
  ✓ OAuth Secrets

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SUMMARY

Security Score: 95/100 ⭐⭐⭐⭐⭐

Status: ✅ SAFE FOR PRODUCTION
  ✅ No critical vulnerabilities
  ✅ License compliant
  ✅ No secrets detected
  🟡 2 moderate vulnerabilities (non-blocking)

💡 Recommendations:
  1. Run 'npm audit fix' to patch moderate issues
  2. Review unknown licenses manually
  3. Keep dependencies updated

Last Scan: 2025-10-31 14:30 UTC
Report: security-report-2025-10-31.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Automated Remediation

### Auto-Fixable Issues
- **Patch Updates**: Automatic security patches
- **Minor Updates**: Low-risk dependency bumps
- **Deprecated Packages**: Suggests alternatives

### Manual Review Required
- **Breaking Changes**: Major version updates
- **License Changes**: Package license modifications
- **Supply Chain Attacks**: Suspicious package behavior
- **Zero-Day Vulnerabilities**: No patch available yet

## License Compatibility Matrix

### ✅ Compatible (Safe for commercial use)
- MIT
- Apache-2.0
- BSD-2-Clause, BSD-3-Clause
- ISC
- 0BSD
- Unlicense

### ⚠️ Review Required
- CC0-1.0 (public domain)
- WTFPL (permissive but unusual)
- Unlicensed (no license specified)

### ❌ Incompatible (Avoid for commercial use)
- GPL-3.0 (copyleft)
- AGPL-3.0 (network copyleft)
- LGPL-3.0 (weak copyleft)
- SSPL (server-side public license)
- Proprietary

## Best Practices

1. **Daily Scans**: Run security audit daily or on schedule
2. **Pre-Commit**: Always scan for secrets before commit
3. **Pre-Release**: Full audit before every NPM publish
4. **Monitor Alerts**: Subscribe to security advisories (GitHub, npm)
5. **Update Regularly**: Keep dependencies current with Dependency Migrator
6. **Document Exceptions**: Maintain list of accepted risks
7. **Review Licenses**: Check license changes on major updates

## Troubleshooting

### False Positives
```bash
# Create .npmrc to ignore specific advisories
echo "audit-level=moderate" >> .npmrc
```

### Unfixable Vulnerabilities
```bash
# Generate detailed report
npm audit --json > audit-report.json
# Check for workarounds or wait for upstream fix
```

### Secrets Detection Errors
```bash
# Whitelist false positives in .gitignore-secrets
echo "test-fixtures/**" >> .gitignore-secrets
```

## Security Score Calculation

```
Security Score = 100 - (
  Critical × 25 +
  High × 10 +
  Moderate × 3 +
  Low × 1 +
  License Violations × 15 +
  Secrets Found × 50
)
```

**Score Ranges:**
- 95-100: ⭐⭐⭐⭐⭐ Excellent
- 85-94: ⭐⭐⭐⭐ Good
- 70-84: ⭐⭐⭐ Acceptable
- 50-69: ⭐⭐ Needs Improvement
- <50: ⭐ Critical Issues

## Agent Status

✅ **Operational** - Ready for security scanning
🔴 **Critical** - Required for production deployment
⚡ **Fast** - Full scan in < 60 seconds
🔐 **Comprehensive** - Vulnerabilities + Licenses + Secrets

---

**Created**: 2025-10-31
**Last Updated**: 2025-10-31
**Maintained By**: Claude AI Agent System
**Integration**: CI/CD Pipeline, Pre-Commit Hooks, Release Manager
