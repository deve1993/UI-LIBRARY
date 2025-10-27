#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { Project, SyntaxKind } from 'ts-morph';

/**
 * Story Auto-Generator con Mock Data Intelligente
 *
 * Legge i file .types.ts e genera automaticamente stories complete
 * con dati mock realistici basati sul contesto italiano.
 */

interface MockDataGenerator {
  generateForType(typeName: string, propName: string, typeText: string): any;
}

class IntelligentMockGenerator implements MockDataGenerator {
  private italianNames = [
    'Marco Rossi', 'Laura Bianchi', 'Giuseppe Verdi', 'Anna Ferrari',
    'Luca Marino', 'Sofia Romano', 'Alessandro Conti', 'Giulia Ricci',
    'Francesco Esposito', 'Chiara Fontana'
  ];

  private italianCities = [
    'Milano', 'Roma', 'Napoli', 'Torino', 'Firenze',
    'Bologna', 'Venezia', 'Genova', 'Palermo', 'Verona'
  ];

  private companies = [
    'TechStart SRL', 'Innovation Hub', 'Digital Solutions', 'Creative Agency',
    'Code Factory', 'Growth Lab', 'Smart Systems', 'Future Labs'
  ];

  private roles = [
    'CEO', 'CTO', 'Product Manager', 'Lead Developer',
    'Marketing Director', 'Founder', 'Designer', 'Engineer'
  ];

  private usedIndices = new Set<number>();

  generateForType(typeName: string, propName: string, typeText: string): any {
    const lowerProp = propName.toLowerCase();
    const lowerType = typeName.toLowerCase();

    // Handle arrays
    if (typeText.includes('[]') || typeText.includes('Array<')) {
      return this.generateArray(typeName, propName, typeText);
    }

    // Handle specific types based on prop name
    if (lowerProp.includes('name') && !lowerProp.includes('company')) {
      return this.generateName();
    }

    if (lowerProp.includes('email')) {
      return this.generateEmail();
    }

    if (lowerProp.includes('phone')) {
      return this.generatePhone();
    }

    if (lowerProp.includes('url') || lowerProp.includes('href')) {
      return this.generateUrl(lowerProp);
    }

    if (lowerProp.includes('image') || lowerProp.includes('avatar') || lowerProp.includes('src')) {
      return this.generateImage();
    }

    if (lowerProp.includes('icon')) {
      return 'Icon'; // Will be replaced with actual icon import
    }

    if (lowerProp.includes('title')) {
      return this.generateTitle(lowerType);
    }

    if (lowerProp.includes('description')) {
      return this.generateDescription(lowerType);
    }

    if (lowerProp.includes('company')) {
      return this.getRandomItem(this.companies);
    }

    if (lowerProp.includes('role') || lowerProp.includes('position')) {
      return this.getRandomItem(this.roles);
    }

    if (lowerProp.includes('city') || lowerProp.includes('location')) {
      return this.getRandomItem(this.italianCities);
    }

    if (lowerProp.includes('address')) {
      return `Via ${this.getRandomItem(['Roma', 'Milano', 'Venezia'])} ${Math.floor(Math.random() * 200) + 1}, ${this.getRandomItem(this.italianCities)}, Italia`;
    }

    if (lowerProp.includes('rating')) {
      return Math.floor(Math.random() * 2) + 4; // 4 or 5
    }

    if (lowerProp.includes('price') || lowerProp.includes('amount')) {
      return Math.floor(Math.random() * 100) * 10 + 29;
    }

    if (lowerProp.includes('date')) {
      return new Date().toISOString().split('T')[0];
    }

    // Handle primitive types
    if (typeText === 'string') {
      return `Esempio ${propName}`;
    }

    if (typeText === 'number') {
      return Math.floor(Math.random() * 100);
    }

    if (typeText === 'boolean') {
      return Math.random() > 0.5;
    }

    // Default
    return `Mock ${propName}`;
  }

  private generateArray(typeName: string, propName: string, typeText: string): any[] {
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 items
    return Array.from({ length: count }, (_, i) => {
      if (typeText.includes('string')) {
        return `${propName} ${i + 1}`;
      }
      return { id: i, name: `Item ${i + 1}` };
    });
  }

  private generateName(): string {
    return this.getRandomItem(this.italianNames);
  }

  private generateEmail(): string {
    const name = this.generateName().toLowerCase().replace(' ', '.');
    return `${name}@example.com`;
  }

  private generatePhone(): string {
    return `+39 0${Math.floor(Math.random() * 9) + 1} ${this.randomDigits(4)} ${this.randomDigits(4)}`;
  }

  private generateUrl(context: string): string {
    if (context.includes('github')) return 'https://github.com';
    if (context.includes('linkedin')) return 'https://linkedin.com';
    if (context.includes('twitter')) return 'https://twitter.com';
    return 'https://example.com';
  }

