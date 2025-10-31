/**
 * RoadmapSection Component
 * @component
 */
import React from 'react';
import type { RoadmapSectionProps, RoadmapMilestone } from './RoadmapSection.types';

/**
 * RoadmapSection - Timeline verticale con milestones e stati
 *
 * @component
 */

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  title,
  subtitle,
  milestones,
  className = '',
}) => {
  const getStatusColor = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          ring: 'ring-green-600',
          line: 'bg-green-600',
        };
      case 'in-progress':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          ring: 'ring-blue-600',
          line: 'bg-blue-600',
        };
      case 'planned':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          ring: 'ring-gray-400',
          line: 'bg-gray-400',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          ring: 'ring-gray-400',
          line: 'bg-gray-400',
        };
    }
  };

  const getStatusIcon = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg
            className="h-6 w-6 text-green-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg
            className="h-6 w-6 text-blue-600 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
      case 'planned':
        return (
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <section
      className={`py-20 bg-white ${className}`}
      aria-labelledby="roadmap-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="roadmap-title"
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

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const colors = getStatusColor(milestone.status);
              return (
                <div
                  key={index}
                  className="relative flex items-start"
                >
                  {/* Timeline node */}
                  <div className="hidden md:flex absolute left-8 -translate-x-1/2 items-center justify-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.bg} ring-4 ${colors.ring} ring-offset-2 bg-white`}
                    >
                      {getStatusIcon(milestone.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:ml-24 w-full">
                    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      {/* Date and Status Badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-gray-500">
                          {milestone.date}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
                        >
                          {milestone.status === 'completed' && 'Completato'}
                          {milestone.status === 'in-progress' && 'In Corso'}
                          {milestone.status === 'planned' && 'Pianificato'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Features List */}
                      {milestone.features && milestone.features.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {milestone.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-start space-x-2"
                            >
                              <svg
                                className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"
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
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
