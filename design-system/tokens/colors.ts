/**
 * Color Tokens
 *
 * Centralized color palette for the design system
 * Based on CSS variables defined in styles/globals.css
 */

export const colors = {
  // Brand colors
  primary: {
    50: 'hsl(222.2, 47.4%, 96%)',
    100: 'hsl(222.2, 47.4%, 90%)',
    200: 'hsl(222.2, 47.4%, 80%)',
    300: 'hsl(222.2, 47.4%, 70%)',
    400: 'hsl(222.2, 47.4%, 50%)',
    500: 'hsl(222.2, 47.4%, 40%)',
    600: 'hsl(222.2, 47.4%, 30%)',
    700: 'hsl(222.2, 47.4%, 20%)',
    800: 'hsl(222.2, 47.4%, 15%)',
    900: 'hsl(222.2, 84%, 4.9%)',
    DEFAULT: 'hsl(222.2, 47.4%, 11.2%)',
  },

  secondary: {
    50: 'hsl(210, 40%, 99%)',
    100: 'hsl(210, 40%, 98%)',
    200: 'hsl(210, 40%, 96.1%)',
    300: 'hsl(210, 40%, 90%)',
    400: 'hsl(210, 40%, 80%)',
    500: 'hsl(210, 40%, 70%)',
    600: 'hsl(210, 40%, 60%)',
    700: 'hsl(210, 40%, 50%)',
    800: 'hsl(210, 40%, 40%)',
    900: 'hsl(210, 40%, 30%)',
    DEFAULT: 'hsl(210, 40%, 96.1%)',
  },

  // Semantic colors
  background: {
    light: 'hsl(0, 0%, 100%)',
    dark: 'hsl(222.2, 84%, 4.9%)',
  },

  foreground: {
    light: 'hsl(222.2, 84%, 4.9%)',
    dark: 'hsl(210, 40%, 98%)',
  },

  card: {
    light: 'hsl(0, 0%, 100%)',
    dark: 'hsl(222.2, 84%, 4.9%)',
  },

  border: {
    light: 'hsl(214.3, 31.8%, 91.4%)',
    dark: 'hsl(217.2, 32.6%, 17.5%)',
  },

  muted: {
    light: 'hsl(210, 40%, 96.1%)',
    dark: 'hsl(217.2, 32.6%, 17.5%)',
  },

  accent: {
    light: 'hsl(210, 40%, 96.1%)',
    dark: 'hsl(217.2, 32.6%, 17.5%)',
  },

  destructive: {
    light: 'hsl(0, 84.2%, 60.2%)',
    dark: 'hsl(0, 62.8%, 30.6%)',
  },

  // UI Colors
  success: {
    50: 'hsl(142, 76%, 96%)',
    100: 'hsl(142, 76%, 90%)',
    500: 'hsl(142, 76%, 45%)',
    600: 'hsl(142, 76%, 36%)',
    DEFAULT: 'hsl(142, 76%, 45%)',
  },

  warning: {
    50: 'hsl(38, 92%, 96%)',
    100: 'hsl(38, 92%, 90%)',
    500: 'hsl(38, 92%, 50%)',
    600: 'hsl(38, 92%, 45%)',
    DEFAULT: 'hsl(38, 92%, 50%)',
  },

  error: {
    50: 'hsl(0, 84%, 96%)',
    100: 'hsl(0, 84%, 90%)',
    500: 'hsl(0, 84.2%, 60.2%)',
    600: 'hsl(0, 84.2%, 50%)',
    DEFAULT: 'hsl(0, 84.2%, 60.2%)',
  },

  info: {
    50: 'hsl(204, 94%, 96%)',
    100: 'hsl(204, 94%, 90%)',
    500: 'hsl(204, 94%, 50%)',
    600: 'hsl(204, 94%, 45%)',
    DEFAULT: 'hsl(204, 94%, 50%)',
  },
} as const;

export type ColorToken = typeof colors;