  private generateImage(): string {
    let index: number;
    do {
      index = Math.floor(Math.random() * 70) + 1;
    } while (this.usedIndices.has(index));

    this.usedIndices.add(index);
    return `https://i.pravatar.cc/150?img=${index}`;
  }

  private generateTitle(context: string): string {
    const titles = {
      hero: 'Trasforma il tuo Business con la Nostra Soluzione',
      feature: 'Funzionalità Potente',
      benefit: 'Vantaggio Competitivo',
      pricing: 'Piano Professionale',
      testimonial: 'Esperienza Eccezionale',
      cta: 'Inizia Oggi',
      default: 'Titolo Coinvolgente'
    };

    for (const [key, value] of Object.entries(titles)) {
      if (context.includes(key)) return value;
    }

    return titles.default;
  }

  private generateDescription(context: string): string {
    const descriptions = {
      hero: 'Soluzione innovativa per accelerare la crescita del tuo business e raggiungere risultati straordinari.',
      feature: 'Funzionalità progettata per semplificare il tuo workflow e aumentare la produttività del team.',
      benefit: 'Ottieni risultati concreti e misurabili in tempi rapidi con il nostro approccio comprovato.',
      pricing: 'Include tutto il necessario per far crescere il tuo business senza compromessi.',
      testimonial: 'Questa piattaforma ha trasformato il modo in cui lavoriamo, con risultati oltre le aspettative.',
      cta: 'Unisciti a migliaia di clienti soddisfatti e inizia oggi stesso la tua trasformazione digitale.',
      default: 'Descrizione dettagliata che spiega i vantaggi e le caratteristiche principali.'
    };

    for (const [key, value] of Object.entries(descriptions)) {
      if (context.includes(key)) return value;
    }

    return descriptions.default;
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private randomDigits(count: number): string {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join('');
  }

  reset() {
    this.usedIndices.clear();
  }
}

class StoryGenerator {
  private project: Project;
  private mockGenerator: IntelligentMockGenerator;

  constructor() {
    this.project = new Project({
      tsConfigFilePath: path.join(__dirname, '..', 'tsconfig.json'),
    });
    this.mockGenerator = new IntelligentMockGenerator();
  }

  async generateStory(componentPath: string): Promise<void> {
    const componentName = path.basename(componentPath);
    const typesFile = path.join(componentPath, `${componentName}.types.ts`);
    const storiesFile = path.join(componentPath, `${componentName}.stories.tsx`);

    if (!fs.existsSync(typesFile)) {
      console.error(`❌ Types file not found: ${typesFile}`);
      return;
    }

    console.log(`🔍 Analyzing ${componentName}...`);

    // Parse types file
    const sourceFile = this.project.addSourceFileAtPath(typesFile);
    const interfaces = sourceFile.getInterfaces();

    // Find the main Props interface
    const propsInterface = interfaces.find(i =>
      i.getName().endsWith('Props') || i.getName().includes(componentName)
    );

    if (!propsInterface) {
      console.error(`❌ No Props interface found in ${typesFile}`);
      return;
    }

    console.log(`📝 Found interface: ${propsInterface.getName()}`);

    // Generate mock data
    const mockData = this.generateMockData(propsInterface, componentName);

    // Detect required icons
    const icons = this.detectIcons(mockData);

    // Generate story file
    const storyContent = this.generateStoryContent(
      componentName,
      propsInterface.getName(),
      mockData,
      icons
    );

    // Write story file
    fs.writeFileSync(storiesFile, storyContent, 'utf-8');
    console.log(`✅ Generated story: ${storiesFile}`);
  }

  private generateMockData(propsInterface: any, componentName: string): any {
    this.mockGenerator.reset();
    const mockData: any = {};

    const properties = propsInterface.getProperties();

    for (const prop of properties) {
      const propName = prop.getName();
      const propType = prop.getType();
      const typeText = propType.getText();

      // Skip optional className and similar props
      if (propName === 'className' || propName === 'style') {
        continue;
      }

      // Generate mock value
      mockData[propName] = this.generateMockValue(
        propName,
        typeText,
        componentName,
        prop
      );
    }

    return mockData;
  }

  private generateMockValue(
    propName: string,
    typeText: string,
    componentName: string,
    prop: any
  ): any {
    const isOptional = prop.hasQuestionToken();

    // Handle arrays
    if (typeText.includes('[]')) {
      const itemType = typeText.replace('[]', '').trim();
      return this.generateArrayData(propName, itemType, componentName);
    }

    // Handle specific object types
    if (typeText.includes('{')) {
      return this.generateObjectData(propName, typeText, componentName);
    }

    // Handle primitive types with intelligent mocking
    return this.mockGenerator.generateForType(componentName, propName, typeText);
  }

