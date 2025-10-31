# Card3D

Interactive card component with 3D tilt effect on mouse movement.

## Features

- 🖱️ Interactive 3D tilt effect
- ⚡ Smooth animations
- 🎨 Fully customizable styling
- 📱 Touch-friendly
- 🎯 Perfect for showcasing features, products, or content

## Usage

```tsx
import { Card3D } from '@/components/ui/Card3D';

function FeatureCard() {
  return (
    <Card3D className="bg-white rounded-xl shadow-xl p-8">
      <h3 className="text-2xl font-bold mb-4">Amazing Feature</h3>
      <p className="text-gray-600">
        This card tilts in 3D as you move your mouse over it!
      </p>
    </Card3D>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Card content |
| `className` | `string` | - | Additional CSS classes for the card |
| `containerClassName` | `string` | - | Additional CSS classes for the container |

## Examples

### Basic Card

```tsx
<Card3D className="bg-white p-6 rounded-lg shadow-lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card3D>
```

### Feature Card

```tsx
<Card3D className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-xl text-white">
  <div className="flex items-center gap-4 mb-4">
    <Icon className="w-12 h-12" />
    <h3 className="text-2xl font-bold">Premium Feature</h3>
  </div>
  <p className="text-white/90">
    Experience the next level of interaction
  </p>
</Card3D>
```

### Grid of Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature) => (
    <Card3D key={feature.id} className="bg-white p-6 rounded-xl">
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </Card3D>
  ))}
</div>
```

## How it Works

The component uses CSS 3D transforms and React state to create the tilt effect:

1. Tracks mouse position relative to the card
2. Calculates rotation angles based on mouse position
3. Applies smooth transforms using CSS transitions
4. Resets to original position on mouse leave

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/3d-card-effect)
