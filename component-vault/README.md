# Component Vault

> Una moderna libreria UI con componenti React riutilizzabili, sistema di design integrato e workflow automatizzati.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

## Caratteristiche

- **94+ Componenti**: UI components, sections, effects pronti all'uso
- **TypeScript First**: Type-safety completo con props documentate
- **Design System**: Token standardizzati per colori, spaziatura, tipografia
- **Accessibilità**: Componenti WCAG 2.1 AA compliant
- **Performance**: Bundle ottimizzati con tree-shaking
- **Testing**: Test automatici con Vitest + Testing Library
- **Storybook**: Documentazione interattiva dei componenti
- **Agents System**: Workflow automatizzati per sviluppo e QA

## Installazione

```bash
npm install @deve1993/ui-library
# oppure
yarn add @deve1993/ui-library
# oppure
pnpm add @deve1993/ui-library
```

## Quick Start

```tsx
import { Button, Card, Modal } from '@deve1993/ui-library'
import '@deve1993/ui-library/styles'

function App() {
  return (
    <Card>
      <Button variant="primary" size="lg">
        Click me
      </Button>
    </Card>
  )
}
```

## Sviluppo

### Prerequisiti

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Clone repository
git clone https://github.com/deve1993/UI-LIBRARY.git
cd UI-LIBRARY/component-vault

# Installa dipendenze
npm install

# Avvia Storybook
npm run storybook

# Build library
npm run build

# Run tests
npm test
```

## Scripts Disponibili

### Development

```bash
npm run storybook          # Avvia Storybook dev server
npm run build-storybook    # Build static Storybook
npm run build              # Build library per pubblicazione
npm run lint               # Lint codebase
npm run type-check         # TypeScript validation
```

### Testing

```bash
npm test                   # Run tests
npm run test:watch         # Watch mode
npm run test:ui            # Vitest UI
npm run test:coverage      # Coverage report
npm run test:stories       # Test Storybook stories
```

### Validation

```bash
npm run validate-components           # Valida tutti i componenti
npm run check-dependencies            # Verifica dipendenze
npm run check-dependencies:fix        # Fix dipendenze automaticamente
```

### Generazione

```bash
npm run generate-component            # Genera nuovo componente
npm run generate:story                # Genera Storybook story
npm run generate:test                 # Genera test per componente
npm run generate:test:all             # Genera test per tutti i componenti
npm run generate:test:priority        # Genera test prioritari
```

## Sistema Agents

Component Vault include 5 agents specializzati per automatizzare workflow comuni:

### 1. Test Generator Agent

Genera automaticamente test suite complete per i componenti.

```bash
# Analizza coverage attuale
npm run generate:test -- analyze

# Genera test per componente
npm run generate:test -- generate Button

# Genera tutti i test mancanti
npm run generate:test:all

# Genera test prioritari (HIGH priority)
npm run generate:test:priority
```

**Funzionalità**:
- Analisi prop types da file `.types.ts`
- Test per rendering, props, eventi, accessibility
- Snapshot testing
- Keyboard navigation tests
- Jest-axe integration per WCAG compliance

### 2. Dependency Migrator Agent

Gestisce upgrade sicuri delle dipendenze con migration plans.

```bash
# Audit dipendenze outdated
npm run migrate:audit

# Visualizza piano di migrazione
npm run migrate:plan -- storybook

# Update sicuri (patch/minor)
npm run migrate:safe

# Migra tutte le dipendenze
npm run migrate:all
```

**Migration Plans** inclusi:
- Storybook 8 → 10
- Tailwind CSS 3 → 4
- ESLint 8 → 9
- Automatic rollback su errori

### 3. Performance Auditor Agent

Analizza performance e ottimizza bundle size.

```bash
# Analisi performance completa
npm run performance:audit

# Analizza solo bundle size
npm run performance:bundle

# Detect unnecessary re-renders
npm run performance:renders
```

**Metriche analizzate**:
- Bundle size per componente
- Inline functions detection
- Missing React.memo/useCallback
- Component complexity metrics
- Memory leaks detection

### 4. Accessibility Auditor Agent

Verifica compliance WCAG 2.1 AA e suggerisce fix.

```bash
# Audit accessibilità completo
npm run a11y:audit

# Auto-fix issues comuni
npm run a11y:fix

