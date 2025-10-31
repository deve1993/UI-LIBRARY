import React from 'react';

/**
 * Dimensioni dell'avatar
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Status indicator per l'avatar
 */
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

/**
 * Props per il componente Avatar
 * @interface AvatarProps
 */
export interface AvatarProps {
  /** URL dell'immagine avatar */
  src?: string;
  /** Testo alternativo per l'immagine */
  alt?: string;
  /** Nome dell'utente (usato per generare iniziali se manca src) */
  name?: string;
  /** Dimensione dell'avatar */
  size?: AvatarSize;
  /** Status indicator (online/offline/busy/away) */
  status?: AvatarStatus;
  /** Se true, mostra un badge di notifica */
  showBadge?: boolean;
  /** Numero da mostrare nel badge (es. notifiche) */
  badgeContent?: number;
  /** Icona fallback quando mancano sia src che name */
  fallbackIcon?: React.ReactNode;
  /** Classi CSS aggiuntive */
  className?: string;
}

/**
 * Props per il componente AvatarGroup
 * @interface AvatarGroupProps
 */
export interface AvatarGroupProps {
  /** Avatars da mostrare nel gruppo */
  children: React.ReactNode;
  /** Numero massimo di avatar da mostrare */
  max?: number;
  /** Dimensione degli avatar nel gruppo */
  size?: AvatarSize;
  /** Classi CSS aggiuntive */
  className?: string;
}
