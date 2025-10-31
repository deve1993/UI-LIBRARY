import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesBento } from './FeaturesBento';
import { Zap, Shield, Star, Code } from 'lucide-react';

const items = [
  { title: 'Main Feature', description: 'La nostra funzionalità principale', icon: <Zap className="w-8 h-8 text-blue-600" /> },
  { title: 'Sicurezza', description: 'Protezione avanzata', icon: <Shield className="w-6 h-6 text-blue-600" /> },
  { title: 'Qualità', description: 'Standard elevati', icon: <Star className="w-6 h-6 text-blue-600" /> },
  { title: 'Developer', description: 'API potenti', icon: <Code className="w-6 h-6 text-blue-600" /> },
];

const meta: Meta<typeof FeaturesBento> = {
  title: 'Sections/FeaturesBento',
  component: FeaturesBento,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FeaturesBento>;

export const Default: Story = {
  args: { title: 'Caratteristiche', subtitle: 'Tutto in un posto', items },
};
