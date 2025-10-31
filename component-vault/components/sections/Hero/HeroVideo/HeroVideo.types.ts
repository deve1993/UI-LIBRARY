import type { ReactNode } from 'react';

export interface HeroVideoProps {
  /**
   * Main heading
   */
  title: string;

  /**
   * Subtitle
   */
  subtitle?: string;

  /**
   * Video source URL (mp4, webm, etc.)
   */
  videoSrc: string;

  /**
   * Video poster image
   */
  posterSrc?: string;

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
   * Video overlay opacity (0-1)
   * @default 0.5
   */
  overlayOpacity?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}
