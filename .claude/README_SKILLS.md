# 🎯 SISTEMA SKILLS AUTO-ATTIVAZIONE

## 📖 Cos'è questo sistema?

Ho configurato **6 skills specializzate** che si attivano **automaticamente** quando mi chiedi di fare qualcosa. Non devi più dire "usa la skill X" - io capisco dal contesto quale skill serve!

---

## 🚀 Come Funziona

### Prima (senza auto-attivazione):
```
Tu: "crea un componente Button"
Tu: "usa la skill ui-component-builder per creare il componente"
Tu: "poi usa component-tester per i test"
Tu: "poi usa component-documenter per la story"
```
❌ Troppo verboso e complesso!

### Ora (con auto-attivazione):
```
Tu: "crea un componente Button"
Io: ✅ Automaticamente uso:
    - ui-component-builder (componente)
    - component-tester (test)
    - component-documenter (story)
```
✅ Semplice e automatico!

---

## 🎨 Le 6 Skills Disponibili

### 1. **ui-component-builder** 🎨
**Cosa fa:** Crea componenti React/Vue/Svelte con TypeScript, pattern avanzati, animazioni, accessibilità

**Quando si attiva automaticamente:**
- "crea un componente X"
- "converti il componente da React a Vue"
- "aggiungi animazioni al Modal"
- "implementa accessibilità keyboard"

**Esempio:**
```
Tu: "crea un componente Tabs con compound pattern"
Io: [Attivo ui-component-builder automaticamente]
    ✅ Componente creato con Tabs.Trigger, Tabs.Content, ecc.
```

---

### 2. **component-tester** 🧪
**Cosa fa:** Scrive test con Vitest, analizza coverage, testa accessibilità

**Quando si attiva automaticamente:**
- "scrivi test per X"
- "aumenta il coverage"
- "testa l'accessibilità"
- "verifica le user interactions"

**Esempio:**
```
Tu: "scrivi test per il Button"
Io: [Attivo component-tester automaticamente]
    ✅ Test suite completa con 90%+ coverage
```

---

### 3. **component-documenter** 📚
**Cosa fa:** Crea Storybook stories, README, API docs, migration guides

**Quando si attiva automaticamente:**
- "crea storybook stories"
- "documenta i componenti"
- "scrivi un README"
- "crea una migration guide"

**Esempio:**
```
Tu: "crea stories per tutti i componenti"
Io: [Attivo component-documenter automaticamente]
    ✅ 25 Storybook stories create con varianti e controls
```

---

### 4. **design-system-manager** 🎨
**Cosa fa:** Gestisce design tokens, theming (light/dark), colori, spacing, typography

**Quando si attiva automaticamente:**
- "implementa dark mode"
- "crea design tokens"
- "standardizza i colori"
- "verifica accessibilità colori"

**Esempio:**
```
Tu: "implementa dark mode"
Io: [Attivo design-system-manager automaticamente]
    ✅ Theme system completo con light/dark mode
```

---

### 5. **library-bundler** 📦
**Cosa fa:** Configura build (tsup, vite), ottimizza bundle, prepara NPM publish

**Quando si attiva automaticamente:**
- "ottimizza il bundle"
- "prepara per NPM"
- "analizza il bundle size"
- "configura build ESM/CJS"

**Esempio:**
```
Tu: "ottimizza il bundle size"
Io: [Attivo library-bundler automaticamente]
    ✅ Bundle ridotto da 153KB a 98KB (-36%)
```

---

### 6. **codebase-analyzer** 🔍
**Cosa fa:** Analizza qualità codice, trova duplicazioni, audit dipendenze, security check

**Quando si attiva automaticamente:**
- "analizza il codice"
- "trova duplicazioni"
- "audit delle dipendenze"
- "health report del progetto"

**Esempio:**
```
Tu: "analizza la qualità del codice"
Io: [Attivo codebase-analyzer automaticamente]
    ✅ Health report completo con 15 raccomandazioni
```

---

## 🔄 Workflow Automatici

### Workflow 1: NUOVO COMPONENTE COMPLETO
**Tu dici:** "crea un componente Dropdown"

