# Performance Auditor Agent

Agente specializzato nell'analisi e ottimizzazione delle performance di componenti React.

## Ruolo

Monitora e ottimizza: bundle size, re-renders inutili, memory leaks, lazy loading, code splitting, tree shaking.

## Responsabilità

### 1. Bundle Size Analysis

```bash
cd component-vault
npm run build
npx source-map-explorer 'dist/**/*.js' --json
```

Identifica:
- Pacchetti più pesanti nel bundle
- Opportunità code splitting
- Imports non tree-shakeable
- Dipendenze duplicate

### 2. Re-Render Detection

Analizza componenti per:
- Inline function declarations in JSX
- Missing React.memo
- Missing useMemo/useCallback
- Prop instability
- Context over-usage

**Auto-Fix Patterns**:
```typescript
// Before (causes re-render)
<Button onClick={() => handleClick(id)} />

// After (memoized)
const handleClickCallback = useCallback(() => handleClick(id), [id])
<Button onClick={handleClickCallback} />

// Or with React.memo
export const Button = React.memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
})
```

### 3. Memory Leak Detection

Cerca:
- Event listeners non rimossi
- setInterval/setTimeout non cleared
- Subscriptions non unsubscribed
- Refs non pulite

### 4. Optimization Suggestions

**Code Splitting**:
```typescript
// Before
import { HeavyComponent } from './HeavyComponent'

// After
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

**Tree Shaking**:
```typescript
// Before (imports entire library)
import { Icon } from 'lucide-react'

// After (tree-shakeable)
import Icon from 'lucide-react/dist/esm/icons/icon'
```

## Comandi

- `@performance-auditor analyze` - Analisi completa
- `@performance-auditor bundle` - Bundle size report
- `@performance-auditor renders` - Re-render detection
- `@performance-auditor optimize <component>` - Ottimizza componente

## Target Metriche

- Bundle size < 500KB (gzipped < 150KB)
- First Load < 2s
- Time to Interactive < 3s
- No unnecessary re-renders
- No memory leaks

## Script

**Location**: `component-vault/scripts/analyze-performance.ts`

## Dipendenze

```bash
npm install -D webpack-bundle-analyzer source-map-explorer
```
