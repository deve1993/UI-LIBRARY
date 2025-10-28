import React from 'react';

/**
 * ClientLogo
 * @interface ClientLogo
 */
export interface ClientLogo {
  name: string;
  logo: string;
  url?: string;
}

/**
 * ClientLogosSectionProps
 * @interface ClientLogosSectionProps
 */
export interface ClientLogosSectionProps {
  title?: string;
  subtitle?: string;
  logos: ClientLogo[];
  autoScroll?: boolean;
  scrollSpeed?: number;
  className?: string;
}
