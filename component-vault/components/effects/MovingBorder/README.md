# MovingBorder

Animated gradient border component that rotates around elements.

## Features

- 🌈 Animated gradient border
- 🎨 Customizable colors
- ⚙️ Adjustable animation speed
- 📱 Fully responsive
- ✨ Premium look and feel

## Usage

```tsx
import { MovingBorder } from '@/components/effects/MovingBorder';

function PremiumCard() {
  return (
    <MovingBorder>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Premium Feature</h3>
        <p className="text-slate-300">This card has an animated border</p>
      </div>
    </MovingBorder>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content inside the border (required) |
| `className` | `string` | - | Additional CSS classes for content container |
| `containerClassName` | `string` | - | Additional CSS classes for border container |
| `borderColors` | `string[]` | `['#3b82f6', '#8b5cf6', '#ec4899']` | Gradient color stops |
| `duration` | `number` | `3` | Animation duration in seconds |

## Examples

### Basic Usage

```tsx
<MovingBorder>
  <div className="p-6 text-white">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</MovingBorder>
```

### Custom Colors

```tsx
<MovingBorder borderColors={['#22c55e', '#10b981', '#14b8a6']}>
  <div className="p-6 text-white">
    <h3>Green Gradient</h3>
  </div>
</MovingBorder>
```

### Slower Animation

```tsx
<MovingBorder duration={5}>
  <div className="p-6 text-white">
    <h3>Slow Motion</h3>
  </div>
</MovingBorder>
```

### With Button

```tsx
<MovingBorder className="inline-block">
  <button className="px-8 py-4 text-white font-semibold">
    Premium CTA
  </button>
</MovingBorder>
```

## How it Works

The component uses a conic gradient that rotates using CSS animations. The gradient creates the illusion of a border moving around the element.

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/moving-border)
