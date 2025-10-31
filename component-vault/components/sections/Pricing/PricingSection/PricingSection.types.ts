import React from 'react';

/**
 * PricingFeature
 * @interface PricingFeature
 */
export interface PricingFeature {
  text: string;
  included: boolean;
}

/**
 * PricingPlan
 * @interface PricingPlan
 */
export interface PricingPlan {
  name: string;
  description: string;
  price: {
    amount: number | string;
    currency: string;
    period: string;
  };
  badge?: {
    text: string;
    variant: 'recommended' | 'coming-soon' | 'popular';
  };
  features: PricingFeature[];
  cta: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
  };
  highlighted?: boolean;
  perfectFor?: string;
}

/**
 * PricingSectionProps
 * @interface PricingSectionProps
 */
export interface PricingSectionProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  billingToggle?: {
    monthly: string;
    yearly: string;
    onToggle?: (period: 'monthly' | 'yearly') => void;
  };
  className?: string;
}
