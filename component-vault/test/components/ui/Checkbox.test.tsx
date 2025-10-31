import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../../../components/ui/Checkbox/Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox id="test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox id="test" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('can be checked and unchecked', async () => {
    const user = userEvent.setup();
    render(<Checkbox id="test" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    render(<Checkbox id="test" disabled />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox).toBeDisabled();
    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox id="test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
