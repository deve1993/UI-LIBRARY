import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesSection } from './FeaturesSection';
import { Zap, Shield, Users } from 'lucide-react';

const meta: Meta<typeof FeaturesSection> = {
  title: 'Sections/FeaturesSection',
  component: FeaturesSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeaturesSection>;

export const Default: Story = {
  args: {
    title: 'Everything you need to succeed',
    subtitle: 'Powerful features designed for modern teams',
    features: [
      {
        icon: <Zap className="w-8 h-8" />,
        title: 'Lightning Fast',
        description: 'Optimized performance for instant loading',
        benefits: ['Sub-second response times', 'Global CDN', 'Smart caching'],
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: 'Secure by Default',
        description: 'Enterprise-grade security built-in',
        benefits: ['End-to-end encryption', 'SOC2 compliant', 'Regular audits'],
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: 'Team Collaboration',
        description: 'Work together seamlessly',
        benefits: ['Real-time sync', 'Unlimited members', 'Role-based access'],
      },
    ],
  },
};
