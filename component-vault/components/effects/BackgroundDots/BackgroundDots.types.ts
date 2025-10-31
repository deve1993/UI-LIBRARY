export interface BackgroundDotsProps {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Dot color
   * @default 'rgba(255, 255, 255, 0.2)'
   */
  dotColor?: string;

  /**
   * Dot size in pixels
   * @default 1
   */
  dotSize?: number;

  /**
   * Spacing between dots in pixels
   * @default 20
   */
  dotSpacing?: number;
}
