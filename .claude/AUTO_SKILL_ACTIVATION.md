# 🤖 SISTEMA AUTO-ATTIVAZIONE SKILLS

## 🎯 OBBIETTIVO
Attivare automaticamente le skills corrette in base al prompt dell'utente, senza che debba richiederle esplicitamente.

## 📍 LOCALIZZAZIONE SKILLS
Tutte le skills sono in: `c:\VSC\UI library\.claude\skills\`

### Skills Disponibili:
1. **ui-component-builder** - Creazione/modifica componenti UI
2. **component-tester** - Testing e coverage analysis
3. **component-documenter** - Documentazione e Storybook
4. **design-system-manager** - Design tokens e theming
5. **library-bundler** - Build, bundle, NPM publish
6. **codebase-analyzer** - Analisi qualità e code review

---

## 🔄 REGOLE DI AUTO-ATTIVAZIONE

### ⚡ ATTIVAZIONE IMMEDIATA (sempre)

Quando l'utente dice uno di questi prompt, attiva AUTOMATICAMENTE la skill corrispondente:

#### Pattern: "crea/nuovo/aggiungi componente"
```
Utente: "crea un componente Tabs"
→ ATTIVA: ui-component-builder
→ POI: component-tester (per test)
→ POI: component-documenter (per story)
```

#### Pattern: "test/coverage/verifica"
```
Utente: "scrivi test per Button"
→ ATTIVA: component-tester
```

#### Pattern: "storybook/documenta/readme"
```
Utente: "crea storybook stories"
→ ATTIVA: component-documenter
```

#### Pattern: "tema/colori/design token"
```
Utente: "implementa dark mode"
→ ATTIVA: design-system-manager
```

#### Pattern: "bundle/ottimizza/pubblica"
```
Utente: "ottimizza bundle size"
→ ATTIVA: library-bundler
```

#### Pattern: "analizza/audit/qualità"
```
Utente: "analizza il codice"
→ ATTIVA: codebase-analyzer
```

---

## 🔀 WORKFLOW COMBINATI

### Workflow 1: NUOVO COMPONENTE COMPLETO
**Trigger**: Quando utente chiede di creare un nuovo componente

**Azioni automatiche:**
```
1. Uso ui-component-builder per creare il componente
2. Uso component-tester per scrivere test
3. Uso component-documenter per creare Storybook story
4. Report finale con tutte le azioni completate
```

**Esempio:**
```
Utente: "crea un componente Dropdown"

Risposta:
"Sto usando il workflow NEW-COMPONENT-COMPLETE:

🎨 Step 1/3: ui-component-builder
   → Creando componente Dropdown con TypeScript...
   ✅ Componente creato in components/ui/Dropdown/

🧪 Step 2/3: component-tester
   → Generando test suite...
   ✅ Test creati con 90% coverage

📚 Step 3/3: component-documenter
   → Creando Storybook story...
   ✅ Story creata con varianti e controls

✅ COMPLETATO! Dropdown pronto con test e documentazione."
```

---

### Workflow 2: PRE-PUBLISH AUDIT
**Trigger**: "prepara per npm" | "audit prima pubblicazione" | "check qualità"

**Azioni automatiche:**
```
1. Uso codebase-analyzer per health report
2. Uso component-tester per verificare coverage
3. Uso library-bundler per analizzare bundle
4. Uso component-documenter per verificare docs
5. Report completo con raccomandazioni
```

---

### Workflow 3: QUALITY IMPROVEMENT
**Trigger**: "migliora qualità" | "refactoring" | "cleanup codice"

**Azioni automatiche:**
```
1. Uso codebase-analyzer per trovare problemi
2. Uso design-system-manager per standardizzare tokens
3. Uso component-tester per aumentare coverage
4. Report miglioramenti con priorità
```

---

### Workflow 4: STORYBOOK SETUP COMPLETO
**Trigger**: "setup storybook" | "documenta tutto" | "crea stories"

**Azioni automatiche:**
```
1. Uso component-documenter per generare tutte le stories
2. Uso ui-component-builder per aggiungere varianti mancanti
3. Uso design-system-manager per documentare tokens
4. Storybook completo e funzionante
```

---

### Workflow 5: BUNDLE OPTIMIZATION
**Trigger**: "ottimizza bundle" | "riduci size" | "analizza bundle"

**Azioni automatiche:**
```
1. Uso library-bundler per analizzare bundle attuale
2. Uso codebase-analyzer per trovare dipendenze unused
3. Uso ui-component-builder per lazy loading
4. Report ottimizzazioni con before/after
```

---

## 📋 CHECKLIST PRE-RISPOSTA

Prima di rispondere all'utente, SEMPRE esegui questa checklist:

```
[ ] Ho letto attentamente il prompt?
[ ] Ho identificato le keywords chiave?
[ ] Ho verificato quale skill serve?
[ ] Ho verificato se esiste un workflow predefinito?
[ ] Ho deciso l'ordine di esecuzione skills?
[ ] Informerò l'utente quali skills sto usando?
```

---

## 💬 TEMPLATE RISPOSTA

### Template 1: Singola Skill
```markdown
Sto usando la skill **[NOME-SKILL]** per [AZIONE].

