import React from 'react';

/**
 * Singola feature da visualizzare
 * @interface FeatureItem
 */
export interface FeatureItem {
  /** Icona della feature */
  icon: React.ReactNode;
  /** Titolo della feature */
  title: string;
  /** Descrizione della feature */
  description: string;
  /** Lista di benefici specifici */
  benefits: string[];
  /** Badge opzionale (es: "Nuovo", "Popolare") */
  badge?: string;
}

/**
 * Props per il componente FeaturesSection
 * @interface FeaturesSectionProps
 */
export interface FeaturesSectionProps {
  /** Titolo della sezione */
  title: string;
  /** Sottotitolo opzionale */
  subtitle?: string;
  /** Array di features da visualizzare */
  features: FeatureItem[];
  /** Classi CSS aggiuntive */
  className?: string;
}
