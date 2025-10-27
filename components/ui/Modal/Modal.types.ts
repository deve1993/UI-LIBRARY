import React from 'react';

/**
 * Dimensioni del modal
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props per il componente Modal
 * @interface ModalProps
 */
export interface ModalProps {
  /** Se true, il modal è visibile */
  open: boolean;
  /** Callback chiamata quando il modal viene chiuso */
  onClose: () => void;
  /** Titolo del modal */
  title?: string;
  /** Contenuto del modal */
  children: React.ReactNode;
  /** Footer del modal (tipicamente bottoni di azione) */
  footer?: React.ReactNode;
  /** Dimensione del modal */
  size?: ModalSize;
  /** Se true, mostra bottone di chiusura */
  showCloseButton?: boolean;
  /** Se true, chiude il modal al click sull'overlay */
  closeOnOverlayClick?: boolean;
  /** Se true, chiude il modal premendo ESC */
  closeOnEsc?: boolean;
  /** Classi CSS aggiuntive */
  className?: string;
}
