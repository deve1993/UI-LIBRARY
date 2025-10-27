import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { TextGenerateEffectProps } from './TextGenerateEffect.types';

/**
 * TextGenerateEffect Component
 *
 * Animated text effect that reveals words one by one with blur animation.
 * Perfect for headlines and attention-grabbing text.
 *
 * @example
 * ```tsx
 * <TextGenerateEffect words="Welcome to our amazing platform" />
 * ```
 */
export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className,
  duration = 0.5,
  filter = true,
}) => {
  const wordsArray = words.split(' ');

  const variants = {
    hidden: {
      opacity: 0,
      filter: filter ? 'blur(10px)' : 'none',
    },
    visible: {
      opacity: 1,
      filter: filter ? 'blur(0px)' : 'none',
    },
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className="mt-4">
        <div className="text-black dark:text-white leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: duration,
                delay: idx * 0.1,
              }}
              className="inline-block mr-1"
            >
              {word}{' '}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
