/**
 * ClientLogosSection Component
 * @component
 */
import React, { useRef, useEffect } from 'react';
import type { ClientLogosSectionProps } from './ClientLogosSection.types';

/**
 * ClientLogosSection - Carosello infinito di loghi clienti
 *
 * @component
 */

export const ClientLogosSection: React.FC<ClientLogosSectionProps> = ({
  title,
  subtitle,
  logos,
  autoScroll = true,
  scrollSpeed = 1,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += scrollSpeed;

        // Reset scroll when reaching end
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoScroll, scrollSpeed]);

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section
      className={`py-16 bg-gray-50 overflow-hidden ${className}`}
      aria-label="Client logos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Logos Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: autoScroll ? 'auto' : 'smooth',
          }}
          onMouseEnter={() => {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
          }}
          onMouseLeave={() => {
            if (autoScroll && scrollRef.current) {
              const scroll = () => {
                if (scrollRef.current) {
                  scrollRef.current.scrollLeft += scrollSpeed;

                  if (
                    scrollRef.current.scrollLeft >=
                    scrollRef.current.scrollWidth - scrollRef.current.clientWidth
                  ) {
                    scrollRef.current.scrollLeft = 0;
                  }
                }
                animationRef.current = requestAnimationFrame(scroll);
              };
              animationRef.current = requestAnimationFrame(scroll);
            }
          }}
        >
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              {client.url ? (
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  />
                </a>
              ) : (
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                />
              )}
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="relative -mt-16 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
