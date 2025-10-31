import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { ParallaxScrollProps } from './ParallaxScroll.types';

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({ images, className }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'end start'] });
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={gridRef} className={cn('h-[120vh] w-full overflow-hidden', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <motion.div style={{ y: translateFirst }} className="space-y-4">
          {images.slice(0, Math.ceil(images.length / 2)).map((img, idx) => (
            <img key={idx} src={img} alt={`Parallax ${idx}`} className="w-full h-auto rounded-lg" />
          ))}
        </motion.div>
        <motion.div style={{ y: translateSecond }} className="space-y-4">
          {images.slice(Math.ceil(images.length / 2)).map((img, idx) => (
            <img key={idx} src={img} alt={`Parallax ${idx}`} className="w-full h-auto rounded-lg" />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
