import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { LabelProps } from './Label.types';

/**
 * Label - Componente label riutilizzabile per form
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, tooltip, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-sm font-medium text-gray-700 mb-1.5',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
        {tooltip && (
          <span className="ml-1 text-gray-400 cursor-help" title={tooltip}>
            <svg
              className="inline h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;
