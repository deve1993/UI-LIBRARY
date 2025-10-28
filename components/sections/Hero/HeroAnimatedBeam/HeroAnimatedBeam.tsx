import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroAnimatedBeamProps } from './HeroAnimatedBeam.types';

export const HeroAnimatedBeam: React.FC<HeroAnimatedBeamProps> = ({
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
    <div className={cn('relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950', className)}>
      {/* Animated Beams */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{ top: `${20 + i * 15}%`, width: '100%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold text-white mb-6">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-300 mb-8">{subtitle}</motion.p>}
        {ctaText && (
          <motion.button onClick={onCtaClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">{ctaText}</motion.button>
        )}
      </div>
    </div>
  );
};
