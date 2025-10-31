import type { Meta, StoryObj } from '@storybook/react';
import { HeroSpotlight } from './HeroSpotlight';

const meta: Meta<typeof HeroSpotlight> = {
  title: 'Sections/HeroSpotlight',
  component: HeroSpotlight,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroSpotlight>;

export const Default: Story = {
  args: {
    title: 'Trasforma il tuo Business',
    subtitle: 'La soluzione definitiva per aziende moderne che vogliono crescere velocemente',
    ctaText: 'Inizia Gratis',
    secondaryCtaText: 'Scopri di più',
  },
};

export const SimpleCTA: Story = {
  args: {
    title: 'Benvenuto nella Nuova Era',
    subtitle: 'Costruisci prodotti incredibili più velocemente che mai',
    ctaText: 'Prova Gratuita',
  },
};

export const ProductLaunch: Story = {
  args: {
    title: 'Il Futuro è Qui',
    subtitle: 'Presentazione del nostro nuovo prodotto rivoluzionario',
    ctaText: 'Preordina Ora',
    secondaryCtaText: 'Guarda il Video',
    spotlightColor: 'blue',
  },
};

export const WithLogos: Story = {
  args: {
    title: 'Scelto da oltre 10.000 Team',
    subtitle: 'Le aziende leader nel mondo si affidano a noi',
    ctaText: 'Unisciti a Loro',
  },
  render: (args) => (
    <HeroSpotlight {...args}>
      <div className="flex gap-12 justify-center items-center opacity-50 flex-wrap">
        <div className="text-white text-2xl font-bold">COMPANY</div>
        <div className="text-white text-2xl font-bold">BRAND</div>
        <div className="text-white text-2xl font-bold">STARTUP</div>
        <div className="text-white text-2xl font-bold">CORP</div>
      </div>
    </HeroSpotlight>
  ),
};

export const MinimalHero: Story = {
  args: {
    title: 'Semplicità. Potenza. Risultati.',
    ctaText: 'Inizia Subito',
  },
};

export const CustomColor: Story = {
  args: {
    title: 'Esperienza Premium',
    subtitle: 'Sblocca tutte le funzionalità avanzate',
    ctaText: 'Aggiorna Ora',
    spotlightColor: 'purple',
  },
};
