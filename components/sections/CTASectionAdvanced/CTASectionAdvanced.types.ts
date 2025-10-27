import React from 'react';

/**
 * CTA Benefit
 */
export interface CTABenefit {
  text: string;
  checked: boolean;
}

/**
 * CTA Button
 */
export interface CTAButton {
  text: string;
  href: string;
}

/**
 * CTA Trust Indicator
 */
export interface CTATrustIndicator {
  avatars: Array<{ src: string; alt: string }>;
  text: string;
  rating?: number;
  ratingLabel?: string;
}

/**
 * Mockup Image
 */
export interface MockupImage {
  src: string;
  alt: string;
}

/**
 * CTASectionAdvanced Props
 */
export interface CTASectionAdvancedProps {
  badge?: string;
  title: string;
  description: string;
  benefits: CTABenefit[];
  cta: CTAButton;
  trustIndicators?: CTATrustIndicator;
  mockupImage: MockupImage;
  className?: string;
}
