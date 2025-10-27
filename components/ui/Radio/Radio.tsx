import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { RadioProps, RadioGroupProps } from './Radio.types';

/**
 * Radio - Componente radio button accessibile
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = 'md',
      label,
      description,
      error,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

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

    const radioClasses = cn(
      'border-gray-300 text-blue-600',
      'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'transition-colors duration-200',
      'cursor-pointer',
      sizeClasses[size],
      error && 'border-red-500',
      props.disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    return (
      <div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="radio"
              id={radioId}
              className={radioClasses}
              {...props}
            />
          </div>

          {(label || description) && (
            <div className="ml-3">
              {label && (
                <label
                  htmlFor={radioId}
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
        </div>

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * RadioGroup - Componente per raggruppare radio buttons
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  label,
  error,
  orientation = 'vertical',
  size = 'md',
  children,
  className,
}) => {
  const orientationClasses = {
    vertical: 'flex flex-col space-y-3',
    horizontal: 'flex flex-row space-x-4',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className={orientationClasses[orientation]}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<RadioProps>(child)) {
            return React.cloneElement(child, {
              name,
              checked: child.props.value === value,
              onChange: handleChange,
              size: child.props.size || size,
            });
          }
          return child;
        })}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default Radio;
