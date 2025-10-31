import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spotlight } from '@/components/effects/Spotlight';

describe('Spotlight', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spotlight />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom fill color', () => {
    const { container } = render(<Spotlight fill="blue" />);
    const ellipse = container.querySelector('ellipse');
    expect(ellipse).toHaveAttribute('fill', 'blue');
  });

  it('applies custom className', () => {
    const { container } = render(<Spotlight className="custom-spotlight" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-spotlight');
  });

  it('has animation class', () => {
    const { container } = render(<Spotlight />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('animate-spotlight');
  });
});
