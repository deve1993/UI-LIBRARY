import React from 'react';

/**
 * BenefitCard
 * @interface BenefitCard
 */
export interface BenefitCard {
  value: string | number;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
  animated?: boolean;
}

/**
 * BenefitsSectionProps
 * @interface BenefitsSectionProps
 */
export interface BenefitsSectionProps {
  title: string;
  subtitle?: string;
  benefits: BenefitCard[];
  className?: string;
}
