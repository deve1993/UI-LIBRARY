export interface BackgroundGridProps {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Grid line color
   * @default 'rgba(255, 255, 255, 0.1)'
   */
  gridColor?: string;

  /**
   * Grid size in pixels
   * @default 50
   */
  gridSize?: number;

  /**
   * Whether to show gradient overlay
   * @default true
   */
  showGradient?: boolean;
}
