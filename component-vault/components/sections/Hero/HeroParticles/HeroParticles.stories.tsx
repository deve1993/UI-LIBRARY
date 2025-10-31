import type { Meta, StoryObj } from '@storybook/react';
import { HeroParticles } from './HeroParticles';

const meta: Meta<typeof HeroParticles> = {
  title: 'Sections/HeroParticles',
  component: HeroParticles,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroParticles>;

export const Default: Story = {
  args: {
    title: 'Benvenuto nel Futuro',
    subtitle: 'L\'innovazione inizia qui con tecnologia all\'avanguardia',
    ctaText: 'Inizia Ora',
    secondaryCtaText: 'Scopri di più',
    particleCount: 50,
  },
};

export const ManyParticles: Story = {
  args: {
    title: 'Innovazione Tecnologica',
    subtitle: 'Il futuro è adesso',
    ctaText: 'Esplora',
    particleCount: 100,
  },
};

export const FewParticles: Story = {
  args: {
    title: 'Design Minimalista',
    subtitle: 'Semplicità ed eleganza',
    ctaText: 'Scopri di più',
    particleCount: 20,
  },
};

export const SimpleCTA: Story = {
  args: {
    title: 'Trasforma il tuo Business',
    ctaText: 'Prova Gratuita',
    particleCount: 50,
  },
};

export const ProductLaunch: Story = {
  args: {
    title: 'Presentazione Nuovo Prodotto',
    subtitle: 'L\'innovazione che stavi aspettando',
    ctaText: 'Preordina Ora',
    secondaryCtaText: 'Guarda il Video',
    particleCount: 75,
  },
};
