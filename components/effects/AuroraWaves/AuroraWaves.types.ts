export interface AuroraWavesProps {
  /** Array of aurora colors */
  colors?: string[];
  /** Wave animation speed (1-10) */
  speed?: number;
  /** Wave amplitude */
  amplitude?: number;
  /** Number of wave layers */
  waveCount?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Enable parallax mouse effect */
  parallax?: boolean;
  /** Parallax intensity (0-1) */
  parallaxIntensity?: number;
  /** Background base color */
  backgroundColor?: string;
  /** Custom className */
  className?: string;
}

export interface Wave {
  offset: number;
  frequency: number;
  amplitude: number;
  speed: number;
  color: string;
  opacity: number;
}
