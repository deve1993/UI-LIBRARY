#!/usr/bin/env node
/**
 * Generator per nuovi componenti
 *
 * Crea automaticamente la struttura completa di un componente con:
 * - File .tsx con implementazione base
 * - File .types.ts con interfacce
 * - File .stories.tsx con story di default
 * - File index.ts con exports
 * - Cartella examples/ con basic.tsx e advanced.tsx
 * - README.md con documentazione template
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ComponentConfig {
  name: string;
  category: 'sections' | 'ui' | 'layout';
  description: string;
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generateTypes(config: ComponentConfig): string {
  const { name } = config;
  const pascalName = toPascalCase(name);

  return `import React from 'react';

/**
 * ${pascalName} Props
 */
export interface ${pascalName}Props {
  /** Custom className */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}
`;
}

function generateComponentTemplate(config: ComponentConfig): string {
  const { name, description } = config;
  const pascalName = toPascalCase(name);

  return `import React from 'react';
import type { ${pascalName}Props } from './${pascalName}.types';

/**
 * ${pascalName} - ${description}
 */
export const ${pascalName}: React.FC<${pascalName}Props> = ({
  className = '',
  children,
}) => {
  return (
    <div className={\`${name} \${className}\`}>
      {children}
    </div>
  );
};

export default ${pascalName};
`;
}

function generateStories(config: ComponentConfig): string {
  const { name } = config;
  const pascalName = toPascalCase(name);

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${pascalName} } from './${pascalName}';

const meta = {
  title: '${config.category.charAt(0).toUpperCase() + config.category.slice(1)}/${pascalName}',
  component: ${pascalName},
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '${config.description}',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${pascalName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${pascalName}',
  },
};
`;
}

function generateIndex(config: ComponentConfig): string {
  const pascalName = toPascalCase(config.name);

  return `export { ${pascalName}, default } from './${pascalName}';
export type { ${pascalName}Props } from './${pascalName}.types';
`;
}

function generateReadme(config: ComponentConfig): string {
  const pascalName = toPascalCase(config.name);

  return `# ${pascalName}

## Descrizione

${config.description}

## Screenshot

<!-- TODO: Aggiungere screenshot del componente -->
![${pascalName}](./screenshot.png)

## Installazione

\`\`\`bash
import { ${pascalName} } from '@/components/${config.category}/${pascalName}';
\`\`\`

## Utilizzo Base

\`\`\`tsx
import { ${pascalName} } from '@/components/${config.category}/${pascalName}';

function App() {
  return (
    <${pascalName}>
      Content here
    </${pascalName}>
  );
}
\`\`\`

## Props

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| \`className\` | \`string\` | No | \`''\` | Classi CSS aggiuntive |
| \`children\` | \`React.ReactNode\` | No | - | Contenuto del componente |

## Accessibilità

- TODO: Aggiungere note di accessibilità

## Best Practices

1. TODO: Aggiungere best practices

## Dipendenze

- React 18+
- Tailwind CSS 3+
`;
}

function generateBasicExample(config: ComponentConfig): string {
  const pascalName = toPascalCase(config.name);

  return `import { ${pascalName} } from '../${pascalName}';

/**
 * Esempio base di ${pascalName}
 */
export default function BasicExample() {
  return (
    <${pascalName}>
      Basic example content
    </${pascalName}>
  );
}
`;
}

function generateAdvancedExample(config: ComponentConfig): string {
  const pascalName = toPascalCase(config.name);

  return `import { ${pascalName} } from '../${pascalName}';

/**
 * Esempio avanzato di ${pascalName}
 */
export default function AdvancedExample() {
  return (
    <${pascalName} className="custom-class">
      Advanced example with custom styling
    </${pascalName}>
  );
}
`;
}

async function generateComponent(config: ComponentConfig) {
  const pascalName = toPascalCase(config.name);
  const componentDir = path.join(
    __dirname,
    '..',
    'components',
    config.category,
    pascalName
  );

  // Create directory
  if (fs.existsSync(componentDir)) {
    console.error(`❌ Component ${pascalName} already exists!`);
    process.exit(1);
  }

  fs.mkdirSync(componentDir, { recursive: true });
  fs.mkdirSync(path.join(componentDir, 'examples'), { recursive: true });

  // Generate files
  const files = {
    [`${pascalName}.types.ts`]: generateTypes(config),
    [`${pascalName}.tsx`]: generateComponentTemplate(config),
    [`${pascalName}.stories.tsx`]: generateStories(config),
    'index.ts': generateIndex(config),
    'README.md': generateReadme(config),
    'examples/basic.tsx': generateBasicExample(config),
    'examples/advanced.tsx': generateAdvancedExample(config),
  };

  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(componentDir, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Created: ${filename}`);
  }

  console.log(`\n🎉 Component ${pascalName} created successfully!`);
  console.log(`📁 Location: ${componentDir}`);
  console.log('\n📝 Next steps:');
  console.log('1. Implement component logic in .tsx file');
  console.log('2. Add proper types in .types.ts file');
  console.log('3. Create meaningful stories in .stories.tsx');
  console.log('4. Add examples in examples/ folder');
  console.log('5. Update README.md with documentation');
}

// CLI
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('Usage: npm run generate-component <name> <category> <description>');
  console.log('Example: npm run generate-component hero-banner sections "Hero banner with CTA"');
  process.exit(1);
}

const config: ComponentConfig = {
  name: args[0],
  category: args[1] as any,
  description: args.slice(2).join(' '),
};

generateComponent(config);
