import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';

/**
 * Avatar - Componente avatar con status, badge e fallback
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      status,
      showBadge,
      badgeContent,
      fallbackIcon,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-12 w-12 text-base',
      lg: 'h-16 w-16 text-lg',
      xl: 'h-20 w-20 text-xl',
      '2xl': 'h-24 w-24 text-2xl',
    };

    const statusSizeClasses = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-3 w-3',
      lg: 'h-3.5 w-3.5',
      xl: 'h-4 w-4',
      '2xl': 'h-5 w-5',
    };

    const statusColorClasses = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      busy: 'bg-red-500',
      away: 'bg-yellow-500',
    };

    const badgeSizeClasses = {
      xs: 'h-3 w-3 text-[8px]',
      sm: 'h-4 w-4 text-[10px]',
      md: 'h-5 w-5 text-xs',
      lg: 'h-6 w-6 text-sm',
      xl: 'h-7 w-7 text-sm',
      '2xl': 'h-8 w-8 text-base',
    };

    const getInitials = (name?: string) => {
      if (!name) return '?';
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const renderFallback = () => {
      if (fallbackIcon) {
        return <div className="flex items-center justify-center">{fallbackIcon}</div>;
      }
      if (name) {
        return getInitials(name);
      }
      return (
        <svg
          className="h-full w-full text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    };

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold overflow-hidden',
            sizeClasses[size],
            src ? 'bg-transparent' : 'bg-blue-600 text-white'
          )}
        >
          {src ? (
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          ) : (
            renderFallback()
          )}
        </div>

        {/* Status indicator */}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-white',
              statusSizeClasses[size],
              statusColorClasses[status]
            )}
          />
        )}

        {/* Badge indicator */}
        {showBadge && (
          <span
            className={cn(
              'absolute -top-1 -right-1 rounded-full bg-red-500 text-white',
              'flex items-center justify-center font-semibold',
              'border-2 border-white',
              badgeSizeClasses[size]
            )}
          >
            {badgeContent && badgeContent > 0 ? (badgeContent > 99 ? '99+' : badgeContent) : ''}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * AvatarGroup - Componente per mostrare multipli avatar sovrapposti
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 5,
  size = 'md',
  className,
}) => {
  const avatars = React.Children.toArray(children);
  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(avatars.length - max, 0);

  const spacingClasses = {
    xs: '-space-x-2',
    sm: '-space-x-3',
    md: '-space-x-4',
    lg: '-space-x-5',
    xl: '-space-x-6',
    '2xl': '-space-x-7',
  };

  return (
    <div className={cn('flex items-center', spacingClasses[size], className)}>
      {displayedAvatars.map((avatar, index) => {
        if (React.isValidElement<AvatarProps>(avatar)) {
          return React.cloneElement(avatar, {
            key: index,
            size: avatar.props.size || size,
            className: cn(
              'ring-2 ring-white',
              avatar.props.className
            ),
          });
        }
        return avatar;
      })}

      {remainingCount > 0 && (
        <Avatar
          size={size}
          name={`+${remainingCount}`}
          className="ring-2 ring-white"
        />
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;
