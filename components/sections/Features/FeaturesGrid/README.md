# FeaturesGrid

Grid layout section for displaying features with icons.

## Features

- 📐 Responsive grid layout
- 🎨 2, 3, or 4 column layouts
- ✨ Staggered animations
- 🌙 Dark mode support
- 📱 Mobile optimized

## Usage

```tsx
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { Zap, Shield, Star } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: 'Fast Performance',
    description: 'Lightning-fast load times',
  },
  // ... more features
];

<FeaturesGrid
  title="Why Choose Us"
  subtitle="Everything you need"
  features={features}
  columns={3}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Section title |
| `subtitle` | `string` | - | Section subtitle |
| `features` | `Feature[]` | - | Features array (required) |
| `columns` | `2 \| 3 \| 4` | `3` | Number of columns |
| `className` | `string` | - | Additional CSS classes |

## Feature Type

```typescript
interface Feature {
  icon: ReactNode;      // Feature icon
  title: string;        // Feature title
  description: string;  // Feature description
}
```
