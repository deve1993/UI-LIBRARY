import { CTASectionAdvanced } from '../CTASectionAdvanced';

/**
 * Esempio base di CTASectionAdvanced
 *
 * Questo esempio mostra l'utilizzo minimo con:
 * - Titolo e descrizione
 * - 4 benefici con checkmark
 * - CTA button
 * - Mockup immagine
 */
export default function BasicExample() {
  return (
    <CTASectionAdvanced
      title="Pronto a iniziare?"
      description="Unisciti a centinaia di aziende che stanno già crescendo con la nostra piattaforma."
      benefits={[
        {
          text: 'Setup in 5 minuti',
          checked: true,
        },
        {
          text: 'Nessuna carta richiesta',
          checked: true,
        },
        {
          text: 'Supporto 24/7',
          checked: true,
        },
        {
          text: 'Cancellazione facile',
          checked: true,
        },
      ]}
      cta={{
        text: 'Inizia Gratis',
        href: '/signup',
      }}
      mockupImage={{
        src: 'https://via.placeholder.com/600x800/3b82f6/ffffff?text=Dashboard',
        alt: 'Dashboard Preview',
      }}
    />
  );
}
