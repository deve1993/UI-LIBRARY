import type { ReactNode } from 'react';

export interface HeroSpotlightProps {
  /**
   * Main heading text
   */
  title: string;

  /**
   * Subtitle or description
   */
  subtitle?: string;

  /**
   * Call-to-action button text
   */
  ctaText?: string;

  /**
   * Secondary CTA button text
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
   * Additional content to render below CTAs
   */
  children?: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Spotlight fill color
   * @default 'white'
   */
  spotlightColor?: string;
}
