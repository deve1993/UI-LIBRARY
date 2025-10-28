# HeroSplitScreen

## Descrizione

HeroSplitScreen è una sezione hero avanzata con layout a schermo diviso che presenta un design moderno con carte galleggianti effetto glass morphism. Include un lato contenuto con sottotitolo, descrizione, lista di funzionalità con icone, CTA primaria e secondaria, e indicatori di fiducia. Il lato opposto mostra un'immagine mockup con carte galleggianti animate.

**Caratteristiche principali:**
- Layout a griglia responsive (2 colonne su desktop, 1 colonna su mobile)
- Carte galleggianti con effetto vetro (backdrop-blur)
- Animazioni di fluttuazione con delay personalizzati
- Indicatori di fiducia con avatar e statistiche
- Supporto per logo personalizzato
- Lista di funzionalità con icone React
- Doppi CTA (primario e secondario)
- Gradienti sofisticati e ombre moderne

## Screenshot

<!-- TODO: Aggiungere screenshot del componente -->
![HeroSplitScreen](./screenshot.png)

## Installazione

```bash
# Il componente è già disponibile nella libreria
import { HeroSplitScreen } from '@/components/sections/HeroSplitScreen';
```

## Utilizzo Base

```tsx
import { HeroSplitScreen } from '@/components/sections/HeroSplitScreen';
import { Zap, Shield, TrendingUp } from 'lucide-react';

function App() {
  return (
    <HeroSplitScreen
      logo={{
        src: '/logo.svg',
        alt: 'Brand Logo',
        width: 180,
        height: 40
      }}
      subtitle="🚀 Innovazione e Tecnologia"
      description="Trasforma il tuo business con la nostra piattaforma all-in-one. Veloce, sicura e scalabile."
      features={[
        { icon: Zap, text: 'Performance eccezionali' },
        { icon: Shield, text: 'Sicurezza avanzata' },
        { icon: TrendingUp, text: 'Crescita garantita' }
      ]}
      primaryCta={{
        text: 'Inizia Gratis',
        href: '/signup'
      }}
      secondaryCta={{
        text: 'Scopri di più',
        href: '/features'
      }}
      trustIndicators={[
        {
          avatars: [
            { src: '/avatar1.jpg', alt: 'User 1' },
            { src: '/avatar2.jpg', alt: 'User 2' },
            { src: '/avatar3.jpg', alt: 'User 3' }
          ],
          text: '500+ clienti soddisfatti',
          rating: 4.9,
          ratingLabel: 'su Trustpilot'
        }
      ]}
      mockupImage={{
        src: '/dashboard-mockup.png',
        alt: 'Dashboard Preview',
        floatingCards: [
          {
            title: 'Analytics',
            value: '+127%',
            trend: 'up',
            description: 'Crescita mensile',
            delay: 0
          },
          {
            title: 'Utenti Attivi',
            value: '12.5K',
            trend: 'up',
            description: 'Questo mese',
            delay: 2
          }
        ]
      }}
    />
  );
}
```

## Props

### HeroSplitScreenProps

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| `logo` | `Logo` | Sì | - | Oggetto con src, alt, width, height del logo |
| `subtitle` | `string` | Sì | - | Sottotitolo sopra il titolo principale (supporta emoji) |
| `description` | `string` | Sì | - | Descrizione principale della sezione |
| `features` | `Feature[]` | Sì | - | Array di funzionalità con icone |
| `primaryCta` | `CTAButton` | Sì | - | Pulsante CTA primario |
| `secondaryCta` | `CTAButton` | No | - | Pulsante CTA secondario |
| `trustIndicators` | `TrustIndicator[]` | No | - | Array di indicatori di fiducia |
| `mockupImage` | `MockupImage` | Sì | - | Immagine mockup con carte galleggianti |
| `className` | `string` | No | `''` | Classi CSS aggiuntive |

### Tipi Correlati

```typescript
interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface CTAButton {
  text: string;
  href: string;
}

interface TrustIndicator {
  avatars: Array<{ src: string; alt: string }>;
  text: string;
  rating?: number;
  ratingLabel?: string;
}

interface FloatingCard {
  title: string;
  value: string;
  trend: 'up' | 'down';
  description: string;
  delay: number; // secondi per animazione
}

interface MockupImage {
  src: string;
  alt: string;
  floatingCards?: FloatingCard[];
}
```

## Varianti

### Con Sfondo Gradiente
```tsx
<HeroSplitScreen
  {...props}
  className="bg-gradient-to-br from-blue-50 via-white to-purple-50"
/>
```

### Senza Indicatori di Fiducia
```tsx
<HeroSplitScreen
  logo={...}
  subtitle="..."
  description="..."
  features={[...]}
  primaryCta={...}
  mockupImage={...}
  // Ometti trustIndicators
/>
```

### Con Più Carte Galleggianti
```tsx
<HeroSplitScreen
  {...props}
  mockupImage={{
    src: '/mockup.png',
    alt: 'Preview',
    floatingCards: [
      { title: 'Revenue', value: '+240%', trend: 'up', description: 'Q1 2024', delay: 0 },
      { title: 'Users', value: '50K+', trend: 'up', description: 'Active now', delay: 1 },
      { title: 'Rating', value: '4.9/5', trend: 'up', description: 'Trustpilot', delay: 2 }
    ]
  }}
/>
```

## Accessibilità

- Utilizza tag semantici HTML5 (`<section>`, `<img>`, `<button>`)
- Tutte le immagini hanno attributi `alt` descrittivi
- I pulsanti sono accessibili da tastiera
- Le carte galleggianti hanno `aria-label` descrittivi
- Contrasto colori conforme a WCAG 2.1 Level AA
- Icone decorative marcate con `aria-hidden="true"`

## Best Practices

1. **Immagini Ottimizzate**: Usa immagini WebP o AVIF per migliori prestazioni
2. **Lazy Loading**: Considera l'uso di `loading="lazy"` per immagini sotto la piega
3. **Responsive**: Le carte galleggianti sono nascoste su mobile per migliorare l'UX
4. **Performance**: Limita il numero di carte galleggianti a 2-3 per evitare sovraccarico
5. **Contenuto**: Mantieni la descrizione sotto 200 caratteri per migliore leggibilità
6. **CTA Chiara**: Usa verbi d'azione per i testi dei pulsanti

## Dipendenze

- React 18+
- Tailwind CSS 3+
- lucide-react (per le icone)

## Note

- Le animazioni di fluttuazione usano `animate-float-slow` definita in globals.css
- L'effetto glass morphism richiede `backdrop-blur` (supportato in browser moderni)
- Le stelle rating usano SVG inline per massime prestazioni
- Il componente è completamente type-safe con TypeScript
