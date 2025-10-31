import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { FeaturesBentoProps } from './FeaturesBento.types';

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({
  title,
  subtitle,
  items,
  className,
}) => {
  return (
    <section className={cn('py-20 bg-slate-50 dark:bg-slate-900', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl font-bold dark:text-white mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'bg-white dark:bg-slate-800 p-6 rounded-2xl',
                idx === 0 && 'md:col-span-2 md:row-span-2',
                item.className
              )}
            >
              {item.icon && <div className="mb-4">{item.icon}</div>}
              <h3 className="text-2xl font-bold dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
