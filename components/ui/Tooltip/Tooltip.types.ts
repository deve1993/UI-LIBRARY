import React from 'react';

/**
 * Posizionamento del tooltip
 */
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Props per il componente Tooltip
 * @interface TooltipProps
 */
export interface TooltipProps {
  /** Contenuto del tooltip */
  content: React.ReactNode;
  /** Elemento trigger (al quale applicare il tooltip) */
  children: React.ReactElement;
  /** Posizionamento del tooltip */
  placement?: TooltipPlacement;
  /** Delay in ms prima di mostrare il tooltip */
  delay?: number;
  /** Se true, tooltip disabilitato */
  disabled?: boolean;
  /** Classi CSS aggiuntive */
  className?: string;
}
