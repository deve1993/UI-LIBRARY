import React from 'react';

/**
 * Dimensioni del select
 */
export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Variante del select
 */
export type SelectVariant = 'default' | 'filled' | 'flushed';

/**
 * Opzione per il select
 */
export interface SelectOption {
  /** Valore dell'opzione */
  value: string | number;
  /** Label visualizzata */
  label: string;
  /** Se true, l'opzione è disabilitata */
  disabled?: boolean;
}

/**
 * Props per il componente Select
 * @interface SelectProps
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Variante visuale del select */
  variant?: SelectVariant;
  /** Dimensione del select */
  size?: SelectSize;
  /** Label del select */
  label?: string;
  /** Messaggio di errore */
  error?: string;
  /** Testo di aiuto */
  helperText?: string;
  /** Icona a sinistra */
  leftIcon?: React.ReactNode;
  /** Se true, il campo è obbligatorio */
  required?: boolean;
  /** Se true, occupa tutta la larghezza */
  fullWidth?: boolean;
  /** Opzioni del select */
  options?: SelectOption[];
  /** Placeholder quando nessuna opzione è selezionata */
  placeholder?: string;
  /** Classi CSS aggiuntive */
  className?: string;
}
