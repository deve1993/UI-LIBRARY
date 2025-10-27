import React, { useState, useEffect } from 'react';
import type { TestimonialsSectionProps } from './TestimonialsSection.types';

/**
 * TestimonialsSection - Carosello testimonials con autoplay
 *
 * Componente per mostrare testimonials dei clienti in un carosello
 * animato con navigazione, autoplay e rating a stelle.
 *
 * @component
 */

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  subtitle,
  testimonials,
  autoplay = true,
  autoplayDelay = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className={`py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="testimonials-title"
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

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="rounded-3xl bg-white p-8 md:p-12 shadow-2xl border border-gray-100">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <svg
                className="h-12 w-12 text-blue-600 opacity-20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote */}
            <blockquote className="text-center mb-8">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 ${
                      index < currentTestimonial.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  {currentTestimonial.rating}/5
                </span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex flex-col items-center">
              {currentTestimonial.image && (
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="h-16 w-16 rounded-full object-cover mb-4 ring-4 ring-blue-100"
                />
              )}
              {!currentTestimonial.image && (
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 ring-4 ring-blue-100">
                  <span className="text-white text-xl font-bold">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900">
                {currentTestimonial.name}
              </h3>
              <p className="text-sm text-gray-600">
                {currentTestimonial.role}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                {currentTestimonial.company}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-blue-600'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next testimonial"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Pause/Play Button */}
            {autoplay && (
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? (
                  <svg
                    className="h-6 w-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
