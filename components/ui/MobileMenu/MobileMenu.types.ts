import type { ReactNode } from 'react';

export interface MenuItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface MobileMenuProps {
  items: MenuItem[];
  className?: string;
}
