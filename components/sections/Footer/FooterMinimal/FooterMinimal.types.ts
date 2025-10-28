export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterMinimalProps {
  logo?: React.ReactNode;
  tagline?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
  variant?: 'dark' | 'light';
  showBackToTop?: boolean;
  className?: string;
}
