import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroWavesProps } from './HeroWaves.types';

export const HeroWaves: React.FC<HeroWavesProps> = ({ title, subtitle, ctaText, onCtaClick, children, className }) => {
  return (
    <div className={cn('relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 to-slate-950', className)}>
      <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <motion.path fill="#1e40af" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z" animate={{ d: ["M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z", "M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L0,320Z"] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }} />
      </svg>
      <div className="relative z-10 text-center text-white">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold mb-6">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl mb-8">{subtitle}</motion.p>}
        {ctaText && <motion.button onClick={onCtaClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors">{ctaText}</motion.button>}
      </div>
    </div>
  );
};
