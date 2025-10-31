/**
 * Design Tokens
 *
 * Centralized design system tokens for consistent styling across components
 *
 * @packageDocumentation
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './radius';
export * from './animations';

// Re-export all tokens as a single object for convenience
import { colors } from './colors';
import { spacing, semanticSpacing } from './spacing';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import { shadows, dropShadow } from './shadows';
import { borderRadius, semanticRadius } from './radius';
import { keyframes, animations, transitions, durations } from './animations';

export const tokens = {
  colors,
  spacing,
  semanticSpacing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  shadows,
  dropShadow,
  borderRadius,
  semanticRadius,
  keyframes,
  animations,
  transitions,
  durations,
} as const;

export type DesignTokens = typeof tokens;
