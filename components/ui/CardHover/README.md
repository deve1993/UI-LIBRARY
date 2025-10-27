# CardHover

Interactive card with smooth hover animations and spotlight effect.

## Features

- ✨ Smooth scale animation on hover
- 🔦 Spotlight effect follows mouse
- 🎨 Dark mode support
- 📱 Fully responsive
- ⚡ Powered by Framer Motion

## Usage

```tsx
import { CardHover } from '@/components/ui/CardHover';

function FeatureCard() {
  return (
    <CardHover>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">Feature Title</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Feature description goes here
        </p>
      </div>
    </CardHover>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Card content (required) |
| `className` | `string` | - | Additional CSS classes for card |
| `containerClassName` | `string` | - | Additional CSS classes for container |

## Examples

### Basic Card

```tsx
<CardHover>
  <div className="p-6">
    <h3 className="text-xl font-bold">Card Title</h3>
    <p>Card content</p>
  </div>
</CardHover>
```

### Feature Card with Icon

```tsx
<CardHover>
  <div className="p-8">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-2xl font-bold mb-2">Amazing Feature</h3>
    <p className="text-gray-600">Description of the feature</p>
  </div>
</CardHover>
```

### Product Card

```tsx
<CardHover>
  <div>
    <img src="/product.jpg" alt="Product" className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">Product Name</h3>
      <p className="text-gray-600 mb-4">$99.99</p>
      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Add to Cart
      </button>
    </div>
  </div>
</CardHover>
```

### Grid of Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature) => (
    <CardHover key={feature.id}>
      <div className="p-6">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </CardHover>
  ))}
</div>
```

## How it Works

- Uses Framer Motion for smooth scale animation
- Tracks mouse position for spotlight effect
- Spotlight appears only on hover
- Gentle scale (1.02x) prevents layout shift

## Dependencies

Requires `framer-motion` package.

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/hover-effect)
