import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../../components/ui/Badge/Badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Badge>Badge Content</Badge>);
    expect(screen.getByText('Badge Content')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { container: container1 } = render(<Badge variant="default">Default</Badge>);
    expect(container1.firstChild).toHaveClass('default');

    const { container: container2 } = render(<Badge variant="primary">Primary</Badge>);
    expect(container2.firstChild).toHaveClass('primary');

    const { container: container3 } = render(<Badge variant="success">Success</Badge>);
    expect(container3.firstChild).toHaveClass('success');
  });

  it('renders different sizes', () => {
    const { container: container1 } = render(<Badge size="sm">Small</Badge>);
    expect(container1.firstChild).toHaveClass('sm');

    const { container: container2 } = render(<Badge size="lg">Large</Badge>);
    expect(container2.firstChild).toHaveClass('lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
