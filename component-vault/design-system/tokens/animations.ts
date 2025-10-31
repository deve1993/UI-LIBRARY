/**
 * Animation Tokens
 *
 * Centralized animation definitions
 * Based on custom animations from tailwind.config.js
 */

export const keyframes = {
  spotlight: {
    '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
    '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
  },
  shimmer: {
    from: { backgroundPosition: '0 0' },
    to: { backgroundPosition: '-200% 0' },
  },
  moveHorizontal: {
    '0%': { transform: 'translateX(-50%) translateY(-10%)' },
    '50%': { transform: 'translateX(50%) translateY(10%)' },
    '100%': { transform: 'translateX(-50%) translateY(-10%)' },
  },
  moveInCircle: {
    '0%': { transform: 'rotate(0deg)' },
    '50%': { transform: 'rotate(180deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  moveVertical: {
    '0%': { transform: 'translateY(-50%)' },
    '50%': { transform: 'translateY(50%)' },
    '100%': { transform: 'translateY(-50%)' },
  },
  scroll: {
    to: { transform: 'translate(calc(-50% - 0.5rem))' },
  },
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideInFromTop: {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideInFromBottom: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
    '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
  },
} as const;

export const animations = {
  spotlight: 'spotlight 2s ease .75s 1 forwards',
  shimmer: 'shimmer 2s linear infinite',
  'move-horizontal': 'moveHorizontal 30s ease infinite',
  'move-in-circle': 'moveInCircle 20s reverse infinite',
  'move-vertical': 'moveVertical 30s ease infinite',
  scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
  'fade-in': 'fadeIn 0.3s ease-in',
  'fade-out': 'fadeOut 0.3s ease-out',
  'slide-in-top': 'slideInFromTop 0.3s ease-out',
  'slide-in-right': 'slideInFromRight 0.3s ease-out',
  'slide-in-bottom': 'slideInFromBottom 0.3s ease-out',
  'slide-in-left': 'slideInFromLeft 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  bounce: 'bounce 1s infinite',
} as const;

export const transitions = {
  none: 'none',
  all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'background-color, border-color, color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const durations = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

export type Keyframes = typeof keyframes;
export type Animations = typeof animations;
export type Transitions = typeof transitions;
export type Durations = typeof durations;
