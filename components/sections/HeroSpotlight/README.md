# HeroSpotlight

Modern hero section with animated spotlight effect and gradient text.

## Features

- ✨ Animated spotlight effect
- 🎨 Gradient text with smooth animations
- 📱 Fully responsive
- 🎯 Customizable CTAs
- 🌐 Grid background pattern
- ⚡ Performance optimized

## Usage

```tsx
import { HeroSpotlight } from '@/components/sections/HeroSpotlight';

function LandingPage() {
  return (
    <HeroSpotlight
      title="Transform Your Business"
      subtitle="The ultimate solution for modern companies"
      ctaText="Get Started"
      secondaryCtaText="Learn More"
      onCtaClick={() => console.log('Get Started')}
      onSecondaryCtaClick={() => console.log('Learn More')}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main heading text (required) |
| `subtitle` | `string` | - | Subtitle or description |
| `ctaText` | `string` | - | Primary CTA button text |
| `secondaryCtaText` | `string` | - | Secondary CTA button text |
| `onCtaClick` | `() => void` | - | Primary CTA click handler |
| `onSecondaryCtaClick` | `() => void` | - | Secondary CTA click handler |
| `children` | `ReactNode` | - | Additional content below CTAs |
| `className` | `string` | - | Additional CSS classes |
| `spotlightColor` | `string` | `'white'` | Spotlight fill color |

## Examples

### Basic Hero

```tsx
<HeroSpotlight
  title="Welcome to Our Platform"
  subtitle="Build amazing products faster"
  ctaText="Start Free Trial"
/>
```

### Full Hero with Both CTAs

```tsx
<HeroSpotlight
  title="Transform Your Workflow"
  subtitle="Collaborate, create, and ship faster than ever"
  ctaText="Get Started"
  secondaryCtaText="View Demo"
  onCtaClick={handleSignup}
  onSecondaryCtaClick={handleDemo}
/>
```

### With Custom Spotlight Color

```tsx
<HeroSpotlight
  title="Premium Features"
  subtitle="Unlock the full potential"
  ctaText="Upgrade Now"
  spotlightColor="blue"
/>
```

### With Additional Content

```tsx
<HeroSpotlight
  title="Join 10,000+ Teams"
  subtitle="Trusted by leading companies worldwide"
  ctaText="Start Free"
>
  <div className="flex gap-8 justify-center items-center opacity-70">
    <img src="/logo1.png" alt="Company 1" />
    <img src="/logo2.png" alt="Company 2" />
    <img src="/logo3.png" alt="Company 3" />
  </div>
</HeroSpotlight>
```

## Composition

This component combines:
- **Spotlight** effect component for the animated light
- **ButtonShimmer** for the primary CTA
- Standard button for secondary CTA
- Grid background pattern
- Gradient text effect

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard accessible CTAs
- ARIA attributes where needed

## Source

Composed from [Aceternity UI](https://ui.aceternity.com/components/spotlight) components
