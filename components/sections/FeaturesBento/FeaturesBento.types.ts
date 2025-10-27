import type { ReactNode } from 'react';

export interface BentoItem {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export interface FeaturesBentoProps {
  title?: string;
  subtitle?: string;
  items: BentoItem[];
  className?: string;
}
