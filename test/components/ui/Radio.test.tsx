import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../../../components/ui/Radio/Radio';

describe('Radio', () => {
  it('renders without crashing', () => {
    render(<Radio id="test" name="test" value="test" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Radio id="test" name="test" value="test" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('can be selected', async () => {
    const user = userEvent.setup();
    render(<Radio id="test" name="test" value="test" />);
    const radio = screen.getByRole('radio') as HTMLInputElement;

    expect(radio.checked).toBe(false);
    await user.click(radio);
    expect(radio.checked).toBe(true);
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    render(<Radio id="test" name="test" value="test" disabled />);
    const radio = screen.getByRole('radio') as HTMLInputElement;

    expect(radio).toBeDisabled();
    await user.click(radio);
    expect(radio.checked).toBe(false);
  });

  it('applies custom className', () => {
    const { container } = render(<Radio id="test" name="test" value="test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
