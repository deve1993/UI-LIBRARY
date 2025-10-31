import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../../../components/ui/Label/Label';

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label htmlFor="test">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Label htmlFor="test">Label Text</Label>);
    const label = screen.getByText('Label Text');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('applies htmlFor attribute', () => {
    render(<Label htmlFor="input-id">Test</Label>);
    const label = screen.getByText('Test');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('shows required indicator when required', () => {
    render(<Label htmlFor="test" required>Test Label</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Label htmlFor="test" className="custom-class">Test</Label>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });
});
