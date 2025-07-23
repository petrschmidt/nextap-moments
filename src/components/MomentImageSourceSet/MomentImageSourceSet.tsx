import type { MomentImageFiles, MomentImageVariant } from '../../types';

export type MomentImageSourceSetProps = {
  variants: MomentImageFiles['variants'];
};

const VARIANT_ORDER: MomentImageVariant[] = ['webp_high'];

const getMimeType = (variant: MomentImageVariant): string => {
  if (variant.startsWith('webp_')) {
    return 'image/webp';
  }
  return 'image/jpeg';
};

/**
 * Component that renders selected set of image sources along with fallback <img>
 */
export const MomentImageSourceSet = ({ variants }: MomentImageSourceSetProps) => {
  const orderedVariants = VARIANT_ORDER.map((variant) =>
    variants.find((v) => v.variant === variant)
  ).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const originalVariant = variants.find((v) => v.variant === 'original');

  return (
    <>
      {orderedVariants.map(({ variant, url }) => (
        <source key={variant} type={getMimeType(variant)} srcSet={url} />
      ))}
      {originalVariant && <img src={originalVariant.url} alt="Moment" />}
    </>
  );
};