# Test keyboard navigation
npm run a11y:test
```

**Checks**:
- ARIA attributes validation
- Alt text per immagini
- Form labels association
- Color contrast ratios
- Semantic HTML usage
- Keyboard navigation support

### 5. Release Manager Agent

Automatizza processo di release con semantic versioning.

```bash
# Prepara release (patch/minor/major)
npm run release:prepare -- patch

# Preview changelog
npm run release:preview

# Publish su NPM
npm run release:publish
```

**Workflow**:
1. Pre-release checks (tests, build, lint)
2. Version bump (semantic)
3. CHANGELOG.md generation
4. Git commit + tag
5. NPM publish
6. GitHub release

## Architettura Componenti

```
component-vault/
├── components/
│   ├── ui/              # UI Components (Button, Card, Modal, ...)
│   ├── sections/        # Page Sections (Hero, Features, Pricing, ...)
│   └── effects/         # Visual Effects (Particles, Gradients, ...)
├── design-system/       # Design tokens e temi
├── scripts/             # Automation scripts
└── styles/              # Global styles
```

### Struttura Componente

Ogni componente segue questa struttura:

```
Button/
├── Button.tsx           # Implementazione componente
├── Button.types.ts      # TypeScript interfaces
├── Button.stories.tsx   # Storybook stories
├── Button.test.tsx      # Test suite
└── index.ts             # Exports
```

## Design System

### Design Tokens

```tsx
import { colors, spacing, typography } from '@deve1993/ui-library/design-system'

// Colori
colors.primary.DEFAULT    // #3B82F6
colors.secondary.DEFAULT  // #8B5CF6

// Spaziatura
spacing.xs  // 4px
spacing.sm  // 8px
spacing.md  // 16px
spacing.lg  // 24px
spacing.xl  // 32px

// Tipografia
typography.fontFamily.sans  // Inter, system-ui, ...
typography.fontSize.base    // 16px
typography.fontWeight.bold  // 700
```

### Theming

```tsx
import { ThemeProvider } from '@deve1993/ui-library'

function App() {
  return (
    <ThemeProvider theme="dark">
      {/* Your app */}
    </ThemeProvider>
  )
}
```

## Testing

### Eseguire i Test

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Scrivere Test

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Publishing

### Pre-publish Checklist

```bash
# 1. Valida componenti
npm run validate-components

# 2. Run tests
npm run test:coverage

# 3. Check dependencies
npm run check-dependencies

# 4. Build library
npm run build

# 5. Test build localmente
npm pack
npm install ./deve1993-ui-library-1.0.0.tgz
```

### Publish su NPM

```bash
# Metodo manuale
npm run build
npm test
npm publish

# Con Release Manager Agent (raccomandato)
npm run release:prepare -- minor
npm run release:publish
```

## Workflow Automatici

### Pre-commit Hook

Ogni commit esegue automaticamente:

```bash
npm run validate-components  # Valida struttura componenti
npm run check-dependencies   # Verifica dipendenze
npm run type-check          # TypeScript validation
```

### CI/CD Pipeline

- ✅ Lint & Type check
- ✅ Run test suite
- ✅ Build library
- ✅ Test bundle size
- ✅ Accessibility audit
- ✅ Deploy Storybook

## Contributing

1. Fork il repository
2. Crea un branch per la feature (`git checkout -b feature/amazing-feature`)
3. Commit le modifiche (`git commit -m 'feat: add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

### Commit Convention

Utilizziamo [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: aggiunge nuovo componente
fix: corregge bug in Button
docs: aggiorna README
style: formattazione codice
refactor: ristruttura componente
test: aggiunge test per Modal
chore: aggiorna dipendenze
```

## Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## License

MIT © [deve1993](https://github.com/deve1993)

## Links

- [NPM Package](https://www.npmjs.com/package/@deve1993/ui-library)
- [GitHub Repository](https://github.com/deve1993/UI-LIBRARY)
- [Storybook Documentation](https://deve1993.github.io/UI-LIBRARY)
- [Report Issues](https://github.com/deve1993/UI-LIBRARY/issues)

## Supporto

- GitHub Issues: [Report bugs](https://github.com/deve1993/UI-LIBRARY/issues)
- Discord: [Join community](#)

---

**Generato con Library Agent System v3.0**
Made with ❤️ by [deve1993](https://github.com/deve1993)
