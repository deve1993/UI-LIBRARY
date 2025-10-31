import type { ReactNode } from 'react';

export interface HeroWavesProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  children?: ReactNode;
  className?: string;
}
