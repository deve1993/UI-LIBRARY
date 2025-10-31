import React from 'react';

/**
 * Dimensioni dello switch
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Props per il componente Switch
 * @interface SwitchProps
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Dimensione dello switch */
  size?: SwitchSize;
  /** Label dello switch */
  label?: string;
  /** Descrizione secondaria */
  description?: string;
  /** Messaggio di errore */
  error?: string;
  /** Se true, checked */
  checked?: boolean;
  /** Callback quando cambia lo stato */
  onCheckedChange?: (checked: boolean) => void;
  /** Classi CSS aggiuntive */
  className?: string;
}
