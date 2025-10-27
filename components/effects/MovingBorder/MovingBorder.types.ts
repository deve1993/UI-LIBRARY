import type { ReactNode } from 'react';

export interface MovingBorderProps {
  /**
   * Content inside the border
   */
  children: ReactNode;

  /**
   * Additional CSS classes for container
   */
  className?: string;

  /**
   * Container CSS classes
   */
  containerClassName?: string;

  /**
   * Border colors (gradient stops)
   * @default ['#3b82f6', '#8b5cf6', '#ec4899']
   */
  borderColors?: string[];

  /**
   * Animation duration in seconds
   * @default 3
   */
  duration?: number;
}
