import React from 'react';
import type { CTASectionAdvancedProps } from './CTASectionAdvanced.types';

/**
 * CTASectionAdvanced - Premium CTA Section
 *
 * Features:
 * - Split layout (content + mockup)
 * - Benefits checklist with gradient checkmarks
 * - Trust indicators with avatars and star ratings
 * - Optional badge
 * - Glassmorphism effects
 */
export const CTASectionAdvanced: React.FC<CTASectionAdvancedProps> = ({
  badge,
  title,
  description,
  benefits,
  cta,
  trustIndicators,
  mockupImage,
  className = '',
}) => {
  return (
    <section className={`py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - CTA Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-purple-200 shadow-lg">
                <span className="text-sm font-semibold text-purple-900">{badge}</span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              {title}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Benefits Checklist */}
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mt-0.5"
                    aria-label="Incluso"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-900 leading-relaxed">
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href={cta.href}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105"
              >
                {cta.text}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Trust Indicators */}
            {trustIndicators && (
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-2">
                    {trustIndicators.avatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar.src}
                        alt={avatar.alt}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{trustIndicators.text}</p>
                    {trustIndicators.rating && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(trustIndicators.rating!)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 fill-current'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-900">{trustIndicators.rating}</span>
                        {trustIndicators.ratingLabel && (
                          <span className="text-sm text-gray-600">{trustIndicators.ratingLabel}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Mockup Image */}
              <img
                src={mockupImage.src}
                alt={mockupImage.alt}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionAdvanced;
