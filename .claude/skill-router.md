# 🎯 SKILL AUTO-ROUTER SYSTEM

Questo documento definisce come le skills devono essere attivate automaticamente in base al contesto del prompt dell'utente.

## 🤖 Sistema di Auto-Attivazione

### Regole di Routing

#### 1. UI-COMPONENT-BUILDER
**Attiva automaticamente quando:**
- Prompt contiene: "crea/nuovo/build component", "converti", "animazione", "compound", "custom hook"
- Task richiesto: Creazione/modifica componenti React/Vue/Svelte
- Pattern richiesti: HOC, Render Props, Compound Components, Polymorphic Components
- Accessibilità: Menziona "a11y", "accessibilità", "WCAG", "keyboard navigation"

**Esempio prompt che attivano:**
- ✅ "crea un componente Select con compound pattern"
- ✅ "converti il Button da React a Vue"
- ✅ "aggiungi animazioni Framer Motion al Modal"
- ✅ "implementa accessibilità keyboard per il Menu"

---

#### 2. COMPONENT-TESTER
**Attiva automaticamente quando:**
- Prompt contiene: "test", "coverage", "vitest", "testing library", "unit test"
- Task richiesto: Scrivere/eseguire test, analizzare coverage
- Testing richiesto: Unit, integration, accessibility, user interaction

**Esempio prompt che attivano:**
- ✅ "scrivi test per il componente Button"
- ✅ "aumenta il coverage al 90%"
- ✅ "testa l'accessibilità del Form"
- ✅ "crea test per user interaction"

---

#### 3. COMPONENT-DOCUMENTER
**Attiva automaticamente quando:**
- Prompt contiene: "storybook", "story", "documentazione", "readme", "migration guide"
- Task richiesto: Creare documentazione, stories, guide
- Documenti: README, API docs, Storybook stories, migration guides

**Esempio prompt che attivano:**
- ✅ "crea Storybook stories per tutti i componenti"
- ✅ "scrivi la documentazione API"
- ✅ "genera un README per il progetto"
- ✅ "crea una migration guide v1→v2"

---

#### 4. DESIGN-SYSTEM-MANAGER
**Attiva automaticamente quando:**
- Prompt contiene: "design token", "theming", "tema", "light/dark", "color palette"
- Task richiesto: Gestire design system, tokens, theming
- Sistema: Colors, spacing, typography, shadows, theming

**Esempio prompt che attivano:**
- ✅ "implementa dark mode"
- ✅ "crea design tokens per i colori"
- ✅ "standardizza il spacing system"
- ✅ "verifica accessibilità colori WCAG"

---

#### 5. LIBRARY-BUNDLER
**Attiva automaticamente quando:**
- Prompt contiene: "build", "bundle", "ottimizza", "pubblica npm", "esm/cjs"
- Task richiesto: Build configuration, bundle optimization, NPM publishing
- Strumenti: tsup, vite, rollup, webpack

**Esempio prompt che attivano:**
- ✅ "ottimizza il bundle size"
- ✅ "prepara la libreria per NPM"
- ✅ "configura build ESM e CJS"
- ✅ "analizza il bundle con visualizer"

---

#### 6. CODEBASE-ANALYZER
**Attiva automaticamente quando:**
- Prompt contiene: "analizza", "analisi", "code review", "qualità", "duplicazione"
- Task richiesto: Analisi codebase, quality check, dependency audit
- Analisi: Pattern detection, duplication, performance, dependencies

**Esempio prompt che attivano:**
- ✅ "analizza la qualità del codice"
- ✅ "trova duplicazioni nel codebase"
- ✅ "audit delle dipendenze"
- ✅ "health report del progetto"

---

## 🔄 Workflow Automatizzati

### WORKFLOW 1: NEW-COMPONENT-COMPLETE
**Trigger**: "crea un nuovo componente [NOME]"

**Skills usate automaticamente:**
1. `ui-component-builder` → Crea componente
2. `component-tester` → Genera test
3. `component-documenter` → Crea Storybook story

**Risultato**: Componente completo con test e documentazione

---

### WORKFLOW 2: PRE-PUBLISH-AUDIT
**Trigger**: "prepara per pubblicazione NPM" | "audit prima del release"

**Skills usate automaticamente:**
1. `codebase-analyzer` → Health report completo
2. `component-tester` → Verifica coverage 80%+
3. `library-bundler` → Ottimizza bundle, prepara build
4. `component-documenter` → Verifica README, changelog

**Risultato**: Libreria pronta per pubblicazione con report completo

---

### WORKFLOW 3: QUALITY-IMPROVEMENT
**Trigger**: "migliora la qualità del codice" | "refactoring completo"

