# Linee Guida per lo Sviluppo Componenti

## 🎯 Obiettivo

Questo documento definisce le best practices per creare componenti consistenti, type-safe e manutenibili.

## 📁 Struttura File Obbligatoria

Ogni componente DEVE avere questa struttura:

```
ComponentName/
├── ComponentName.tsx          # Implementazione componente
├── ComponentName.types.ts     # Definizioni TypeScript
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests (opzionale ma raccomandato)
├── index.ts                   # Exports
├── README.md                  # Documentazione
└── examples/
    ├── basic.tsx              # Esempio base
    └── advanced.tsx           # Esempio avanzato
```

## ✅ Checklist Creazione Componente

### 1. File .types.ts

- [ ] Esporta interface `ComponentNameProps`
- [ ] Tutti i tipi sono esportati (non inline)
- [ ] Props hanno JSDoc comments
- [ ] Ogni prop opzionale ha `?` e default documentato

```typescript
/**
 * ComponentName Props
 */
export interface ComponentNameProps {
  /** Descrizione prop */
  title: string;
  /** Optional className */
  className?: string; // Default: ''
}
```

### 2. File .tsx

- [ ] Importa tipi DA `.types.ts` (NON definiti inline)
- [ ] Usa `React.FC<ComponentNameProps>`
- [ ] Ha destructuring con defaults per props opzionali
- [ ] Esporta anche `default`

```typescript
import React from 'react';
import type { ComponentNameProps } from './ComponentName.types';

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  className = '',
}) => {
  return <div className={className}>{title}</div>;
};

export default ComponentName;
```

### 3. File .stories.tsx

- [ ] Importa componente E tipi
- [ ] Usa `typeof ComponentName` per meta
- [ ] Ha almeno 3 variants (Default, WithProps, Advanced)
- [ ] Props negli args DEVONO corrispondere a quelli in .types.ts

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example Title',
  },
};
```

### 4. File index.ts

- [ ] Esporta componente con named export E default
- [ ] Esporta TUTTI i tipi da `.types.ts`
- [ ] NON esporta tipi dal componente direttamente

```typescript
export { ComponentName, default } from './ComponentName';
export type { ComponentNameProps, OtherType } from './ComponentName.types';
```

### 5. README.md

- [ ] Descrizione componente
- [ ] Tabella props completa
- [ ] Esempi di utilizzo
- [ ] Note accessibilità
- [ ] Dipendenze

## 🚨 Errori Comuni da Evitare

### ❌ SBAGLIATO: Tipi inline nel componente

```typescript
// ComponentName.tsx
export interface ComponentNameProps {  // ❌ NON fare così!
  title: string;
}
```

### ✅ CORRETTO: Tipi in file separato

```typescript
// ComponentName.types.ts
export interface ComponentNameProps {
  title: string;
}

// ComponentName.tsx
import type { ComponentNameProps } from './ComponentName.types';
```

### ❌ SBAGLIATO: Props diverse tra tipi e stories

```typescript
// .types.ts
export interface Props {
  title: string;
}

// .stories.tsx
export const Default: Story = {
  args: {
    heading: 'Title',  // ❌ Prop name diverso!
  },
};
```

### ✅ CORRETTO: Props identiche

```typescript
// .types.ts
export interface Props {
  title: string;
}

// .stories.tsx
export const Default: Story = {
  args: {
    title: 'Title',  // ✅ Stesso nome!
  },
};
```

### ❌ SBAGLIATO: Array senza optional chaining

```typescript
{features.map(f => ...)}  // ❌ Crash se features è undefined
```

### ✅ CORRETTO: Con controlli

```typescript
{features && features.map(f => ...)}
// oppure
{features?.map(f => ...)}
```

## 🔧 Tool di Validazione

### Validare Componenti Esistenti

```bash
npm run validate-components
```

Controlla che tutti i componenti seguano le linee guida.

### Generare Nuovo Componente

```bash
npm run generate-component <nome> <categoria> <descrizione>
```

Esempio:
```bash
npm run generate-component hero-advanced sections "Hero section with advanced features"
```

Crea automaticamente la struttura corretta.

## 📝 Workflow Consigliato

1. **Genera componente**: `npm run generate-component`
2. **Implementa logica**: Modifica `.tsx` e `.types.ts`
3. **Crea stories**: Aggiungi variants in `.stories.tsx`
4. **Testa visualmente**: `npm run storybook`
5. **Valida**: `npm run validate-components`
6. **Documenta**: Completa README.md
7. **Commit**: Solo se validazione passa

## 🎨 Convenzioni Naming

- **Componenti**: PascalCase (`HeroSection`, `ButtonPrimary`)
- **File**: PascalCase + estensione (`HeroSection.tsx`)
- **Props interface**: `ComponentNameProps`
- **Cartelle**: PascalCase (`HeroSection/`)
- **Esempi**: camelCase (`basic.tsx`, `advanced.tsx`)

## 🧪 Testing

Ogni componente dovrebbe avere:

1. **Visual testing**: Storybook stories
2. **Unit testing**: `.test.tsx` con Vitest
3. **Type testing**: TypeScript compilation

```bash
# Run tests
npm test

# Run Storybook
npm run storybook

# Type check
npm run type-check
```

## 📦 Organizzazione Categorie

```
components/
├── ui/          # Componenti UI atomici (Button, Input, Card)
├── sections/    # Sezioni complete (Hero, Features, CTA)
└── layout/      # Layout components (Container, Grid)
```

## 🔄 Processo di Review

Prima di ogni commit:

1. ✅ `npm run validate-components` passa
2. ✅ `npm run type-check` passa
3. ✅ `npm test` passa
4. ✅ Stories funzionano in Storybook
5. ✅ README.md è aggiornato

## 🆘 Troubleshooting

### "Cannot read properties of undefined"

**Causa**: Props array/oggetto non gestito quando undefined

**Soluzione**:
```typescript
// Aggiungi optional chaining
{items?.map(item => ...)}

// O default value
const items = props.items || [];
```

### "Property does not exist on type"

**Causa**: Props in stories non corrispondono a .types.ts

**Soluzione**: Verifica che ogni prop in stories esista in .types.ts

### "Module not found"

**Causa**: Import path errato

**Soluzione**: Usa sempre import dai file corretti:
- Tipi: `from './Component.types'`
- Componente: `from './Component'`

## 📚 Risorse

- [Storybook Docs](https://storybook.js.org/docs/react/get-started/introduction)
- [TypeScript React](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)
