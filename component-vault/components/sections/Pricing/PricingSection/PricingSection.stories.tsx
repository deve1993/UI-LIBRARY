import type { Meta, StoryObj } from '@storybook/react';
import { PricingSection } from './PricingSection';
import { Check, X } from 'lucide-react';

const meta: Meta<typeof PricingSection> = {
  title: 'Sections/PricingSection',
  component: PricingSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

export const Default: Story = {
  args: {
    title: 'Scegli il piano perfetto per te',
    subtitle: 'Prezzi trasparenti e flessibili, senza costi nascosti',
    plans: [
      {
        name: 'Starter',
        description: 'Perfetto per iniziare',
        price: {
          amount: 29,
          currency: '€',
          period: 'mese',
        },
        perfectFor: 'Freelancer e piccoli progetti',
        features: [
          {
            text: 'Fino a 5 progetti',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: '10 GB di storage',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Supporto email',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Analytics base',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Supporto prioritario',
            icon: <X className="w-5 h-5" />,
            available: false,
          },
          {
            text: 'API avanzate',
            icon: <X className="w-5 h-5" />,
            available: false,
          },
        ],
        cta: {
          label: 'Inizia gratis',
          onClick: () => console.log('Starter plan selected'),
        },
      },
      {
        name: 'Professional',
        description: 'Per team e aziende in crescita',
        price: {
          amount: 79,
          currency: '€',
          period: 'mese',
        },
        badge: {
          text: 'Più popolare',
          variant: 'recommended',
        },
        highlighted: true,
        perfectFor: 'Agenzie e team',
        features: [
          {
            text: 'Progetti illimitati',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: '100 GB di storage',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Supporto prioritario 24/7',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Analytics avanzate',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Integrazioni premium',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'White label',
            icon: <X className="w-5 h-5" />,
            available: false,
          },
        ],
        cta: {
          label: 'Inizia ora',
          onClick: () => console.log('Professional plan selected'),
        },
      },
      {
        name: 'Enterprise',
        description: 'Soluzione su misura per grandi aziende',
        price: {
          amount: 'Custom',
          currency: '',
          period: '',
        },
        perfectFor: 'Grandi organizzazioni',
        features: [
          {
            text: 'Tutto del Professional',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Storage illimitato',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'Account manager dedicato',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'White label completo',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'API personalizzate',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
          {
            text: 'SLA garantito',
            icon: <Check className="w-5 h-5" />,
            available: true,
          },
        ],
        cta: {
          label: 'Contattaci',
          onClick: () => console.log('Enterprise plan selected'),
        },
      },
    ],
  },
};
