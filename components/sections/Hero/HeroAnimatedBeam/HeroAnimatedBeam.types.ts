import type { ReactNode } from 'react';

export interface HeroAnimatedBeamProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  children?: ReactNode;
  className?: string;
}
