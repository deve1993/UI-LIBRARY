import React from 'react';

/**
 * Why Choose Benefit
 */
export interface WhyChooseBenefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  stat: string;
  statLabel: string;
}

/**
 * WhyChooseSection Props
 */
export interface WhyChooseSectionProps {
  title: string;
  subtitle?: string;
  benefits: WhyChooseBenefit[];
  className?: string;
}
