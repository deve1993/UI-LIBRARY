# InfiniteMovingCards

Infinite scrolling cards component with smooth animations.

## Features

- ∞ Infinite smooth scrolling
- 🔄 Bidirectional animation
- ⚡ Adjustable speed
- ⏸️ Pause on hover
- 🎨 Fully customizable

## Usage

```tsx
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';

const testimonials = [
  {
    quote: "This product changed my life!",
    name: "John Doe",
    title: "CEO, Company Inc."
  },
  // ... more items
];

function Testimonials() {
  return (
    <InfiniteMovingCards
      items={testimonials}
      direction="left"
      speed="normal"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `InfiniteMovingCardsItem[]` | - | Array of items to display (required) |
| `direction` | `'left' \| 'right'` | `'left'` | Animation direction |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `pauseOnHover` | `boolean` | `true` | Pause animation on hover |
| `className` | `string` | - | Additional CSS classes |

## Item Type

```typescript
interface InfiniteMovingCardsItem {
  quote: string;    // Main content
  name: string;     // Author name
  title: string;    // Author title/role
}
```

## Examples

### Basic Testimonials

```tsx
const testimonials = [
  {
    quote: "Amazing product, highly recommended!",
    name: "Sarah Johnson",
    title: "Product Manager"
  },
  {
    quote: "Best investment we've made this year.",
    name: "Mike Chen",
    title: "CTO, TechCorp"
  }
];

<InfiniteMovingCards items={testimonials} />
```

### Fast Right Scroll

```tsx
<InfiniteMovingCards
  items={testimonials}
  direction="right"
  speed="fast"
/>
```

### Slow Scroll Without Pause

```tsx
<InfiniteMovingCards
  items={testimonials}
  speed="slow"
  pauseOnHover={false}
/>
```

## Use Cases

- Customer testimonials
- Logo showcases
- Feature highlights
- Partner logos
- Product reviews

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/infinite-moving-cards)
