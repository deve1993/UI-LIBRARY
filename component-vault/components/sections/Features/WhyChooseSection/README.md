# WhyChooseSection

## Descrizione

WhyChooseSection è una sezione di benefici che combina carte descrittive con statistiche integrate. Ogni carta presenta un'icona con gradiente, titolo, descrizione e una statistica con label dedicata. Ideale per comunicare valore e risultati misurabili.

**Caratteristiche principali:**
- Layout a griglia responsive (4 colonne su desktop, 2 su tablet, 1 su mobile)
- Statistiche grandi e visibili in ogni carta
- Icone con background gradient personalizzabili
- Hover effects con elevazione e transizioni fluide
- Separatore visivo tra descrizione e statistiche
- Design pulito e moderno con bordi arrotondati
- Completamente responsive e mobile-friendly

## Screenshot

<!-- TODO: Aggiungere screenshot del componente -->
![WhyChooseSection](./screenshot.png)

## Installazione

```bash
# Il componente è già disponibile nella libreria
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
```

## Utilizzo Base

```tsx
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { Users, Zap, Award, TrendingUp } from 'lucide-react';

function App() {
  return (
    <WhyChooseSection
      title="Perché scegliere noi"
      subtitle="Risultati concreti che parlano da soli"
      benefits={[
        {
          icon: Users,
          title: 'Community Globale',
          description: 'Unisciti a migliaia di utenti soddisfatti in tutto il mondo che già utilizzano la nostra piattaforma.',
          gradient: 'from-blue-500 to-cyan-500',
          stat: '50K+',
          statLabel: 'Utenti attivi'
        },
        {
          icon: Zap,
          title: 'Performance Eccezionali',
          description: 'Velocità di caricamento 10x superiore rispetto ai competitor, per un\'esperienza fluida.',
          gradient: 'from-purple-500 to-pink-500',
          stat: '10x',
          statLabel: 'Più veloce'
        },
        {
          icon: Award,
          title: 'Qualità Certificata',
          description: 'Riconosciuti come leader del settore con premi internazionali per innovazione.',
          gradient: 'from-orange-500 to-red-500',
          stat: '15+',
          statLabel: 'Premi vinti'
        },
        {
          icon: TrendingUp,
          title: 'Crescita Garantita',
          description: 'I nostri clienti vedono un incremento medio del 240% nei primi 6 mesi di utilizzo.',
          gradient: 'from-green-500 to-emerald-500',
          stat: '+240%',
          statLabel: 'Crescita media'
        }
      ]}
    />
  );
}
```

## Props

### WhyChooseSectionProps

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| `title` | `string` | Sì | - | Titolo principale della sezione |
| `subtitle` | `string` | No | - | Sottotitolo descrittivo |
| `benefits` | `WhyChooseBenefit[]` | Sì | - | Array di benefici da visualizzare |
| `className` | `string` | No | `''` | Classi CSS aggiuntive |

### WhyChooseBenefit

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| `icon` | `React.ComponentType<{ className?: string }>` | Sì | - | Componente icona (lucide-react) |
| `title` | `string` | Sì | - | Titolo del beneficio |
| `description` | `string` | Sì | - | Descrizione dettagliata |
| `gradient` | `string` | Sì | - | Classi gradiente Tailwind per icona |
| `stat` | `string` | Sì | - | Statistica da mostrare (es: "50K+", "+240%") |
| `statLabel` | `string` | Sì | - | Label della statistica (es: "Utenti attivi") |

## Varianti

### Con Sfondo Colorato
```tsx
<WhyChooseSection
  title="I nostri numeri"
  benefits={[...]}
  className="bg-gradient-to-br from-blue-50 to-purple-50"
/>
```

### Sezione Compatta (3 colonne)
```tsx
<WhyChooseSection
  title="Benefici Chiave"
  benefits={threeBenefits} // Solo 3 benefici
  className="[&_.benefits-grid]:lg:grid-cols-3"
/>
```

