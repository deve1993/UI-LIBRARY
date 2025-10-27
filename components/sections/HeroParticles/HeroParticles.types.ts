import type { ReactNode } from 'react';

export interface HeroParticlesProps {
  /**
   * Main heading
   */
  title: string;

  /**
   * Subtitle
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
   * Number of particles
   * @default 50
   */
  particleCount?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}
