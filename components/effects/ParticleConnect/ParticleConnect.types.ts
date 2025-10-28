export interface ParticleConnectProps {
  /** Number of particles to render */
  particleCount?: number;
  /** Particle color */
  particleColor?: string;
  /** Line color between particles */
  lineColor?: string;
  /** Maximum distance for particle connection */
  connectionDistance?: number;
  /** Particle speed multiplier */
  speed?: number;
  /** Particle size */
  particleSize?: number;
  /** Mouse interaction radius */
  mouseRadius?: number;
  /** Enable mouse attraction effect */
  mouseAttract?: boolean;
  /** Background color (transparent by default) */
  backgroundColor?: string;
  /** Custom className */
  className?: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}
