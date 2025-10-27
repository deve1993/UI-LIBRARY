# TextReveal

Scroll-triggered text reveal effect with smooth word-by-word animation.

## Features

- 📜 Scroll-triggered reveal
- ✨ Word-by-word animation
- 🎨 Customizable colors
- 📱 Fully responsive
- ⚡ Powered by Framer Motion

## Usage

```tsx
import { TextReveal } from '@/components/effects/TextReveal';

function Story() {
  return (
    <TextReveal text="Scroll down to reveal this amazing story one word at a time" />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Text to reveal (required) |
| `revealedTextColor` | `string` | `'text-white'` | Tailwind class for revealed text color |
| `hiddenTextColor` | `string` | `'text-slate-700'` | Tailwind class for hidden text color |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage

```tsx
<TextReveal text="This text reveals as you scroll down the page" />
```

### Custom Colors

```tsx
<TextReveal
  text="Blue text reveals from gray"
  revealedTextColor="text-blue-400"
  hiddenTextColor="text-gray-600"
/>
```

### Long Form Content

```tsx
<TextReveal
  text="In the beginning was the Word, and the Word was with God, and the Word was God. Through him all things were made; without him nothing was made that has been made."
/>
```

## How it Works

1. Text is split into individual words
2. Each word tracks scroll progress
3. Words fade in based on scroll position
4. Creates a flowing, reading experience

## Use Cases

- Storytelling sections
- About page narratives
- Product feature explanations
- Mission statements
- Long-form content

## Dependencies

Requires `framer-motion` package.

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/text-reveal)
