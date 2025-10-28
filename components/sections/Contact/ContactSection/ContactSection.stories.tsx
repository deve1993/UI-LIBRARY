import type { Meta, StoryObj } from '@storybook/react';
import { ContactSection } from './ContactSection';

const meta: Meta<typeof ContactSection> = {
  title: 'Sections/ContactSection',
  component: ContactSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {
  args: {
    // TODO: Add default props
  },
};
