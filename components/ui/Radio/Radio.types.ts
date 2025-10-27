import React from 'react';

/**
 * Dimensioni del radio button
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Props per il componente Radio
 * @interface RadioProps
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Dimensione del radio */
  size?: RadioSize;
  /** Label del radio */
  label?: string;
  /** Descrizione secondaria */
  description?: string;
  /** Messaggio di errore */
  error?: string;
  /** Classi CSS aggiuntive */
  className?: string;
}

/**
 * Props per RadioGroup
 * @interface RadioGroupProps
 */
export interface RadioGroupProps {
  /** Nome del gruppo (usato per raggruppare radio buttons) */
  name: string;
  /** Valore selezionato */
  value?: string;
  /** Callback quando cambia la selezione */
  onChange?: (value: string) => void;
  /** Label del gruppo */
  label?: string;
  /** Messaggio di errore */
  error?: string;
  /** Orientamento del gruppo */
  orientation?: 'horizontal' | 'vertical';
  /** Dimensione dei radio buttons nel gruppo */
  size?: RadioSize;
  /** Children (Radio components) */
  children: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}
