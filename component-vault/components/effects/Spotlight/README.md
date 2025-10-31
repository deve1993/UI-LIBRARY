# Spotlight

Animated spotlight effect component with smooth fade-in animation.

## Features

- ✨ Smooth spotlight animation
- 🎨 Customizable fill color
- 📱 Responsive sizing
- ⚡ Performance optimized with CSS animations
- 🎯 Perfect for hero sections

## Usage

```tsx
import { Spotlight } from '@/components/effects/Spotlight';

function HeroSection() {
  return (
    <div className="relative h-screen bg-black">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="blue"
      />
      <div className="relative z-10 text-white">
        <h1>Your content here</h1>
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `fill` | `string` | `'white'` | Fill color of the spotlight |

## Examples

### Basic Usage

```tsx
<Spotlight />
```

### Custom Color

```tsx
<Spotlight fill="blue" />
```

### Custom Position

```tsx
<Spotlight className="-top-40 left-0 md:left-60" />
```

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/spotlight)
