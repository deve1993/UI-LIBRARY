import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { TextRevealProps } from './TextReveal.types';

/**
 * TextReveal Component
 *
 * Text that reveals on scroll with smooth animation.
 * Perfect for storytelling and long-form content.
 *
 * @example
 * ```tsx
 * <TextReveal text="Scroll to reveal this amazing text" />
 * ```
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  revealedTextColor = 'text-white',
  hiddenTextColor = 'text-slate-700',
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = text.split(' ');

  return (
    <div ref={targetRef} className={cn('relative z-0 h-[200vh]', className)}>
      <div
        className={
          'sticky top-0 mx-auto flex h-[50vh] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]'
        }
      >
        <p
          className={
            'flex flex-wrap p-5 text-2xl font-bold md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl'
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                revealedColor={revealedTextColor}
                hiddenColor={hiddenTextColor}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  revealedColor: string;
  hiddenColor: string;
}

const Word: React.FC<WordProps> = ({
  children,
  progress,
  range,
  revealedColor,
  hiddenColor,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-3 mt-3">
      <span className={cn('absolute opacity-20', hiddenColor)}>
        {children}
      </span>
      <motion.span style={{ opacity }} className={cn(revealedColor)}>
        {children}
      </motion.span>
    </span>
  );
};
