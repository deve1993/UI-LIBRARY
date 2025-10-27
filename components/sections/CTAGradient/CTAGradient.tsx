import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { CTAGradientProps } from './CTAGradient.types';

export const CTAGradient: React.FC<CTAGradientProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  className,
}) => {
  return (
    <section className={cn('py-20', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-12 md:p-20 text-center"
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-first" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-second" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h2>
            {subtitle && <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subtitle}</p>}
            <button
              onClick={onCtaClick}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-xl"
            >
              {ctaText}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
