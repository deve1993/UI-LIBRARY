import React from 'react';

/**
 * Props per il componente Label
 * @interface LabelProps
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Se true, mostra asterisco per campo obbligatorio */
  required?: boolean;
  /** Se true, mostra tooltip informativo */
  tooltip?: string;
  /** Classi CSS aggiuntive */
  className?: string;
}