[Esecuzione task...]

✅ Completato! [Risultato]
```

### Template 2: Workflow Multi-Skill
```markdown
Sto usando il workflow **[NOME-WORKFLOW]** che include:
- [skill-1]: [azione-1]
- [skill-2]: [azione-2]
- [skill-3]: [azione-3]

📊 Step 1/[N]: [skill-1]
[Esecuzione...]
✅ [Risultato step 1]

📊 Step 2/[N]: [skill-2]
[Esecuzione...]
✅ [Risultato step 2]

...

✅ WORKFLOW COMPLETATO!
[Riepilogo risultati]
```

---

## 🎯 ESEMPI PRATICI

### Esempio 1: Creazione Componente
```
Utente: "crea un componente Select con compound pattern"

Azione:
1. Identifico: "crea componente" → ui-component-builder
2. Noto: "compound pattern" → richiede pattern avanzato
3. Decido: Workflow NEW-COMPONENT-COMPLETE
4. Eseguo: ui-component-builder → component-tester → component-documenter
5. Rispondo con report completo
```

### Esempio 2: Analisi Qualità
```
Utente: "analizza il progetto e trova problemi"

Azione:
1. Identifico: "analizza" → codebase-analyzer
2. Decido: QUALITY-IMPROVEMENT workflow
3. Eseguo: codebase-analyzer (priorità alta)
4. Report dettagliato con raccomandazioni
```

### Esempio 3: Documentazione
```
Utente: "crea le stories per tutti i componenti"

Azione:
1. Identifico: "stories" → component-documenter
2. Decido: STORYBOOK-COMPLETE workflow
3. Eseguo: component-documenter → ui-component-builder → design-system-manager
4. Storybook completo con tutte le stories
```

### Esempio 4: Ottimizzazione
```
Utente: "il bundle è troppo grande, ottimizzalo"

Azione:
1. Identifico: "bundle troppo grande" → library-bundler
2. Decido: BUNDLE-OPTIMIZATION workflow
3. Eseguo: library-bundler → codebase-analyzer
4. Report ottimizzazioni con size before/after
```

---

## 🚨 CASI SPECIALI

### Caso 1: Prompt Ambiguo
Se il prompt è ambiguo, chiedi chiarimenti PRIMA di attivare skills:
```
Utente: "migliora il progetto"

Risposta:
"Vuoi che:
A) Analizzi qualità codice (codebase-analyzer)
B) Ottimizzi bundle size (library-bundler)
C) Completi documentazione (component-documenter)
D) Eseguo audit completo (tutti e 3)?
```

### Caso 2: Più Skills Applicabili
Se più skills sono applicabili, usa TUTTE nell'ordine di priorità:
```
HIGH → MEDIUM → LOW
```

### Caso 3: Task Grande
Se il task richiede >30min, chiedi conferma:
```
"Questo richiede il workflow QUALITY-IMPROVEMENT (3 skills, ~45min).
Procedo? (Y/n)"
```

---

## ✅ VERIFICA ATTIVAZIONE

Dopo ogni risposta, verifica:
```
[ ] Ho usato almeno una skill?
[ ] Ho informato l'utente quale skill ho usato?
[ ] Ho fornito un report chiaro?
[ ] Ho suggerito prossimi passi?
```

---

## 🎓 APPRENDIMENTO CONTINUO

Ogni volta che l'utente chiede qualcosa:
1. Annota quale skill avresti dovuto usare
2. Migliora il pattern matching
3. Aggiorna questo documento se necessario

---

## 📊 METRICHE DI SUCCESSO

Skill auto-attivazione è SUCCESSO quando:
- ✅ Utente NON deve dire "usa la skill X"
- ✅ Skill corretta attivata al primo prompt
- ✅ Workflow combinati usati quando appropriato
- ✅ Report chiaro con skill usata menzionata

---

## 🔗 RIFERIMENTI

- Configurazione: `.claude/skills-config.json`
- Routing: `.claude/skill-router.md`
- Skills: `.claude/skills/[skill-name]/SKILL.md`

---

**RICORDA**: L'obbiettivo è che l'utente NON debba mai dire "usa la skill X". Tu devi essere proattivo e intelligente nell'attivare le skills corrette automaticamente!
