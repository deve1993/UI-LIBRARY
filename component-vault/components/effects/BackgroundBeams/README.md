# BackgroundBeams

Animated light beams background effect with smooth gradients.

## Features

- ✨ Animated vertical light beams
- 🎨 Customizable beam count
- 🌈 Gradient overlays
- 📱 Fully responsive
- ⚡ CSS animations only

## Usage

```tsx
import { BackgroundBeams } from '@/components/effects/BackgroundBeams';

function Hero() {
  return (
    <div className="relative h-screen">
      <BackgroundBeams />
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
| `beamCount` | `number` | `8` | Number of beams to display |

## Examples

### Basic Usage

```tsx
<BackgroundBeams />
```

### Custom Beam Count

```tsx
<BackgroundBeams beamCount={12} />
```

### With Content

```tsx
<div className="relative min-h-screen">
  <BackgroundBeams />
  <div className="relative z-10 flex items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold text-white">Welcome</h1>
  </div>
</div>
```

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/background-beams)
