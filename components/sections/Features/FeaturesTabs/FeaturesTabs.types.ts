import type { ReactNode } from 'react';

export interface FeatureTab {
  id: string;
  label: string;
  icon?: ReactNode;
  title: string;
  description: string;
  image?: string;
  content?: ReactNode;
}

export interface FeaturesTabsProps {
  title?: string;
  subtitle?: string;
  tabs: FeatureTab[];
  className?: string;
}
