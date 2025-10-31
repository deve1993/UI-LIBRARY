export interface TextRevealProps {
  /**
   * Text to reveal
   */
  text: string;

  /**
   * Revealed text color class
   * @default 'text-white'
   */
  revealedTextColor?: string;

  /**
   * Hidden text color class
   * @default 'text-slate-700'
   */
  hiddenTextColor?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}
