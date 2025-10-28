import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { CTANewsletterProps } from './CTANewsletter.types';

export const CTANewsletter: React.FC<CTANewsletterProps> = ({
  title,
  subtitle,
  placeholder = 'Inserisci la tua email',
  buttonText = 'Iscriviti',
  onSubmit,
  className,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
    setEmail('');
  };

  return (
    <section className={cn('py-20 bg-slate-50 dark:bg-slate-900', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{subtitle}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-6 py-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {buttonText}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