**Io faccio automaticamente:**
1. ✅ Uso `ui-component-builder` → Crea componente
2. ✅ Uso `component-tester` → Genera test
3. ✅ Uso `component-documenter` → Crea Storybook story

**Risultato:** Componente completo, testato, documentato!

---

### Workflow 2: PRE-PUBLISH AUDIT
**Tu dici:** "prepara per pubblicazione NPM"

**Io faccio automaticamente:**
1. ✅ Uso `codebase-analyzer` → Health report
2. ✅ Uso `component-tester` → Verifica coverage 80%+
3. ✅ Uso `library-bundler` → Ottimizza bundle
4. ✅ Uso `component-documenter` → Verifica README/changelog

**Risultato:** Libreria pronta per NPM con report completo!

---

### Workflow 3: QUALITY IMPROVEMENT
**Tu dici:** "migliora la qualità del codice"

**Io faccio automaticamente:**
1. ✅ Uso `codebase-analyzer` → Trova problemi
2. ✅ Uso `design-system-manager` → Standardizza tokens
3. ✅ Uso `component-tester` → Aumenta coverage

**Risultato:** Codebase migliorato con metriche!

---

### Workflow 4: STORYBOOK SETUP COMPLETO
**Tu dici:** "crea tutte le Storybook stories"

**Io faccio automaticamente:**
1. ✅ Uso `component-documenter` → Genera stories
2. ✅ Uso `ui-component-builder` → Aggiungi varianti
3. ✅ Uso `design-system-manager` → Documenta tokens

**Risultato:** Storybook completo e professionale!

---

### Workflow 5: BUNDLE OPTIMIZATION
**Tu dici:** "il bundle è troppo grande"

**Io faccio automaticamente:**
1. ✅ Uso `library-bundler` → Analizza bundle
2. ✅ Uso `codebase-analyzer` → Trova deps unused
3. ✅ Uso `ui-component-builder` → Implementa lazy loading

**Risultato:** Bundle ottimizzato con report before/after!

---

## 💬 Esempi Pratici

### Esempio 1: Vuoi creare un nuovo componente
```
Tu: "crea un componente Select con compound pattern"

Io: Sto usando il workflow NEW-COMPONENT-COMPLETE:

    🎨 Step 1/3: ui-component-builder
       → Creando Select con compound pattern...
       ✅ Creato: Select, Select.Trigger, Select.Content, Select.Item

    🧪 Step 2/3: component-tester
       → Generando test suite...
       ✅ 15 test creati, 92% coverage

    📚 Step 3/3: component-documenter
       → Creando Storybook story...
       ✅ Story creata con 8 varianti

    ✅ COMPLETATO! Select pronto con test e docs.
```

---

### Esempio 2: Vuoi analizzare il progetto
```
Tu: "analizza il progetto e dimmi cosa migliorare"

Io: Sto usando la skill codebase-analyzer:

    🔍 Analisi in corso...

    📊 HEALTH REPORT:
    ✅ Coverage: 85% (buono)
    ⚠️  Bundle size: 153KB (target: <100KB)
    ❌ Deps unused: 3 trovate
    ✅ Security: 0 vulnerabilità

    💡 RACCOMANDAZIONI (priorità high):
    1. Rimuovi dipendenze unused (lodash, moment)
    2. Ottimizza bundle con code splitting
    3. Aggiungi test per Modal component

    Vuoi che proceda con le ottimizzazioni?
```

---

### Esempio 3: Vuoi documentare tutto
```
Tu: "documenta tutti i componenti con Storybook"

Io: Sto usando il workflow STORYBOOK-COMPLETE:

    📚 Step 1/3: component-documenter
       → Analizzando 25 componenti...
       → Generando stories...
       ✅ 25 stories create

    🎨 Step 2/3: ui-component-builder
       → Verificando varianti mancanti...
       → Aggiungendo size="xl" a Button
       ✅ Varianti completate

    🎨 Step 3/3: design-system-manager
       → Documentando design tokens...
       ✅ Token page creata in Storybook

    ✅ COMPLETATO! Storybook disponibile su:
    http://localhost:6006/
```

---

