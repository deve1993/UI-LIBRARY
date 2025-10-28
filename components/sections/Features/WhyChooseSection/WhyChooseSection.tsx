import React from 'react';
import type { WhyChooseSectionProps, WhyChooseBenefit } from './WhyChooseSection.types';

/**
 * WhyChooseSection - Sezione "Perché Sceglierci"
 *
 * Cards con statistiche integrate, isometric transforms e gradients
 */
export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  title,
  subtitle,
  benefits,
  className = '',
}) => {
  return (
    <section className={`py-20 lg:py-32 relative ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;

            return (
              <div
                key={index}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div className="block relative h-full">
                  {/* Animated gradient border */}
                  <div
                    className={`absolute -inset-[2px] bg-gradient-to-r ${benefit.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                  />

                  {/* Main card */}
                  <div
                    className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden h-full min-h-[280px] border border-gray-200 transition-all duration-500 group-hover:border-transparent"
                    style={{
                      transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)',
                      transition: 'transform 0.5s cubic-bezier(0.21, 0.45, 0.27, 0.9)',
                    }}
                  >
                    <div className="pt-8 px-6 pb-6 relative h-full flex flex-col">
                      {/* Icon */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                        <div className={`relative w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-xl blur-xl opacity-50`} />
                          <IconComponent className="w-7 h-7 text-white relative z-10" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-20 flex-1 flex flex-col text-center">
                        <h3 className={`text-xl lg:text-2xl font-bold mb-3 bg-gradient-to-br ${benefit.gradient} bg-clip-text text-transparent`}>
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {benefit.description}
                        </p>

                        {/* Stats */}
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-center gap-2">
                            <div className={`text-2xl font-bold bg-gradient-to-br ${benefit.gradient} bg-clip-text text-transparent`}>
                              {benefit.stat}
                            </div>
                            <div className="text-xs text-gray-600">
                              {benefit.statLabel}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
