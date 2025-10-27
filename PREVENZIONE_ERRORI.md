# 🛡️ Sistema di Prevenzione Errori - VERSIONE 2.0

> **Aggiornamento Maggiore**: Sistema completo di Quality Assurance con Meta-Agent, Auto-Generators, Testing e Pre-commit Hooks

## ❌ Problema Riscontrato

Durante lo sviluppo sono emersi errori del tipo:
```
Error: Cannot read properties of undefined (reading 'length')
```

**Cause principali**:
1. Disallineamento tra tipi definiti, implementazione e stories
2. Stories vuote con `// TODO: Add default props`
3. Dipendenze mancanti (es. `lucide-react`)
4. File mancanti o incompleti

## ✅ Soluzioni Implementate (Versione 2.0)

### 🤖 0. Component Guardian Meta-Agent (NUOVO!)

**File**: `.claude/agents/component-guardian.md`

**Il sistema più potente**: Un agente AI che monitora, valida e corregge automaticamente i problemi.

**Come usarlo**:
```bash
@component-guardian audit components      # Audit completo
@component-guardian fix <component>       # Correggi componente
@component-guardian health report         # Report dello stato
@component-guardian sync types <comp>     # Sincronizza types
```

**Funzionalità**:
- ✅ Audit automatico completo
- 🛠️ Auto-fix per problemi comuni
- 📊 Health reports dettagliati
- 💡 Suggerimenti proattivi
- 🚨 Prevenzione breaking changes

**Esempio**:
```
@component-guardian audit components

🔍 Eseguendo audit completo...

✅ Componenti Sani: 12/14 (86%)
⚠️ Con Warning: 2/14 (14%)

⚠️ BenefitsSection
  - Missing test file
  💡 Fix: npm run generate:test BenefitsSection
```

### 1. 📝 Script di Validazione Automatica

**File**: `scripts/validate-components.ts`

**Cosa fa**:
- Verifica che ogni componente abbia tutti i file obbligatori
- Controlla che i tipi siano importati correttamente
- Verifica corrispondenza tra `.types.ts` e `.tsx`
- Segnala warnings per best practices non seguite

**Come usarlo**:
```bash
npm run validate-components
```

**Output esempio**:
```
🔍 Validating components...

✅ 14/14 components are valid
🎉 All components are valid!
```

Se ci sono errori:
```
📦 ComponentName:
  ❌ ERROR: Missing file: ComponentName.types.ts
  ⚠️  WARNING: Component does not import types from .types.ts file
```

### 2. 🏗️ Generator Componenti

**File**: `scripts/generate-component.ts`

**Cosa fa**:
- Crea automaticamente la struttura completa di un nuovo componente
- Genera tutti i file con template corretti
- Assicura che i file siano allineati fin dall'inizio

**Come usarlo**:
```bash
npm run generate-component <nome> <categoria> <descrizione>
```

**Esempio**:
```bash
npm run generate-component pricing-card ui "Card for pricing tiers"
```

**Genera**:
```
components/ui/PricingCard/
├── PricingCard.tsx           ✅ Componente con tipi corretti
├── PricingCard.types.ts      ✅ Interfacce TypeScript
├── PricingCard.stories.tsx   ✅ Storybook stories
├── PricingCard.test.tsx      ✅ Unit tests
├── index.ts                  ✅ Exports configurati
├── README.md                 ✅ Template documentazione
└── examples/
    ├── basic.tsx             ✅ Esempio base
    └── advanced.tsx          ✅ Esempio avanzato
```

### 3. ✨ Story Auto-Generator (NUOVO!)

**File**: `scripts/generate-story.ts`

**Il problema che risolve**: Stories vuote con `// TODO: Add default props` causavano errori runtime.

**Cosa fa**:
- Legge i file `.types.ts` e analizza le interfacce
- Genera automaticamente mock data realistici in italiano
- Crea stories complete e funzionanti
- Rileva e importa icone da `lucide-react`

**Come usarlo**:
```bash
# Genera story per un componente
npm run generate:story HeroSection

# Genera stories per tutti i componenti
npm run generate:story --all
```

