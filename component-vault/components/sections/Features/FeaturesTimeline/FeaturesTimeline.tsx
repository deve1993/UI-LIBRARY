import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { FeaturesTimelineProps } from './FeaturesTimeline.types';

export const FeaturesTimeline: React.FC<FeaturesTimelineProps> = ({
  title,
  subtitle,
  items,
  className,
}) => {
  return (
    <section className={cn('py-20 bg-white dark:bg-slate-950', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl font-bold dark:text-white mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>}
          </div>
        )}

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600" />

          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-20 pb-12 last:pb-0"
            >
              <div className="absolute left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                {item.icon || <span className="text-white font-bold">{idx + 1}</span>}
              </div>
              <div>
                {item.date && <p className="text-sm text-blue-600 font-semibold mb-2">{item.date}</p>}
                <h3 className="text-2xl font-bold dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
