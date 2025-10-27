export interface TextGenerateEffectProps {
  /**
   * Text to animate
   */
  words: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Duration for each word animation in seconds
   * @default 0.5
   */
  duration?: number;

  /**
   * Filter blur intensity
   * @default true
   */
  filter?: boolean;
}
