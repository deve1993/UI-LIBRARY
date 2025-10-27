# 📚 Guida Completa - UI Library Component Vault

## 🎉 Benvenuto!

Questa è la guida completa alla libreria UI **Component Vault** - una collezione professionale di componenti React estratti da **quickfy.eu** e organizzati per un utilizzo immediato nei tuoi progetti.

---

## 📁 Struttura del Progetto

```
component-vault/
├── components/
│   ├── sections/          # 10 Sezioni complete (Hero, Features, Pricing, etc.)
│   │   ├── NavigationHeader/
│   │   │   ├── NavigationHeader.tsx
│   │   │   ├── NavigationHeader.types.ts
│   │   │   ├── NavigationHeader.test.tsx
│   │   │   ├── NavigationHeader.stories.tsx
│   │   │   ├── README.md
│   │   │   ├── index.ts
│   │   │   └── examples/
│   │   │       ├── basic.tsx
│   │   │       └── advanced.tsx
│   │   ├── HeroSection/
│   │   ├── FeaturesSection/
│   │   ├── BenefitsSection/
│   │   ├── PricingSection/
│   │   ├── RoadmapSection/
│   │   ├── TestimonialsSection/
│   │   ├── ClientLogosSection/
│   │   ├── ContactSection/
│   │   └── Footer/
│   │
│   └── ui/                # 5 Componenti UI base
│       ├── Button/
│       ├── Input/
│       ├── Card/
│       ├── Badge/
│       └── Avatar/
│
├── shared/                # Risorse condivise
│   ├── hooks/            # Custom React Hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useIntersection.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── cn.ts
│   │   ├── formatters.ts
│   │   └── index.ts
│   └── types/            # TypeScript types globali
│
├── registry/             # Catalogo componenti
│   ├── index.json
│   └── metadata.json
│
├── design-system/        # Design tokens e tema
│   └── README.md
│
├── .storybook/           # Configurazione Storybook
│   ├── main.ts
│   └── preview.ts
│
└── package.json
```

---

## 🚀 Quick Start

### 1. Installazione Dipendenze

```bash
npm install
```

### 2. Avvia Storybook (Dev Mode)

```bash
npm run storybook
```

