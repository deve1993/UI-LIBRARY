import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { MobileMenuProps } from './MobileMenu.types';

export const MobileMenu: React.FC<MobileMenuProps> = ({ items, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={cn('md:hidden p-2 text-slate-900 dark:text-white', className)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween' }} className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 shadow-xl z-50 md:hidden">
            <div className="p-6">
              <button onClick={() => setIsOpen(false)} className="mb-8"><X className="w-6 h-6" /></button>
              <nav className="space-y-4">
                {items.map((item, idx) => (
                  <a key={idx} href={item.href} className="flex items-center gap-3 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
