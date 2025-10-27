import React from 'react';

/**
 * Padding della card
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Varianti visuali della card
 */
export type CardVariant = 'default' | 'bordered' | 'elevated' | 'ghost';

/**
 * Props per il componente Card principale
 * @interface CardProps
 */
export interface CardProps {
  /** Contenuto della card */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
  /** Se true, aggiunge hover effect */
  hoverable?: boolean;
  /** Padding della card */
  padding?: CardPadding;
  /** Variante visuale della card */
  variant?: CardVariant;
  /** Callback eseguita al click */
  onClick?: () => void;
}

/**
 * Props per CardHeader
 * @interface CardHeaderProps
 */
export interface CardHeaderProps {
  /** Contenuto dell'header */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}

/**
 * Props per CardTitle
 * @interface CardTitleProps
 */
export interface CardTitleProps {
  /** Contenuto del titolo */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}

/**
 * Props per CardDescription
 * @interface CardDescriptionProps
 */
export interface CardDescriptionProps {
  /** Contenuto della descrizione */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}

/**
 * Props per CardContent
 * @interface CardContentProps
 */
export interface CardContentProps {
  /** Contenuto del body */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}

/**
 * Props per CardFooter
 * @interface CardFooterProps
 */
export interface CardFooterProps {
  /** Contenuto del footer */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}
