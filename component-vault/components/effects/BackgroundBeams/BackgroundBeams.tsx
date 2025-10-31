import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { BackgroundBeamsProps } from './BackgroundBeams.types';

/**
 * BackgroundBeams Component
 *
 * Animated light beams background effect with smooth gradients.
 * Creates a dynamic, futuristic atmosphere.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <BackgroundBeams />
 *   <div className="relative z-10">Your content here</div>
 * </div>
 * ```
 */
export const BackgroundBeams: React.FC<BackgroundBeamsProps> = ({
  className,
  beamCount = 8,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden bg-slate-950',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />

      {/* Animated beams */}
      <div className="absolute inset-0">
        {Array.from({ length: beamCount }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px animate-meteor"
            style={{
              left: `${(i / beamCount) * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              background: `linear-gradient(to bottom, transparent, rgba(59, 130, 246, ${
                0.5 + Math.random() * 0.5
              }), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Radial gradient spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
    </div>
  );
};
