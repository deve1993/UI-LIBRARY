# Sistema Library Agent v3.0

Sistema completo di 12 agenti specializzati per gestire una component library professionale con integrazione Git/GitHub, quality assurance rigorosa e pubblicazione npm.

## 📋 Panoramica

Il Sistema Library Agent è una soluzione end-to-end per:
- ✅ Analizzare siti/progetti esistenti ed estrarre componenti riutilizzabili
- ✅ Creare componenti nuovi da specifiche
- ✅ Mantenere un design system consistente
- ✅ Garantire qualità altissima (accessibility, performance, security)
- ✅ Versionare e documentare tutto automaticamente
- ✅ Sincronizzare con GitHub (deve1993/ui-library)
- ✅ Pubblicare su npm (@deve1993/ui-library)

## 🏗️ Architettura

### 12 Agenti Specializzati

#### 0️⃣ **environment-setup** (Setup & Verifiche)
- Verifica tool installati (git, gh, npm, node)
- Gestisce autenticazione GitHub/npm
- Prepara ambiente di lavoro
- **Colore:** Gray | **Model:** Sonnet

#### 1️⃣ **project-architect** (Orchestratore Principale)
- Coordina tutti gli altri agenti
- Gestisce workflow end-to-end
- Implementa lock system per evitare conflitti
- Gestisce checkpoint e rollback
- **Colore:** Cyan | **Model:** Opus

#### 2️⃣ **component-analyzer** (Analizzatore)
- Analizza siti web esistenti (URL o codice locale)
- Estrae componenti, sezioni, design tokens
- Rileva dipendenze e framework
- Identifica solo componenti nuovi/modificati
- **Colore:** Purple | **Model:** Sonnet

#### 3️⃣ **design-system-generator** (Design System)
- Genera design tokens (colori, typography, spacing, shadows)
- Crea configurazione tema (light/dark)
- Sistema varianti con CVA
- Breakpoints responsive
- **Colore:** Pink | **Model:** Sonnet

#### 4️⃣ **atomic-component-builder** (UI Components)
- Crea componenti UI atomici (Button, Input, Card, etc.)
- Genera varianti multiple
- Accessibility completa (WCAG 2.1 AA)
- Dark mode ready
- **Colore:** Blue | **Model:** Sonnet

#### 5️⃣ **section-component-builder** (Sezioni)
- Crea sezioni complete (Hero, Features, Pricing, etc.)
- Compone usando componenti atomici
- Layout responsive
- Animazioni e interazioni
- **Colore:** Green | **Model:** Sonnet

#### 6️⃣ **code-quality-guardian** ⭐ (Quality Assurance)
- Analisi statica (lint, type-check)
- Security scanning
- Accessibility audit
- Performance check
- Bug detection automatico
- **BLOCCA workflow se quality insufficiente**
- **Colore:** Red | **Model:** Sonnet

#### 7️⃣ **component-library-manager** (Gestione Vault)
- Salva componenti in component-vault/
- Aggiorna registry
- Genera README in italiano
- Gestisce conflitti e duplicati
- Deduplication intelligente
- **Colore:** Orange | **Model:** Sonnet

#### 8️⃣ **project-assembler** (Assemblaggio Progetti)
- Assembla progetti completi dalla vault
- Importa componenti necessari
- Configura routing e build tools
- Crea progetti production-ready
- **Colore:** Yellow | **Model:** Sonnet

#### 9️⃣ **component-version-manager** (Versioning)
- Semantic versioning (MAJOR.MINOR.PATCH)
- Breaking change detection
- Migration guides automatici
- CHANGELOG generation
- Deprecation system
- **Colore:** Indigo | **Model:** Sonnet

#### 🔟 **component-search-assistant** (Ricerca & Discovery)
- Natural language search
- Tag-based search
- Visual similarity search
- Recommendation engine
- Analytics e usage tracking
- **Colore:** Violet | **Model:** Sonnet

