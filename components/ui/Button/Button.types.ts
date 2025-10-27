import React from 'react';

/**
 * Varianti visuali del bottone
 */
export type ButtonVariant =
  | 'primary'      // Blu solido - azione principale
  | 'secondary'    // Bordo blu - azione secondaria
  | 'success'      // Verde - azioni positive
  | 'danger'       // Rosso - azioni distruttive
  | 'warning'      // Giallo - avvisi
  | 'ghost'        // Trasparente - azioni subtle
  | 'link';        // Stile link - navigazione

/**
 * Dimensioni del bottone
 */
export type ButtonSize =
  | 'xs'    // Extra small - 24px height
  | 'sm'    // Small - 32px height
  | 'md'    // Medium - 40px height (default)
  | 'lg'    // Large - 48px height
  | 'xl';   // Extra large - 56px height

/**
 * Props per il componente Button
 * @interface ButtonProps
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visuale del bottone */
  variant?: ButtonVariant;
  /** Dimensione del bottone */
  size?: ButtonSize;
  /** Se true, il bottone occupa tutta la larghezza disponibile */
  fullWidth?: boolean;
  /** Se true, mostra uno stato di caricamento con spinner */
  loading?: boolean;
  /** Icona da mostrare a sinistra del testo */
  leftIcon?: React.ReactNode;
  /** Icona da mostrare a destra del testo */
  rightIcon?: React.ReactNode;
  /** Se true, il bottone ha bordi arrotondati completi (pill shape) */
  rounded?: boolean;
  /** Callback eseguita al click (eredita da HTMLButtonElement) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Contenuto del bottone */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}
