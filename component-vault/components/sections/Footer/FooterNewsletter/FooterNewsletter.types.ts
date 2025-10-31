export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface NewsletterConfig {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}

export interface FooterNewsletterProps {
  logo?: React.ReactNode;
  newsletterConfig?: NewsletterConfig;
  quickLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
  variant?: 'dark' | 'light';
  showWave?: boolean;
  gradientColors?: {
    from: string;
    via?: string;
    to: string;
  };
  className?: string;
}
