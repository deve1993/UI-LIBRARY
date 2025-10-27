import React from 'react';
import type { ButtonProps } from './Button.types';

/**
 * Button - Componente bottone versatile e accessibile
 *
 * Componente bottone completamente personalizzabile con:
 * - 7 varianti visuali (primary, secondary, success, danger, warning, ghost, link)
 * - 5 dimensioni (xs, sm, md, lg, xl)
 * - Stato di caricamento con spinner
 * - Supporto per icone (sinistra/destra)
 * - Full width e rounded variants
 * - Completamente accessibile (ARIA, keyboard navigation)
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      rounded = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Classi base
    const baseClasses =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Classi per varianti
    const variantClasses = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-md hover:shadow-lg',
      secondary:
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500',
      success:
        'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-md hover:shadow-lg',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-md hover:shadow-lg',
      warning:
        'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-500 shadow-md hover:shadow-lg',
      ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500',
      link: 'bg-transparent text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline focus:ring-blue-500 p-0',
    };

    // Classi per dimensioni
    const sizeClasses = {
      xs: 'text-xs px-3 py-1 gap-1',
      sm: 'text-sm px-4 py-2 gap-2',
      md: 'text-base px-6 py-2.5 gap-2',
      lg: 'text-lg px-8 py-3 gap-3',
      xl: 'text-xl px-10 py-4 gap-3',
    };

    // Classi per border radius
    const radiusClasses = rounded ? 'rounded-full' : 'rounded-lg';

    // Classi per full width
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combina tutte le classi
    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      variant !== 'link' ? sizeClasses[size] : '',
      variant !== 'link' ? radiusClasses : '',
      widthClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Dimensioni icone basate sulla size
    const iconSizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    // Spinner di caricamento
    const LoadingSpinner = () => (
      <svg
        className={`animate-spin ${iconSizeClasses[size]}`}
        fill="none"
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

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && (
          <span className={iconSizeClasses[size]}>{leftIcon}</span>
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <span className={iconSizeClasses[size]}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
