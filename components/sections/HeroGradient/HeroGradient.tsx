import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroGradientProps } from './HeroGradient.types';

/**
 * HeroGradient Section
 *
 * Hero section with animated gradient mesh background.
 * Creates a vibrant, modern atmosphere.
 *
 * @example
 * ```tsx
 * <HeroGradient
 *   title="Welcome to the Future"
 *   subtitle="Build amazing products"
 *   ctaText="Get Started"
 * />
 * ```
 */
export const HeroGradient: React.FC<HeroGradientProps> = ({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950',
        className
      )}
    >
      {/* Animated gradient background */}
      <BackgroundGradient />

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
                className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-xl"
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

// Background Gradient Component
const BackgroundGradient: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-first" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-second" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-third" />
    </div>
  );
};
