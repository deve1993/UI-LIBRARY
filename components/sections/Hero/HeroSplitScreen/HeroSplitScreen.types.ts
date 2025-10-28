import React from 'react';

/**
 * Logo configuration
 */
export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Feature with icon
 */
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

/**
 * CTA Button
 */
export interface CTAButton {
  text: string;
  href: string;
}

/**
 * Trust Indicator with avatars and rating
 */
export interface TrustIndicator {
  avatars: Array<{ src: string; alt: string }>;
  text: string;
  rating?: number;
  ratingLabel?: string;
}

/**
 * Floating Card for mockup
 */
export interface FloatingCard {
  title: string;
  value: string;
  trend: 'up' | 'down';
  description: string;
  delay: number;
}

/**
 * Mockup Image with floating cards
 */
export interface MockupImage {
  src: string;
  alt: string;
  floatingCards?: FloatingCard[];
}

/**
 * HeroSplitScreen Props
 */
export interface HeroSplitScreenProps {
  logo: Logo;
  subtitle: string;
  description: string;
  features: Feature[];
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
  trustIndicators?: TrustIndicator[];
  mockupImage: MockupImage;
  className?: string;
}