### Esempio 4: Vuoi ottimizzare
```
Tu: "ottimizza tutto il progetto"

Io: Sto usando il workflow QUALITY-IMPROVEMENT + BUNDLE-OPTIMIZATION:

    🔍 Analisi qualità...
    ✅ 5 duplicazioni trovate
    ✅ 3 deps unused trovate

    📦 Analisi bundle...
    ✅ Bundle attuale: 153KB
    ✅ Potenziale riduzione: 40KB (-26%)

    🛠️ Ottimizzazioni applicate:
    1. ✅ Rimosse deps unused (moment, lodash)
    2. ✅ Code splitting implementato
    3. ✅ Lazy loading per componenti pesanti
    4. ✅ Duplicazioni rifattorizzate

    📊 RISULTATI:
    Before: 153KB | After: 98KB (-36%)

    ✅ COMPLETATO! Progetto ottimizzato.
```

---

## 🎯 Come Usarlo

### Tu dici semplicemente cosa vuoi:
```
✅ "crea un componente X"
✅ "scrivi test per Y"
✅ "documenta Z"
✅ "ottimizza il bundle"
✅ "analizza il codice"
✅ "implementa dark mode"
✅ "prepara per NPM"
```

### Io capisco e attivo le skills giuste!

**NON serve più dire:**
- ❌ "usa la skill ui-component-builder"
- ❌ "attiva component-tester"
- ❌ "esegui codebase-analyzer"

---

## 📊 Vantaggi

### ✅ Per Te:
- **Più semplice**: Parli in linguaggio naturale
- **Più veloce**: Non specifichi manualmente le skills
- **Più smart**: Io combino skills automaticamente
- **Più completo**: Workflow predefiniti per task comuni

### ✅ Per il Progetto:
- **Qualità costante**: Skills garantiscono standard alti
- **Best practices**: Ogni skill usa pattern professionali
- **Documentazione**: Sempre completa e aggiornata
- **Testing**: Coverage alto garantito

---

## 🚀 Prossimi Passi

### Prova subito! Dì semplicemente:

**Opzione 1 - Analisi:**
```
"analizza il progetto e dammi un report completo"
```

**Opzione 2 - Documentazione:**
```
"crea tutte le Storybook stories"
```

**Opzione 3 - Ottimizzazione:**
```
"ottimizza il bundle size"
```

**Opzione 4 - Nuovo componente:**
```
"crea un componente Accordion"
```

**Opzione 5 - Preparazione release:**
```
"prepara la libreria per pubblicazione NPM"
```

---

## ❓ FAQ

### Q: Devo sempre specificare quale skill usare?
**A:** NO! Io capisco automaticamente dal contesto. Tu parla normalmente!

### Q: Posso comunque specificare la skill manualmente?
**A:** Sì! Se vuoi forzare una skill specifica, puoi dirlo. Ma non è necessario.

### Q: Come so quale skill stai usando?
**A:** Te lo dico sempre all'inizio della risposta: "Sto usando la skill X per..."

### Q: Posso chiedere di usare più skills insieme?
**A:** Sì! Dì "usa tutte le skills per migliorare il progetto" o uso automaticamente i workflow.

### Q: Le skills sono sempre attive?
**A:** Sì! Da ora in poi sono sempre pronte e si attivano automaticamente.

---

## 📁 File di Configurazione

```
.claude/
├── skills/                           # 6 skills disponibili
│   ├── ui-component-builder/
│   ├── component-tester/
│   ├── component-documenter/
│   ├── design-system-manager/
│   ├── library-bundler/
│   └── codebase-analyzer/
├── skills-config.json                # Configurazione auto-attivazione
├── skill-router.md                   # Routing intelligente
├── AUTO_SKILL_ACTIVATION.md          # Sistema completo
└── README_SKILLS.md                  # Questa guida
```

---

## 🎉 Conclusione

**Da ora in poi, parla semplicemente!**

Io capisco cosa vuoi fare e attivo automaticamente le skills giuste. Tu concentrati sul progetto, io gestisco le skills! 🚀

---

**Pronto a provare? Dimmi cosa vuoi fare!** 😊
