# HeroGradient

Hero section with animated gradient mesh background.

## Features

- 🌈 Animated gradient mesh
- ✨ Smooth fade-in animations
- 📱 Fully responsive
- 🎯 Customizable CTAs
- ⚡ Powered by Framer Motion

## Usage

```tsx
import { HeroGradient } from '@/components/sections/HeroGradient';

function LandingPage() {
  return (
    <HeroGradient
      title="Welcome to the Future"
      subtitle="Build amazing products with cutting-edge technology"
      ctaText="Get Started"
      secondaryCtaText="Learn More"
      onCtaClick={() => console.log('Get Started')}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main heading (required) |
| `subtitle` | `string` | - | Subtitle or description |
| `ctaText` | `string` | - | Primary CTA text |
| `secondaryCtaText` | `string` | - | Secondary CTA text |
| `onCtaClick` | `() => void` | - | Primary CTA handler |
| `onSecondaryCtaClick` | `() => void` | - | Secondary CTA handler |
| `children` | `ReactNode` | - | Additional content |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Hero

```tsx
<HeroGradient
  title="Transform Your Business"
  subtitle="The next generation platform"
  ctaText="Start Free Trial"
/>
```

### With Both CTAs

```tsx
<HeroGradient
  title="Innovation Meets Design"
  subtitle="Create stunning experiences"
  ctaText="Get Started"
  secondaryCtaText="View Demo"
  onCtaClick={handleSignup}
  onSecondaryCtaClick={handleDemo}
/>
```

### With Additional Content

```tsx
<HeroGradient
  title="Join 10,000+ Teams"
  subtitle="Trusted worldwide"
  ctaText="Start Now"
>
  <div className="flex gap-8 justify-center">
    <img src="/logo1.png" alt="Partner 1" />
    <img src="/logo2.png" alt="Partner 2" />
  </div>
</HeroGradient>
```

## How it Works

- Uses multiple animated gradient blobs
- Framer Motion for smooth entrance animations
- Staggered animation delays for professional feel
- Fully responsive layout

## Dependencies

Requires `framer-motion` package.

## Source

Adapted from [Magic UI](https://magicui.design/)
