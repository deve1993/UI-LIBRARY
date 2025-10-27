# BackgroundGrid

Animated grid background component with optional gradient overlay.

## Features

- 📐 Customizable grid size
- 🎨 Customizable grid color
- 🌈 Optional gradient overlay
- 📱 Fully responsive
- ⚡ Pure CSS implementation (no JS)

## Usage

```tsx
import { BackgroundGrid } from '@/components/effects/BackgroundGrid';

function Section() {
  return (
    <div className="relative h-screen">
      <BackgroundGrid />
      <div className="relative z-10">
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
| `gridColor` | `string` | `'rgba(255, 255, 255, 0.1)'` | Grid line color |
| `gridSize` | `number` | `50` | Grid size in pixels |
| `showGradient` | `boolean` | `true` | Whether to show gradient overlay |

## Examples

### Basic Usage

```tsx
<BackgroundGrid />
```

### Custom Grid Size

```tsx
<BackgroundGrid gridSize={100} />
```

### Custom Color

```tsx
<BackgroundGrid gridColor="rgba(59, 130, 246, 0.2)" />
```

### No Gradient

```tsx
<BackgroundGrid showGradient={false} />
```

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/background-grid)
