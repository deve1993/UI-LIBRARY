import React from 'react';

/**
 * Varianti del componente Input
 */
export type InputVariant = 'default' | 'filled' | 'flushed';

/**
 * Dimensioni del componente Input
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props per il componente Input
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Variante visuale */
  variant?: InputVariant;
  /** Dimensione */
  size?: InputSize;
  /** Label da mostrare sopra l'input */
  label?: string;
  /** Messaggio di errore da mostrare sotto l'input */
  error?: string;
  /** Messaggio di aiuto da mostrare sotto l'input */
  helperText?: string;
  /** Icona da mostrare a sinistra */
  leftIcon?: React.ReactNode;
  /** Icona da mostrare a destra */
  rightIcon?: React.ReactNode;
  /** Se true, mostra l'input come required */
  required?: boolean;
  /** Larghezza piena */
  fullWidth?: boolean;
}
