import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { MovingBorderProps } from './MovingBorder.types';

/**
 * MovingBorder Component
 *
 * Animated gradient border that moves around the element.
 * Creates an eye-catching, premium effect.
 *
 * @example
 * ```tsx
 * <MovingBorder>
 *   <div className="p-6">
 *     <h3>Premium Card</h3>
 *     <p>Content here</p>
 *   </div>
 * </MovingBorder>
 * ```
 */
export const MovingBorder: React.FC<MovingBorderProps> = ({
  children,
  className,
  containerClassName,
  borderColors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  duration = 3,
}) => {
  return (
    <div
      className={cn(
        'relative p-[1px] overflow-hidden rounded-2xl',
        containerClassName
      )}
    >
      {/* Animated border gradient */}
      <div
        className="absolute inset-0 animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, ${borderColors.join(', ')}, ${borderColors[0]})`,
          animationDuration: `${duration}s`,
        }}
      />

      {/* Content */}
      <div
        className={cn(
          'relative bg-slate-950 rounded-2xl z-10',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
