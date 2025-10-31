# HeroParticles

Hero section with floating particles animation background.

## Features

- ✨ Floating particles animation
- 🎨 Customizable particle count
- 📱 Fully responsive
- ⚡ Powered by Framer Motion
- 🎯 Perfect for tech/sci-fi themes

## Usage

```tsx
import { HeroParticles } from '@/components/sections/HeroParticles';

function LandingPage() {
  return (
    <HeroParticles
      title="Welcome to the Future"
      subtitle="Innovation starts here"
      ctaText="Get Started"
      particleCount={100}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main heading (required) |
| `subtitle` | `string` | - | Subtitle |
| `ctaText` | `string` | - | Primary CTA text |
| `secondaryCtaText` | `string` | - | Secondary CTA text |
| `onCtaClick` | `() => void` | - | Primary CTA handler |
| `onSecondaryCtaClick` | `() => void` | - | Secondary CTA handler |
| `children` | `ReactNode` | - | Additional content |
| `particleCount` | `number` | `50` | Number of particles |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Hero

```tsx
<HeroParticles
  title="Welcome"
  subtitle="Innovation starts here"
  ctaText="Get Started"
/>
```

### Many Particles

```tsx
<HeroParticles
  title="Tech Innovation"
  subtitle="The future is now"
  ctaText="Explore"
  particleCount={100}
/>
```

### Few Particles (Minimal)

```tsx
<HeroParticles
  title="Minimal Design"
  ctaText="Learn More"
  particleCount={20}
/>
```

## How it Works

- Generates random particles on mount
- Each particle has unique animation properties
- Particles float up and down infinitely
- Opacity pulses for subtle effect

## Dependencies

Requires `framer-motion` package.

## Source

Adapted from various particle animation examples
