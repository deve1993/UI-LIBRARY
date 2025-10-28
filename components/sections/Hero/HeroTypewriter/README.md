# HeroTypewriter

Hero section with typewriter effect that cycles through words.

## Features

- ⌨️ Realistic typewriter animation
- 🔄 Cycles through multiple words
- ⚡ Customizable typing speed
- 📱 Fully responsive
- 🎯 Perfect for showcasing multiple value props

## Usage

```tsx
import { HeroTypewriter } from '@/components/sections/HeroTypewriter';

function LandingPage() {
  return (
    <HeroTypewriter
      titlePrefix="Build"
      words={['Amazing', 'Beautiful', 'Modern', 'Powerful']}
      subtitle="Products that users love"
      ctaText="Get Started"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titlePrefix` | `string` | - | Static part before typewriter |
| `words` | `string[]` | - | Words to cycle through (required) |
| `subtitle` | `string` | - | Subtitle |
| `ctaText` | `string` | - | Primary CTA text |
| `secondaryCtaText` | `string` | - | Secondary CTA text |
| `onCtaClick` | `() => void` | - | Primary CTA handler |
| `onSecondaryCtaClick` | `() => void` | - | Secondary CTA handler |
| `children` | `ReactNode` | - | Additional content |
| `typeSpeed` | `number` | `150` | Typing speed in ms |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage

```tsx
<HeroTypewriter
  titlePrefix="Create"
  words={['Websites', 'Apps', 'Experiences']}
  subtitle="That users will love"
  ctaText="Start Building"
/>
```

### Fast Typing

```tsx
<HeroTypewriter
  words={['Fast', 'Modern', 'Powerful']}
  typeSpeed={100}
  ctaText="Try Now"
/>
```

### Multiple Features

```tsx
<HeroTypewriter
  titlePrefix="We make it"
  words={['Easy', 'Fast', 'Secure', 'Scalable', 'Beautiful']}
  subtitle="Choose the platform trusted by thousands"
  ctaText="Get Started"
  secondaryCtaText="Learn More"
/>
```

## How it Works

- Types out each word character by character
- Pauses when word is complete
- Deletes the word
- Moves to next word
- Cycles infinitely

## Source

Inspired by typewriter animation libraries
