#!/usr/bin/env node
/**
 * Script di validazione componenti
 *
 * Verifica che:
 * 1. Ogni componente abbia tutti i file richiesti (.tsx, .types.ts, .stories.tsx, index.ts)
 * 2. I tipi esportati corrispondano a quelli usati nel componente
 * 3. Le stories usino i tipi corretti
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ValidationResult {
  component: string;
  errors: string[];
  warnings: string[];
}

const REQUIRED_FILES = [
  '{component}.tsx',
  '{component}.types.ts',
  '{component}.stories.tsx',
  'index.ts',
];

const SECTIONS_DIR = path.join(__dirname, '../components/sections');

async function validateComponent(componentDir: string): Promise<ValidationResult> {
  const componentName = path.basename(componentDir);
  const result: ValidationResult = {
    component: componentName,
    errors: [],
    warnings: [],
  };

  // Check required files exist
  for (const fileTemplate of REQUIRED_FILES) {
    const fileName = fileTemplate.replace('{component}', componentName);
    const filePath = path.join(componentDir, fileName);

    if (!fs.existsSync(filePath)) {
      result.errors.push(`Missing file: ${fileName}`);
    }
  }

  // Read component file
  const componentPath = path.join(componentDir, `${componentName}.tsx`);
  if (fs.existsSync(componentPath)) {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');

    // Check if component imports types from .types.ts
    const hasTypeImport = componentContent.includes(`from './${componentName}.types'`);
    if (!hasTypeImport) {
      result.warnings.push('Component does not import types from .types.ts file');
    }

    // Check if component uses Props interface
    const usesPropsInterface = componentContent.includes(`${componentName}Props`);
    if (!usesPropsInterface) {
      result.errors.push(`Component does not use ${componentName}Props interface`);
    }
  }

  // Read types file
  const typesPath = path.join(componentDir, `${componentName}.types.ts`);
  if (fs.existsSync(typesPath)) {
    const typesContent = fs.readFileSync(typesPath, 'utf-8');

    // Check if Props interface is exported
    const exportsPropsInterface = typesContent.includes(`export interface ${componentName}Props`);
    if (!exportsPropsInterface) {
      result.errors.push(`Types file does not export ${componentName}Props interface`);
    }
  }

  // Read stories file
  const storiesPath = path.join(componentDir, `${componentName}.stories.tsx`);
  if (fs.existsSync(storiesPath)) {
    const storiesContent = fs.readFileSync(storiesPath, 'utf-8');

    // Check if stories import component
    const importsComponent = storiesContent.includes(`import { ${componentName} }`);
    if (!importsComponent) {
      result.errors.push('Stories file does not import component');
    }

    // Check if stories use typeof for meta
    const usesTypeof = storiesContent.includes(`typeof ${componentName}`);
    if (!usesTypeof) {
      result.warnings.push('Stories should use typeof for better type inference');
    }
  }

  // Read index file
  const indexPath = path.join(componentDir, 'index.ts');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');

    // Check if index exports component
    const exportsComponent = indexContent.includes(`export { ${componentName}`);
    if (!exportsComponent) {
      result.errors.push('Index file does not export component');
    }

    // Check if index exports types
    const exportsTypes = indexContent.includes(`export type {`) &&
                         indexContent.includes(`${componentName}Props`);
    if (!exportsTypes) {
      result.warnings.push('Index file should export types');
    }

    // Check if imports from .types.ts
    const importsFromTypes = indexContent.includes('.types');
    if (!importsFromTypes) {
      result.warnings.push('Index file should import types from .types.ts');
    }
  }

  return result;
}

async function main() {
  console.log('🔍 Validating components...\n');

  const componentDirs = fs.readdirSync(SECTIONS_DIR)
    .filter(name => fs.statSync(path.join(SECTIONS_DIR, name)).isDirectory())
    .map(name => path.join(SECTIONS_DIR, name));

  const results: ValidationResult[] = [];

  for (const dir of componentDirs) {
    const result = await validateComponent(dir);
    results.push(result);
  }

  // Print results
  let hasErrors = false;
  let hasWarnings = false;

  for (const result of results) {
    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.log(`\n📦 ${result.component}:`);

      if (result.errors.length > 0) {
        hasErrors = true;
        result.errors.forEach(error => {
          console.log(`  ❌ ERROR: ${error}`);
        });
      }

      if (result.warnings.length > 0) {
        hasWarnings = true;
        result.warnings.forEach(warning => {
          console.log(`  ⚠️  WARNING: ${warning}`);
        });
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  const validComponents = results.filter(r => r.errors.length === 0).length;
  console.log(`✅ ${validComponents}/${results.length} components are valid`);

  if (hasErrors) {
    console.log('❌ Found errors that need to be fixed');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('⚠️  Found warnings, consider fixing them');
  } else {
    console.log('🎉 All components are valid!');
  }
}

main().catch(console.error);
