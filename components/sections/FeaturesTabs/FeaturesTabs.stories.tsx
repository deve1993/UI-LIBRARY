import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesTabs } from './FeaturesTabs';
import { Zap, Shield, Star } from 'lucide-react';

const tabs = [
  { id: '1', label: 'Performance', icon: <Zap className="w-5 h-5" />, title: 'Velocità', description: 'Performance ultra rapide' },
  { id: '2', label: 'Security', icon: <Shield className="w-5 h-5" />, title: 'Sicurezza', description: 'Protezione avanzata' },
  { id: '3', label: 'Quality', icon: <Star className="w-5 h-5" />, title: 'Qualità', description: 'Standard elevati' },
];

const meta: Meta<typeof FeaturesTabs> = {
  title: 'Sections/FeaturesTabs',
  component: FeaturesTabs,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FeaturesTabs>;

export const Default: Story = {
  args: { title: 'Funzionalità', subtitle: 'Esplora le nostre features', tabs },
};
