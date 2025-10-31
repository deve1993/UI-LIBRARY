import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteMovingCards } from './InfiniteMovingCards';

const testimonials = [
  {
    quote:
      'Questo prodotto ha trasformato completamente il nostro modo di lavorare. Incredibile!',
    name: 'Maria Rossi',
    title: 'CEO, TechItalia',
  },
  {
    quote:
      "Il miglior investimento che abbiamo fatto quest'anno. Risultati straordinari.",
    name: 'Luca Bianchi',
    title: 'CTO, InnovaCorp',
  },
  {
    quote:
      "Supporto clienti eccezionale e prodotto di altissima qualità. Consigliato!",
    name: 'Giulia Verdi',
    title: 'Product Manager, StartupHub',
  },
  {
    quote:
      'Semplicità ed efficacia in un unico strumento. Esattamente ciò che cercavamo.',
    name: 'Marco Ferrari',
    title: 'Director, DigitalWorks',
  },
  {
    quote:
      'ROI incredibile in soli 3 mesi. Non potremmo essere più soddisfatti.',
    name: 'Anna Romano',
    title: 'VP Sales, GrowthCo',
  },
];

const meta: Meta<typeof InfiniteMovingCards> = {
  title: 'UI/InfiniteMovingCards',
  component: InfiniteMovingCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteMovingCards>;

export const Default: Story = {
  args: {
    items: testimonials,
    direction: 'left',
    speed: 'normal',
  },
  render: (args) => (
    <div className="py-20 bg-slate-950">
      <InfiniteMovingCards {...args} />
    </div>
  ),
};

export const FastScroll: Story = {
  args: {
    items: testimonials,
    direction: 'left',
    speed: 'fast',
  },
  render: (args) => (
    <div className="py-20 bg-slate-950">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Scorrimento Veloce
      </h2>
      <InfiniteMovingCards {...args} />
    </div>
  ),
};

export const SlowScroll: Story = {
  args: {
    items: testimonials,
    direction: 'left',
    speed: 'slow',
  },
  render: (args) => (
    <div className="py-20 bg-slate-950">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Scorrimento Lento
      </h2>
      <InfiniteMovingCards {...args} />
    </div>
  ),
};

export const RightDirection: Story = {
  args: {
    items: testimonials,
    direction: 'right',
    speed: 'normal',
  },
  render: (args) => (
    <div className="py-20 bg-slate-950">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Direzione Destra
      </h2>
      <InfiniteMovingCards {...args} />
    </div>
  ),
};

export const NoPauseOnHover: Story = {
  args: {
    items: testimonials,
    direction: 'left',
    speed: 'normal',
    pauseOnHover: false,
  },
  render: (args) => (
    <div className="py-20 bg-slate-950">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Nessuna Pausa al Hover
      </h2>
      <InfiniteMovingCards {...args} />
    </div>
  ),
};