#### 1️⃣1️⃣ **git-sync-manager** (Git/GitHub Sync)
- Conventional commits
- Push automatico a GitHub
- Tagging e releases
- Rollback mechanism
- npm publish (opzionale)
- **Opera SOLO in component-vault/**
- **Colore:** Emerald | **Model:** Sonnet

## 🔄 Workflow Completo

```
┌─────────────────────────────────────────────────────────────┐
│ INPUT: Prompt utente o codice da analizzare                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 00. environment-setup                                        │
│ Verifica ambiente, tool, autenticazione                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 01. project-architect                                        │
│ Analizza richiesta, acquisisce lock, coordina workflow      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 02. component-analyzer (se analisi codice esistente)        │
│ Estrae componenti, tokens, dipendenze                       │
│ Identifica solo componenti nuovi                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 03. design-system-generator                                  │
│ Genera/aggiorna design tokens e tema                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 04. atomic-component-builder                                 │
│ Crea componenti UI atomici                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 05. section-component-builder                                │
│ Crea sezioni complete                                       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 06. code-quality-guardian ⭐ CRITICAL                        │
│ Valida qualità, accessibilità, security, performance       │
│ ❌ BLOCCA se quality gates non passano                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 07. component-library-manager                                │
│ Salva in vault, aggiorna registry, genera README            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 11. git-sync-manager                                         │
│ Commit, push, tag, GitHub release                           │
│ Opera in component-vault/ → deve1993/ui-library             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 08. project-assembler (opzionale)                           │
│ Assembla progetto completo se richiesto                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 09. component-version-manager                                │
│ Gestisce versioning, changelog, migrations                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. component-search-assistant                               │
│ Aggiorna indici ricerca, analytics                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    ✅ COMPLETATO
```

## 📁 Struttura File System

```
Progetto/
├── .claude/
│   └── agents/
│       └── Library_Agent/              ← QUESTO SISTEMA (NON versionato Git)
│           ├── 00-environment-setup.md
│           ├── 01-project-architect.md
│           ├── 02-component-analyzer.md
│           ├── 03-design-system-generator.md
│           ├── 04-atomic-component-builder.md
│           ├── 05-section-component-builder.md
│           ├── 06-code-quality-guardian.md
│           ├── 07-component-library-manager.md
│           ├── 08-project-assembler.md
│           ├── 09-component-version-manager.md
│           ├── 10-component-search-assistant.md
│           ├── 11-git-sync-manager.md
│           └── README.md (questo file)
│
└── component-vault/                    ← REPOSITORY GIT SEPARATO
    ├── .git/                           ← Git inizializzato QUI
    ├── .github/
    │   └── workflows/
    │       ├── quality-check.yml
    │       ├── preview-deploy.yml
    │       └── npm-publish.yml
    ├── components/
    │   ├── ui/
    │   │   ├── button/
    │   │   ├── input/
    │   │   └── card/
    │   ├── sections/
    │   │   ├── hero/
    │   │   ├── features/
    │   │   └── pricing/
    │   └── layout/
    │       ├── header/
    │       └── footer/
    ├── design-system/
    │   ├── tokens.ts
    │   ├── theme.config.ts
    │   ├── variants.config.ts
    │   └── breakpoints.ts
    ├── registry/
    │   ├── index.json
    │   ├── metadata.json
    │   └── analytics.json
    ├── templates/
    ├── examples/
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    ├── LICENSE (MIT)
    ├── README.md
    └── CHANGELOG.md
```

## 🚀 Come Usare

### Scenario 1: Analizza Progetto Esistente

```
Prompt: "Analizza il progetto in ./fitness-app/ ed estrai le sezioni nuove"
```

**Cosa succede:**
1. project-architect analizza la richiesta
2. component-analyzer scansiona ./fitness-app/
3. Confronta con component-vault/registry/
4. Identifica SOLO componenti nuovi
5. design-system-generator estrae design tokens
6. atomic/section-builder ricreano componenti
7. code-quality-guardian valida qualità
8. component-library-manager salva in vault
9. git-sync-manager → commit e push su GitHub
10. ✅ Componenti disponibili in deve1993/ui-library

### Scenario 2: Crea Componenti da Zero

```
Prompt: "Crea una landing page per un'app fitness con hero, features, pricing"
```

**Cosa succede:**
1. project-architect determina stack (React + Next.js + Tailwind)
2. design-system-generator crea design system "fitness theme"
3. atomic-builder crea UI components necessari
4. section-builder crea Hero, Features, Pricing
5. code-quality-guardian valida (accessibility, performance)
6. component-library-manager salva
7. git-sync-manager → GitHub
8. project-assembler crea progetto completo (opzionale)

### Scenario 3: Cerca Componenti

```
Prompt: "Trova un button rosso grande"
```

**Cosa succede:**
1. component-search-assistant interpreta query
2. Cerca in component-vault/registry/
3. Restituisce risultati rilevanti
4. Suggerisce componenti simili
5. Mostra "spesso usati insieme"

## ⚙️ Configurazione

### Prerequisites

**Tool richiesti:**
- Git >= 2.40
- GitHub CLI (gh) >= 2.40
- Node.js >= 18.0
- npm >= 9.0
- (Opzionale) Playwright per screenshot

**Verifica setup:**
```bash
# Esegui environment-setup agent
# Verificherà tutto automaticamente
```

### GitHub Repository

**Repository:** https://github.com/deve1993/ui-library
**Visibilità:** Pubblica
**npm package:** @deve1993/ui-library

### Git Configuration

```bash
# In component-vault/
cd component-vault
git config user.name "deve1993"
git config user.email "your-email@example.com"

# Remote
git remote add origin https://github.com/deve1993/ui-library.git
```

## 🔒 Sistemi di Sicurezza

### Lock System
Previene conflitti da workflow paralleli:
```bash
component-vault/.lock        # Lock globale
component-vault/.work/       # Staging area
```

### Quality Gates
Multi-livello (blocking, warning, info):
- ✅ **Blocking**: Lint, TypeCheck, Security, Accessibility ≥95, Tests ≥80%
- ⚠️ **Warning**: Bundle size, complexity
- ℹ️ **Info**: Code smells, duplicate code

### Transaction System
Staging → Production con rollback capability

### Conflict Resolution
Gestione intelligente duplicati e conflitti

## 📊 Quality Standards

**Ogni componente DEVE:**
- ✅ Lint passed (0 errors, 0 warnings)
- ✅ Type-check passed (TypeScript)
- ✅ Accessibility ≥ 95/100 (WCAG 2.1 AA)
- ✅ Test coverage ≥ 80%
- ✅ Bundle size < 50KB per section, < 5KB per UI component
- ✅ Security: 0 vulnerabilities
- ✅ Browser support: Chrome 90+, Firefox 88+, Safari 14+

## 📚 Documentazione

**Ogni componente include:**
- README.md completo in italiano
- Props documentation con tabella
- Esempi d'uso
- Design tokens utilizzati
- Dependency tree
- Accessibility notes
- Browser support
- Changelog

## 🔄 Versioning

**Semantic Versioning:**
- **MAJOR** (vX.0.0): Breaking changes
- **MINOR** (v1.X.0): Nuove features (backward compatible)
- **PATCH** (v1.0.X): Bug fixes

**Ogni versione include:**
- Git tag
- GitHub release
- CHANGELOG entry
- Migration guide (se breaking changes)

## 🌐 GitHub Integration

**Automatico:**
- ✅ Conventional commits
- ✅ Git push to deve1993/ui-library
- ✅ Tag creation
- ✅ GitHub releases
- ✅ GitHub Pages deployment

**Manuale:**
- npm publish (richiede conferma)

## 🧪 Testing

**Coverage target:** 80% minimum

**Test types:**
- Unit tests (Vitest/Jest)
- Integration tests
- Visual regression tests (Playwright)
- Accessibility tests (axe-core)
- Performance tests

## 🎯 Metriche di Successo

Il sistema è considerato di successo quando:
1. **Quality**: 100% componenti passano quality gates
2. **Speed**: Workflow completo < 5 minuti
3. **Reusability**: 70%+ componenti riutilizzati tra progetti
4. **Consistency**: 95%+ aderenza a design system
5. **Zero bugs**: 0 bug critici in produzione

## 🐛 Troubleshooting

### Lock stuck
```bash
rm component-vault/.lock
```

### Git auth failed
```bash
gh auth refresh -h github.com -s repo
```

### npm publish failed
```bash
npm login
cd component-vault
npm publish --access public
```

### Quality check blocked
```bash
# Vedi report dettagliato
# Fix problemi indicati
# Re-run workflow
```

## 📝 Changelog Sistema

### v3.0.0 (2025-10-22)
- ✨ Sistema completo con 12 agenti
- ✨ Git/GitHub integration completa
- ✨ Quality gates rigorosi
- ✨ Multi-framework support ready
- ✨ npm publishing support
- ✨ Documentazione completa in italiano

## 🤝 Contribuire

**Repository:** https://github.com/deve1993/ui-library

## 📄 Licenza

MIT License - vedi LICENSE file

---

**Sistema creato con Claude Code**
Versione: 3.0.0 Production-Ready
Data: 2025-10-22
Autore: deve1993
