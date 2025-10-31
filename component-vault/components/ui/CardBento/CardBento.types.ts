import type { ReactNode } from 'react';

export interface CardBentoProps {
  children: ReactNode;
  span?: 1 | 2;
  className?: string;
}
