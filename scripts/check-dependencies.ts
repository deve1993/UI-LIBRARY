#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Dependency Analyzer
 *
 * Analizza tutti gli import nei file e verifica che le dipendenze
 * siano presenti in package.json
 */

interface DependencyIssue {
  file: string;
  import: string;
  type: 'missing' | 'dev-only' | 'version-mismatch';
  suggestion?: string;
}

interface AnalysisResult {
  totalFiles: number;
  totalImports: number;
  issues: DependencyIssue[];
  unusedDependencies: string[];
  suggestions: string[];
}

class DependencyAnalyzer {
  private packageJson: any;
  private rootDir: string;
  private importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
    const packageJsonPath = path.join(rootDir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found');
    }

    this.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  }

  async analyze(): Promise<AnalysisResult> {
    console.log('🔍 Analyzing dependencies...\n');

    const files = await glob('**/*.{ts,tsx,js,jsx}', {
      cwd: this.rootDir,
      ignore: ['node_modules/**', 'dist/**', 'build/**', '.storybook/**'],
    });

    const issues: DependencyIssue[] = [];
    const usedDependencies = new Set<string>();
    let totalImports = 0;

    for (const file of files) {
      const filePath = path.join(this.rootDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      let match;
      this.importRegex.lastIndex = 0;

      while ((match = this.importRegex.exec(content)) !== null) {
        const importPath = match[1];
        totalImports++;

        // Skip relative imports
        if (importPath.startsWith('.') || importPath.startsWith('/')) {
          continue;
        }

        // Extract package name
        const packageName = this.extractPackageName(importPath);

        // Track usage
        usedDependencies.add(packageName);

        // Check if dependency exists
        const issue = this.checkDependency(packageName, file);
        if (issue) {
          issues.push(issue);
        }
      }
    }

    // Check for unused dependencies
    const unusedDependencies = this.findUnusedDependencies(usedDependencies);

    // Generate suggestions
    const suggestions = this.generateSuggestions(issues);

    return {
      totalFiles: files.length,
      totalImports,
      issues,
      unusedDependencies,
      suggestions,
    };
  }

  private extractPackageName(importPath: string): string {
    // Handle scoped packages (@org/package)
    if (importPath.startsWith('@')) {
      const parts = importPath.split('/');
      return `${parts[0]}/${parts[1]}`;
    }

    // Regular packages (package/subpath)
    return importPath.split('/')[0];
  }

  private checkDependency(packageName: string, file: string): DependencyIssue | null {
    const deps = this.packageJson.dependencies || {};
    const devDeps = this.packageJson.devDependencies || {};

    // Check if it's missing entirely
    if (!deps[packageName] && !devDeps[packageName]) {
      // Check if it's a common known package
      const suggestion = this.suggestPackage(packageName);

      return {
        file,
        import: packageName,
        type: 'missing',
        suggestion,
      };
    }

    // Check if it's in devDependencies but used in production code
    if (devDeps[packageName] && !file.includes('test') && !file.includes('stories')) {
      return {
        file,
        import: packageName,
        type: 'dev-only',
        suggestion: `Move ${packageName} to dependencies`,
      };
    }

    return null;
  }

  private suggestPackage(packageName: string): string {
    const suggestions: Record<string, string> = {
      'lucide-react': 'npm install lucide-react',
      'clsx': 'npm install clsx',
      'tailwind-merge': 'npm install tailwind-merge',
      'framer-motion': 'npm install framer-motion',
      'react-hook-form': 'npm install react-hook-form',
      'zod': 'npm install zod',
      '@radix-ui/react-dialog': 'npm install @radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu': 'npm install @radix-ui/react-dropdown-menu',
    };

    return suggestions[packageName] || `npm install ${packageName}`;
  }

  private findUnusedDependencies(usedDependencies: Set<string>): string[] {
    const deps = this.packageJson.dependencies || {};
    const unused: string[] = [];

    // Essential deps that should never be marked as unused
    const essentialDeps = ['react', 'react-dom', 'typescript'];

    for (const dep of Object.keys(deps)) {
      if (!usedDependencies.has(dep) && !essentialDeps.includes(dep)) {
        unused.push(dep);
      }
    }

    return unused;
  }

  private generateSuggestions(issues: DependencyIssue[]): string[] {
    const suggestions: string[] = [];

    // Group by type
    const missing = issues.filter(i => i.type === 'missing');
    const devOnly = issues.filter(i => i.type === 'dev-only');

    if (missing.length > 0) {
      // Get unique packages
      const packages = [...new Set(missing.map(i => i.import))];

      suggestions.push('💡 Install missing dependencies:');
      for (const pkg of packages) {
        const issue = missing.find(i => i.import === pkg);
        suggestions.push(`   ${issue?.suggestion || `npm install ${pkg}`}`);
      }
    }

    if (devOnly.length > 0) {
      suggestions.push('');
      suggestions.push('💡 Move to dependencies (not devDependencies):');
      for (const issue of devOnly) {
        suggestions.push(`   ${issue.import} (used in ${path.basename(issue.file)})`);
      }
    }

    return suggestions;
  }

  printReport(result: AnalysisResult): void {
    console.log('📊 Dependency Analysis Report\n');
    console.log(`📁 Files analyzed: ${result.totalFiles}`);
    console.log(`📦 Imports found: ${result.totalImports}`);
    console.log();

    if (result.issues.length === 0) {
      console.log('✅ No dependency issues found!\n');
    } else {
      console.log(`⚠️  Found ${result.issues.length} issue(s):\n`);

      // Group by import
      const grouped = result.issues.reduce((acc, issue) => {
        if (!acc[issue.import]) {
          acc[issue.import] = [];
        }
        acc[issue.import].push(issue);
        return acc;
      }, {} as Record<string, DependencyIssue[]>);

      for (const [pkg, issues] of Object.entries(grouped)) {
        const type = issues[0].type;
        const emoji = type === 'missing' ? '❌' : '⚠️';

        console.log(`${emoji} ${pkg} (${issues.length} occurrence${issues.length > 1 ? 's' : ''})`);

        // Show first 3 files
        issues.slice(0, 3).forEach(issue => {
          const relPath = path.relative(this.rootDir, issue.file);
          console.log(`   📄 ${relPath}`);
        });

        if (issues.length > 3) {
          console.log(`   ... and ${issues.length - 3} more file(s)`);
        }

        console.log();
      }
    }

    if (result.unusedDependencies.length > 0) {
      console.log(`🗑️  Potentially unused dependencies (${result.unusedDependencies.length}):\n`);
      result.unusedDependencies.forEach(dep => {
        console.log(`   • ${dep}`);
      });
      console.log('\n💡 Consider removing if truly unused: npm uninstall <package>\n');
    }

    if (result.suggestions.length > 0) {
      console.log('════════════════════════════════════════\n');
      result.suggestions.forEach(s => console.log(s));
      console.log();
    }

    // Exit code
    if (result.issues.length > 0) {
      console.log('❌ Dependency check failed\n');
      process.exit(1);
    } else {
      console.log('✅ All dependencies are correctly configured\n');
    }
  }

  async fix(): Promise<void> {
    console.log('🔧 Auto-fixing dependency issues...\n');

    const result = await this.analyze();

    if (result.issues.length === 0) {
      console.log('✅ No issues to fix!\n');
      return;
    }

    const missing = result.issues.filter(i => i.type === 'missing');

    if (missing.length > 0) {
      const packages = [...new Set(missing.map(i => i.import))];

      console.log(`📦 Installing ${packages.length} missing package(s)...\n`);

      for (const pkg of packages) {
        console.log(`   Installing ${pkg}...`);
        try {
          const { execSync } = require('child_process');
          execSync(`npm install ${pkg}`, {
            cwd: this.rootDir,
            stdio: 'inherit',
          });
          console.log(`   ✅ ${pkg} installed\n`);
        } catch (error) {
          console.log(`   ❌ Failed to install ${pkg}\n`);
        }
      }
    }

    console.log('✅ Auto-fix completed!\n');
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const rootDir = path.join(__dirname, '..');

  const analyzer = new DependencyAnalyzer(rootDir);

  if (args.includes('--fix')) {
    await analyzer.fix();
  } else {
    const result = await analyzer.analyze();
    analyzer.printReport(result);
  }
}

main().catch(console.error);
