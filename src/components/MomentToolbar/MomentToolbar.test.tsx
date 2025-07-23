import { render, screen } from '../../test-utils.tsx';
import { describe, it, expect } from 'vitest';
import { MomentToolbar, type MomentToolbarProps } from './MomentToolbar.tsx';

describe('MomentToolbar', () => {
  const mockProps: MomentToolbarProps = {
    user: {
      username: 'testuser',
      avatarImageUrl: 'https://example.com/avatar.jpg',
      avatarBgColor: '#FF0000',
      url: '/testuser',
    },
    socialActions: {
      like: { count: 42, onClick: () => {} },
      comment: { count: 5, onClick: () => {} },
      share: { onClick: () => {} },
    },
    playbackToggle: {
      isPaused: false,
      onClick: () => {},
    },
    muteToggle: {
      isMuted: false,
      onClick: () => {},
    },
  };

  it('renders user avatar and name', () => {
    render(<MomentToolbar {...mockProps} />);

    const avatar = screen.getByRole('img', { name: /testuser/i });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('renders social action buttons with test attributes', () => {
    const { container } = render(<MomentToolbar {...mockProps} />);

    expect(container.querySelector('[data-test="like"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="comment"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="share"]')).toBeInTheDocument();

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders pause icon when not paused', () => {
    const { container } = render(<MomentToolbar {...mockProps} />);

    expect(container.querySelector('[data-test="pause-button"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="play-button"]')).not.toBeInTheDocument();
  });

  it('renders play icon when paused', () => {
    const pausedProps = {
      ...mockProps,
      playbackToggle: { isPaused: true, onClick: () => {} },
    };

    const { container } = render(<MomentToolbar {...pausedProps} />);

    expect(container.querySelector('[data-test="play-button"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="pause-button"]')).not.toBeInTheDocument();
  });

  it('renders correct mute state icons', () => {
    const { container } = render(<MomentToolbar {...mockProps} />);

    expect(container.querySelector('[data-test="unmuted-button"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="muted-button"]')).not.toBeInTheDocument();
  });

  it('renders muted icon when muted', () => {
    const mutedProps = {
      ...mockProps,
      muteToggle: { isMuted: true, onClick: () => {} },
    };

    const { container } = render(<MomentToolbar {...mutedProps} />);

    expect(container.querySelector('[data-test="muted-button"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="unmuted-button"]')).not.toBeInTheDocument();
  });

  it('renders action without count', () => {
    const props = {
      ...mockProps,
      socialActions: {
        ...mockProps.socialActions,
        share: { onClick: () => {} }, // No count
      },
    };

    render(<MomentToolbar {...props} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    // Share action should render without count text
  });
});
