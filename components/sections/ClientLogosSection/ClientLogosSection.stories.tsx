import type { Meta, StoryObj } from '@storybook/react';
import { ClientLogosSection } from './ClientLogosSection';

const meta: Meta<typeof ClientLogosSection> = {
  title: 'Sections/ClientLogosSection',
  component: ClientLogosSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClientLogosSection>;

export const Default: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: [
      { name: 'Company A', logo: 'https://via.placeholder.com/150x50/3B82F6/FFFFFF?text=Company+A' },
      { name: 'Company B', logo: 'https://via.placeholder.com/150x50/8B5CF6/FFFFFF?text=Company+B' },
      { name: 'Company C', logo: 'https://via.placeholder.com/150x50/EC4899/FFFFFF?text=Company+C' },
      { name: 'Company D', logo: 'https://via.placeholder.com/150x50/10B981/FFFFFF?text=Company+D' },
      { name: 'Company E', logo: 'https://via.placeholder.com/150x50/F59E0B/FFFFFF?text=Company+E' },
      { name: 'Company F', logo: 'https://via.placeholder.com/150x50/EF4444/FFFFFF?text=Company+F' },
    ],
    autoScroll: true,
  },
};
