# NavigationHeader

## 📋 Descrizione

Il componente **NavigationHeader** è un header di navigazione fisso e completamente responsive, progettato per fornire un'esperienza di navigazione ottimale su tutti i dispositivi. Include tutte le funzionalità essenziali per un header moderno: logo, menu di navigazione, selettore di lingua e bottone CTA.

### Caratteristiche Principali

- ✅ **Header fisso** - Rimane visibile durante lo scroll
- ✅ **Completamente responsive** - Layout ottimizzato per desktop, tablet e mobile
- ✅ **Menu mobile** - Hamburger menu con animazioni fluide
- ✅ **Selettore di lingua** - Dropdown elegante per il cambio lingua
- ✅ **CTA button** - Bottone call-to-action prominente
- ✅ **Accessibilità** - ARIA labels e navigazione da tastiera
- ✅ **Personalizzabile** - Supporta logo immagine o testo
- ✅ **Animazioni smooth** - Transizioni fluide su hover e interazioni

---

## 🖼️ Screenshot

### Vista Desktop
> **TODO**: Inserire screenshot dell'header in versione desktop
>
> ![NavigationHeader Desktop](./screenshots/desktop.png)

### Vista Mobile
> **TODO**: Inserire screenshot dell'header in versione mobile (menu chiuso)
>
> ![NavigationHeader Mobile](./screenshots/mobile-closed.png)

### Menu Mobile Aperto
> **TODO**: Inserire screenshot del menu mobile aperto
>
> ![NavigationHeader Mobile Menu](./screenshots/mobile-open.png)

### Language Switcher
> **TODO**: Inserire screenshot del dropdown lingua
>
> ![Language Switcher](./screenshots/language-dropdown.png)

---

## 📦 Installazione

```tsx
import { NavigationHeader } from '@/components/sections/NavigationHeader';
import type { NavigationHeaderProps } from '@/components/sections/NavigationHeader';
```

---

## 🎯 Utilizzo Base

```tsx
import { NavigationHeader } from '@/components/sections/NavigationHeader';

function App() {
  return (
    <NavigationHeader
      logo={{
        text: "MioBrand",
        alt: "Logo MioBrand"
      }}
      links={[
        { label: "Home", href: "/" },
        { label: "Prodotti", href: "/prodotti" },
        { label: "Servizi", href: "/servizi" },
        { label: "Chi Siamo", href: "/chi-siamo" },
        { label: "Contatti", href: "/contatti" }
      ]}
      ctaButton={{
        label: "Inizia Ora",
        onClick: () => console.log("CTA clicked!")
      }}
    />
  );
}
```

---

## 📚 Props

### NavigationHeaderProps

| Prop | Tipo | Obbligatorio | Default | Descrizione |
|------|------|--------------|---------|-------------|
| `logo` | `LogoConfig` | ✅ Sì | - | Configurazione del logo (immagine o testo) |
| `links` | `NavigationLink[]` | ✅ Sì | - | Array di link di navigazione |
| `languages` | `LanguageConfig` | ❌ No | `undefined` | Configurazione del selettore di lingua |
| `ctaButton` | `CTAConfig` | ✅ Sì | - | Configurazione del bottone CTA |
| `className` | `string` | ❌ No | `""` | Classi CSS aggiuntive |

### LogoConfig

```tsx
{
  src?: string;      // URL dell'immagine del logo (opzionale)
  alt: string;       // Testo alternativo per accessibilità
  text?: string;     // Testo del brand (opzionale, alternativo a src)
}
```

### NavigationLink

```tsx
{
  label: string;      // Testo visualizzato del link
  href: string;       // URL di destinazione
  ariaLabel?: string; // Label ARIA per accessibilità (opzionale)
}
```

### LanguageConfig

```tsx
{
  current: string;                              // Codice lingua corrente (es: "it")
  options: Array<{                              // Opzioni disponibili
    code: string;                               // Codice lingua (es: "en")
    label: string;                              // Nome visualizzato (es: "English")
  }>;
  onChange?: (code: string) => void;            // Callback al cambio lingua
}
```

### CTAConfig

```tsx
{
  label: string;           // Testo del bottone
  onClick: () => void;     // Callback al click
}
```

---

## 💡 Esempi Avanzati

### Con Logo Immagine

```tsx
<NavigationHeader
  logo={{
    src: "/logo.png",
    alt: "MioBrand Logo"
  }}
  links={[...]}
  ctaButton={{...}}
/>
```

