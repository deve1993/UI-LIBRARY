import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroTypewriterProps } from './HeroTypewriter.types';

/**
 * HeroTypewriter Section
 *
 * Hero section with typewriter effect cycling through words.
 * Creates dynamic, engaging headlines.
 *
 * @example
 * ```tsx
 * <HeroTypewriter
 *   titlePrefix="Build"
 *   words={['Amazing', 'Beautiful', 'Modern']}
 *   subtitle="Products that users love"
 * />
 * ```
 */
export const HeroTypewriter: React.FC<HeroTypewriterProps> = ({
  titlePrefix,
  words,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  children,
  typeSpeed = 150,
  className,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setCurrentText(word.substring(0, currentText.length + 1));

          if (currentText === word) {
            // Wait before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          // Deleting
          setCurrentText(word.substring(0, currentText.length - 1));

          if (currentText === '') {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? typeSpeed / 2 : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed]);

  return (
    <div
      className={cn(
        'relative h-screen w-full flex items-center justify-center bg-slate-950',
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {titlePrefix && <span>{titlePrefix} </span>}
          <span className="text-blue-400">
            {currentText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {(ctaText || secondaryCtaText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaText && (
              <button
                onClick={onCtaClick}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {ctaText}
              </button>
            )}

            {secondaryCtaText && (
              <button
                onClick={onSecondaryCtaClick}
                className="px-8 py-4 rounded-lg border border-slate-600 text-white hover:bg-slate-800 transition-colors"
              >
                {secondaryCtaText}
              </button>
            )}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};
