import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MomentImageSourceSet, type MomentImageSourceSetProps } from './MomentImageSourceSet.tsx';

describe('MomentImageSourceSet', () => {
  it('renders source elements for supported variants', () => {
    const props: MomentImageSourceSetProps = {
      variants: [
        {
          variant: 'webp_high',
          url: 'https://example.com/image.webp',
        },
        {
          variant: 'original',
          url: 'https://example.com/image.jpg',
        },
      ],
    };

    const { container } = render(<MomentImageSourceSet {...props} />);

    // Check for source element with WebP
    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(webpSource).toBeInTheDocument();
    expect(webpSource).toHaveAttribute('srcSet', 'https://example.com/image.webp');

    // Check for img element with original
    const img = screen.getByRole('img', { name: /moment/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders only original image when no supported variants exist', () => {
    const props: MomentImageSourceSetProps = {
      variants: [
        {
          variant: 'original',
          url: 'https://example.com/original.jpg',
        },
        {
          variant:
            'unsupported_variant' as MomentImageSourceSetProps['variants'][number]['variant'],
          url: 'https://example.com/unsupported.jpg',
        },
      ],
    };

    const { container } = render(<MomentImageSourceSet {...props} />);

    // Should not render source elements for unsupported variants
    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(0);

    // Should render original image
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/original.jpg');
  });

  it('gets correct mime types for variants', () => {
    const props: MomentImageSourceSetProps = {
      variants: [
        {
          variant: 'webp_high',
          url: 'https://example.com/image.webp',
        },
        {
          variant: 'original',
          url: 'https://example.com/image.jpg',
        },
      ],
    };

    const { container } = render(<MomentImageSourceSet {...props} />);

    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(webpSource).toBeInTheDocument();
  });
});
