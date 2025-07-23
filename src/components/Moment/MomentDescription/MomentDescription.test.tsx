import { render, screen } from '../../../test-utils';
import { describe, it, expect } from 'vitest';
import { MomentDescription, type MomentDescriptionProps } from './MomentDescription';

describe('MomentDescription', () => {
  it('renders location when provided', () => {
    const props: MomentDescriptionProps = {
      location: {
        name: 'Central Park',
        url: '/location/central-park',
      },
    };

    render(<MomentDescription {...props} />);

    const locationLink = screen.getByRole('link', { name: /central park/i });
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveAttribute('href', '/location/central-park');
  });

  it('does not render location when not provided', () => {
    const props: MomentDescriptionProps = {};

    render(<MomentDescription {...props} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders location with map pin icon', () => {
    const props: MomentDescriptionProps = {
      location: {
        name: 'Tokyo Tower',
        url: '/location/tokyo-tower',
      },
    };

    render(<MomentDescription {...props} />);

    const locationLink = screen.getByRole('link', { name: /tokyo tower/i });
    expect(locationLink).toBeInTheDocument();

    const svgIcon = locationLink.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const props: MomentDescriptionProps = {
      description: 'A beautiful sunset over the mountains',
    };

    render(<MomentDescription {...props} />);

    expect(screen.getByText('A beautiful sunset over the mountains')).toBeInTheDocument();
  });

  it('does not render description when undefined or empty', () => {
    const props: MomentDescriptionProps = {};

    render(<MomentDescription {...props} />);

    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders views count when provided', () => {
    const props: MomentDescriptionProps = {
      views: 1234,
    };

    render(<MomentDescription {...props} />);

    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('renders zero views', () => {
    const props: MomentDescriptionProps = {
      views: 0,
    };

    render(<MomentDescription {...props} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders views with eye icon', () => {
    const props: MomentDescriptionProps = {
      views: 999,
    };

    render(<MomentDescription {...props} />);

    const viewsContainer = screen.getByText('999').parentElement;
    expect(viewsContainer).toBeInTheDocument();

    // Check that EyeIcon is rendered (SVG with specific properties)
    const svgIcon = viewsContainer?.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  it('renders all content when all props are provided', () => {
    const props: MomentDescriptionProps = {
      location: {
        name: 'Eiffel Tower',
        url: '/location/eiffel-tower',
      },
      description: 'Beautiful view from the top!',
      views: 5678,
    };

    render(<MomentDescription {...props} />);

    // Check all elements are present
    expect(screen.getByRole('link', { name: /eiffel tower/i })).toBeInTheDocument();
    expect(screen.getByText('Beautiful view from the top!')).toBeInTheDocument();
    expect(screen.getByText('5678')).toBeInTheDocument();
  });
});
