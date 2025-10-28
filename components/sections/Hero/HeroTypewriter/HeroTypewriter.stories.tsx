import type { Meta, StoryObj } from '@storybook/react';
import { HeroTypewriter } from './HeroTypewriter';

const meta: Meta<typeof HeroTypewriter> = {
  title: 'Sections/HeroTypewriter',
  component: HeroTypewriter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroTypewriter>;

export const Default: Story = {
  args: {
    titlePrefix: 'Costruisci',
    words: ['Prodotti Straordinari', 'Esperienze Uniche', 'Soluzioni Innovative'],
    subtitle: 'Che i tuoi utenti ameranno davvero',
    ctaText: 'Inizia Gratis',
    secondaryCtaText: 'Scopri di più',
  },
};

export const FastTyping: Story = {
  args: {
    titlePrefix: 'Noi lo rendiamo',
    words: ['Facile', 'Veloce', 'Sicuro', 'Scalabile'],
    subtitle: 'La piattaforma di fiducia per migliaia di aziende',
    ctaText: 'Prova Ora',
    typeSpeed: 100,
  },
};

export const NoPrefix: Story = {
  args: {
    words: ['Innovazione', 'Creatività', 'Risultati'],
    subtitle: 'Il futuro del tuo business inizia qui',
    ctaText: 'Inizia Ora',
  },
};

export const ManyWords: Story = {
  args: {
    titlePrefix: 'Crea',
    words: [
      'Siti Web',
      'App Mobile',
      'Dashboard',
      'E-Commerce',
      'Landing Page',
      'Portali',
    ],
    subtitle: 'Con la nostra piattaforma all-in-one',
    ctaText: 'Inizia Gratis',
    secondaryCtaText: 'Richiedi Demo',
  },
};

export const SimpleCTA: Story = {
  args: {
    words: ['Veloce', 'Moderno', 'Potente'],
    ctaText: 'Scopri di più',
    typeSpeed: 120,
  },
};
