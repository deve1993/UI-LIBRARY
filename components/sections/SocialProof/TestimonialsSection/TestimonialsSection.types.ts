import React from 'react';

/**
 * Testimonial
 * @interface Testimonial
 */
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image?: string;
  quote: string;
  rating: number;
}

/**
 * TestimonialsSectionProps
 * @interface TestimonialsSectionProps
 */
export interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}
