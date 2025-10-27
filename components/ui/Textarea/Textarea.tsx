import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import type { TextareaProps } from './Textarea.types';

/**
 * Textarea - Componente textarea accessibile
 */
export const Textarea = React.forwardRef<HTMLTextareaElement, TextareaProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      error,
      helperText,
      required,
      fullWidth = false,
      resize = 'vertical',
      showCount = false,
      maxLength,
      className,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const [charCount, setCharCount] = useState(
      typeof value === 'string' ? value.length : 0
    );

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm min-h-[80px]',
      md: 'px-4 py-2.5 text-base min-h-[120px]',
      lg: 'px-5 py-3 text-lg min-h-[160px]',
    };

    const variantClasses = {
      default: 'border border-gray-300 rounded-lg bg-white',
      filled: 'border-0 rounded-lg bg-gray-100',
      flushed: 'border-0 border-b-2 border-gray-300 rounded-none bg-transparent',
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const textareaClasses = cn(
      'w-full transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500',
      sizeClasses[size],
      variantClasses[variant],
      resizeClasses[resize],
      error && 'border-red-500 focus:ring-red-500',
      props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextareaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />

        <div className="flex justify-between items-start mt-1.5">
          <div className="flex-1">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && !error && (
              <p className="text-sm text-gray-600">{helperText}</p>
            )}
          </div>

          {showCount && maxLength && (
            <p className="text-sm text-gray-500 ml-2">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
