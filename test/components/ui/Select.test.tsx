import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../../../components/ui/Select/Select';

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  it('renders without crashing', () => {
    render(<Select options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select options={options} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders all options', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    const select = screen.getByRole('combobox');

    await user.click(select);
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('can select an option', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    await user.selectOptions(select, '2');
    expect(select.value).toBe('2');
  });

  it('shows error message', () => {
    render(<Select options={options} error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('respects disabled state', () => {
    render(<Select options={options} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Select options={options} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
