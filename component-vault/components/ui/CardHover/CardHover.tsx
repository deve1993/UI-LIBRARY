import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { CardHoverProps } from './CardHover.types';

/**
 * CardHover Component
 *
 * Card with smooth hover animation and subtle scale effect.
 * Perfect for feature cards, product cards, and more.
 *
 * @example
 * ```tsx
 * <CardHover>
 *   <div className="p-6">
 *     <h3>Card Title</h3>
 *     <p>Card content</p>
 *   </div>
 * </CardHover>
 * ```
 */
export const CardHover: React.FC<CardHoverProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={cn('relative group', containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800',
          'transition-all duration-300',
          'group-hover:border-slate-300 dark:group-hover:border-slate-700',
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Spotlight effect on hover */}
        {isHovering && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};
