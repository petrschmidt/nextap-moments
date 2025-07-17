const REM_BASE: number = 16;

/**
 * Converts a pixel value to rem.
 * @param pixels {number} The pixel value to convert.
 */
export const rem = (...pixels: number[]): string => {
  return pixels.map((val) => `${val / REM_BASE}rem`).join(' ');
};
