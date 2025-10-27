import React from 'react';
import { HeroSection } from '../HeroSection';
import { Users, TrendingUp, Award } from 'lucide-react';

/**
 * Esempio Avanzato - HeroSection
 *
 * Questo esempio mostra tutte le funzionalità avanzate del componente:
 * - Effetto typewriter con frasi multiple
 * - Metriche con icone personalizzate
 * - Doppio CTA (primario e secondario)
 * - Styling personalizzato
 */
export const AdvancedExample: React.FC = () => {
  const handlePrimaryCTA = () => {
    console.log("Primary CTA clicked!");
    // Esempio: Apri modal di registrazione
    // openSignupModal();

    // Esempio: Track analytics event
    // analytics.track('hero_cta_clicked', {
    //   type: 'primary',
    //   label: 'Richiedi Demo'
    // });

    // Esempio: Navigate to signup
    // router.push('/signup');
  };

  return (
    <HeroSection
      // Headline con evidenziazione
      headline={{
        text: "Il futuro del",
        highlight: "SaaS è qui"
      }}
      // Subheadline descrittivo
      subheadline="Automatizza il tuo business con AI e machine learning di ultima generazione. Scalabile, sicuro e facilissimo da usare."
      // Frasi animate con effetto typewriter
      typewriterPhrases={[
        "automazione intelligente",
        "insights in tempo reale",
        "scalabilità illimitata",
        "sicurezza enterprise"
      ]}
      // Metriche con icone personalizzate
      metrics={[
        {
          value: "100K+",
          label: "Aziende che si fidano",
          icon: <Users className="h-8 w-8" />
        },
        {
          value: "3x",
          label: "ROI Medio",
          icon: <TrendingUp className="h-8 w-8" />
        },
        {
          value: "#1",
          label: "Nel Settore",
          icon: <Award className="h-8 w-8" />
        }
      ]}
      // CTA primario con handler
      primaryCta={{
        label: "Richiedi Demo",
        onClick: handlePrimaryCTA
      }}
      // CTA secondario con link
      secondaryCta={{
        label: "Vedi Prezzi",
        href: "/pricing"
      }}
      // Classi CSS personalizzate (opzionale)
      className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50"
    />
  );
};

/**
 * Esempio per Startup/SaaS
 */
export const StartupHeroExample: React.FC = () => {
  return (
    <HeroSection
      headline={{
        text: "Crescita esponenziale per",
        highlight: "startup ambiziose"
      }}
      subheadline="Da zero a 100K utenti in meno di un anno. Gli strumenti che hanno usato le migliori startup del mondo."
      typewriterPhrases={[
        "analytics avanzate",
        "growth hacking",
        "A/B testing",
        "retention optimization"
      ]}
      metrics={[
        { value: "500+", label: "Startup Finanziate", icon: <TrendingUp className="h-8 w-8" /> },
        { value: "$2M+", label: "Funding Medio", icon: <Award className="h-8 w-8" /> },
        { value: "95%", label: "Success Rate", icon: <Users className="h-8 w-8" /> }
      ]}
      primaryCta={{
        label: "Inizia Gratis",
        onClick: () => window.location.href = "/signup"
      }}
      secondaryCta={{
        label: "Case Studies",
        href: "/success-stories"
      }}
    />
  );
};

/**
 * Esempio per E-commerce
 */
export const EcommerceHeroExample: React.FC = () => {
  return (
    <HeroSection
      headline={{
        text: "Vendi online come",
        highlight: "mai prima d'ora"
      }}
      subheadline="La piattaforma e-commerce che fa crescere il tuo fatturato del 300%. Senza commissioni nascoste."
      metrics={[
        { value: "€50M+", label: "Volume Transato" },
        { value: "0%", label: "Commissioni" },
        { value: "2min", label: "Setup Completo" }
      ]}
      primaryCta={{
        label: "Apri il Tuo Negozio",
        onClick: () => console.log("Opening store...")
      }}
      secondaryCta={{
        label: "Vedi Demo Live",
        href: "/demo"
      }}
    />
  );
};

export default AdvancedExample;
