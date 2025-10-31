import type { ReactNode } from 'react';

export interface HeroMeteorProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  meteorCount?: number;
  children?: ReactNode;
  className?: string;
}
