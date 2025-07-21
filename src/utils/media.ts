import type { MomentVideoFiles } from '../types';

export const selectVideoVariant = (
  variants: MomentVideoFiles['variants']
): MomentVideoFiles['variants'][number] => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const screenWidth = window.screen.width * devicePixelRatio;

  // Check codec support
  const supportsVP9 =
    document.createElement('video').canPlayType('video/webm; codecs="vp9"') !== '';
  const supportsH264 =
    document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') !== '';

  // Prefer VP9 for better compression, fallback to H264
  const preferredCodec = supportsVP9 ? 'vp9' : supportsH264 ? 'h264' : 'mp4';

  // Select quality based on screen width
  let quality;
  if (screenWidth >= 1080) quality = 'w1080';
  else if (screenWidth >= 896) quality = 'w896';
  else if (screenWidth >= 540) quality = 'w540';
  else quality = 'w270';

  // Find best match
  const preferredVariant = `${preferredCodec}_${quality}`;
  const fallbackVariant = `${preferredCodec}_medium`;

  return (
    variants.find((v) => v.variant === preferredVariant) ||
    variants.find((v) => v.variant === fallbackVariant) ||
    variants.find((v) => v.variant === 'mp4') ||
    variants[0]
  );
};
