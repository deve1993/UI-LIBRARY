import React from 'react';
import { HeroSection } from '../HeroSection';

/**
 * Esempio Base - HeroSection
 *
 * Questo esempio mostra l'utilizzo più semplice del componente HeroSection,
 * con headline, subheadline, metriche base e un singolo CTA.
 */
export const BasicExample: React.FC = () => {
  return (
    <HeroSection
      headline={{
        text: "Trasforma il tuo business con",
        highlight: "innovazione digitale"
      }}
      subheadline="La piattaforma all-in-one per far crescere la tua azienda online in modo veloce e sicuro"
      metrics={[
        {
          value: "10K+",
          label: "Clienti Soddisfatti"
        },
        {
          value: "99%",
          label: "Uptime Garantito"
        },
        {
          value: "24/7",
          label: "Supporto Dedicato"
        }
      ]}
      primaryCta={{
        label: "Inizia Gratis",
        onClick: () => {
          console.log("Inizia il percorso gratuito!");
          // Qui potresti:
          // - Navigare alla pagina di signup
          // - Aprire un modal di registrazione
          // - Iniziare un tutorial guidato
        }
      }}
    />
  );
};

export default BasicExample;
