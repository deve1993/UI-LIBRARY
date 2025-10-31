import type { ReactNode } from 'react';

export interface Card3DProps {
  /**
   * Card content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Container CSS classes
   */
  containerClassName?: string;
}
