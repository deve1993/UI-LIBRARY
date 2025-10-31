import type { ReactNode } from 'react';

export interface FloatingNavItem {
  /**
   * Navigation item name/label
   */
  name: string;

  /**
   * Link URL
   */
  link: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;
}

export interface FloatingNavProps {
  /**
   * Navigation items
   */
  navItems: FloatingNavItem[];

  /**
   * Additional CSS classes
   */
  className?: string;
}
