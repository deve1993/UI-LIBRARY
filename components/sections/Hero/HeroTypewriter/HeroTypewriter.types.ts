import type { ReactNode } from 'react';

export interface HeroTypewriterProps {
  /**
   * Static part of the title (before typewriter effect)
   */
  titlePrefix?: string;

  /**
   * Words to cycle through with typewriter effect
   */
  words: string[];

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
   * Typing speed in milliseconds
   * @default 150
   */
  typeSpeed?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}
