const BREAKPOINTS = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

type Breakpoint = keyof typeof BREAKPOINTS;

const mediaQueryMinFn = (breakpoint: Breakpoint): string => {
  return `@media (min-width: ${BREAKPOINTS[breakpoint]})`;
};

export const theme = {
  breakpoints: {
    up: mediaQueryMinFn,
  },
};
