import React from 'react';

/**
 * Dimensioni del textarea
 */
export type TextareaSize = 'sm' | 'md' | 'lg';

/**
 * Variante del textarea
 */
export type TextareaVariant = 'default' | 'filled' | 'flushed';

/**
 * Resize behavior del textarea
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Props per il componente Textarea
 * @interface TextareaProps
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Variante visuale del textarea */
  variant?: TextareaVariant;
  /** Dimensione del textarea */
  size?: TextareaSize;
  /** Label del textarea */
  label?: string;
  /** Messaggio di errore */
  error?: string;
  /** Testo di aiuto */
  helperText?: string;
  /** Se true, il campo è obbligatorio */
  required?: boolean;
  /** Se true, occupa tutta la larghezza */
  fullWidth?: boolean;
  /** Comportamento resize */
  resize?: TextareaResize;
  /** Mostra contatore caratteri */
  showCount?: boolean;
  /** Massimo numero di caratteri */
  maxLength?: number;
  /** Classi CSS aggiuntive */
  className?: string;
}
