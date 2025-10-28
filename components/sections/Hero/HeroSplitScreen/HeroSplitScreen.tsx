import React from 'react';
import type { HeroSplitScreenProps } from './HeroSplitScreen.types';

/**
 * HeroSplitScreen - Advanced hero section with split screen layout
 *
 * Features:
 * - Split screen layout (content + mockup)
 * - Floating glass cards for mockup
 * - Trust indicators with avatars and rating stars
 * - Dual CTA buttons
 * - Responsive design
 */
export const HeroSplitScreen: React.FC<HeroSplitScreenProps> = ({
  logo,
  subtitle,
  description,
  features,
  primaryCta,
  secondaryCta,
  trustIndicators,
  mockupImage,
  className = '',
}) => {
  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden py-20 ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="mb-8">
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-10"
              />
            </div>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-blue-600 font-semibold uppercase tracking-wider">
              {subtitle}
            </p>

            {/* Description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {description}
            </h1>

            {/* Features List */}
            <ul className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-lg text-gray-700">{feature.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap pt-4">
              <a
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105"
              >
                {primaryCta.text}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-900 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                >
                  {secondaryCta.text}
                </a>
              )}
            </div>

            {/* Trust Indicators */}
            {trustIndicators && trustIndicators.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {/* Avatar Stack */}
                    <div className="flex -space-x-2">
                      {indicator.avatars.map((avatar, avatarIndex) => (
                        <img
                          key={avatarIndex}
                          src={avatar.src}
                          alt={avatar.alt}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{indicator.text}</p>
                      {indicator.rating && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(indicator.rating!)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 fill-current'
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-900">{indicator.rating}</span>
                          {indicator.ratingLabel && (
                            <span className="text-sm text-gray-600">{indicator.ratingLabel}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Mockup with Floating Cards */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Mockup Image */}
              <img
                src={mockupImage.src}
                alt={mockupImage.alt}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating Cards */}
              {mockupImage.floatingCards && mockupImage.floatingCards.map((card, index) => (
                <div
                  key={index}
                  className="absolute p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 animate-float-slow"
                  style={{
                    top: index === 0 ? '10%' : index === 1 ? '50%' : '80%',
                    left: index === 0 ? '-10%' : index === 1 ? '80%' : '70%',
                    animationDelay: `${card.delay}s`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${
                      card.trend === 'up' ? 'from-green-400 to-emerald-500' : 'from-red-400 to-rose-500'
                    } flex items-center justify-center`}>
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {card.trend === 'up' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        )}
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                      <p className="text-xs text-gray-500">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplitScreen;