**Skills usate automaticamente:**
1. `codebase-analyzer` → Trova problemi (duplicazioni, anti-pattern, deps unused)
2. `design-system-manager` → Standardizza tokens, colori, spacing
3. `component-tester` → Aumenta coverage, aggiungi test mancanti

**Risultato**: Codebase migliorato con metriche di qualità

---

### WORKFLOW 4: STORYBOOK-COMPLETE
**Trigger**: "setup Storybook completo" | "documenta tutti i componenti"

**Skills usate automaticamente:**
1. `component-documenter` → Genera stories per tutti i componenti
2. `ui-component-builder` → Aggiungi varianti e stati mancanti
3. `design-system-manager` → Documenta design tokens

**Risultato**: Storybook completo con tutte le stories e documentazione

---

### WORKFLOW 5: BUNDLE-OPTIMIZATION
**Trigger**: "ottimizza il bundle" | "riduci bundle size"

**Skills usate automaticamente:**
1. `library-bundler` → Analizza bundle size, identifica deps pesanti
2. `codebase-analyzer` → Trova deps unused, opportunità code splitting
3. `ui-component-builder` → Implementa lazy loading

**Risultato**: Bundle ottimizzato con report size

---

## 📋 Sistema di Priorità

### Priority: HIGH (esegui subito)
- `ui-component-builder` quando serve creare/modificare componenti
- `component-tester` quando serve testare o verificare coverage
- `codebase-analyzer` quando serve analisi qualità/security

### Priority: MEDIUM (dopo high priority)
- `component-documenter` per documentazione
- `design-system-manager` per design system
- `library-bundler` per build optimization

### Priority: LOW (nice-to-have)
- Refactoring non critico
- Documentazione opzionale
- Ottimizzazioni minori

---

## 🎯 Come Decidere Quale Skill Usare

### Domande da Fare:
1. **Il task richiede creazione/modifica componenti?** → `ui-component-builder`
2. **Il task richiede test o coverage?** → `component-tester`
3. **Il task richiede documentazione?** → `component-documenter`
4. **Il task riguarda design tokens/theming?** → `design-system-manager`
5. **Il task riguarda build/bundle/publish?** → `library-bundler`
6. **Il task richiede analisi/audit?** → `codebase-analyzer`

### Se più skills sono applicabili:
- Usa la priority (HIGH > MEDIUM > LOW)
- Usa workflow pre-definiti quando possibile
- Chiedi chiarimenti all'utente se ambiguo

---

## ✅ Checklist Auto-Attivazione

Prima di rispondere all'utente:
- [ ] Ho identificato il task principale?
- [ ] Ho verificato quali skills sono applicabili?
- [ ] Ho controllato se esiste un workflow predefinito?
- [ ] Ho attivato le skills nell'ordine corretto?
- [ ] Ho informato l'utente delle skills usate?

---

## 💡 Best Practices

1. **Sempre menziona quale skill stai usando**
   ```
   "Sto usando la skill component-documenter per creare le Storybook stories..."
   ```

2. **Combina skills quando ha senso**
   ```
   "Userò ui-component-builder per il componente, poi component-tester per i test"
   ```

3. **Chiedi conferma per workflow lunghi**
   ```
   "Questo richiede il workflow PRE-PUBLISH-AUDIT (4 skills). Procedo?"
   ```

4. **Report finale con skills usate**
   ```
   "✅ Completato usando:
   - ui-component-builder: Componente creato
   - component-tester: Test suite generata
   - component-documenter: Storybook story creata"
   ```

---

## 🔍 Pattern Recognition

### Pattern di Linguaggio → Skill Mapping

| Pattern | Skill |
|---------|-------|
| "crea", "nuovo", "build" | ui-component-builder |
| "test", "coverage", "verifica" | component-tester |
| "documenta", "storybook", "readme" | component-documenter |
| "tema", "colori", "tokens" | design-system-manager |
| "bundle", "ottimizza", "pubblica" | library-bundler |
| "analizza", "audit", "qualità" | codebase-analyzer |

### Intent Detection

| User Intent | Skills to Use |
|-------------|---------------|
| Creare nuovo feature | ui-component-builder, component-tester, component-documenter |
| Migliorare qualità | codebase-analyzer, component-tester, design-system-manager |
| Preparare release | library-bundler, codebase-analyzer, component-documenter |
| Setup documentazione | component-documenter, ui-component-builder |
| Ottimizzare performance | library-bundler, codebase-analyzer |

---

**NOTA IMPORTANTE**: Questo sistema deve essere seguito SEMPRE. Ogni prompt dell'utente deve essere analizzato per identificare le skills applicabili e attivarle automaticamente.
