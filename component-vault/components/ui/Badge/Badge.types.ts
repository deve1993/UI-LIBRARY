import React from 'react';

/**
 * Varianti visuali del badge
 */
export type BadgeVariant =
  | 'default'   // Grigio - uso generale
  | 'primary'   // Blu - badge primario
  | 'success'   // Verde - stati positivi
  | 'danger'    // Rosso - errori/avvisi critici
  | 'warning'   // Giallo - avvertimenti
  | 'info';     // Azzurro - informazioni

/**
 * Dimensioni del badge
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Stile del badge
 */
export type BadgeStyle = 'solid' | 'outline' | 'dot';

/**
 * Props per il componente Badge
 * @interface BadgeProps
 */
export interface BadgeProps {
  /** Contenuto del badge */
  children: React.ReactNode;
  /** Variante visuale del badge */
  variant?: BadgeVariant;
  /** Dimensione del badge */
  size?: BadgeSize;
  /** Stile del badge (solid/outline/dot) */
  style?: BadgeStyle;
  /** Icona da mostrare nel badge */
  icon?: React.ReactNode;
  /** Se true, mostra un bottone per rimuovere il badge */
  closable?: boolean;
  /** Callback chiamata quando il badge viene chiuso */
  onClose?: () => void;
  /** Classi CSS aggiuntive */
  className?: string;
}
