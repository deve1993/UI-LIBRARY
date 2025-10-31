import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { BackgroundGridProps } from './BackgroundGrid.types';

/**
 * Background Grid Component
 *
 * Animated grid background with optional gradient overlay.
 * Perfect for modern, tech-focused designs.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <BackgroundGrid />
 *   <div className="relative z-10">Your content here</div>
 * </div>
 * ```
 */
export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  className,
  gridColor = 'rgba(255, 255, 255, 0.1)',
  gridSize = 50,
  showGradient = true,
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Gradient Overlay */}
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      )}
    </div>
  );
};
