import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesTimeline } from './FeaturesTimeline';

const items = [
  { title: 'Lancio Beta', description: 'Prima versione rilasciata', date: 'Q1 2024' },
  { title: 'Nuove Features', description: 'Aggiunte funzionalità avanzate', date: 'Q2 2024' },
  { title: 'Espansione', description: 'Crescita del team e prodotto', date: 'Q3 2024' },
];

const meta: Meta<typeof FeaturesTimeline> = {
  title: 'Sections/FeaturesTimeline',
  component: FeaturesTimeline,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FeaturesTimeline>;

export const Default: Story = {
  args: { title: 'La Nostra Storia', subtitle: 'Il nostro percorso', items },
};
