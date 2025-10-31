import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../../../components/ui/Modal/Modal';

describe('Modal', () => {
  it('renders when open is true', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Modal Content</Modal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<Modal isOpen={false} onClose={() => {}}>Modal Content</Modal>);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders title when provided', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test Title">Content</Modal>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Modal isOpen={true} onClose={() => {}} className="custom-class">Content</Modal>);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
