# ButtonShimmer

Button component with animated shimmer border effect.

## Features

- ✨ Animated shimmer effect
- 🎨 Customizable shimmer color
- 🖱️ Full button functionality
- ⚡ Smooth CSS animations
- 🎯 Perfect for CTAs and primary actions

## Usage

```tsx
import { ButtonShimmer } from '@/components/ui/ButtonShimmer';

function Hero() {
  return (
    <ButtonShimmer onClick={() => console.log('clicked')}>
      Get Started
    </ButtonShimmer>
  );
}
```

## Props

Extends all native HTML button attributes, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `className` | `string` | - | Additional CSS classes |
| `shimmerColor` | `string` | `'rgba(255, 255, 255, 0.5)'` | Shimmer effect color |

## Examples

### Basic Usage

```tsx
<ButtonShimmer>Click Me</ButtonShimmer>
```

### With Click Handler

```tsx
<ButtonShimmer onClick={() => alert('Clicked!')}>
  Get Started
</ButtonShimmer>
```

### Custom Styling

```tsx
<ButtonShimmer className="text-lg px-8">
  Premium Action
</ButtonShimmer>
```

### In Hero Section

```tsx
<div className="hero-section">
  <h1>Transform Your Business</h1>
  <p>Start your journey today</p>
  <ButtonShimmer onClick={handleSignup}>
    Start Free Trial
  </ButtonShimmer>
</div>
```

## Accessibility

- Fully keyboard accessible
- Supports all native button attributes (disabled, type, etc.)
- Focus ring for keyboard navigation
- ARIA attributes supported

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/shimmer-button)