**Esempio di output**:
```typescript
export const Default: Story = {
  args: {
    title: 'Trasforma il tuo Business',
    subtitle: 'Soluzione innovativa per accelerare la crescita',
    features: [
      {
        icon: <Check className="w-5 h-5" />,
        title: 'Funzionalità Potente',
        description: 'Descrizione dettagliata della funzionalità...'
      },
      // ... mock data realistici generati automaticamente
    ],
    testimonials: [
      {
        name: 'Marco Rossi',
        company: 'TechStart SRL',
        quote: 'Questa soluzione ha trasformato il nostro workflow...',
        rating: 5,
        image: 'https://i.pravatar.cc/150?img=12'
      }
    ]
  }
};
```

**Mock Data Intelligenti**:
- 🇮🇹 Nomi italiani (Marco Rossi, Laura Bianchi, etc.)
- 🏢 Aziende italiane (TechStart SRL, Innovation Hub)
- 📍 Città italiane (Milano, Roma, Firenze)
- 📧 Email realistiche
- 📞 Numeri di telefono italiani (+39 ...)
- 🖼️ Immagini da pravatar.cc
- ⭐ Rating 4-5 stelle
- 📊 Dati numerici sensati

### 4. 📦 Dependency Analyzer (NUOVO!)

**File**: `scripts/check-dependencies.ts`

**Il problema che risolve**: Import non funzionanti perché dipendenze mancanti in `package.json`.

**Cosa fa**:
- Scansiona tutti i file `.ts/.tsx/.js/.jsx`
- Estrae tutti gli import
- Verifica che ogni dipendenza sia in `package.json`
- Rileva dipendenze non utilizzate
- Auto-fix installando dipendenze mancanti

**Come usarlo**:
```bash
# Analisi (solo report)
npm run check-dependencies

# Auto-fix (installa dipendenze mancanti)
npm run check-dependencies:fix
```

**Output esempio**:
```
📊 Dependency Analysis Report

📁 Files analyzed: 145
📦 Imports found: 387

❌ lucide-react (12 occurrences)
   📄 components/sections/BenefitsSection/BenefitsSection.stories.tsx
   📄 components/sections/PricingSection/PricingSection.tsx
   ... and 10 more files

💡 Install missing dependencies:
   npm install lucide-react

🗑️ Potentially unused dependencies (2):
   • old-package
   • deprecated-lib
```

### 5. 🗂️ Component Registry (NUOVO!)

**File**: `scripts/update-registry.ts`

**Il problema che risolve**: Import paths troppo lunghi e complessi.

**Cosa fa**:
- Scansiona tutti i componenti
- Genera `components/index.ts` centralizzato
- Export automatico di componenti e types
- Import semplificati

**Come usarlo**:
```bash
npm run update-registry
```

**Prima**:
```typescript
import { HeroSection } from '../../../components/sections/HeroSection';
import type { HeroSectionProps } from '../../../components/sections/HeroSection/HeroSection.types';
```

**Dopo**:
```typescript
import { HeroSection } from '@/components';
import type { HeroSectionProps } from '@/components';
```

### 6. 📚 Documentazione Guidelines

**File**: `COMPONENT_GUIDELINES.md`

**Contiene**:
- ✅ Checklist completa per creazione componenti
- ❌ Errori comuni da evitare
- 📝 Convenzioni di naming
- 🔧 Workflow consigliato
- 🆘 Troubleshooting

**Leggi prima di creare nuovi componenti!**

### 7. 🔄 Pre-commit Hooks con Husky (AGGIORNATO!)

**Già configurato e attivo!** ✅

**Script**: `precommit` in `package.json`

```json
"precommit": "npm run validate-components && npm run check-dependencies && npm run type-check"
```

**Cosa fa**:
1. ✅ Valida struttura componenti
2. ✅ Verifica dipendenze
3. ✅ Type checking TypeScript

**Se fallisce**: Il commit viene **bloccato** automaticamente fino a che non risolvi gli errori.

**Bypassare** (solo in emergenza):
```bash
git commit --no-verify -m "emergency fix"
```

### 8. 🧪 Testing Suite Completo (NUOVO!)

**Vitest + React Testing Library + Storybook Test Runner**

**Unit & Integration Tests**:
```bash
npm run test              # Run una volta
npm run test:watch        # Watch mode
npm run test:ui           # UI interattiva
npm run test:coverage     # Coverage report
```

**Storybook Test Runner**:
```bash
# Avvia Storybook
npm run storybook

# In altro terminale
npm run test:stories      # Testa tutte le stories
```

