#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

/**
 * Component Registry Generator
 *
 * Genera un file index.ts centralizzato che esporta tutti i componenti
 * Semplifica gli import: import { Button, HeroSection } from '@/components'
 */

interface ComponentInfo {
  name: string;
  category: string;
  path: string;
  hasTypes: boolean;
}

class RegistryGenerator {
  private rootDir: string;
  private componentsDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
    this.componentsDir = path.join(rootDir, 'components');
  }

  generate(): void {
    console.log('🔍 Scanning components...\n');

    const components = this.scanComponents();

    console.log(`📦 Found ${components.length} components\n`);

    // Generate main index.ts
    this.generateMainIndex(components);

    // Generate category indexes
    this.generateCategoryIndexes(components);

    console.log('✅ Registry updated successfully!\n');
  }

  private scanComponents(): ComponentInfo[] {
    const components: ComponentInfo[] = [];

    if (!fs.existsSync(this.componentsDir)) {
      console.error(`❌ Components directory not found: ${this.componentsDir}`);
      return components;
    }

    const categories = fs.readdirSync(this.componentsDir);

    for (const category of categories) {
      const categoryPath = path.join(this.componentsDir, category);

      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const categoryComponents = fs.readdirSync(categoryPath);

      for (const componentName of categoryComponents) {
        const componentPath = path.join(categoryPath, componentName);

        if (!fs.statSync(componentPath).isDirectory()) continue;

        // Check if has tsx file
        const tsxFile = path.join(componentPath, `${componentName}.tsx`);
        if (!fs.existsSync(tsxFile)) continue;

        // Check if has types
        const typesFile = path.join(componentPath, `${componentName}.types.ts`);
        const hasTypes = fs.existsSync(typesFile);

        components.push({
          name: componentName,
          category,
          path: componentPath,
          hasTypes,
        });

        console.log(`  ✓ ${category}/${componentName}`);
      }
    }

    return components;
  }

  private generateMainIndex(components: ComponentInfo[]): void {
    const indexPath = path.join(this.componentsDir, 'index.ts');

    let content = `/**
 * Component Registry
 *
 * Auto-generated file - DO NOT EDIT MANUALLY
 * Generated: ${new Date().toISOString()}
 *
 * Usage:
 *   import { Button, HeroSection } from '@/components';
 *   import type { ButtonProps, HeroSectionProps } from '@/components';
 */

`;

    // Group by category
    const byCategory = components.reduce((acc, comp) => {
      if (!acc[comp.category]) {
        acc[comp.category] = [];
      }
      acc[comp.category].push(comp);
      return acc;
    }, {} as Record<string, ComponentInfo[]>);

    // Generate exports by category
    for (const [category, comps] of Object.entries(byCategory)) {
      content += `// ═══════════════════════════════════════════════════════════\n`;
      content += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      content += `// ═══════════════════════════════════════════════════════════\n\n`;

      for (const comp of comps) {
        // Export component
        content += `export { ${comp.name} } from './${category}/${comp.name}';\n`;

        // Export types if available
        if (comp.hasTypes) {
          content += `export type * from './${category}/${comp.name}/${comp.name}.types';\n`;
        }
      }

      content += '\n';
    }

    // Generate component list for reference
    content += `// ═══════════════════════════════════════════════════════════\n`;
    content += `// Component List (${components.length} total)\n`;
    content += `// ═══════════════════════════════════════════════════════════\n`;
    content += `\n`;
    content += `export const AVAILABLE_COMPONENTS = [\n`;

    for (const comp of components.sort((a, b) => a.name.localeCompare(b.name))) {
      content += `  '${comp.name}',\n`;
    }

    content += `] as const;\n\n`;

    content += `export type AvailableComponent = typeof AVAILABLE_COMPONENTS[number];\n`;

    fs.writeFileSync(indexPath, content, 'utf-8');
    console.log(`\n✅ Generated: components/index.ts`);
  }

  private generateCategoryIndexes(components: ComponentInfo[]): void {
    const byCategory = components.reduce((acc, comp) => {
      if (!acc[comp.category]) {
        acc[comp.category] = [];
      }
      acc[comp.category].push(comp);
      return acc;
    }, {} as Record<string, ComponentInfo[]>);

    for (const [category, comps] of Object.entries(byCategory)) {
      const indexPath = path.join(this.componentsDir, category, 'index.ts');

      let content = `/**
 * ${category.charAt(0).toUpperCase() + category.slice(1)} Components
 *
 * Auto-generated file - DO NOT EDIT MANUALLY
 * Generated: ${new Date().toISOString()}
 */

`;

      for (const comp of comps) {
        content += `export { ${comp.name} } from './${comp.name}';\n`;

        if (comp.hasTypes) {
          content += `export type * from './${comp.name}/${comp.name}.types';\n`;
        }
      }

      fs.writeFileSync(indexPath, content, 'utf-8');
      console.log(`✅ Generated: components/${category}/index.ts`);
    }
  }
}

// CLI
async function main() {
  const rootDir = path.join(__dirname, '..');
  const generator = new RegistryGenerator(rootDir);

  console.log('🔄 Updating Component Registry...\n');
  generator.generate();
}

main().catch(console.error);
