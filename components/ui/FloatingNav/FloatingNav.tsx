import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { FloatingNavProps } from './FloatingNav.types';

/**
 * FloatingNav Component
 *
 * Floating navigation bar that appears/disappears on scroll.
 * Modern, clean design perfect for single-page applications.
 *
 * @example
 * ```tsx
 * <FloatingNav
 *   navItems={[
 *     { name: 'Home', link: '#home' },
 *     { name: 'About', link: '#about' },
 *   ]}
 * />
 * ```
 */
export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  className,
}) => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Show nav when scrolling up, hide when scrolling down
      setVisible(
        (prevScrollPos > currentScrollPos && currentScrollPos > 10) ||
          currentScrollPos < 10
      );

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-slate-700 rounded-full bg-slate-950/80 backdrop-blur-md shadow-xl z-[5000] px-8 py-4 items-center justify-center space-x-4',
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              'relative text-slate-300 items-center flex space-x-1 hover:text-white transition-colors'
            )}
          >
            {navItem.icon && <span className="block">{navItem.icon}</span>}
            <span className="block text-sm">{navItem.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
