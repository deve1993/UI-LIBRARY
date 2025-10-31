import type { Meta, StoryObj } from '@storybook/react';
import { BenefitsSection } from './BenefitsSection';
import { Users, TrendingUp, Award, Zap } from 'lucide-react';

const meta: Meta<typeof BenefitsSection> = {
  title: 'Sections/Features/BenefitsSection',
  component: BenefitsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BenefitsSection>;

export const Default: Story = {
  args: {
    title: 'I nostri numeri parlano chiaro',
    subtitle: 'Risultati concreti che dimostrano la nostra affidabilità',
    benefits: [
      {
        value: 50000,
        label: 'Utenti Attivi',
        description: 'Utilizzano quotidianamente la piattaforma',
        icon: <Users className="w-8 h-8" />,
        suffix: '+',
        animated: true,
      },
      {
        value: 240,
        label: 'Crescita',
        description: 'Incremento medio nei primi 6 mesi',
        icon: <TrendingUp className="w-8 h-8" />,
        suffix: '%',
        animated: true,
      },
      {
        value: 15,
        label: 'Premi Vinti',
        description: 'Riconoscimenti internazionali',
        icon: <Award className="w-8 h-8" />,
        suffix: '+',
        animated: true,
      },
      {
        value: 99.9,
        label: 'Uptime',
        description: 'Garantito con SLA',
        icon: <Zap className="w-8 h-8" />,
        suffix: '%',
        animated: true,
      },
    ],
  },
};