### Con Selettore di Lingua

```tsx
<NavigationHeader
  logo={{...}}
  links={[...]}
  languages={{
    current: "it",
    options: [
      { code: "it", label: "Italiano" },
      { code: "en", label: "English" },
      { code: "fr", label: "Français" },
      { code: "de", label: "Deutsch" }
    ],
    onChange: (code) => {
      // Gestisci cambio lingua
      console.log(`Lingua cambiata a: ${code}`);
      // i18n.changeLanguage(code);
    }
  }}
  ctaButton={{...}}
/>
```

### Header Personalizzato

```tsx
<NavigationHeader
  className="bg-gradient-to-r from-blue-600 to-purple-600"
  logo={{
    text: "MioBrand",
    alt: "Logo"
  }}
  links={[
    {
      label: "Home",
      href: "/",
      ariaLabel: "Vai alla homepage"
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      ariaLabel: "Accedi alla dashboard"
    }
  ]}
  ctaButton={{
    label: "Registrati Gratis",
    onClick: () => window.location.href = "/signup"
  }}
/>
```

---

## ♿ Accessibilità

Il componente è stato sviluppato seguendo le best practice di accessibilità:

- **Semantic HTML**: Utilizza tag semantici (`<header>`, `<nav>`)
- **ARIA Labels**: Tutti gli elementi interattivi hanno label appropriate
- **Navigazione da tastiera**: Supporto completo per Tab, Enter, Escape
- **Screen reader friendly**: Testato con NVDA e VoiceOver
- **Focus visibile**: Stati di focus chiari per tutti gli elementi interattivi
- **Role attributes**: `role="banner"`, `role="menu"`, `role="menuitem"`

### Shortcuts da Tastiera

- **Tab**: Naviga tra gli elementi
- **Enter/Space**: Attiva link o bottoni
- **Escape**: Chiude il menu mobile o il dropdown lingua

---

## 🎨 Personalizzazione

### Colori

Il componente utilizza le classi Tailwind standard. Per personalizzare i colori:

```tsx
// Nel tuo tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#TUO_COLORE',
          700: '#TUO_COLORE_SCURO',
        }
      }
    }
  }
}
```

### Stili Custom

```tsx
<NavigationHeader
  className="shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600"
  // ... altre props
/>
```

---

## 🔧 Best Practices

### ✅ Do's

1. **Usa ARIA labels** per link che necessitano contesto aggiuntivo
2. **Mantieni il menu conciso** - max 5-7 link nel menu principale
3. **CTA chiaro** - usa verbi d'azione ("Inizia Ora", "Prova Gratis")
4. **Logo cliccabile** - sempre linkato alla homepage
5. **Responsive first** - testa sempre su mobile

### ❌ Don'ts

1. **Non sovraccaricare** il menu con troppi link
2. **Non usare testi generici** come "Clicca qui"
3. **Evita icone senza label** per accessibilità
4. **Non nascondere** informazioni critiche nel menu mobile

---

## 🧪 Testing

### Unit Tests

```bash
npm test NavigationHeader.test.tsx
```

### Visual Tests (Storybook)

```bash
npm run storybook
```

Naviga a: `Sections/NavigationHeader`

---

## 📱 Responsive Breakpoints

| Breakpoint | Dimensione | Comportamento |
|------------|------------|---------------|
| Mobile | < 768px | Menu hamburger, layout verticale |
| Tablet | 768px - 1024px | Menu completo, layout compatto |
| Desktop | > 1024px | Menu completo, layout esteso |

---

## 🔗 Link Correlati

- [Esempio Base](./examples/basic.tsx)
- [Esempio Avanzato](./examples/advanced.tsx)
- [Storybook Stories](./NavigationHeader.stories.tsx)
- [Unit Tests](./NavigationHeader.test.tsx)

---

## 📝 Changelog

### v1.0.0
- ✨ Release iniziale
- ✅ Header fisso responsive
- ✅ Menu mobile con hamburger
- ✅ Selettore lingua con dropdown
- ✅ Accessibilità completa

---

## 🤝 Contributi

Per bug reports, richieste di feature o contributi, consulta la [documentazione principale del progetto](../../../README.md).

---

## 📄 Licenza

Questo componente fa parte della libreria UI e segue la stessa licenza del progetto principale.
