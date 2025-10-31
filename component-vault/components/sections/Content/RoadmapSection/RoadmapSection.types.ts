import React from 'react';

/**
 * RoadmapMilestone
 * @interface RoadmapMilestone
 */
export interface RoadmapMilestone {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  features?: string[];
}

/**
 * RoadmapSectionProps
 * @interface RoadmapSectionProps
 */
export interface RoadmapSectionProps {
  title: string;
  subtitle?: string;
  milestones: RoadmapMilestone[];
  className?: string;
}
