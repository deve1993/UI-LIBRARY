import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesGrid } from './FeaturesGrid';
import { Zap, Shield, Star, Rocket, Heart, Code } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Velocità',
    description: 'Tempi di caricamento fulminei per un\'esperienza fluida',
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Sicurezza',
    description: 'Protezione avanzata per i tuoi dati sensibili',
  },
  {
    icon: <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Qualità',
    description: 'Standard elevati in ogni dettaglio del prodotto',
  },
  {
    icon: <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Scalabilità',
    description: 'Cresce con il tuo business senza limiti',
  },
  {
    icon: <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Supporto',
    description: 'Assistenza dedicata sempre al tuo fianco',
  },
  {
    icon: <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Developer First',
    description: 'API potenti e documentazione completa',
  },
];

const meta: Meta<typeof FeaturesGrid> = {
  title: 'Sections/FeaturesGrid',
  component: FeaturesGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FeaturesGrid>;

export const Default: Story = {
  args: {
    title: 'Perché Sceglierci',
    subtitle: 'Tutto ciò di cui hai bisogno in un\'unica piattaforma',
    features,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Caratteristiche Principali',
    features: features.slice(0, 4),
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    title: 'Funzionalità Complete',
    features: features.slice(0, 4),
    columns: 4,
  },
};

export const NoHeader: Story = {
  args: {
    features,
    columns: 3,
  },
};
