import type { ReactNode } from 'react';

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface FeaturesGridProps {
  /**
   * Section title
   */
  title?: string;

  /**
   * Section subtitle
   */
  subtitle?: string;

  /**
   * Array of features
   */
  features: Feature[];

  /**
   * Number of columns
   * @default 3
   */
  columns?: 2 | 3 | 4;

  /**
   * Additional CSS classes
   */
  className?: string;
}
