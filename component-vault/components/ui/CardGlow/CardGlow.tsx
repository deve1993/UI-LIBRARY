import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { CardGlowProps } from './CardGlow.types';

/**
 * CardGlow Component
 *
 * Card with animated glow effect on hover.
 * Creates a premium, high-tech appearance.
 *
 * @example
 * ```tsx
 * <CardGlow>
 *   <div className="p-6">
 *     <h3>Premium Card</h3>
 *     <p>Content here</p>
 *   </div>
 * </CardGlow>
 * ```
 */
export const CardGlow: React.FC<CardGlowProps> = ({
  children,
  className,
  glowColor = 'rgba(59, 130, 246, 0.5)',
}) => {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent)`,
        }}
      />

      {/* Card */}
      <div
        className={cn(
          'relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800',
          'transition-all duration-300',
          'group-hover:border-blue-400 dark:group-hover:border-blue-600',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
