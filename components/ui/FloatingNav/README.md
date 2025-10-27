# FloatingNav

Floating navigation bar with scroll-based show/hide behavior.

## Features

- 📍 Fixed floating position
- 🔼 Shows when scrolling up
- 🔽 Hides when scrolling down
- ✨ Smooth animations
- 🎨 Modern glassmorphism design
- 🔗 Support for icons

## Usage

```tsx
import { FloatingNav } from '@/components/ui/FloatingNav';
import { Home, User, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', link: '#home', icon: <Home className="w-4 h-4" /> },
  { name: 'About', link: '#about', icon: <User className="w-4 h-4" /> },
  { name: 'Contact', link: '#contact', icon: <Mail className="w-4 h-4" /> },
];

function App() {
  return <FloatingNav navItems={navItems} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navItems` | `FloatingNavItem[]` | - | Navigation items (required) |
| `className` | `string` | - | Additional CSS classes |

## Nav Item Type

```typescript
interface FloatingNavItem {
  name: string;      // Item label
  link: string;      // Link URL
  icon?: ReactNode;  // Optional icon
}
```

## Examples

### Basic Navigation

```tsx
const items = [
  { name: 'Home', link: '#home' },
  { name: 'Features', link: '#features' },
  { name: 'Pricing', link: '#pricing' },
];

<FloatingNav navItems={items} />
```

### With Icons

```tsx
import { Home, Zap, DollarSign } from 'lucide-react';

const items = [
  { name: 'Home', link: '#home', icon: <Home className="w-4 h-4" /> },
  { name: 'Features', link: '#features', icon: <Zap className="w-4 h-4" /> },
  { name: 'Pricing', link: '#pricing', icon: <DollarSign className="w-4 h-4" /> },
];

<FloatingNav navItems={items} />
```

### Custom Styling

```tsx
<FloatingNav
  navItems={items}
  className="bg-blue-950/90"
/>
```

## Behavior

- **Scroll Down**: Nav hides with smooth animation
- **Scroll Up**: Nav appears
- **Top of Page**: Nav always visible
- **Glassmorphism**: Blurred background for modern look

## Dependencies

Requires `framer-motion` package.

## Source

Adapted from [Aceternity UI](https://ui.aceternity.com/components/floating-navbar)
