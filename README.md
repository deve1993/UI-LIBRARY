# UI Library - Component Vault

Libreria UI professionale con 94+ componenti React riutilizzabili, design system integrato e workflow automatizzati.

## 📦 Repository

**Questa repository contiene:**
- [`component-vault/`](./component-vault/) - Libreria NPM `@deve1993/ui-library`

**Repository correlate:**
- [frontend-web-app-quickfy](https://github.com/deve1993/frontend-web-app-quickfy) - Marketing Intelligence Platform (progetto separato)

---

## 🚀 Quick Start

### Installazione

```bash
npm install @deve1993/ui-library
```

### Uso

```tsx
import { Button, Card, Hero } from '@deve1993/ui-library'
import '@deve1993/ui-library/styles'

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  )
}
```

---

## 🏗️ Sviluppo

### Setup Locale

```bash
# Clone repository
git clone https://github.com/deve1993/UI-LIBRARY.git
cd UI-LIBRARY

# Installa dipendenze component-vault
cd component-vault
npm install

# Avvia Storybook per sviluppo
npm run storybook

# Esegui build
npm run build

# Esegui test
npm run test
```

### Scripts Disponibili

```bash
npm run build          # Build libreria (ESM + CJS)
npm run storybook      # Avvia Storybook su porta 6006
npm run test           # Esegui test suite con Vitest
npm run type-check     # Verifica TypeScript
npm run validate       # Valida componenti
```

---

## 📖 Documentazione

La documentazione completa è disponibile in [`component-vault/README.md`](./component-vault/README.md):

- 94+ Componenti disponibili
- Design System e tokens
- Testing e accessibilità
- Agents System per automazione
- Guide di contribuzione

---

## 🔗 Uso in Progetti

### Opzione 1: Installazione da NPM (Produzione)

**Quando usarla:** Per progetti in produzione che usano versioni stabili.

```bash
# Nel tuo progetto
npm install @deve1993/ui-library
```

```tsx
// Nel codice
import { Button } from '@deve1993/ui-library'
```

### Opzione 2: NPM Link (Sviluppo Locale)

**Quando usarla:** Durante lo sviluppo attivo di component-vault e del progetto contemporaneamente.

```bash
# In component-vault
cd c:\VSC\UI library\component-vault
npm link

# Nel tuo progetto (es. frontend-web-app-quickfy)
cd c:\VSC\frontend-web-app-quickfy
npm link @deve1993/ui-library

# Per rimuovere il link
npm unlink @deve1993/ui-library
```

**Pro:** Modifiche immediate visibili
**Contro:** Solo per sviluppo locale, npm install rimuove il link

---

## 🗂️ Struttura Repository

```
UI library/
├── component-vault/          # Libreria NPM
│   ├── components/           # Componenti React
│   │   ├── ui/               # Componenti base (Button, Card, etc.)
│   │   ├── sections/         # Sezioni complete (Hero, Footer, etc.)
│   │   ├── effects/          # Effetti visivi (Aurora, Beams, etc.)
│   │   ├── layout/           # Componenti layout
│   │   └── shared/           # Utility condivise
│   ├── design-system/        # Design tokens
│   ├── scripts/              # Agents di automazione
│   ├── dist/                 # Build output
│   ├── package.json          # @deve1993/ui-library
│   └── README.md             # Documentazione completa
├── .gitignore
└── README.md                 # Questo file

frontend-web-app-quickfy/     # ⚠️ SEPARATO - Ora in repository propria
```

---

## ⚠️ Nota Importante: Separazione Repository

**A partire dal 7 Novembre 2025**, `frontend-web-app-quickfy` è stato spostato in una repository separata:

- **Prima:** Entrambi i progetti in `UI library/`
- **Adesso:** Due repository indipendenti

### Perché la separazione?

1. **Separation of Concerns:** component-vault è una libreria riutilizzabile, frontend-web-app-quickfy è un'applicazione specifica
2. **CI/CD Indipendente:** Deploy e release separate
3. **Versioning Chiaro:** Libreria con versioni semantiche vs app con deploy continui
4. **Nessuna interferenza:** Modifiche a uno non influenzano l'altro

### Come lavorare ora?

```bash
# Struttura directory raccomandata
c:\VSC\
├── UI library/                    # Libreria componenti
│   └── component-vault/
└── frontend-web-app-quickfy/      # App Next.js (repository separata)
```

**Workflow tipico:**

1. Modifica componenti in `component-vault`
2. Testa con `npm run storybook`
3. Pubblica nuova versione su NPM (o usa `npm link` per dev)
4. Aggiorna `frontend-web-app-quickfy` con `npm install @deve1993/ui-library@latest`

---

## 📚 Risorse

- **Component Vault:** [README completo](./component-vault/README.md)
- **Storybook:** `npm run storybook` (porta 6006)
- **Repository GitHub:** [deve1993/UI-LIBRARY](https://github.com/deve1993/UI-LIBRARY)
- **NPM Package:** `@deve1993/ui-library` (quando pubblicato)

---

## 🤝 Contribuire

Leggi la [guida per contribuire](./component-vault/CONTRIBUTING.md) per informazioni su:
- Code style
- Testing requirements
- Pull request process
- Component guidelines

---

## 📄 License

MIT License - vedi [LICENSE](./LICENSE) per dettagli

---

## 🛠️ Tech Stack

- **React** 18+
- **TypeScript** 5.0+
- **Tailwind CSS** 3.4+
- **Framer Motion** per animazioni
- **Vitest** + Testing Library per testing
- **Storybook** per documentazione
- **tsup** per build
- **GitHub Actions** per CI/CD

---

Realizzato con ❤️ per progetti moderni
