import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialsSection } from './TestimonialsSection';

const meta: Meta<typeof TestimonialsSection> = {
  title: 'Sections/SocialProof/TestimonialsSection',
  component: TestimonialsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = {
  args: {
    title: 'Cosa dicono i nostri clienti',
    subtitle: 'Migliaia di aziende si fidano di noi ogni giorno',
    testimonials: [
      {
        name: 'Marco Rossi',
        role: 'CEO',
        company: 'TechStart SRL',
        image: 'https://i.pravatar.cc/150?img=12',
        quote:
          'Questa piattaforma ha trasformato completamente il nostro modo di lavorare. La produttività del team è aumentata del 40% in soli 3 mesi.',
        rating: 5,
      },
      {
        name: 'Laura Bianchi',
        role: 'Product Manager',
        company: 'Innovation Hub',
        image: 'https://i.pravatar.cc/150?img=45',
        quote:
          'Interfaccia intuitiva e potente. Finalmente uno strumento che fa esattamente quello che promette, senza complessità inutili.',
        rating: 5,
      },
      {
        name: 'Giuseppe Verdi',
        role: 'CTO',
        company: 'Digital Solutions',
        image: 'https://i.pravatar.cc/150?img=33',
        quote:
          'Il supporto tecnico è eccezionale. Ogni domanda riceve una risposta rapida e competente. Consigliatissimo!',
        rating: 5,
      },
      {
        name: 'Anna Ferrari',
        role: 'Founder',
        company: 'Creative Agency',
        image: 'https://i.pravatar.cc/150?img=47',
        quote:
          'Dopo aver provato decine di alternative, questa è la soluzione definitiva. Semplice da usare ma incredibilmente potente.',
        rating: 4,
      },
      {
        name: 'Luca Marino',
        role: 'Lead Developer',
        company: 'Code Factory',
        image: 'https://i.pravatar.cc/150?img=68',
        quote:
          "Le API sono ben documentate e l'integrazione è stata velocissima. Perfetto per sviluppatori che vogliono costruire soluzioni custom.",
        rating: 5,
      },
      {
        name: 'Sofia Romano',
        role: 'Marketing Director',
        company: 'Growth Lab',
        image: 'https://i.pravatar.cc/150?img=32',
        quote:
          'Analytics dettagliate e insights azionabili. Abbiamo ottimizzato le nostre campagne e raddoppiato il ROI.',
        rating: 5,
      },
    ],
  },
};
