import React from 'react';

/**
 * ContactFormData
 * @interface ContactFormData
 */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  privacyAccepted: boolean;
}

/**
 * SocialProofMetric
 * @interface SocialProofMetric
 */
export interface SocialProofMetric {
  icon: React.ReactNode;
  label: string;
  value: string;
}

/**
 * ContactSectionProps
 * @interface ContactSectionProps
 */
export interface ContactSectionProps {
  title: string;
  subtitle?: string;
  onSubmit: (data: ContactFormData) => Promise<void>;
  socialProof?: SocialProofMetric[];
  privacyPolicyUrl?: string;
  className?: string;
}
