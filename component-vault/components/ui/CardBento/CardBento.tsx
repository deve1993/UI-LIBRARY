import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { CardBentoProps } from './CardBento.types';

export const CardBento: React.FC<CardBentoProps> = ({ children, span = 1, className }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={cn('bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg', span === 2 && 'md:col-span-2', className)}>
      {children}
    </motion.div>
  );
};
