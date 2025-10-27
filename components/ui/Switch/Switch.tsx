import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { SwitchProps } from './Switch.types';

/**
 * Switch - Componente toggle switch accessibile
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      label,
      description,
      error,
      checked,
      onCheckedChange,
      className,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: {
        container: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
      },
      md: {
        container: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
      },
      lg: {
        container: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
      },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={className}>
        <div className="flex items-start">
          <div className="flex items-center h-6">
            <label
              htmlFor={switchId}
              className={cn(
                'relative inline-flex cursor-pointer items-center',
                props.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                ref={ref}
                type="checkbox"
                id={switchId}
                className="sr-only peer"
                checked={checked}
                onChange={handleChange}
                {...props}
              />
              <div
                className={cn(
                  'rounded-full transition-colors duration-200',
                  'peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2',
                  'peer-checked:bg-blue-600 bg-gray-300',
                  sizeClasses[size].container
                )}
              >
                <div
                  className={cn(
                    'absolute left-0.5 top-0.5 rounded-full bg-white transition-transform duration-200',
                    'peer-checked:' + sizeClasses[size].translate,
                    sizeClasses[size].thumb
                  )}
                />
              </div>
            </label>
          </div>

          {(label || description) && (
            <div className="ml-3">
              {label && (
                <label
                  htmlFor={switchId}
                  className={cn(
                    'font-medium text-gray-700 cursor-pointer',
                    'text-base',
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
        </div>

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
