# ContactSection

## 📋 Descrizione

Form di contatto completo con validazione, progress bar, social proof metrics e gestione stati.

### Caratteristiche Principali

- ✅ **Validazione form real-time**
- ✅ **Progress bar completamento**
- ✅ **Social proof metrics**
- ✅ **Stati success/error**
- ✅ **Privacy checkbox**
- ✅ **Layout responsive**

---

## 🖼️ Screenshot

### Vista Desktop
> **TODO**: Inserire screenshot del componente in versione desktop
>
> ![ContactSection Desktop](./screenshots/desktop.png)

### Vista Mobile
> **TODO**: Inserire screenshot del componente in versione mobile
>
> ![ContactSection Mobile](./screenshots/mobile.png)

---

## 📦 Installazione

```tsx
import { ContactSection } from '@/components/sections/ContactSection';
import type { ContactSectionProps } from '@/components/sections/ContactSection';
```

---

## 🎯 Utilizzo Base

```tsx
import { ContactSection } from '@/components/sections/ContactSection';

function App() {
  return (
    <ContactSection
      // Vedere examples/basic.tsx per un esempio completo
    />
  );
}
```

---

## 📚 Props

Vedere [ContactSection.types.ts](./ContactSection.types.ts) per la documentazione completa delle props e interfacce.

---

## 💡 Esempi

### Esempio Base
Vedere [examples/basic.tsx](./examples/basic.tsx) per un esempio di utilizzo base.

### Esempio Avanzato
Vedere [examples/advanced.tsx](./examples/advanced.tsx) per configurazioni avanzate.

---

## ♿ Accessibilità

Il componente è stato sviluppato seguendo le best practice di accessibilità:

- **Semantic HTML**: Tag semantici appropriati
- **ARIA Labels**: Labels e roles corretti
- **Keyboard navigation**: Supporto completo tastiera
- **Screen reader friendly**: Testato con screen readers
- **Focus states**: Indicatori di focus visibili
- **Color contrast**: WCAG AA compliant

---

## 🔧 Best Practices

### ✅ Do's

1. Fornisci sempre contenuti significativi e rilevanti
2. Usa icone appropriate e riconoscibili
3. Mantieni il testo conciso e leggibile
4. Testa su diversi dispositivi e browser
5. Assicurati che sia accessibile

### ❌ Don'ts

1. Non sovraccaricare con troppo contenuto
2. Evita animazioni eccessive
3. Non usare contrasti cromatici scarsi
4. Non omettere le alt descriptions
5. Non nascondere informazioni importanti

---

## 🧪 Testing

### Unit Tests

```bash
npm test ContactSection.test.tsx
```

### Visual Tests (Storybook)

```bash
npm run storybook
```

Naviga a: `Sections/ContactSection`

---

## 📱 Responsive Breakpoints

| Breakpoint | Dimensione | Comportamento |
|------------|------------|---------------|
| Mobile | < 640px | Layout verticale, stack completo |
| Tablet | 640px - 1024px | Layout intermedio |
| Desktop | > 1024px | Layout completo orizzontale |

---

## 🔗 Link Correlati

- [Esempio Base](./examples/basic.tsx)
- [Esempio Avanzato](./examples/advanced.tsx)
- [Storybook Stories](./ContactSection.stories.tsx)
- [Unit Tests](./ContactSection.test.tsx)
- [Type Definitions](./ContactSection.types.ts)

---

## 📝 Changelog

### v1.0.0
- ✨ Release iniziale
- ✅ Componente completamente responsive
- ✅ Accessibilità completa
- ✅ Documentazione completa

---

## 🤝 Contributi

Per bug reports, richieste di feature o contributi, consulta la [documentazione principale del progetto](../../../README.md).

---

## 📄 Licenza

Questo componente fa parte della libreria UI e segue la stessa licenza del progetto principale.
