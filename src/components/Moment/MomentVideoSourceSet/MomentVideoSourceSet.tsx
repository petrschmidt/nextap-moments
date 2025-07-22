import type { MomentVideoFiles, MomentVideoVariant } from '../../../types';

export type MomentMediaSourceSetProps = {
  variants: MomentVideoFiles['variants'];
};

const VARIANT_ORDER: MomentVideoVariant[] = [
  'vp9_w1080',
  'vp9_high',
  'vp9_w540',
  'vp9_medium',
  'vp9_w270',
  'vp9_low',
  'h264_w1080',
  'h264_high',
  'h264_w896',
  'h264_medium',
  'h264_w270',
  'h264_low',
  'original',
  'w1080',
  'mp4',
];

const getMimeType = (variant: MomentVideoVariant): string => {
  if (variant.startsWith('vp9_')) return 'video/webm; codecs="vp9"';
  if (variant.startsWith('h264_')) return 'video/mp4; codecs="avc1.42E01E"';
  return 'video/mp4';
};

export const MomentVideoSourceSet = ({ variants }: MomentMediaSourceSetProps) => {
  const orderedVariants = VARIANT_ORDER.map((variant) =>
    variants.find((v) => v.variant === variant)
  ).filter((v) => !!v);

  return (
    <>
      {orderedVariants.map(({ variant, url }) => (
        <source key={variant} type={getMimeType(variant)} src={url} />
      ))}
    </>
  );
};
