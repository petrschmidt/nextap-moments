import type { MomentImageFiles, MomentImageVariant } from '../../../types';

export type MomentImageSourceSetProps = {
  variants: MomentImageFiles['variants'];
};

// Priority order: WebP first (better compression), then by quality/size
const VARIANT_ORDER: MomentImageVariant[] = [
  'webp_w1080',
  'webp_high',
  'webp_w600', 
  'webp_w540',
  'webp_medium',
  'webp_w270',
  'webp_low',
  'w1080',
  'high',
  'w600',
  'w540', 
  'medium',
  'w270',
  'low',
  'original',
];

const getMimeType = (variant: MomentImageVariant): string => {
  if (variant.startsWith('webp_')) return 'image/webp';
  return 'image/jpeg';
};

export const MomentImageSourceSet = ({ variants }: MomentImageSourceSetProps) => {
  const orderedVariants = VARIANT_ORDER
    .map(variant => variants.find(v => v.variant === variant))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <>
      {orderedVariants.map(({ variant, url }) => (
        <source key={variant} type={getMimeType(variant)} srcSet={url} />
      ))}
    </>
  );
};