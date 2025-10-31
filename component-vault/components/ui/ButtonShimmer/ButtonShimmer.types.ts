import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonShimmerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Shimmer effect color
   * @default 'rgba(255, 255, 255, 0.5)'
   */
  shimmerColor?: string;
}
