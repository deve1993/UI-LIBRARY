import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { BadgeProps } from './Badge.types';

/**
 * Badge - Componente badge/pill per etichette e status
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      style = 'solid',
      icon,
      closable,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: {
        solid: 'bg-gray-100 text-gray-800',
        outline: 'border-2 border-gray-300 text-gray-700 bg-transparent',
        dot: 'bg-transparent text-gray-700',
      },
      primary: {
        solid: 'bg-blue-100 text-blue-800',
        outline: 'border-2 border-blue-300 text-blue-700 bg-transparent',
        dot: 'bg-transparent text-blue-700',
      },
      success: {
        solid: 'bg-green-100 text-green-800',
        outline: 'border-2 border-green-300 text-green-700 bg-transparent',
        dot: 'bg-transparent text-green-700',
      },
      danger: {
        solid: 'bg-red-100 text-red-800',
        outline: 'border-2 border-red-300 text-red-700 bg-transparent',
        dot: 'bg-transparent text-red-700',
      },
      warning: {
        solid: 'bg-yellow-100 text-yellow-800',
        outline: 'border-2 border-yellow-300 text-yellow-700 bg-transparent',
        dot: 'bg-transparent text-yellow-700',
      },
      info: {
        solid: 'bg-cyan-100 text-cyan-800',
        outline: 'border-2 border-cyan-300 text-cyan-700 bg-transparent',
        dot: 'bg-transparent text-cyan-700',
      },
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };

    const dotColorClasses = {
      default: 'bg-gray-500',
      primary: 'bg-blue-500',
      success: 'bg-green-500',
      danger: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-cyan-500',
    };

    const dotSizeClasses = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          variantClasses[variant][style],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {style === 'dot' && (
          <span
            className={cn(
              'rounded-full mr-1.5',
              dotSizeClasses[size],
              dotColorClasses[variant]
            )}
          />
        )}

        {icon && <span className="mr-1">{icon}</span>}

        {children}

        {closable && onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-1 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <svg
              className="h-3 w-3"
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
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
