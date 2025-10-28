# HeroVideo

Hero section with full-screen background video.

## Features

- 🎥 Full-screen background video
- 🎨 Customizable overlay opacity
- 📱 Fully responsive
- ⚡ Auto-play, loop, muted
- 🖼️ Poster image support

## Usage

```tsx
import { HeroVideo } from '@/components/sections/HeroVideo';

function LandingPage() {
  return (
    <HeroVideo
      title="Welcome to Our Platform"
      subtitle="Experience the future"
      videoSrc="/videos/hero-background.mp4"
      posterSrc="/images/hero-poster.jpg"
      ctaText="Get Started"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main heading (required) |
| `subtitle` | `string` | - | Subtitle |
| `videoSrc` | `string` | - | Video URL (required) |
| `posterSrc` | `string` | - | Poster image URL |
| `ctaText` | `string` | - | Primary CTA text |
| `secondaryCtaText` | `string` | - | Secondary CTA text |
| `onCtaClick` | `() => void` | - | Primary CTA handler |
| `onSecondaryCtaClick` | `() => void` | - | Secondary CTA handler |
| `children` | `ReactNode` | - | Additional content |
| `overlayOpacity` | `number` | `0.5` | Overlay opacity (0-1) |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage

```tsx
<HeroVideo
  title="Welcome"
  videoSrc="/hero.mp4"
  ctaText="Learn More"
/>
```

### With Poster

```tsx
<HeroVideo
  title="Experience Innovation"
  subtitle="The future starts here"
  videoSrc="/hero.mp4"
  posterSrc="/hero-poster.jpg"
  ctaText="Get Started"
/>
```

### Light Overlay

```tsx
<HeroVideo
  title="Bright and Clear"
  videoSrc="/hero.mp4"
  overlayOpacity={0.3}
  ctaText="Explore"
/>
```

### Dark Overlay

```tsx
<HeroVideo
  title="Dramatic Effect"
  videoSrc="/hero.mp4"
  overlayOpacity={0.7}
  ctaText="Discover"
/>
```

## Video Requirements

- Format: MP4 (best compatibility)
- Compressed for web
- Keep file size reasonable (<10MB)
- Consider using CDN

## Accessibility

- Video is muted by default
- Includes poster fallback
- Text is readable over video

## Dependencies

Requires `framer-motion` package.

## Source

Standard video background pattern
