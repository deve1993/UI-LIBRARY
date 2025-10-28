import React from 'react';

/**
 * Isometric Card
 */
export interface IsometricCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  hoverGradient?: string;
  badge?: string;
  href?: string;
}

/**
 * IsometricCardsSection Props
 */
export interface IsometricCardsSectionProps {
  title: string;
  subtitle?: string;
  cards: IsometricCard[];
  className?: string;
}
