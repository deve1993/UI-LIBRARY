import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationHeader } from './NavigationHeader';
import type { NavigationHeaderProps } from './NavigationHeader.types';

describe('NavigationHeader', () => {
  const defaultProps: NavigationHeaderProps = {
    logo: {
      text: 'TestBrand',
      alt: 'TestBrand Logo',
    },
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: {
      label: 'Get Started',
      onClick: vi.fn(),
    },
  };

  it('renders without crashing', () => {
    render(<NavigationHeader {...defaultProps} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays logo text correctly', () => {
    render(<NavigationHeader {...defaultProps} />);
    expect(screen.getByText('TestBrand')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<NavigationHeader {...defaultProps} />);
    expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop + Mobile
    expect(screen.getAllByText('About')).toHaveLength(2);
    expect(screen.getAllByText('Contact')).toHaveLength(2);
  });

  it('renders CTA button with correct label', () => {
    render(<NavigationHeader {...defaultProps} />);
    expect(screen.getAllByText('Get Started')).toHaveLength(2); // Desktop + Mobile
  });

  it('calls onClick when CTA button is clicked', () => {
    const onClick = vi.fn();
    render(
      <NavigationHeader
        {...defaultProps}
        ctaButton={{ label: 'Click Me', onClick }}
      />
    );
    const buttons = screen.getAllByText('Click Me');
    fireEvent.click(buttons[0]); // Click desktop button
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    render(<NavigationHeader {...defaultProps} />);
    const hamburgerButton = screen.getByLabelText('Toggle menu');

    // Menu should be closed initially
    expect(screen.queryByRole('navigation')).toBeInTheDocument();

    // Click to open
    fireEvent.click(hamburgerButton);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    fireEvent.click(hamburgerButton);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders logo image when src is provided', () => {
    render(
      <NavigationHeader
        {...defaultProps}
        logo={{ src: '/logo.png', alt: 'Logo Image' }}
      />
    );
    const logoImage = screen.getByAltText('Logo Image');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo.png');
  });

  it('renders language switcher when languages prop is provided', () => {
    const languagesConfig = {
      current: 'en',
      options: [
        { code: 'en', label: 'English' },
        { code: 'it', label: 'Italiano' },
      ],
      onChange: vi.fn(),
    };

    render(
      <NavigationHeader {...defaultProps} languages={languagesConfig} />
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('calls onChange when language is selected', () => {
    const onChange = vi.fn();
    const languagesConfig = {
      current: 'en',
      options: [
        { code: 'en', label: 'English' },
        { code: 'it', label: 'Italiano' },
      ],
      onChange,
    };

    render(
      <NavigationHeader {...defaultProps} languages={languagesConfig} />
    );

    // Open language dropdown
    const languageButton = screen.getByLabelText('Select language');
    fireEvent.click(languageButton);

    // Select Italian
    const italianoButton = screen.getByText('Italiano');
    fireEvent.click(italianoButton);

    expect(onChange).toHaveBeenCalledWith('it');
  });

  it('applies custom className', () => {
    const { container } = render(
      <NavigationHeader {...defaultProps} className="custom-class" />
    );
    const header = container.querySelector('header');
    expect(header).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<NavigationHeader {...defaultProps} />);

    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();

    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders ARIA labels on links when provided', () => {
    const propsWithAria: NavigationHeaderProps = {
      ...defaultProps,
      links: [
        { label: 'Home', href: '/', ariaLabel: 'Go to homepage' },
      ],
    };

    render(<NavigationHeader {...propsWithAria} />);
    const links = screen.getAllByLabelText('Go to homepage');
    expect(links.length).toBeGreaterThan(0);
  });
});
