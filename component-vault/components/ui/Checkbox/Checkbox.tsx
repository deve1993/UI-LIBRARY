import React, { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/cn';
import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox - Componente checkbox accessibile
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms and conditions"
 *   description="You agree to our Terms of Service"
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      label,
      description,
      error,
      indeterminate,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, checkboxRef]);

    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const checkboxClasses = cn(
      'rounded border-gray-300 text-blue-600',
      'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'transition-colors duration-200',
      'cursor-pointer',
      sizeClasses[size],
      error && 'border-red-500',
      props.disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    const Container = label || description ? 'div' : React.Fragment;
    const containerProps = label || description ? { className: 'flex items-start' } : {};

    return (
      <div>
        <Container {...containerProps}>
          <div className="flex items-center h-5">
            <input
              ref={checkboxRef}
              type="checkbox"
              id={checkboxId}
              className={checkboxClasses}
              {...props}
            />
          </div>

          {(label || description) && (
            <div className="ml-3">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    'font-medium text-gray-700 cursor-pointer',
                    labelSizeClasses[size],
                    props.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
          )}
        </Container>

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
