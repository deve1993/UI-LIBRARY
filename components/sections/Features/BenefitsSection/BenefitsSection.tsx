/**
 * BenefitsSection Component
 * @component
 */
import React, { useState, useEffect, useRef } from 'react';
import type { BenefitsSectionProps } from './BenefitsSection.types';

/**
 * BenefitsSection - Sezione benefits con contatori animati a 4 colonne
 *
 * @component
 */

const AnimatedCounter: React.FC<{
  end: number;
  duration?: number;
  suffix?: string;
}> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            const currentCount = Math.floor(easeOutQuad * (end - startValue) + startValue);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title,
  subtitle,
  benefits,
  className = '',
}) => {
  return (
    <section
      className={`py-20 bg-gradient-to-b from-gray-50 to-white ${className}`}
      aria-labelledby="benefits-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="benefits-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Benefits Grid - 4 columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {benefit.icon}
              </div>

              {/* Value */}
              <div className="mb-2">
                <p className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {benefit.animated && typeof benefit.value === 'number' ? (
                    <AnimatedCounter
                      end={benefit.value}
                      suffix={benefit.suffix}
                    />
                  ) : (
                    <>
                      {benefit.value}
                      {benefit.suffix}
                    </>
                  )}
                </p>
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-100/50 to-transparent transform rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
