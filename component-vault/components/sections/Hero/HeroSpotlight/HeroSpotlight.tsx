import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Spotlight } from '@/components/effects/Spotlight';
import { ButtonShimmer } from '@/components/ui/ButtonShimmer';
import type { HeroSpotlightProps } from './HeroSpotlight.types';

/**
 * HeroSpotlight Section
 *
 * Modern hero section with animated spotlight effect.
 * Perfect for landing pages and product showcases.
 *
 * @example
 * ```tsx
 * <HeroSpotlight
 *   title="Transform Your Business"
 *   subtitle="The ultimate solution for modern companies"
 *   ctaText="Get Started"
 *   onCtaClick={() => console.log('CTA clicked')}
 * />
 * ```
 */
export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  children,
  className,
  spotlightColor = 'white',
}) => {
  return (
    <div
      className={cn(
        'relative h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={spotlightColor}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
        )}

        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {ctaText && (
              <ButtonShimmer onClick={onCtaClick}>
                {ctaText}
              </ButtonShimmer>
            )}

            {secondaryCtaText && (
              <button
                onClick={onSecondaryCtaClick}
                className="px-8 py-3 rounded-lg border border-neutral-600 text-white hover:bg-neutral-800 transition-colors"
              >
                {secondaryCtaText}
              </button>
            )}
          </div>
        )}

        {children && <div className="mt-12">{children}</div>}
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
    </div>
  );
};
