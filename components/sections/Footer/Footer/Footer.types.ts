import React from 'react';

/**
 * FooterLink
 * @interface FooterLink
 */
export interface FooterLink {
  label: string;
  href: string;
}

/**
 * FooterColumn
 * @interface FooterColumn
 */
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/**
 * SocialLink
 * @interface SocialLink
 */
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * FooterProps
 * @interface FooterProps
 */
export interface FooterProps {
  logo: {
    src?: string;
    alt: string;
    text?: string;
  };
  tagline?: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    address?: string;
    email?: string;
    phone?: string;
  };
  legalLinks?: FooterLink[];
  copyright: string;
  className?: string;
}
