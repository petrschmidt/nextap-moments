import type { MomentVideoFiles, MomentVideoVariant } from '../../../types';

export type MomentMediaSourceSetProps = {
  variants: MomentVideoFiles['variants'];
};

const VARIANT_ORDER: MomentVideoVariant[] = ['vp9_high', 'h264_high', 'mp4', 'original'];

const getMimeType = (variant: MomentVideoVariant): string => {
  if (variant.startsWith('vp9_')) {
    return 'video/webm';
  }
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
