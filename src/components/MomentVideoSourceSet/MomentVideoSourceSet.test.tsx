import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MomentVideoSourceSet, type MomentMediaSourceSetProps } from './MomentVideoSourceSet.tsx';

describe('MomentVideoSourceSet', () => {
  it('renders source elements for supported variants', () => {
    const props: MomentMediaSourceSetProps = {
      variants: [
        {
          variant: 'vp9_high',
          url: 'https://example.com/video.webm',
        },
        {
          variant: 'h264_high',
          url: 'https://example.com/video.mp4',
        },
        {
          variant: 'original',
          url: 'https://example.com/original.mp4',
        },
      ],
    };

    const { container } = render(<MomentVideoSourceSet {...props} />);

    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(3);

    // Check VP9/WebM source
    const webmSource = container.querySelector('source[type="video/webm"]');
    expect(webmSource).toBeInTheDocument();
    expect(webmSource).toHaveAttribute('src', 'https://example.com/video.webm');

    // Check H264/MP4 sources
    const mp4Sources = container.querySelectorAll('source[type="video/mp4"]');
    expect(mp4Sources).toHaveLength(2);
  });

  it('filters out unsupported variants', () => {
    const props: MomentMediaSourceSetProps = {
      variants: [
        {
          variant: 'vp9_high',
          url: 'https://example.com/video.webm',
        },
        {
          variant:
            'unsupported_variant' as MomentMediaSourceSetProps['variants'][number]['variant'],
          url: 'https://example.com/unsupported.mp4',
        },
      ],
    };

    const { container } = render(<MomentVideoSourceSet {...props} />);

    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(1);
    expect(sources[0]).toHaveAttribute('src', 'https://example.com/video.webm');
  });

  it('gets correct mime types for different variants', () => {
    const props: MomentMediaSourceSetProps = {
      variants: [
        {
          variant: 'vp9_high',
          url: 'https://example.com/vp9.webm',
        },
        {
          variant: 'h264_high',
          url: 'https://example.com/h264.mp4',
        },
        {
          variant: 'mp4',
          url: 'https://example.com/basic.mp4',
        },
      ],
    };

    const { container } = render(<MomentVideoSourceSet {...props} />);

    // Check VP9 variant gets WebM mime type
    const webmSources = container.querySelectorAll('source[type="video/webm"]');
    expect(webmSources).toHaveLength(1);

    // Check other variants get MP4 mime type
    const mp4Sources = container.querySelectorAll('source[type="video/mp4"]');
    expect(mp4Sources).toHaveLength(2);
  });
});
