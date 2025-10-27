import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { BackgroundDotsProps } from './BackgroundDots.types';

/**
 * BackgroundDots Component
 *
 * Dot pattern background for modern, minimalist designs.
 * Perfect for hero sections and content areas.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <BackgroundDots />
 *   <div className="relative z-10">Your content here</div>
 * </div>
 * ```
 */
export const BackgroundDots: React.FC<BackgroundDotsProps> = ({
  className,
  dotColor = 'rgba(255, 255, 255, 0.2)',
  dotSize = 1,
  dotSpacing = 20,
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};
