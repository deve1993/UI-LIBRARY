export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  address?: string;
  email?: string;
  phone?: string;
}

export interface PaymentMethod {
  name: string;
  icon: React.ReactNode;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterMegaProps {
  logo?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  paymentMethods?: PaymentMethod[];
  legalLinks?: FooterLink[];
  copyrightText?: string;
  variant?: 'dark' | 'light';
  showBackToTop?: boolean;
  className?: string;
}
