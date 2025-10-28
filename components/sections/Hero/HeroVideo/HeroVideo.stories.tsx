import type { Meta, StoryObj } from '@storybook/react';
import { HeroVideo } from './HeroVideo';

const meta: Meta<typeof HeroVideo> = {
  title: 'Sections/HeroVideo',
  component: HeroVideo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroVideo>;

// Note: Using a placeholder video URL for demo
const DEMO_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const Default: Story = {
  args: {
    title: 'Benvenuto nella Nostra Piattaforma',
    subtitle: 'Vivi il futuro della tecnologia',
    videoSrc: DEMO_VIDEO,
    ctaText: 'Inizia Gratis',
    secondaryCtaText: 'Scopri di più',
  },
};

export const LightOverlay: Story = {
  args: {
    title: 'Chiaro e Luminoso',
    subtitle: 'Il video è più visibile con overlay leggero',
    videoSrc: DEMO_VIDEO,
    overlayOpacity: 0.3,
    ctaText: 'Esplora',
  },
};

export const DarkOverlay: Story = {
  args: {
    title: 'Effetto Drammatico',
    subtitle: 'Overlay scuro per maggiore contrasto',
    videoSrc: DEMO_VIDEO,
    overlayOpacity: 0.7,
    ctaText: 'Scopri',
  },
};

export const SimpleCTA: Story = {
  args: {
    title: 'Innovazione in Movimento',
    videoSrc: DEMO_VIDEO,
    ctaText: 'Inizia Ora',
  },
};

export const ProductLaunch: Story = {
  args: {
    title: 'Presentazione Nuovo Prodotto',
    subtitle: 'L\'innovazione che cambierà tutto',
    videoSrc: DEMO_VIDEO,
    ctaText: 'Preordina Ora',
    secondaryCtaText: 'Guarda il Video Completo',
    overlayOpacity: 0.6,
  },
};
