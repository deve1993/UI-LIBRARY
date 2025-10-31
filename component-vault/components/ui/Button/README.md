# Button

## 📋 Descrizione

Il componente **Button** è un bottone versatile e completamente personalizzabile, progettato per coprire tutti i casi d'uso in un'applicazione moderna. Supporta 7 varianti visuali, 5 dimensioni, stati di caricamento, icone e completa accessibilità.

### Caratteristiche Principali

- ✅ **7 varianti**: primary, secondary, success, danger, warning, ghost, link
- ✅ **5 dimensioni**: xs, sm, md (default), lg, xl
- ✅ **Stato loading**: spinner animato integrato
- ✅ **Icone**: supporto left/right icons
- ✅ **Full width**: opzione per bottoni a larghezza piena
- ✅ **Rounded**: shape pill completamente arrotondata
- ✅ **Accessibilità**: ARIA attributes, keyboard navigation
- ✅ **Disabled state**: gestione automatica opacità e cursor

---

## 🖼️ Screenshot

> **TODO**: Inserire screenshot delle varianti

![Button Variants](./screenshots/variants.png)

---

## 📦 Installazione

```tsx
import { Button } from '@/components/ui/Button';
```

---

## 🎯 Utilizzo Base

```tsx
<Button variant="primary" onClick={() => console.log('clicked')}>
  Click Me
</Button>
```

---

## 📚 Props

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Variante visuale |
| `size` | `ButtonSize` | `'md'` | Dimensione |
| `fullWidth` | `boolean` | `false` | Larghezza piena |
| `loading` | `boolean` | `false` | Mostra spinner |
| `leftIcon` | `ReactNode` | - | Icona sinistra |
| `rightIcon` | `ReactNode` | - | Icona destra |
| `rounded` | `boolean` | `false` | Shape pill |
| `disabled` | `boolean` | `false` | Disabilita bottone |
| `onClick` | `function` | - | Callback click |
| `children` | `ReactNode` | - | Contenuto |

---

## 💡 Esempi

### Varianti

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Con Icone

```tsx
<Button leftIcon={<SearchIcon />}>
  Cerca
</Button>

<Button rightIcon={<ArrowRightIcon />}>
  Avanti
</Button>
```

### Loading State

```tsx
<Button loading>
  Loading...
</Button>
```

### Full Width

```tsx
<Button fullWidth variant="primary">
  Bottone a Larghezza Piena
</Button>
```

---

## ♿ Accessibilità

- Supporto completo keyboard (Tab, Enter, Space)
- ARIA attributes (`aria-busy`, `aria-disabled`)
- Focus ring visibile
- Screen reader friendly

---

## 📄 Licenza

Parte della libreria UI - stessa licenza del progetto.
