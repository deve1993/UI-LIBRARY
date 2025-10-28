# CTASectionAdvanced

## Descrizione

CTASectionAdvanced è una sezione Call-to-Action premium con design a schermo diviso. Include una colonna con testo persuasivo, checklist di benefici con icone checkmark, indicatori di fiducia (clienti soddisfatti, rating), e CTA primaria. La colonna opposta mostra un mockup visivo del prodotto/servizio. Design moderno con gradienti, ombre e layout bilanciato.

**Caratteristiche principali:**
- Layout split screen responsive (2 colonne desktop, stack su mobile)
- Checklist benefici con icone checkmark gradient
- Indicatori di fiducia con avatar e rating stelle
- Badge distintivo opzionale
- Mockup immagine con bordo arrotondato e ombra
- Sfondo con gradiente soft personalizzabile
- CTA button prominente con hover effects
- Completamente type-safe e accessibile

## Screenshot

<!-- TODO: Aggiungere screenshot del componente -->
![CTASectionAdvanced](./screenshot.png)

## Installazione

```bash
# Il componente è già disponibile nella libreria
import { CTASectionAdvanced } from '@/components/sections/CTASectionAdvanced';
```

## Utilizzo Base

```tsx
import { CTASectionAdvanced } from '@/components/sections/CTASectionAdvanced';

function App() {
  return (
    <CTASectionAdvanced
      badge="🚀 Offerta Lancio"
      title="Pronto a trasformare il tuo business?"
      description="Unisciti a centinaia di aziende che hanno già digitalizzato i loro processi con la nostra piattaforma. Inizia oggi e ottieni risultati misurabili in poche settimane."
      benefits={[
        {
          text: 'Setup completo in meno di 5 minuti',
          checked: true
        },
        {
          text: 'Supporto dedicato 24/7 in italiano',
          checked: true
        },
        {
          text: 'Nessuna carta di credito richiesta per il trial',
          checked: true
        },
        {
          text: 'Cancellazione in qualsiasi momento',
          checked: true
        }
      ]}
      cta={{
        text: 'Inizia Gratis per 14 Giorni',
        href: '/signup'
      }}
      trustIndicators={{
        avatars: [
          { src: '/avatars/user1.jpg', alt: 'Cliente 1' },
          { src: '/avatars/user2.jpg', alt: 'Cliente 2' },
          { src: '/avatars/user3.jpg', alt: 'Cliente 3' },
          { src: '/avatars/user4.jpg', alt: 'Cliente 4' }
        ],
        text: '500+ aziende già attive',
        rating: 4.9,
        ratingLabel: 'su Trustpilot'
      }}
      mockupImage={{
        src: '/dashboard-preview.png',
        alt: 'Dashboard Preview'
      }}
    />
  );
}
```

## Props

### CTASectionAdvancedProps

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| `badge` | `string` | No | - | Badge opzionale sopra il titolo (supporta emoji) |
| `title` | `string` | Sì | - | Titolo principale della CTA |
| `description` | `string` | Sì | - | Descrizione persuasiva |
| `benefits` | `CTABenefit[]` | Sì | - | Array di benefici con checkmark |
| `cta` | `CTAButton` | Sì | - | Pulsante call-to-action primario |
| `trustIndicators` | `CTATrustIndicator` | No | - | Indicatori di fiducia (avatar, rating) |
| `mockupImage` | `MockupImage` | Sì | - | Immagine mockup prodotto/servizio |
| `className` | `string` | No | `''` | Classi CSS aggiuntive |

### Tipi Correlati

```typescript
interface CTABenefit {
  text: string;
  checked: boolean;
}

interface CTAButton {
  text: string;
  href: string;
}

interface CTATrustIndicator {
  avatars: Array<{ src: string; alt: string }>;
  text: string;
  rating?: number;
  ratingLabel?: string;
}

interface MockupImage {
  src: string;
  alt: string;
}
```

## Varianti

### Senza Badge
```tsx
<CTASectionAdvanced
  title="Inizia oggi"
  description="..."
  benefits={[...]}
  cta={...}
  mockupImage={...}
  // Ometti badge
/>
```

### Con Sfondo Scuro
```tsx
<CTASectionAdvanced
  {...props}
  className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
/>
```

### Senza Trust Indicators
```tsx
<CTASectionAdvanced
  title="..."
  description="..."
  benefits={[...]}
  cta={...}
  mockupImage={...}
  // Ometti trustIndicators
/>
```

### Con Più Benefici
```tsx
<CTASectionAdvanced
  benefits={[
    { text: 'Integrazione con Stripe, PayPal, e altre 50+ piattaforme', checked: true },
    { text: 'Dashboard analytics in tempo reale', checked: true },
    { text: 'API RESTful e Webhooks completi', checked: true },
    { text: 'Backup automatici giornalieri', checked: true },
    { text: 'Conformità GDPR e certificazione ISO', checked: true },
    { text: 'Migrazione dati gratuita dal tuo sistema attuale', checked: true }
  ]}
  {...otherProps}
/>
```

