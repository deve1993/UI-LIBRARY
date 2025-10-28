import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../../../components/ui/Switch/Switch';

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch id="test" />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Switch id="test" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('can be toggled on and off', async () => {
    const user = userEvent.setup();
    render(<Switch id="test" />);
    const switchEl = screen.getByRole('switch') as HTMLInputElement;

    expect(switchEl.checked).toBe(false);
    await user.click(switchEl);
    expect(switchEl.checked).toBe(true);
    await user.click(switchEl);
    expect(switchEl.checked).toBe(false);
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    render(<Switch id="test" disabled />);
    const switchEl = screen.getByRole('switch') as HTMLInputElement;

    expect(switchEl).toBeDisabled();
    await user.click(switchEl);
    expect(switchEl.checked).toBe(false);
  });

  it('applies custom className', () => {
    const { container } = render(<Switch id="test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
