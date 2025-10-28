/**
 * PricingSection Component
 * @component
 */
import React from 'react';
import type { PricingSectionProps, PricingPlan } from './PricingSection.types';

/**
 * PricingSection - Sezione pricing con piani e toggle mensile/annuale
 *
 * @component
 */

export const PricingSection: React.FC<PricingSectionProps> = ({
  title,
  subtitle,
  plans,
  billingToggle,
  className = '',
}) => {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');

  const handleToggle = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period);
    billingToggle?.onToggle?.(period);
  };

  const getBadgeStyles = (variant: NonNullable<PricingPlan['badge']>['variant']) => {
    switch (variant) {
      case 'recommended':
        return 'bg-blue-600 text-white';
      case 'coming-soon':
        return 'bg-gray-400 text-white';
      case 'popular':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section
      className={`py-20 bg-gray-50 ${className}`}
      aria-labelledby="pricing-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="pricing-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Billing Toggle */}
          {billingToggle && (
            <div className="mt-8 inline-flex rounded-lg bg-white p-1 shadow-md">
              <button
                onClick={() => handleToggle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {billingToggle.monthly}
              </button>
              <button
                onClick={() => handleToggle('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  billingPeriod === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {billingToggle.yearly}
              </button>
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 ${
                plan.highlighted
                  ? 'ring-2 ring-blue-600 scale-105 lg:scale-110 z-10'
                  : 'hover:shadow-xl hover:scale-105'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-md ${getBadgeStyles(
                      plan.badge.variant
                    )}`}
                  >
                    {plan.badge.text}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                {plan.name}
              </h3>

              {/* Perfect For */}
              {plan.perfectFor && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {plan.perfectFor}
                </p>
              )}

              {/* Price */}
              <div className="mt-6 text-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {plan.price.currency}
                    {plan.price.amount}
                  </span>
                  <span className="ml-2 text-gray-500">/{plan.price.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-center text-gray-600 leading-relaxed">
                {plan.description}
              </p>

              {/* CTA Button */}
              <button
                onClick={plan.cta.onClick}
                disabled={plan.cta.disabled}
                className={`mt-8 w-full rounded-lg px-6 py-3 text-base font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  plan.cta.disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    : 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500'
                }`}
              >
                {plan.cta.label}
              </button>

              {/* Features List */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <svg
                        className="h-6 w-6 text-blue-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-gray-300 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <span
                      className={`ml-3 text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
