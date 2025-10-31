import React from 'react';

/**
 * Dimensioni del checkbox
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Props per il componente Checkbox
 * @interface CheckboxProps
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Dimensione del checkbox */
  size?: CheckboxSize;
  /** Label del checkbox */
  label?: string;
  /** Descrizione secondaria */
  description?: string;
  /** Messaggio di errore */
  error?: string;
  /** Se true, mostra stato indeterminato */
  indeterminate?: boolean;
  /** Classi CSS aggiuntive */
  className?: string;
}
