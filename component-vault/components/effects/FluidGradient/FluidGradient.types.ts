export interface FluidGradientProps {
  /** Array of gradient colors (3-5 recommended) */
  colors?: string[];
  /** Animation speed (1-10, default 5) */
  speed?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Enable mouse interaction */
  interactive?: boolean;
  /** Mouse influence radius */
  mouseRadius?: number;
  /** Blob count */
  blobCount?: number;
  /** Enable glow effect */
  glow?: boolean;
  /** Glow intensity (0-1) */
  glowIntensity?: number;
  /** Enable morphing animation */
  morphing?: boolean;
  /** Morphing speed */
  morphSpeed?: number;
  /** Custom className */
  className?: string;
}

export interface Blob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  targetRadius?: number;
  morphProgress?: number;
}
