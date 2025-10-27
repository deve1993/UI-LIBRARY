import type { ReactNode } from 'react';

export interface CardGlowProps {
  /**
   * Card content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Glow color
   * @default 'rgba(59, 130, 246, 0.5)'
   */
  glowColor?: string;
}
