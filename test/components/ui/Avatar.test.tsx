import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../../../components/ui/Avatar/Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="/test.jpg" alt="Test User" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('alt', 'Test User');
  });

  it('renders initials when name is provided without src', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback icon when neither src nor name provided', () => {
    const { container } = render(<Avatar fallbackIcon={<span>👤</span>} />);
    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('shows status indicator when status is provided', () => {
    const { container } = render(<Avatar status="online" />);
    expect(container.querySelector('[data-status="online"]')).toBeInTheDocument();
  });

  it('shows badge when showBadge is true', () => {
    const { container } = render(<Avatar showBadge badgeContent={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { container } = render(<Avatar size="lg" />);
    expect(container.firstChild).toHaveClass('lg');
  });
});
