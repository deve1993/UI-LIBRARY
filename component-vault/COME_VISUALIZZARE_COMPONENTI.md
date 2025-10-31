# 👀 Come Visualizzare i Componenti

Hai **3 metodi** per vedere visivamente come sono fatti i componenti:

---

## 🎨 METODO 1: Storybook (RACCOMANDATO)

Storybook è il modo professionale per visualizzare, testare e documentare componenti UI.

### Setup (una volta sola):

```bash
cd "c:\VSC\UI library\component-vault"
npm install
```

### Avvia Storybook:

```bash
npm run storybook
```

Si aprirà automaticamente **http://localhost:6006**

### Cosa Vedrai:

```
Storybook Interface
├── 📁 Sections/
│   ├── NavigationHeader
│   │   ├── Default
│   │   ├── WithImageLogo
│   │   ├── WithLanguageSwitch
│   │   └── ...
│   ├── HeroSection
│   │   ├── Default
│   │   ├── WithTypewriter
│   │   └── ...
│   └── ... tutte le altre sezioni
│
└── 📁 UI/
    ├── Button
    │   ├── Primary
    │   ├── Secondary
    │   └── All Variants
    └── ... altri componenti
```

### Features Storybook:

- ✅ **Preview Live** - Vedi il componente renderizzato
- ✅ **Controls** - Modifica props in tempo reale
- ✅ **Responsive** - Testa su mobile/tablet/desktop
- ✅ **Accessibility** - Tab "Accessibility" per WCAG test
- ✅ **Docs** - Documentazione automatica
- ✅ **Code Snippets** - Copia il codice di esempio

### Esempio Uso:

1. Apri Storybook → http://localhost:6006
2. Sidebar sinistra → Clicca "Sections" → "HeroSection"
3. Vedi il componente renderizzato
4. Tab "Controls" in basso → Cambia props (headline, colors, etc.)
5. Viewport toolbar in alto → Testa responsive (mobile/tablet/desktop)

---

## 🚀 METODO 2: Demo Page Veloce (HTML Statico)

Se vuoi una preview rapida senza setup, creo una demo page HTML che puoi aprire nel browser.

### Creo la Demo Page:

