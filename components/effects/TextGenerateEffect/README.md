# TextGenerateEffect

Animated text effect that reveals words sequentially with blur animation.

## Features

- ✨ Word-by-word reveal animation
- 🎨 Optional blur filter effect
- ⚙️ Customizable animation duration
- 🎯 Perfect for headlines
- ⚡ Powered by Framer Motion

## Usage

```tsx
import { TextGenerateEffect } from '@/components/effects/TextGenerateEffect';

function Hero() {
  return (
    <TextGenerateEffect
      words="Transform your business with cutting-edge technology"
      className="text-4xl"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `words` | `string` | - | Text to animate (required) |
| `className` | `string` | - | Additional CSS classes |
| `duration` | `number` | `0.5` | Duration for each word animation in seconds |
| `filter` | `boolean` | `true` | Enable blur filter effect |

## Examples

### Basic Usage

```tsx
<TextGenerateEffect words="Welcome to our platform" />
```

### With Custom Duration

```tsx
<TextGenerateEffect
  words="Faster animation demo"
  duration={0.3}
/>
```

### Without Blur

```tsx
<TextGenerateEffect
  words="No blur effect here"
  filter={false}
/>
```

### Large Headline

```tsx
<TextGenerateEffect
  words="Transform Your Business Today"
  className="text-6xl font-bold text-white"
/>
```

## How it Works

- Splits text into individual words
- Animates each word with Framer Motion
- Optional blur filter creates smooth reveal
- Staggered delays create sequential effect

## Dependencies

Requires `framer-motion` package.

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/text-generate-effect)