### Con Bordo Accentuato
```tsx
{/* Ogni carta può avere un bordo top colorato */}
<WhyChooseSection
  benefits={benefits.map(b => ({
    ...b,
    className: 'border-t-4 border-blue-500'
  }))}
/>
```

## Customizzazione Avanzata

### Statistiche con Icone
```tsx
// Puoi modificare il componente per aggiungere icone alle stats
<div className="flex items-baseline gap-2">
  <TrendingUp className="w-6 h-6 text-green-500" />
  <div className="text-4xl font-bold text-gray-900">{stat}</div>
</div>
```

### Animazioni Stagger
```tsx
// Aggiungi delay incrementale per animazioni in sequenza
{benefits.map((benefit, index) => (
  <div
    key={index}
    className="card"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* contenuto */}
  </div>
))}
```

## Accessibilità

- Utilizza tag semantici `<article>` per ogni beneficio
- Icone decorative con `aria-hidden="true"`
- Statistiche marcate con `<strong>` per screen readers
- Contrasto testo sufficiente (WCAG AA)
- Focus visibile su elementi interattivi
- Struttura gerarchica corretta (h2 → h3)

## Best Practices

1. **Numero di Benefici**: 4 benefici è ottimale per layout equilibrato (usa 3, 4, 6, o 8)
2. **Statistiche Chiare**: Usa numeri rotondi e facili da comprendere (50K+ invece di 49,847)
3. **Descrizioni Concise**: 100-150 caratteri per descrizione per uniformità
4. **Gradienti Coerenti**: Usa palette di colori armoniosa attraverso tutte le carte
5. **Statistiche Credibili**: Usa solo dati verificabili e supportati da fonti
6. **Label Descrittive**: Le statLabel devono chiarire il contesto del numero
7. **Icone Relevant**: Scegli icone che rafforzano visivamente il messaggio

## Esempi di Statistiche Efficaci

```tsx
// ✅ Buone statistiche
stat: '99.9%', statLabel: 'Uptime garantito'
stat: '< 100ms', statLabel: 'Tempo di risposta'
stat: '24/7', statLabel: 'Supporto disponibile'
stat: '5★', statLabel: 'Rating medio'

// ❌ Statistiche da evitare
stat: '12.34567', statLabel: 'Precisione' // Troppo preciso
stat: 'Tanti', statLabel: 'Clienti' // Vago
stat: '∞', statLabel: 'Possibilità' // Non misurabile
```

## Dipendenze

- React 18+
- Tailwind CSS 3+
- lucide-react (per le icone)

## Layout Responsive

```
Desktop (≥1024px):  [Card] [Card] [Card] [Card]  (4 colonne)
Tablet (768-1023px): [Card] [Card]              (2 colonne)
                     [Card] [Card]
Mobile (<768px):    [Card]                       (1 colonna)
                    [Card]
                    [Card]
                    [Card]
```

## Casi d'Uso Comuni

### Landing Page SaaS
```tsx
<WhyChooseSection
  title="Perché le aziende ci scelgono"
  benefits={[
    { stat: '500+', statLabel: 'Aziende Fortune 500', ... },
    { stat: '99.99%', statLabel: 'SLA garantito', ... },
    // ...
  ]}
/>
```

### E-commerce
```tsx
<WhyChooseSection
  title="Vantaggi per i tuoi acquisti"
  benefits={[
    { stat: '24h', statLabel: 'Spedizione gratuita', ... },
    { stat: '30gg', statLabel: 'Reso garantito', ... },
    // ...
  ]}
/>
```

### Portfolio/Agenzia
```tsx
<WhyChooseSection
  title="Il nostro track record"
  benefits={[
    { stat: '200+', statLabel: 'Progetti completati', ... },
    { stat: '98%', statLabel: 'Soddisfazione clienti', ... },
    // ...
  ]}
/>
```

## Note

- Le icone sono renderizzate in un cerchio con gradiente per massimo impatto visivo
- Il separatore tra descrizione e stats è sottile (1px) per eleganza
- Le statistiche usano font-size grande (3xl) per enfasi
- Il componente è completamente type-safe con TypeScript
- Supporta dark mode con override delle classi
