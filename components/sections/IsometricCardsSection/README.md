# IsometricCardsSection

## Descrizione

IsometricCardsSection è una sezione moderna che presenta carte con effetti 3D isometrici. Ogni carta ha trasformazioni prospettiche che creano un effetto di profondità tridimensionale, con hover effects fluidi e gradienti vibranti. Perfetta per presentare funzionalità, servizi o prodotti in modo visivamente accattivante.

**Caratteristiche principali:**
- Trasformazioni 3D con prospettiva CSS
- Hover effects con rotazione fluida
- Transizioni smooth con cubic-bezier personalizzato
- Gradienti colorati personalizzabili per ogni carta
- Icone React components personalizzabili
- Layout responsive a griglia (3 colonne su desktop)
- Badge opzionali per evidenziare carte speciali
- Ombre dinamiche che seguono il tilt

## Screenshot

<!-- TODO: Aggiungere screenshot del componente -->
![IsometricCardsSection](./screenshot.png)

## Installazione

```bash
# Il componente è già disponibile nella libreria
import { IsometricCardsSection } from '@/components/sections/IsometricCardsSection';
```

## Utilizzo Base

```tsx
import { IsometricCardsSection } from '@/components/sections/IsometricCardsSection';
import { Zap, Shield, Sparkles } from 'lucide-react';

function App() {
  return (
    <IsometricCardsSection
      title="Funzionalità Innovative"
      subtitle="Tutto ciò che ti serve per crescere"
      cards={[
        {
          icon: Zap,
          title: 'Performance Veloci',
          description: 'Caricamento istantaneo e risposta immediata per la migliore esperienza utente.',
          gradient: 'from-blue-500 to-cyan-500',
          hoverGradient: 'from-blue-600 to-cyan-600'
        },
        {
          icon: Shield,
          title: 'Sicurezza Avanzata',
          description: 'Protezione enterprise-grade con crittografia end-to-end e compliance certificata.',
          gradient: 'from-purple-500 to-pink-500',
          hoverGradient: 'from-purple-600 to-pink-600',
          badge: 'Più Popolare'
        },
        {
          icon: Sparkles,
          title: 'AI Integrata',
          description: 'Automazione intelligente che impara dalle tue abitudini e ottimizza i workflow.',
          gradient: 'from-orange-500 to-red-500',
          hoverGradient: 'from-orange-600 to-red-600'
        }
      ]}
    />
  );
}
```

## Props

### IsometricCardsSectionProps

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| `title` | `string` | Sì | - | Titolo principale della sezione |
| `subtitle` | `string` | No | - | Sottotitolo descrittivo |
| `cards` | `IsometricCard[]` | Sì | - | Array di carte da visualizzare |
| `className` | `string` | No | `''` | Classi CSS aggiuntive |

### IsometricCard

| Prop | Tipo | Richiesto | Default | Descrizione |
|------|------|-----------|---------|-------------|
| `icon` | `React.ComponentType<{ className?: string }>` | Sì | - | Componente icona (lucide-react) |
| `title` | `string` | Sì | - | Titolo della carta |
| `description` | `string` | Sì | - | Descrizione del contenuto |
| `gradient` | `string` | Sì | - | Classi gradiente Tailwind (es: "from-blue-500 to-cyan-500") |
| `hoverGradient` | `string` | No | - | Gradiente alternativo per stato hover |
| `badge` | `string` | No | - | Testo badge opzionale (es: "Nuovo", "Popolare") |

## Varianti

### Con Badge Evidenziato
```tsx
<IsometricCardsSection
  title="I Nostri Servizi"
  cards={[
    {
      icon: Star,
      title: 'Premium',
      description: 'Pacchetto completo con tutte le funzionalità',
      gradient: 'from-yellow-400 to-orange-500',
      badge: '⭐ Best Seller'
    },
    // altre carte...
  ]}
/>
```

### Con Sfondo Scuro
```tsx
<IsometricCardsSection
  title="Funzionalità Pro"
  subtitle="Per utenti avanzati"
  cards={[...]}
  className="bg-gray-900 text-white"
/>
```

### Grid a 4 Colonne
```tsx
{/* Modifica nel componente o con override CSS */}
<IsometricCardsSection
  cards={[...]} // 4 o più carte
  className="[&_.card-grid]:lg:grid-cols-4"
/>
```

## Customizzazione Avanzata

### Parametri 3D Personalizzati
```tsx
// Nel file IsometricCardsSection.tsx, puoi modificare:
const perspective = '1000px'; // Distanza prospettiva
const rotateX = '2deg';       // Inclinazione asse X
const rotateY = '-2deg';      // Inclinazione asse Y

// Hover transform
transform: 'perspective(1000px) rotateX(-1deg) rotateY(3deg) scale(1.02)'
```

### Transizioni Custom
```tsx
// Modifica la curva di animazione
transition: 'transform 0.5s cubic-bezier(0.21, 0.45, 0.27, 0.9)'

// Opzioni alternative:
// cubic-bezier(0.34, 1.56, 0.64, 1)  // Bounce effect
// cubic-bezier(0.25, 0.46, 0.45, 0.94) // Ease-out-quad
```

## Accessibilità

- Utilizza tag `<article>` semantico per ogni carta
- Icone decorative con `aria-hidden="true"`
- Descrizioni leggibili con contrasto sufficiente
- Trasformazioni 3D rispettano `prefers-reduced-motion`
- Tutti gli elementi interattivi sono accessibili da tastiera
- Focus visibile sulle carte con outline

## Best Practices

1. **Numero di Carte**: Usa 3 o 6 carte per layout bilanciato (multipli di 3)
2. **Lunghezza Descrizione**: Mantieni descrizioni tra 80-120 caratteri per uniformità
3. **Gradienti Coerenti**: Usa palette colori armoniche (analoghe o complementari)
4. **Badge Selettivi**: Usa badge solo su 1-2 carte per massimo impatto
5. **Icone Consistenti**: Usa icone della stessa famiglia (es: tutte lucide-react)
6. **Performance**: Limita le animazioni su dispositivi mobili per batteria
7. **Contrasto**: Assicurati che il testo sia leggibile su tutti i gradienti

## Dipendenze

- React 18+
- Tailwind CSS 3+
- lucide-react (per le icone)

## Browser Support

- Chrome/Edge 90+
- Firefox 85+
- Safari 14+
- Opera 76+

**Nota**: Le trasformazioni 3D non sono supportate su IE11. Su browser non supportati, le carte appariranno senza effetto prospettiva ma rimarranno completamente funzionali.

## Esempi di Utilizzo

### Landing Page SaaS
```tsx
<IsometricCardsSection
  title="Perché sceglierci?"
  subtitle="Vantaggi competitivi che fanno la differenza"
  cards={features}
/>
```

### Portfolio Creativo
```tsx
<IsometricCardsSection
  title="I Miei Servizi"
  cards={services}
  className="bg-gradient-to-b from-purple-50 to-white"
/>
```

### Showcase Prodotti
```tsx
<IsometricCardsSection
  title="Piani e Prezzi"
  cards={pricingTiers}
/>
```

## Note

- L'effetto isometrico è ottimizzato per desktop; su mobile le carte hanno effetto ridotto
- Le transizioni usano `will-change` per performance GPU-accelerated
- I gradienti supportano qualsiasi classe Tailwind CSS
- Il componente è completamente type-safe con TypeScript
