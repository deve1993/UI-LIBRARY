# ClientLogosSection

## 📋 Descrizione

Carosello infinito di loghi clienti con auto-scroll, effetto grayscale e fade edges.

### Caratteristiche Principali

- ✅ **Auto-scroll infinito**
- ✅ **Effetto grayscale hover**
- ✅ **Fade edges gradient**
- ✅ **Pause su mouse hover**
- ✅ **Link opzionali sui loghi**
- ✅ **Responsive e fluido**

---

## 🖼️ Screenshot

### Vista Desktop
> **TODO**: Inserire screenshot del componente in versione desktop
>
> ![ClientLogosSection Desktop](./screenshots/desktop.png)

### Vista Mobile
> **TODO**: Inserire screenshot del componente in versione mobile
>
> ![ClientLogosSection Mobile](./screenshots/mobile.png)

---

## 📦 Installazione

```tsx
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
import type { ClientLogosSectionProps } from '@/components/sections/ClientLogosSection';
```

---

## 🎯 Utilizzo Base

```tsx
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';

function App() {
  return (
    <ClientLogosSection
      // Vedere examples/basic.tsx per un esempio completo
    />
  );
}
```

---

## 📚 Props

Vedere [ClientLogosSection.types.ts](./ClientLogosSection.types.ts) per la documentazione completa delle props e interfacce.

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
npm test ClientLogosSection.test.tsx
```

### Visual Tests (Storybook)

```bash
npm run storybook
```

Naviga a: `Sections/ClientLogosSection`

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
- [Storybook Stories](./ClientLogosSection.stories.tsx)
- [Unit Tests](./ClientLogosSection.test.tsx)
- [Type Definitions](./ClientLogosSection.types.ts)

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
