# HeroSection

## 📋 Descrizione

Il componente **HeroSection** è una sezione hero moderna e accattivante, progettata per catturare immediatamente l'attenzione dei visitatori. Include un'headline impattante, effetto typewriter animato, metriche in evidenza e bottoni CTA prominenti.

### Caratteristiche Principali

- ✅ **Design moderno** - Gradienti e animazioni fluide
- ✅ **Effetto typewriter** - Animazione del testo dinamica e coinvolgente
- ✅ **Metriche in evidenza** - Showcase di dati chiave con icone
- ✅ **Doppio CTA** - Bottone primario e secondario
- ✅ **Completamente responsive** - Ottimizzato per tutti i dispositivi
- ✅ **Effetti di sfondo** - Elementi decorativi animati
- ✅ **Personalizzabile** - Facilmente adattabile al tuo brand
- ✅ **Accessibilità** - ARIA labels e semantic HTML

---

## 🖼️ Screenshot

### Vista Desktop
> **TODO**: Inserire screenshot dell'hero in versione desktop
>
> ![HeroSection Desktop](./screenshots/desktop.png)

### Vista Mobile
> **TODO**: Inserire screenshot dell'hero in versione mobile
>
> ![HeroSection Mobile](./screenshots/mobile.png)

### Effetto Typewriter
> **TODO**: Inserire GIF animata dell'effetto typewriter
>
> ![Typewriter Effect](./screenshots/typewriter.gif)

---

## 📦 Installazione

```tsx
import { HeroSection } from '@/components/sections/HeroSection';
import type { HeroSectionProps } from '@/components/sections/HeroSection';
```

---

## 🎯 Utilizzo Base

```tsx
import { HeroSection } from '@/components/sections/HeroSection';

function App() {
  return (
    <HeroSection
      headline={{
        text: "Trasforma il tuo business con",
        highlight: "innovazione digitale"
      }}
      subheadline="La piattaforma all-in-one per far crescere la tua azienda online"
      metrics={[
        { value: "10K+", label: "Clienti Soddisfatti" },
        { value: "99%", label: "Uptime Garantito" },
        { value: "24/7", label: "Supporto Dedicato" }
      ]}
      primaryCta={{
        label: "Inizia Gratis",
        onClick: () => console.log("Primary CTA clicked!")
      }}
    />
  );
}
```

---

## 📚 Props

### HeroSectionProps

| Prop | Tipo | Obbligatorio | Default | Descrizione |
|------|------|--------------|---------|-------------|
| `headline` | `Headline` | ✅ Sì | - | Configurazione dell'headline principale |
| `subheadline` | `string` | ✅ Sì | - | Sottotitolo descrittivo |
| `typewriterPhrases` | `string[]` | ❌ No | `[]` | Frasi per l'effetto typewriter |
| `metrics` | `MetricCard[]` | ✅ Sì | - | Array di metriche da visualizzare |
| `primaryCta` | `PrimaryCTA` | ✅ Sì | - | Configurazione del bottone CTA primario |
| `secondaryCta` | `SecondaryCTA` | ❌ No | `undefined` | Configurazione del bottone CTA secondario |
| `className` | `string` | ❌ No | `""` | Classi CSS aggiuntive |

---

## ♿ Accessibilità

Il componente è stato sviluppato seguendo le best practice di accessibilità:

- **Semantic HTML**: Utilizza tag semantici
- **ARIA Labels**: Label appropriate per la sezione
- **Contrast ratio**: Colori ottimizzati per la leggibilità
- **Focus visibile**: Stati di focus chiari
- **Keyboard navigation**: Accessibile da tastiera

---

## 🔧 Best Practices

### ✅ Do's

1. **Headline conciso** - Max 10-15 parole per massimo impatto
2. **Subheadline chiaro** - Spiega il valore in 1-2 frasi
3. **Metriche rilevanti** - Usa numeri significativi
4. **CTA action-oriented** - Usa verbi d'azione
5. **Test su mobile** - Verifica sempre la leggibilità

### ❌ Don'ts

1. **Non usare troppo testo** - L'hero deve essere immediato
2. **Evita metriche generiche** - Sii specifico
3. **Non nascondere i CTA** - Devono essere visibili
4. **Evita troppe animazioni** - Mantieni equilibrio

---

## 🔗 Link Correlati

- [Esempio Base](./examples/basic.tsx)
- [Esempio Avanzato](./examples/advanced.tsx)
- [Storybook Stories](./HeroSection.stories.tsx)
- [Unit Tests](./HeroSection.test.tsx)

---

## 📝 Changelog

### v1.0.0
- ✨ Release iniziale
- ✅ Hero section responsive
- ✅ Effetto typewriter animato
- ✅ Metriche con icone
- ✅ Accessibilità completa
