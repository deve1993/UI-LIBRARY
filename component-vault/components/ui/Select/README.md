# Select Component

Dropdown select component with multiple variants and sizes.

## Features

- 3 variants (default, filled, flushed)
- 3 sizes (sm, md, lg)
- Label and helper text support
- Error state
- Icon support
- Required field indicator
- Fully accessible

## Usage

```tsx
import { Select } from '@/components/ui/Select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<Select
  label="Select an option"
  placeholder="Choose..."
  options={options}
  required
/>
```