## Customizzazione Avanzata

### Personalizza Colori Checkmark
```tsx
// Nel file CTASectionAdvanced.tsx
// Modifica il gradiente del checkmark
<div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
  {/* Cambia in: */}
  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
```

### Badge Personalizzato con Icona
```tsx
<CTASectionAdvanced
  badge={
    <span className="flex items-center gap-2">
      <Sparkles className="w-4 h-4" />
      Offerta Speciale
    </span>
  }
  {...props}
/>
```

### CTA Button con Icona
```tsx
cta={{
  text: (
    <span className="flex items-center gap-2">
      Inizia Gratis
      <ArrowRight className="w-5 h-5" />
    </span>
  ),
  href: '/signup'
}}
```

## Accessibilità

- Tag semantici: `<section>`, `<h2>`, `<p>`, `<ul>`, `<button>`
- Checkmark con `aria-label="Incluso"`
- Stelle rating con `aria-label` descrittivo
- Avatar con attributi `alt` significativi
- Pulsante CTA accessibile da tastiera con outline visibile
- Contrasto colori conforme a WCAG 2.1 Level AA
- Mockup con `alt` text descrittivo

## Best Practices

1. **Titolo Persuasivo**: Usa domande o affermazioni che risuonano col target
2. **Descrizione Chiara**: 150-200 caratteri, focus sul valore, non sulle feature
3. **Benefici Concreti**: 3-6 punti, specifici e misurabili
4. **CTA Diretta**: Verbo d'azione + beneficio (es: "Inizia Gratis", non "Clicca qui")
5. **Trust Indicators**: Usa numeri reali e verificabili
6. **Mockup Qualità**: Immagine ad alta risoluzione, professionale
7. **Urgency**: Badge può creare urgenza ("Offerta limitata", "Solo per oggi")

## Copywriting Tips

### Titoli Efficaci
```tsx
// ✅ Buoni
"Pronto a 10x il tuo fatturato?"
"Smetti di perdere tempo con processi manuali"
"Unisciti a 10,000+ aziende che stanno crescendo"

// ❌ Da evitare
"Il nostro prodotto è fantastico"
"Clicca qui per saperne di più"
"Software di gestione aziendale"
```

### Benefici Efficaci
```tsx
// ✅ Buoni - Specifici e misurabili
"Risparmia 10+ ore a settimana di lavoro manuale"
"Aumenta le conversioni del 40% in media"
"Zero tempi di inattività con 99.99% uptime"

// ❌ Da evitare - Vaghi
"Risparmia tempo"
"Migliori risultati"
"Affidabile"
```

## Dipendenze

- React 18+
- Tailwind CSS 3+

## Esempi di Utilizzo

### Landing Page SaaS
```tsx
<CTASectionAdvanced
  badge="🎉 Lancio Ufficiale"
  title="Inizia la tua trasformazione digitale oggi"
  description="Oltre 1,000 aziende hanno già automatizzato i loro workflow con la nostra piattaforma."
  benefits={saasFeatures}
  cta={{ text: 'Prova Gratis 30 Giorni', href: '/trial' }}
  trustIndicators={trustData}
  mockupImage={{ src: '/saas-dashboard.png', alt: 'SaaS Dashboard' }}
/>
```

### E-commerce
```tsx
<CTASectionAdvanced
  badge="🏷️ Sconto 50% - Solo Oggi"
  title="Non perdere questa opportunità"
  description="Migliaia di clienti hanno già acquistato. Scorte limitate!"
  benefits={productFeatures}
  cta={{ text: 'Acquista Ora', href: '/checkout' }}
  mockupImage={{ src: '/product.png', alt: 'Prodotto' }}
/>
```

### App Mobile
```tsx
<CTASectionAdvanced
  badge="📱 Disponibile su iOS e Android"
  title="Scarica l'app e inizia in 60 secondi"
  description="Porta il tuo business sempre con te, ovunque tu sia."
  benefits={appFeatures}
  cta={{ text: 'Scarica Gratis', href: '/download' }}
  mockupImage={{ src: '/app-screens.png', alt: 'App Screenshots' }}
/>
```

## Note

- Il gradiente di default è `from-blue-50 via-purple-50 to-pink-50`
- Gli avatar si sovrappongono leggermente (negative margin) per effetto stack
- Le stelle rating sono SVG inline per prestazioni ottimali
- Il mockup ha ombra grande per effetto "floating"
- Responsive: su mobile il mockup appare sotto il contenuto
- Il componente è completamente type-safe con TypeScript
