import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../../../components/ui/Textarea/Textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('accepts text input', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    await user.type(textarea, 'Hello World');
    expect(textarea.value).toBe('Hello World');
  });

  it('shows error message', () => {
    render(<Textarea error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Textarea helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeDisabled();
    await user.type(textarea, 'Test');
    expect(textarea).toHaveValue('');
  });

  it('applies custom className', () => {
    const { container } = render(<Textarea className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
