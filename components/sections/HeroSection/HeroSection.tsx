import React, { useState, useEffect } from 'react';
import type { HeroSectionProps } from './HeroSection.types';

/**
 * HeroSection - Sezione Hero con typewriter effect e metriche
 * 
 * Componente hero moderno con effetto typewriter animato, gradient backgrounds,
 * metriche in evidenza e CTA buttons. Include animazioni fluide e design responsivo.
 * 
 * @component
 * @example
 * ```tsx
 * <HeroSection
 *   headline={{ text: "Benvenuto", highlight: "nel futuro" }}
 *   subheadline="La soluzione perfetta per il tuo business"
 *   typewriterPhrases={["innovazione", "crescita", "successo"]}
 *   metrics={[
 *     { value: "10K+", label: "Utenti", icon: <UserIcon /> }
 *   ]}
 *   primaryCta={{ label: "Inizia Ora", onClick: () => {} }}
 * />
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheadline,
  typewriterPhrases = [],
  metrics,
  primaryCta,
  secondaryCta,
  className = '',
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150);

  // Effetto typewriter
  useEffect(() => {
    if (typewriterPhrases.length === 0) return;

    const ticker = setInterval(() => {
      const fullText = typewriterPhrases[currentPhrase];

      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        setDelta(150);

        if (text === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(fullText.substring(0, text.length - 1));
        setDelta(75);

        if (text === '') {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting, currentPhrase, delta, typewriterPhrases]);

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-28 lg:py-36 ${className}`}
      aria-label="Hero section"
    >
      {/* Elementi decorativi di sfondo */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-slow-delayed" />

      {/* Pattern a puntini */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {headline.text}
            {headline.highlight && (
              <>
                {' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {headline.highlight}
                </span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-gray-600 sm:text-xl md:text-2xl max-w-3xl mx-auto">
            {subheadline}
          </p>

          {/* Effetto Typewriter */}
          {typewriterPhrases.length > 0 && (
            <div className="mt-4 h-8">
              <p className="text-blue-600 text-lg font-medium">
                {text}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          )}

          {/* Bottoni CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={primaryCta.onClick}
              className="w-full sm:w-auto rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {primaryCta.label}
            </button>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="w-full sm:w-auto rounded-lg border-2 border-blue-600 px-8 py-4 text-base font-semibold text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>

          {/* Cards Metriche */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
              >
                {metric.icon && (
                  <div className="mb-3 flex justify-center text-blue-600">
                    {metric.icon}
                  </div>
                )}
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(20px);
          }
        }

        @keyframes float-slow-delayed {
          0%, 100% {
            transform: translate(50%, 50%) translateY(0px);
          }
          50% {
            transform: translate(50%, 50%) translateY(-20px);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
