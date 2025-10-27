# CardGlow

Card component with animated glow effect on hover.

## Features

- ✨ Smooth glow animation
- 🎨 Customizable glow color
- 🌙 Dark mode support
- 📱 Fully responsive
- ⚡ Pure CSS animations

## Usage

```tsx
import { CardGlow } from '@/components/ui/CardGlow';

function PremiumFeature() {
  return (
    <CardGlow>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">Premium Feature</h3>
        <p className="text-gray-600">Hover to see the glow effect</p>
      </div>
    </CardGlow>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Card content (required) |
| `className` | `string` | - | Additional CSS classes |
| `glowColor` | `string` | `'rgba(59, 130, 246, 0.5)'` | Glow color |

## Examples

### Basic Card

```tsx
<CardGlow>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</CardGlow>
```

### Custom Glow Color

```tsx
<CardGlow glowColor="rgba(168, 85, 247, 0.5)">
  <div className="p-6">
    <h3>Purple Glow</h3>
    <p>Custom purple glow effect</p>
  </div>
</CardGlow>
```

### Feature Card

```tsx
<CardGlow>
  <div className="p-8">
    <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4">
      <Icon />
    </div>
    <h3 className="text-2xl font-bold mb-2">Feature Name</h3>
    <p className="text-gray-600">Feature description</p>
  </div>
</CardGlow>
```

### Grid of Glowing Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <CardGlow glowColor="rgba(59, 130, 246, 0.5)">
    <div className="p-6">Blue Feature</div>
  </CardGlow>
  <CardGlow glowColor="rgba(168, 85, 247, 0.5)">
    <div className="p-6">Purple Feature</div>
  </CardGlow>
  <CardGlow glowColor="rgba(236, 72, 153, 0.5)">
    <div className="p-6">Pink Feature</div>
  </CardGlow>
</div>
```

## How it Works

- Uses absolute positioned div with blur for glow
- Glow opacity transitions from 0 to 100 on hover
- Border color also transitions for cohesive effect
- Blur effect creates soft, diffused glow

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/)