**Controlla**:
- ✅ Tutte le stories si renderizzano
- ✅ Nessun console.error
- ✅ Nessun crash runtime

### 9. 🎨 Linting & Formatting (NUOVO!)

**ESLint Strict Mode**:
```bash
npm run lint
```

**Regole rigide**:
- ❌ No `any` type
- ❌ No unused variables
- ✅ Explicit return types
- ✅ Type imports espliciti
- ✅ Strict boolean expressions
- ✅ React hooks rules

**Prettier**:
```bash
npx prettier --write .
```

**Auto-formattazione** con regole consistenti.

## 🎯 Workflow Corretto (Aggiornato v2.0)

### Per NUOVI componenti:

```bash
# 1. Genera struttura completa
npm run generate-component hero-advanced sections "Advanced hero section"

# 2. Implementa il componente
# Modifica i file generati (.tsx, .types.ts)

# 3. Genera story con mock data automatici
npm run generate:story HeroAdvanced

# 4. (Opzionale) Personalizza story se necessario

# 5. Scrivi test in HeroAdvanced.test.tsx

# 6. Testa visivamente
npm run storybook

# 7. Valida tutto
npm run validate-components
npm run check-dependencies
npm run type-check

# 8. Run test
npm run test HeroAdvanced

# 9. Commit (pre-commit hook esegue validazione automatica)
git add .
git commit -m "feat: add HeroAdvanced component"
```

### Per componenti ESISTENTI:

```bash
# 1. Prima di modificare, audit
@component-guardian audit components

# 2. Fai le modifiche necessarie

# 3. Se modifichi types, rigenera story
npm run generate:story ComponentName

# 4. Aggiorna test se necessario

# 5. Testa in Storybook
npm run storybook

# 6. Valida tutto
npm run validate-components
npm run check-dependencies
npm run type-check

# 7. Run test
npm run test ComponentName

# 8. Commit (validazione automatica via pre-commit hook)
git commit -m "feat(ComponentName): add new feature"
```

### Workflow Rapido di Fix:

```bash
# Se Component Guardian rileva problemi
@component-guardian fix ComponentName

# Oppure manualmente:

# Fix empty stories
npm run generate:story ComponentName

# Fix missing dependencies
npm run check-dependencies:fix

# Update registry
npm run update-registry

# Valida
npm run validate-components
```

## 🚨 Regole d'Oro

### 1. **MAI tipi inline nei componenti**

❌ SBAGLIATO:
```typescript
// Component.tsx
export interface ComponentProps {  // ❌
  title: string;
}
```

✅ CORRETTO:
```typescript
// Component.types.ts
export interface ComponentProps {
  title: string;
}

// Component.tsx
import type { ComponentProps } from './Component.types';
```

### 2. **Props IDENTICHE in tipi e stories**

❌ SBAGLIATO:
```typescript
// .types.ts
interface Props {
  label: string;
}

// .stories.tsx
args: {
  text: 'Hello'  // ❌ Nome diverso!
}
```

✅ CORRETTO:
```typescript
// .types.ts
interface Props {
  label: string;
}

// .stories.tsx
args: {
  label: 'Hello'  // ✅ Stesso nome!
}
```

### 3. **SEMPRE controlli per array/oggetti**

❌ SBAGLIATO:
```typescript
{items.map(...)}  // ❌ Crash se items è undefined
```

✅ CORRETTO:
```typescript
{items?.map(...)}
// oppure
{items && items.map(...)}
// oppure con default
const safeItems = items || [];
```

### 4. **Exports corretti in index.ts**

❌ SBAGLIATO:
```typescript
// index.ts
export { Component } from './Component';
export type { Props } from './Component';  // ❌
```

✅ CORRETTO:
```typescript
// index.ts
export { Component, default } from './Component';
export type { Props } from './Component.types';  // ✅
```

## 📊 Checklist Prima di Ogni Commit

- [ ] `npm run validate-components` passa senza errori
- [ ] `npm run type-check` passa senza errori
- [ ] `npm run storybook` mostra il componente correttamente
- [ ] Nessun errore nella console del browser
- [ ] README.md è aggiornato (se applicabile)

## 🆘 Troubleshooting Rapido

### Errore: "Cannot read properties of undefined"

**Soluzione**:
1. Trova quale array/oggetto causa l'errore
2. Aggiungi optional chaining: `items?.map()`
3. Oppure default value: `const items = props.items || []`

