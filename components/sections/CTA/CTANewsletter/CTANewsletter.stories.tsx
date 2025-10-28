import type { Meta, StoryObj } from '@storybook/react';
import { CTANewsletter } from './CTANewsletter';

const meta: Meta<typeof CTANewsletter> = {
  title: 'Sections/CTANewsletter',
  component: CTANewsletter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof CTANewsletter>;

export const Default: Story = {
  args: { title: 'Resta Aggiornato', subtitle: 'Ricevi le ultime novità direttamente nella tua inbox' },
};
