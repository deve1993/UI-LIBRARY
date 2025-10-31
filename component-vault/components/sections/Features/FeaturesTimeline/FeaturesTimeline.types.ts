import type { ReactNode } from 'react';

export interface TimelineItem {
  title: string;
  description: string;
  icon?: ReactNode;
  date?: string;
}

export interface FeaturesTimelineProps {
  title?: string;
  subtitle?: string;
  items: TimelineItem[];
  className?: string;
}
