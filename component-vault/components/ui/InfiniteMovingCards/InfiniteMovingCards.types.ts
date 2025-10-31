export interface InfiniteMovingCardsItem {
  /**
   * Card content/quote
   */
  quote: string;

  /**
   * Author name
   */
  name: string;

  /**
   * Author title/role
   */
  title: string;
}

export interface InfiniteMovingCardsProps {
  /**
   * Array of items to display
   */
  items: InfiniteMovingCardsItem[];

  /**
   * Animation direction
   * @default 'left'
   */
  direction?: 'left' | 'right';

  /**
   * Animation speed
   * @default 'normal'
   */
  speed?: 'slow' | 'normal' | 'fast';

  /**
   * Pause animation on hover
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
