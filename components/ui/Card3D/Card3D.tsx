import React, { useRef, useState } from 'react';
import { cn } from '@/shared/utils/cn';
import type { Card3DProps } from './Card3D.types';

/**
 * Card3D Component
 *
 * Interactive card with 3D tilt effect on mouse move.
 * Creates an immersive, premium feel for showcasing content.
 *
 * @example
 * ```tsx
 * <Card3D>
 *   <div className="p-8">
 *     <h3 className="text-2xl font-bold">Card Title</h3>
 *     <p>Card content...</p>
 *   </div>
 * </Card3D>
 * ```
 */
export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('perspective-1000', containerClassName)}
      style={{ perspective: '1000px' }}
    >
      <div
        className={cn(
          'relative transition-transform duration-300 ease-out',
          'transform-gpu',
          className
        )}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};
