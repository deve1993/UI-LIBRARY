import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../../../components/ui/Tooltip/Tooltip';

describe('Tooltip', () => {
  it('renders trigger element', () => {
    render(<Tooltip content="Tooltip text"><button>Hover me</button></Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Tooltip text"><button>Hover me</button></Tooltip>);

    const trigger = screen.getByText('Hover me');
    await user.hover(trigger);

    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('hides tooltip on unhover', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Tooltip text"><button>Hover me</button></Tooltip>);

    const trigger = screen.getByText('Hover me');
    await user.hover(trigger);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    await user.unhover(trigger);
    // Tooltip should be hidden or aria-hidden
    const tooltip = screen.queryByText('Tooltip text');
    expect(tooltip).not.toBeVisible();
  });

  it('renders different positions', () => {
    const { container } = render(
      <Tooltip content="Tooltip" position="top">
        <button>Button</button>
      </Tooltip>
    );
    expect(container.querySelector('[data-position="top"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Tooltip content="Tooltip" className="custom-class">
        <button>Button</button>
      </Tooltip>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
