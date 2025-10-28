import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { HeroVideoProps } from './HeroVideo.types';

/**
 * HeroVideo Section
 *
 * Hero section with full-screen background video.
 * Perfect for high-impact landing pages.
 *
 * @example
 * ```tsx
 * <HeroVideo
 *   title="Welcome"
 *   videoSrc="/hero-video.mp4"
 *   ctaText="Get Started"
 * />
 * ```
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({
  title,
  subtitle,
  videoSrc,
  posterSrc,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  children,
  overlayOpacity = 0.5,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative h-screen w-full flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {(ctaText || secondaryCtaText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaText && (
              <button
                onClick={onCtaClick}
                className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-xl"
              >
                {ctaText}
              </button>
            )}

            {secondaryCtaText && (
              <button
                onClick={onSecondaryCtaClick}
                className="px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};
