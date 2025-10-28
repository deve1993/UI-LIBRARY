import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroMeteorProps } from './HeroMeteor.types';

export const HeroMeteor: React.FC<HeroMeteorProps> = ({ title, subtitle, ctaText, onCtaClick, meteorCount = 20, children, className }) => {
  const meteors = useMemo(() => Array.from({ length: meteorCount }).map((_, i) => ({ id: i, left: Math.random() * 100, animationDelay: Math.random() * 5, duration: Math.random() * 2 + 3 })), [meteorCount]);

  return (
    <div className={cn('relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950', className)}>
      {meteors.map((meteor) => (
        <motion.div key={meteor.id} className="absolute w-0.5 h-24 bg-gradient-to-b from-blue-400 to-transparent" style={{ left: `${meteor.left}%`, top: '-100px' }} animate={{ y: ['0vh', '110vh'], opacity: [0, 1, 0] }} transition={{ duration: meteor.duration, delay: meteor.animationDelay, repeat: Infinity, ease: 'linear' }} />
      ))}
      <div className="relative z-10 text-center text-white">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold mb-6">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl mb-8">{subtitle}</motion.p>}
        {ctaText && <motion.button onClick={onCtaClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">{ctaText}</motion.button>}
      </div>
    </div>
  );
};
