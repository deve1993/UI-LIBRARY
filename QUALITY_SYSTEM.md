# Sistema di Quality Assurance 🛡️

Sistema completo di validazione, testing e automation per garantire componenti di altissima qualità.

## 📋 Indice

- [Overview](#overview)
- [Component Guardian Agent](#component-guardian-agent)
- [Scripts di Automazione](#scripts-di-automazione)
- [Testing](#testing)
- [Quality Checks](#quality-checks)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Workflow Raccomandati](#workflow-raccomandati)
- [Troubleshooting](#troubleshooting)

---

## Overview

Il sistema è composto da:

1. **Component Guardian Meta-Agent** - Agente AI che monitora e corregge automaticamente i problemi
2. **Validation Scripts** - Validazione strutturale dei componenti
3. **Auto-Generators** - Generazione automatica di stories e componenti
4. **Dependency Analyzer** - Verifica dipendenze mancanti o inutilizzate
5. **Component Registry** - Export centralizzato di tutti i componenti
6. **Testing Suite** - Vitest + React Testing Library + Storybook Test Runner
7. **Linting & Formatting** - ESLint strict + Prettier + TypeScript strict mode
8. **Pre-commit Hooks** - Validazione automatica prima di ogni commit

---

## Component Guardian Agent

### Attivazione

Usa il meta-agent component-guardian dalla root del progetto:

```bash
# Tramite Claude Code
@component-guardian audit components
@component-guardian fix [component-name]
@component-guardian health report
```

### Funzionalità

Il Guardian Agent:

- ✅ **Valida** automaticamente tutti i componenti
- 🛠️ **Corregge** problemi comuni (empty stories, type mismatches, missing files)
- 📊 **Genera report** sullo stato di salute dei componenti
- 💡 **Suggerisce** ottimizzazioni e refactoring
- 🚨 **Previene** breaking changes

### Esempio di Report

```
🔍 Eseguendo audit completo...

✅ Componenti Sani: 12/14 (86%)
⚠️ Con Warning: 2/14 (14%)
❌ Con Errori: 0/14 (0%)

⚠️ BenefitsSection
  - Missing test file
  💡 Fix: npm run generate:test BenefitsSection

✅ All components passing validation!
```

---

## Scripts di Automazione

### 1. Validate Components

Valida la struttura e coerenza di tutti i componenti:

```bash
npm run validate-components
```

**Controlli:**
- ✅ Tutti i file richiesti presenti (.tsx, .types.ts, .stories.tsx, etc.)
- ✅ Types importati correttamente
- ✅ Props interface esiste
- ✅ Stories usano tipi corretti
- ✅ Exports corretti in index.ts

### 2. Generate Story

Genera automaticamente stories con mock data realistici:

```bash
# Genera story per un componente specifico
npm run generate:story HeroSection

# Genera stories per tutti i componenti
npm run generate:story --all
```

**Caratteristiche:**
- 🇮🇹 Mock data in italiano
- 🎨 Icone da lucide-react
- 📊 Dati realistici basati sul contesto
- ✨ Completamente tipizzato

**Esempio di output:**

```typescript
export const Default: Story = {
  args: {
    title: 'Trasforma il tuo Business',
    subtitle: 'Soluzione innovativa per accelerare la crescita',
    features: [
      {
        icon: <Check className="w-5 h-5" />,
        title: 'Funzionalità 1',
        description: 'Descrizione dettagliata...'
      },
      // ... 3 more
    ]
  }
};
```

### 3. Check Dependencies

Analizza tutti gli import e verifica le dipendenze:

```bash
# Analisi
npm run check-dependencies

# Auto-fix (installa dipendenze mancanti)
npm run check-dependencies:fix
```

**Rileva:**
- ❌ Dipendenze mancanti
- ⚠️ Dipendenze in devDependencies invece di dependencies
- 🗑️ Dipendenze non utilizzate
- 💡 Suggerimenti di installazione

### 4. Update Registry

Genera export centralizzato di tutti i componenti:

```bash
npm run update-registry
```

Crea `components/index.ts`:

```typescript
// Importa facilmente qualsiasi componente
import { HeroSection, Button, Card } from '@/components';
import type { HeroSectionProps, ButtonProps } from '@/components';
```

### 5. Generate Component

Genera un nuovo componente con struttura completa:

```bash
npm run generate-component <nome> <categoria> "<descrizione>"

# Esempio
npm run generate-component Modal ui "Modal component for dialogs"
```

**Genera:**
- ✅ `Component.tsx` con template
- ✅ `Component.types.ts` con Props interface
- ✅ `Component.stories.tsx` con Default story
- ✅ `Component.test.tsx` con test template
- ✅ `index.ts` con exports
- ✅ `README.md` con documentazione
- ✅ `examples/` con esempi

---

## Testing

### Vitest (Unit & Integration Tests)

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui

# Coverage report
npm run test:coverage
```

**Configurazione:**
- ✅ jsdom environment
- ✅ React Testing Library
- ✅ Coverage reports (HTML, JSON, Text)
- ✅ Auto-cleanup dopo ogni test

**Esempio di test:**

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

### Storybook Test Runner

Testa automaticamente tutte le stories in Storybook:

```bash
# Assicurati che Storybook sia avviato (npm run storybook)
# Poi in un altro terminale:
npm run test:stories
```

**Controlla:**
- ✅ Tutte le stories si renderizzano senza errori
- ✅ Nessun console.error
- ✅ Nessun crash runtime
- ✅ Caricamento di font e immagini

---

## Quality Checks

### TypeScript Strict Mode

**Abilitato** in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

```bash
npm run type-check
```

### ESLint (Strict Rules)

Configurato con regole rigorose:

```bash
npm run lint
```

**Regole principali:**
- ❌ No `any` type
- ❌ No unused variables
- ✅ Type imports espliciti (`import type`)
- ✅ Explicit return types
- ✅ Strict boolean expressions
- ✅ React hooks rules

### Prettier (Code Formatting)

```bash
npx prettier --write .
```

**Configurazione:**
- Single quotes
- 2 spaces
- Trailing commas (ES5)
- 100 char line width

---

## Pre-commit Hooks

### Setup (già configurato)

Husky esegue automaticamente questi checks prima di ogni commit:

```bash
npm run precommit
```

**Include:**
1. ✅ `validate-components` - Valida struttura componenti
2. ✅ `check-dependencies` - Verifica dipendenze
3. ✅ `type-check` - TypeScript compilation check

**Se fallisce:** Il commit viene bloccato finché non risolvi i problemi.

### Bypassare (solo in emergenza)

```bash
git commit --no-verify -m "emergency fix"
```

⚠️ **Usa solo in casi eccezionali!**

---

## Workflow Raccomandati

### 🆕 Creare un Nuovo Componente

```bash
# 1. Genera struttura base
npm run generate-component MyComponent sections "Amazing component"

# 2. Implementa il componente in MyComponent.tsx

# 3. Genera story automatica
npm run generate:story MyComponent

# 4. Personalizza la story se necessario

# 5. Scrivi test in MyComponent.test.tsx

# 6. Valida tutto
npm run validate-components
npm run check-dependencies
npm run type-check

# 7. Commit (pre-commit hook esegue validazione)
git add .
git commit -m "feat: add MyComponent"
```

### 🔧 Modificare un Componente Esistente

```bash
# 1. Modifica il componente

# 2. Aggiorna types se necessario

# 3. Rigenera story se cambi le props
npm run generate:story MyComponent

# 4. Aggiorna test

# 5. Valida
npm run validate-components

# 6. Run tests
npm run test MyComponent

# 7. Commit
git commit -m "feat(MyComponent): add new prop"
```

### 🐛 Fixing Problemi

```bash
# 1. Usa Component Guardian
@component-guardian audit components

# 2. Se rileva problemi, chiedi auto-fix
@component-guardian fix MyComponent

# 3. Oppure manualmente:

# Fix empty stories
npm run generate:story MyComponent

# Fix missing dependencies
npm run check-dependencies:fix

# Validate
npm run validate-components
```

### 📊 Controllo Periodico

```bash
# Daily/Weekly health check
npm run validate-components
npm run check-dependencies
npm run test:coverage

# Update registry
npm run update-registry

# Chiedi report al Guardian
@component-guardian health report
```

---

## Troubleshooting

### "Cannot read properties of undefined" nelle stories

**Causa:** Story con props vuoti o non corrispondenti ai types.

**Fix:**
```bash
npm run generate:story <ComponentName>
```

### "Module not found" errors

**Causa:** Dipendenza non installata.

**Fix:**
```bash
npm run check-dependencies:fix
```

### Type errors dopo modifica

**Causa:** Types non sincronizzati tra `.types.ts`, component e stories.

**Fix:**
```bash
# Usa Component Guardian
@component-guardian sync types <ComponentName>

# Oppure manualmente controlla:
npm run type-check
npm run validate-components
```

### Pre-commit hook fallisce

**Causa:** Problemi di validazione o type checking.

**Fix:**
```bash
# Vedi dettagli errore
npm run validate-components
npm run check-dependencies
npm run type-check

# Risolvi gli errori specifici
# Poi commit di nuovo
```

### Storybook stories non si caricano

**Causa:** Story con dati mock incompleti.

**Fix:**
```bash
npm run generate:story <ComponentName>
```

### Test failure dopo modifica componente

**Causa:** Test obsoleti.

**Fix:**
1. Aggiorna i test manualmente
2. Assicurati che le props corrispondano ai nuovi types
3. Run `npm run test:watch` per iterare velocemente

---

## Best Practices

### ✅ DO

- ✅ Usa `npm run generate-component` per nuovi componenti
- ✅ Rigenera stories dopo modifiche ai types
- ✅ Scrivi test per logica complessa
- ✅ Valida prima di commit
- ✅ Usa Component Guardian per audit periodici
- ✅ Mantieni types separati in `.types.ts`
- ✅ Esporta types da `index.ts`

### ❌ DON'T

- ❌ Non creare file manualmente (usa generator)
- ❌ Non fare commit senza validare
- ❌ Non bypassare pre-commit hook
- ❌ Non usare `any` type
- ❌ Non lasciare stories vuote con `// TODO`
- ❌ Non duplicare types inline
- ❌ Non importare componenti da path relativi lunghi (usa registry)

---

## Metrics & Goals

### Target Quality Metrics

- **Component Health**: >90% componenti "Healthy"
- **Test Coverage**: >80%
- **TypeScript Errors**: 0
- **ESLint Warnings**: 0
- **Empty Stories**: 0
- **Missing Dependencies**: 0
- **Pre-commit Success Rate**: 100%

### Come Migliorare

1. **Audit settimanale**: `@component-guardian health report`
2. **Fix proattivo**: Risolvi warning prima che diventino errori
3. **Test coverage**: Aggiungi test per componenti sotto 80%
4. **Documentation**: Mantieni README aggiornati
5. **Refactoring**: Usa suggerimenti del Guardian

---

## Supporto

### In caso di problemi

1. **Controlla questa documentazione**
2. **Usa Component Guardian**: `@component-guardian help`
3. **Esegui validation**: `npm run validate-components`
4. **Check dependencies**: `npm run check-dependencies`
5. **Leggi error messages**: Sono dettagliati e actionable

### Comandi Utili

```bash
# Health check completo
npm run validate-components && \\
npm run check-dependencies && \\
npm run type-check && \\
npm run test

# Quick fix
npm run generate:story --all && \\
npm run check-dependencies:fix && \\
npm run update-registry

# Clean slate
rm -rf node_modules package-lock.json && \\
npm install
```

---

## Aggiornamenti Futuri

Sistema progettato per estendersi con:

- 🎨 **Visual Regression Testing** (Chromatic/Percy)
- 🚀 **CI/CD Pipeline** (GitHub Actions)
- 📊 **Component Analytics** (usage tracking)
- 🤖 **AI-Powered Refactoring** (auto-optimization)
- 📱 **Mobile Testing** (responsive checks)
- ♿ **Accessibility Testing** (automated a11y)

---

**Versione**: 2.0.0
**Ultimo aggiornamento**: 2025-10-23
**Maintainer**: Component Guardian Agent
