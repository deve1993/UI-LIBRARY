# BackgroundDots

Minimalist dot pattern background component.

## Features

- 🔘 Customizable dot size
- 🎨 Customizable dot color
- 📏 Adjustable spacing
- 📱 Fully responsive
- ⚡ Pure CSS implementation

## Usage

```tsx
import { BackgroundDots } from '@/components/effects/BackgroundDots';

function Section() {
  return (
    <div className="relative min-h-screen">
      <BackgroundDots />
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
| `dotColor` | `string` | `'rgba(255, 255, 255, 0.2)'` | Dot color |
| `dotSize` | `number` | `1` | Dot size in pixels |
| `dotSpacing` | `number` | `20` | Spacing between dots in pixels |

## Examples

### Basic Usage

```tsx
<BackgroundDots />
```

### Large Dots

```tsx
<BackgroundDots dotSize={2} dotSpacing={30} />
```

### Colored Dots

```tsx
<BackgroundDots dotColor="rgba(59, 130, 246, 0.3)" />
```

### Dense Pattern

```tsx
<BackgroundDots dotSpacing={15} />
```

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/dot-background)
