# Design System

Sistema di design centralizzato per component-vault.

## File

- **tokens.ts**: Design tokens (colori, typography, spacing, shadows)
- **theme.config.ts**: Configurazione tema (light/dark mode)
- **variants.config.ts**: Sistema varianti (CVA)
- **breakpoints.ts**: Breakpoints responsive

## Utilizzo

```typescript
import { tokens } from './design-system/tokens'
import { lightTheme, darkTheme } from './design-system/theme.config'
import { buttonVariants } from './design-system/variants.config'
import { breakpoints } from './design-system/breakpoints'
```

## Aggiornamento

Questi file vengono generati/aggiornati automaticamente da **design-system-generator** agent.

Non modificare manualmente se non necessario.
