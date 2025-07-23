import { mediaQueryMinFn, rem } from '../utils.ts';

const zIndex = {
  base: 0,

  moment: {
    background: 1,
    media: 10,
    overlay: 20,
    playButton: 25,
    description: 30,
    toolbar: 30,
  },

  // Global UI layers
  modal: 1000,
  tooltip: 1100,
  dropdown: 1200,
  notification: 1300,
} as const;

const colors = {
  foreground: {
    primary: '#ffffff',
  },
} as const;

export const theme = {
  breakpoints: {
    up: mediaQueryMinFn,
  },
  zIndex,
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
  colors,
  space: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(20),
    xxl: rem(24),
    xxxl: rem(32),
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    base: rem(16),
    lg: rem(18),
    xl: rem(20),
    xxl: rem(24),
    xxxl: rem(30),
    xxxxl: rem(36),
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  radii: {
    sm: rem(4),
    md: rem(6),
    lg: rem(8),
    xl: rem(12),
    full: '50%',
  },
} as const;
