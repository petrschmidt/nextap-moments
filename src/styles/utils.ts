const REM_BASE: number = 16;

/**
 * Converts a pixel value to rem.
 * @param pixels {number} The pixel value to convert.
 */
export const rem = (...pixels: number[]): string => {
  return pixels.map((val) => `${val / REM_BASE}rem`).join(' ');
};

const BREAKPOINTS = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};
const BREAKPOINTS_ENTRIES = Object.entries(BREAKPOINTS);

export type Breakpoint = keyof typeof BREAKPOINTS;

export const mediaQueryMinFn = (
  breakpoint: Breakpoint,
  direction: 'min' | 'max' = 'min'
): string => {
  return `@media (${direction}-width: ${BREAKPOINTS[breakpoint]})`;
};

type MediaQuery = Record<Breakpoint, string>;

export const media = BREAKPOINTS_ENTRIES.reduce(
  (prev, [key]) => ({ ...prev, [key]: mediaQueryMinFn(key as Breakpoint, 'min') }),
  {} as MediaQuery
);
