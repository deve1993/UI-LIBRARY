import React from 'react';
import type { IsometricCardsSectionProps, IsometricCard } from './IsometricCardsSection.types';

/**
 * IsometricCardsSection - Cards 3D con effetto isometrico
 *
 * Sezione con cards che hanno:
 * - Trasformazioni 3D isometriche
 * - Gradient borders animate
 * - Hover effects avanzati
 * - Dot pattern overlays
 * - Shine effects
 */
export const IsometricCardsSection: React.FC<IsometricCardsSectionProps> = ({
  title,
  subtitle,
  cards,
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

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <div
                key={index}
                className="group"
                style={{ perspective: '1000px' }}
              >
                {card.href ? (
                  <a href={card.href} className="block relative h-full">
                    <CardContent card={card} IconComponent={IconComponent} />
                  </a>
                ) : (
                  <div className="block relative h-full">
                    <CardContent card={card} IconComponent={IconComponent} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

// Card Content Component
const CardContent: React.FC<{
  card: IsometricCard;
  IconComponent: React.ComponentType<{ className?: string }>;
}> = ({ card, IconComponent }) => (
  <>
    {/* Animated gradient border */}
    <div
      className={`absolute -inset-[2px] bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
      style={{
        animation: 'gradient-shift 3s ease infinite',
        backgroundSize: '200% 200%'
      }}
    />

    {/* Main card with isometric effect */}
    <div
      className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden h-full min-h-[320px] border border-gray-200 transition-all duration-500 group-hover:border-transparent"
      style={{
        transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)',
        transition: 'transform 0.5s cubic-bezier(0.21, 0.45, 0.27, 0.9)',
      }}
    >
      {/* Card content */}
      <div className="pt-8 px-6 pb-6 relative h-full flex flex-col">
        {/* Floating icon badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <div className={`relative w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            {/* Icon glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
            <IconComponent className="w-6 h-6 text-white relative z-10" />
          </div>
        </div>

        {/* Text content */}
        <div className="mt-20 flex-1 flex flex-col text-center">
          <h3 className={`text-xl lg:text-2xl font-bold mb-3 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}>
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {card.description}
          </p>

          {/* Badge */}
          {card.badge && (
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-blue-300 shadow-lg">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-blue-600">
                  {card.badge}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Shine effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
        </div>
      </div>
    </div>
  </>
);

export default IsometricCardsSection;
