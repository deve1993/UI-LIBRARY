import React from 'react';

/**
 * Configurazione per una card metrica nel hero
 * @interface MetricCard
 */
export interface MetricCard {
  /** Valore della metrica da visualizzare (es: "10K+", "99%") */
  value: string;
  /** Label descrittiva della metrica */
  label: string;
  /** Icona opzionale da mostrare sopra il valore */
  icon?: React.ReactNode;
}

/**
 * Configurazione del testo principale dell'hero
 * @interface Headline
 */
export interface Headline {
  /** Testo principale dell'headline */
  text: string;
  /** Parte del testo da evidenziare con gradiente */
  highlight?: string;
}

/**
 * Configurazione del bottone CTA primario
 * @interface PrimaryCTA
 */
export interface PrimaryCTA {
  /** Testo del bottone */
  label: string;
  /** Callback eseguita al click */
  onClick: () => void;
}

/**
 * Configurazione del bottone CTA secondario
 * @interface SecondaryCTA
 */
export interface SecondaryCTA {
  /** Testo del bottone */
  label: string;
  /** URL di destinazione */
  href: string;
}

/**
 * Props per il componente HeroSection
 * @interface HeroSectionProps
 */
export interface HeroSectionProps {
  /** Configurazione dell'headline principale */
  headline: Headline;
  /** Sottotitolo descrittivo */
  subheadline: string;
  /** Array di frasi per l'effetto typewriter (opzionale) */
  typewriterPhrases?: string[];
  /** Array di metriche da visualizzare */
  metrics: MetricCard[];
  /** Configurazione del bottone CTA primario */
  primaryCta: PrimaryCTA;
  /** Configurazione del bottone CTA secondario (opzionale) */
  secondaryCta?: SecondaryCTA;
  /** Classi CSS aggiuntive */
  className?: string;
}
