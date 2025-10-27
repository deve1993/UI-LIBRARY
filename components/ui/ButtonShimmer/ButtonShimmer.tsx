import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { ButtonShimmerProps } from './ButtonShimmer.types';

/**
 * ButtonShimmer Component
 *
 * Button with animated shimmer effect that moves across the button.
 * Creates an eye-catching, premium look for CTAs.
 *
 * @example
 * ```tsx
 * <ButtonShimmer onClick={() => console.log('clicked')}>
 *   Get Started
 * </ButtonShimmer>
 * ```
 */
export const ButtonShimmer: React.FC<ButtonShimmerProps> = ({
  children,
  className,
  shimmerColor = 'rgba(255, 255, 255, 0.5)',
  ...props
}) => {
  return (
    <button
      className={cn(
        'relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-shimmer bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-slate-900">
        {children}
      </span>
    </button>
  );
};
