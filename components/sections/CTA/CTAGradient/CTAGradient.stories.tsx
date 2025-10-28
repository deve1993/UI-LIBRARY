import type { Meta, StoryObj } from '@storybook/react';
import { CTAGradient } from './CTAGradient';

const meta: Meta<typeof CTAGradient> = {
  title: 'Sections/CTAGradient',
  component: CTAGradient,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof CTAGradient>;

export const Default: Story = {
  args: { title: 'Pronto a Iniziare?', subtitle: 'Unisciti a migliaia di utenti soddisfatti', ctaText: 'Inizia Gratis' },
};