  private generateArrayData(propName: string, itemType: string, componentName: string): any[] {
    const count = ['features', 'benefits', 'items'].some(k => propName.toLowerCase().includes(k)) ? 4 : 3;

    return Array.from({ length: count }, (_, i) => {
      if (itemType === 'string') {
        return `${propName} ${i + 1}`;
      }

      // Generate object based on prop name context
      return this.generateContextualObject(propName, i, componentName);
    });
  }

  private generateContextualObject(propName: string, index: number, componentName: string): any {
    const lower = propName.toLowerCase();

    if (lower.includes('feature')) {
      return {
        icon: '<IconPlaceholder />',
        title: `Funzionalità ${index + 1}`,
        description: 'Descrizione della funzionalità che aiuta gli utenti a raggiungere i loro obiettivi.',
      };
    }

    if (lower.includes('benefit')) {
      return {
        icon: '<IconPlaceholder />',
        title: `Vantaggio ${index + 1}`,
        description: 'Vantaggio concreto che porta valore misurabile al business.',
        value: (index + 1) * 1000,
      };
    }

    if (lower.includes('testimonial')) {
      return {
        name: this.mockGenerator['generateName'](),
        role: this.mockGenerator['getRandomItem'](this.mockGenerator['roles']),
        company: this.mockGenerator['getRandomItem'](this.mockGenerator['companies']),
        quote: 'Questa soluzione ha trasformato il nostro modo di lavorare, con risultati oltre le aspettative.',
        rating: 5,
        image: this.mockGenerator['generateImage'](),
      };
    }

    if (lower.includes('pricing') || lower.includes('plan')) {
      const prices = [29, 79, 149];
      return {
        name: ['Starter', 'Professional', 'Enterprise'][index] || `Piano ${index + 1}`,
        price: prices[index] || 99,
        features: [
          'Funzionalità 1',
          'Funzionalità 2',
          'Funzionalità 3',
        ],
      };
    }

    return {
      id: index,
      name: `Item ${index + 1}`,
    };
  }

  private generateObjectData(propName: string, typeText: string, componentName: string): any {
    // Simplified object generation
    return {
      placeholder: `Object for ${propName}`,
    };
  }

  private detectIcons(mockData: any): string[] {
    const icons = new Set<string>();
    const jsonStr = JSON.stringify(mockData);

    // Common icons to use
    const commonIcons = ['Check', 'X', 'Star', 'Zap', 'Shield', 'Users', 'TrendingUp', 'Award'];

    if (jsonStr.includes('Icon') || jsonStr.includes('icon')) {
      commonIcons.forEach(icon => icons.add(icon));
    }

    return Array.from(icons);
  }

  private generateStoryContent(
    componentName: string,
    propsInterfaceName: string,
    mockData: any,
    icons: string[]
  ): string {
    const iconImports = icons.length > 0
      ? `import { ${icons.join(', ')} } from 'lucide-react';\n`
      : '';

    const mockDataStr = JSON.stringify(mockData, null, 6)
      .replace(/"<IconPlaceholder \/>"/g, '<Check className="w-5 h-5" />')
      .replace(/\\"/g, '"');

    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';
${iconImports}
const meta: Meta<typeof ${componentName}> = {
  title: 'Sections/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: ${mockDataStr},
};
`;
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📖 Story Auto-Generator

Usage:
  npm run generate:story <component-name>
  npm run generate:story --all

Examples:
  npm run generate:story HeroSection
  npm run generate:story --all

Features:
  ✨ Intelligent mock data generation
  🇮🇹 Italian-first content
  🎨 Automatic icon detection
  📊 Realistic data based on context
    `);
    process.exit(0);
  }

  const generator = new StoryGenerator();

  if (args[0] === '--all') {
    console.log('🚀 Generating stories for all components...\n');

    const componentsDir = path.join(__dirname, '..', 'components');
    const categories = fs.readdirSync(componentsDir);

    for (const category of categories) {
      const categoryPath = path.join(componentsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const components = fs.readdirSync(categoryPath);
      for (const component of components) {
        const componentPath = path.join(categoryPath, component);
        if (!fs.statSync(componentPath).isDirectory()) continue;

        await generator.generateStory(componentPath);
      }
    }

    console.log('\n✅ All stories generated successfully!');
  } else {
    const componentName = args[0];

    // Find component
    const componentsDir = path.join(__dirname, '..', 'components');
    const categories = fs.readdirSync(componentsDir);

    let found = false;
    for (const category of categories) {
      const categoryPath = path.join(componentsDir, category);
      const componentPath = path.join(categoryPath, componentName);

      if (fs.existsSync(componentPath)) {
        await generator.generateStory(componentPath);
        found = true;
        break;
      }
    }

    if (!found) {
      console.error(`❌ Component not found: ${componentName}`);
      process.exit(1);
    }
  }
}

main().catch(console.error);
