import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroParticlesProps } from './HeroParticles.types';

/**
 * HeroParticles Section
 *
 * Hero section with floating particles animation.
 * Creates a dynamic, tech-focused atmosphere.
 *
 * @example
 * ```tsx
 * <HeroParticles
 *   title="Welcome"
 *   subtitle="Innovation starts here"
 *   ctaText="Get Started"
 * />
 * ```
 */
export const HeroParticles: React.FC<HeroParticlesProps> = ({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  children,
  particleCount = 50,
  className,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, [particleCount]);

  return (
    <div
      className={cn(
        'relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950',
        className
      )}
    >
      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {(ctaText || secondaryCtaText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaText && (
              <button
                onClick={onCtaClick}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-xl"
              >
                {ctaText}
              </button>
            )}

            {secondaryCtaText && (
              <button
                onClick={onSecondaryCtaClick}
                className="px-8 py-4 rounded-lg border border-slate-600 text-white hover:bg-slate-800 transition-colors"
              >
                {secondaryCtaText}
              </button>
            )}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};