### Errore: "Property does not exist on type"

**Soluzione**:
1. Verifica che la prop sia definita in `.types.ts`
2. Verifica che le stories usino lo stesso nome
3. Riesegui `npm run validate-components`

### Componente non appare in Storybook

**Soluzione**:
1. Verifica che `.stories.tsx` usi `typeof Component`
2. Verifica che gli args corrispondano ai tipi
3. Controlla console browser per errori
4. Riavvia Storybook

## 📈 Benefici

✅ **Nessun più errore "undefined"** - Validazione previene problemi
✅ **Sviluppo più veloce** - Generator crea struttura corretta
✅ **Codice consistente** - Tutti seguono le stesse regole
✅ **Meno bug** - Controlli automatici catturano errori
✅ **Onboarding facile** - Guidelines chiare per nuovi sviluppatori

## 🔧 Comandi Disponibili (Completi v2.0)

```bash
# ═════════════════════════════════════════════════════════
# VALIDATION & QUALITY
# ═════════════════════════════════════════════════════════

npm run validate-components      # Valida struttura componenti
npm run check-dependencies       # Analizza dipendenze
npm run check-dependencies:fix   # Auto-fix dipendenze mancanti
npm run type-check               # TypeScript check
npm run lint                     # ESLint check
npm run precommit                # Tutti i check pre-commit

# ═════════════════════════════════════════════════════════
# GENERATORS
# ═════════════════════════════════════════════════════════

npm run generate-component <nome> <categoria> "<desc>"  # Nuovo componente
npm run generate:story <nome>         # Genera story con mock data
npm run generate:story --all          # Genera tutte le stories
npm run update-registry               # Aggiorna component registry

# ═════════════════════════════════════════════════════════
# TESTING
# ═════════════════════════════════════════════════════════

npm run test                     # Run tests
npm run test:watch               # Watch mode
npm run test:ui                  # UI interattiva
npm run test:coverage            # Coverage report
npm run test:stories             # Test Storybook stories

# ═════════════════════════════════════════════════════════
# DEVELOPMENT
# ═════════════════════════════════════════════════════════

npm run storybook                # Avvia Storybook
npm run build-storybook          # Build Storybook statico
npm run build                    # Build libreria

# ═════════════════════════════════════════════════════════
# FORMATTING
# ═════════════════════════════════════════════════════════

npx prettier --write .           # Format tutti i file
npx prettier --check .           # Check formatting

# ═════════════════════════════════════════════════════════
# COMPONENT GUARDIAN (AI Agent)
# ═════════════════════════════════════════════════════════

@component-guardian audit components        # Audit completo
@component-guardian fix <component>         # Auto-fix componente
@component-guardian health report           # Report stato
@component-guardian sync types <component>  # Sync types
```

## 📝 Note Finali (v2.0)

- **Usa Component Guardian** per audit e fix automatici
- **Usa sempre il generator** per nuovi componenti
- **Genera stories automaticamente** invece di scriverle a mano
- **Valida sempre** prima di commit (o usa pre-commit hook)
- **Leggi le guidelines** quando hai dubbi
- **Segui le convenzioni** per codice consistente
- **Scrivi test** per logica complessa
- **Usa Component Registry** per import semplificati

---

## 📚 Documentazione Completa

**In caso di problemi, consulta**:
1. **`QUALITY_SYSTEM.md`** - Sistema completo di Quality Assurance (NUOVO!)
2. **`COMPONENT_GUIDELINES.md`** - Documentazione tecnica completa
3. **`PREVENZIONE_ERRORI.md`** - Questo documento (Quick Reference)
4. **`.claude/agents/component-guardian.md`** - Meta-Agent documentation
5. **`npm run validate-components`** - Output errori
6. **Examples folder** - Esempi funzionanti

## 🎯 Target Metrics (v2.0)

- **Component Health**: >90% "Healthy" ✅
- **Test Coverage**: >80% ✅
- **TypeScript Errors**: 0 ✅
- **ESLint Warnings**: 0 ✅
- **Empty Stories**: 0 ✅
- **Missing Dependencies**: 0 ✅
- **Pre-commit Success**: 100% ✅

---

**Versione**: 2.0.0
**Ultimo Aggiornamento**: 2025-10-23
**Maintainer**: Component Guardian Agent
