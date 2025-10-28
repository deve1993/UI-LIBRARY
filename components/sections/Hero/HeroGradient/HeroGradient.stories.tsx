import type { Meta, StoryObj } from '@storybook/react';
import { HeroGradient } from './HeroGradient';

const meta: Meta<typeof HeroGradient> = {
  title: 'Sections/HeroGradient',
  component: HeroGradient,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroGradient>;

export const Default: Story = {
  args: {
    title: 'Benvenuto nel Futuro',
    subtitle: 'Costruisci prodotti straordinari con tecnologia all\'avanguardia',
    ctaText: 'Inizia Gratis',
    secondaryCtaText: 'Scopri di più',
  },
};

export const SimpleCTA: Story = {
  args: {
    title: 'Innovazione e Design',
    subtitle: 'La piattaforma di nuova generazione per team moderni',
    ctaText: 'Prova Gratuita',
  },
};

export const MinimalHero: Story = {
  args: {
    title: 'Semplicità. Potenza. Risultati.',
    ctaText: 'Inizia Ora',
  },
};

export const WithLogos: Story = {
  args: {
    title: 'Scelto da oltre 10.000 Team',
    subtitle: 'Le aziende leader nel mondo si affidano a noi',
    ctaText: 'Unisciti a Loro',
  },
  render: (args) => (
    <HeroGradient {...args}>
      <div className="flex gap-12 justify-center items-center opacity-70 flex-wrap">
        <div className="text-white text-2xl font-bold">COMPANY</div>
        <div className="text-white text-2xl font-bold">BRAND</div>
        <div className="text-white text-2xl font-bold">STARTUP</div>
        <div className="text-white text-2xl font-bold">CORP</div>
      </div>
    </HeroGradient>
  ),
};

export const ProductLaunch: Story = {
  args: {
    title: 'Presentazione Nuovo Prodotto',
    subtitle: 'L\'innovazione che stavi aspettando è finalmente qui',
    ctaText: 'Preordina Ora',
    secondaryCtaText: 'Guarda il Video',
  },
};

export const LongSubtitle: Story = {
  args: {
    title: 'Trasforma il tuo Business',
    subtitle:
      'Una piattaforma completa per gestire progetti, collaborare con il team e raggiungere risultati straordinari in tempi record',
    ctaText: 'Inizia Gratis',
    secondaryCtaText: 'Richiedi Demo',
  },
};