Apri [http://localhost:6006](http://localhost:6006) per esplorare tutti i componenti.

### 3. Importa e Usa i Componenti

```tsx
// Importa una sezione
import { HeroSection } from '@/components/sections/HeroSection';

// Importa un componente UI
import { Button } from '@/components/ui/Button';

// Importa hooks condivisi
import { useMediaQuery, useIntersection } from '@/shared/hooks';

// Importa utils
import { cn, formatCurrency } from '@/shared/utils';
```

---

## 📦 Componenti Disponibili

### 🎨 Sezioni (10 totali)

| Componente | Descrizione | Utilizzo |
|------------|-------------|----------|
| **NavigationHeader** | Header fisso responsive con menu, lingua, CTA | Landing pages, App header |
| **HeroSection** | Hero con typewriter, metriche, CTA | Homepage, Landing |
| **FeaturesSection** | Griglia 3-col per features | Showcase prodotti |
| **BenefitsSection** | Griglia 4-col con contatori animati | Metriche, Statistiche |
| **PricingSection** | 3 piani con confronto features | Pagine Pricing |
| **RoadmapSection** | Timeline con milestones | Roadmap prodotto |
| **TestimonialsSection** | Carousel recensioni clienti | Testimonials, Reviews |
| **ClientLogosSection** | Carousel loghi clienti | Social proof |
| **ContactSection** | Form contatto completo | Pagine contatto |
| **Footer** | Footer completo multi-colonna | App footer |

### 🧩 Componenti UI (5 totali)

| Componente | Varianti | Features |
|------------|----------|----------|
| **Button** | 7 varianti, 5 dimensioni | Loading, Icons, Full width |
| **Input** | 3 varianti | Label, Error, Helper text |
| **Card** | 4 padding options | Hoverable, Shadow |
| **Badge** | 5 varianti | Status indicators |
| **Avatar** | 4 dimensioni | Image + Initials fallback |

### 🪝 Shared Hooks

- **useMediaQuery** - Responsive breakpoints
- **useIntersection** - Scroll animations
- **useDebounce** - Performance optimization

### 🛠️ Shared Utils

- **cn** - Classname combiner
- **formatCompactNumber** - 1000 → 1K
- **formatCurrency** - Number → €1.234,56
- **formatDate** - Date → locale string

---

## 💡 Esempi di Utilizzo

### Esempio 1: Landing Page Completa

```tsx
import {
  NavigationHeader,
  HeroSection,
  FeaturesSection,
  PricingSection,
  ContactSection,
  Footer
} from '@/components/sections';

function LandingPage() {
  return (
    <>
      <NavigationHeader
        logo={{ text: "MioBrand", alt: "Logo" }}
        links={[
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" }
        ]}
        ctaButton={{ label: "Inizia Ora", onClick: () => {} }}
      />

      <HeroSection
        headline={{ text: "Il Futuro è", highlight: "Qui" }}
        subheadline="Trasforma il tuo business con la nostra soluzione"
        metrics={[
          { value: "10K+", label: "Clienti Felici" },
          { value: "99%", label: "Soddisfazione" }
        ]}
        primaryCta={{ label: "Prova Gratis", onClick: () => {} }}
      />

      <FeaturesSection
        title="Le Nostre Features"
        features={[...]}
      />

      <PricingSection
        title="Prezzi Semplici"
        plans={[...]}
      />

      <ContactSection
        title="Contattaci"
        onSubmit={async (data) => {
          await api.sendContact(data);
        }}
      />

      <Footer
        logo={{ text: "MioBrand", alt: "Logo" }}
        columns={[...]}
        copyright="© 2025 MioBrand. Tutti i diritti riservati."
      />
    </>
  );
}
```

### Esempio 2: Form con Validazione

```tsx
import { Input, Button } from '@/components/ui';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <form>
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        placeholder="tuo@email.it"
        required
      />

      <Button
        variant="primary"
        fullWidth
        type="submit"
      >
        Accedi
      </Button>
    </form>
  );
}
```

### Esempio 3: Responsive Design

```tsx
import { useIsMobile, useIsDesktop } from '@/shared/hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  return (
    <div className={cn(
      'grid gap-4',
      isMobile && 'grid-cols-1',
      isDesktop && 'grid-cols-3'
    )}>
      {/* Content */}
    </div>
  );
}
```

### Esempio 4: Animazioni Scroll

```tsx
import { useIntersection } from '@/shared/hooks';
import { useRef } from 'react';

function AnimatedSection() {
  const ref = useRef(null);
  const isVisible = useIntersection(ref, {
    threshold: 0.3,
    freezeOnceVisible: true
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      )}
    >
      Content che appare allo scroll
    </div>
  );
}
```

---

## 🎨 Personalizzazione

### Tailwind Config

Personalizza i colori nel tuo `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          600: '#2563eb',  // Tuo blu primario
          700: '#1d4ed8',
        }
      }
    }
  }
}
```

### Classi CSS Custom

Puoi sovrascrivere gli stili con la prop `className`:

```tsx
<Button className="bg-gradient-to-r from-purple-600 to-pink-600">
  Custom Gradient Button
</Button>
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Test Singolo Componente

```bash
npm test Button
```

### Coverage Report

```bash
npm test -- --coverage
```

---

## 📖 Documentazione Componenti

Ogni componente ha la sua documentazione dettagliata nel file `README.md` della propria cartella:

- [NavigationHeader README](./components/sections/NavigationHeader/README.md)
- [HeroSection README](./components/sections/HeroSection/README.md)
- [Button README](./components/ui/Button/README.md)
- ... e così via

---

## 🔧 Scripts Disponibili

```json
{
  "lint": "eslint .",                    // Linting codice
  "type-check": "tsc --noEmit",          // Type checking
  "test": "vitest",                       // Run tests
  "build": "tsup",                        // Build per produzione
  "storybook": "storybook dev -p 6006",   // Dev Storybook
  "build-storybook": "storybook build"    // Build Storybook
}
```

---

## ♿ Accessibilità

Tutti i componenti seguono le **WCAG 2.1 Level AA** guidelines:

- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast 4.5:1+

Test accessibility con Storybook addon:

```bash
npm run storybook
# Naviga su un componente → Tab "Accessibility"
```

---

## 📚 Risorse Aggiuntive

### Registry

Consulta il [registry/index.json](./registry/index.json) per l'elenco completo e metadati di tutti i componenti.

### Design System

Consulta [design-system/README.md](./design-system/README.md) per i design tokens (colori, spacing, typography).

### Esempi

Ogni componente ha esempi pratici in `examples/`:
- `basic.tsx` - Utilizzo base
- `advanced.tsx` - Utilizzo avanzato con features complete

---

## 🐛 Troubleshooting

### Componente non appare

1. Verifica che Tailwind CSS sia configurato
2. Controlla l'import path
3. Verifica props obbligatorie

### TypeScript Errors

```bash
npm run type-check
```

### Storybook non si avvia

```bash
rm -rf node_modules
npm install
npm run storybook
```

---

## 🤝 Contribuire

Per contribuire al progetto:

1. Crea un nuovo branch
2. Implementa la feature/fix
3. Aggiungi tests
4. Crea PR con descrizione dettagliata

---

## 📄 Licenza

MIT License - vedi [LICENSE](../LICENSE) per dettagli.

---

## 🎯 Next Steps

1. ✅ Esplora i componenti in Storybook
2. ✅ Leggi i README individuali
3. ✅ Copia gli esempi nel tuo progetto
4. ✅ Personalizza i colori/stili
5. ✅ Crea la tua landing page!

---

## 💬 Supporto

Per domande o problemi:
- Apri una [Issue](https://github.com/yourusername/ui-library/issues)
- Consulta la [documentazione](./README.md)
- Controlla gli [esempi](./components/sections/)

---

**Buon coding! 🚀**
