import type { ReactNode } from 'react';

export interface HeroGradientProps {
  /**
   * Main heading
   */
  title: string;

  /**
   * Subtitle or description
   */
  subtitle?: string;

  /**
   * Primary CTA text
   */
  ctaText?: string;

  /**
   * Secondary CTA text
   */
  secondaryCtaText?: string;

  /**
   * Primary CTA click handler
   */
  onCtaClick?: () => void;

  /**
   * Secondary CTA click handler
   */
  onSecondaryCtaClick?: () => void;

  /**
   * Additional content
   */
  children?: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
