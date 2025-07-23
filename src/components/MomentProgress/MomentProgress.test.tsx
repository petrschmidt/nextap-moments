import { render, screen } from '../../test-utils.tsx';
import { describe, it, expect } from 'vitest';
import { MomentProgress, type MomentProgressProps } from './MomentProgress.tsx';

describe('MomentProgress', () => {
  it('renders progressbar element', () => {
    const props: MomentProgressProps = {
      running: true,
      visibleInViewport: true,
      durationMs: 5000,
    };

    render(<MomentProgress {...props} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies correct animation duration', () => {
    const props: MomentProgressProps = {
      running: true,
      visibleInViewport: true,
      durationMs: 8000,
    };

    render(<MomentProgress {...props} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveStyle('animation-duration: 8000ms');
  });

  it('pauses animation when not running', () => {
    const props: MomentProgressProps = {
      running: false,
      visibleInViewport: true,
      durationMs: 5000,
    };

    render(<MomentProgress {...props} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveStyle('animation-play-state: paused');
  });

  it('disables animation when not visible in viewport', () => {
    const props: MomentProgressProps = {
      running: true,
      visibleInViewport: false,
      durationMs: 5000,
    };

    render(<MomentProgress {...props} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveStyle('animation-name: none');
  });
});
