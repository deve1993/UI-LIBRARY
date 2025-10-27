import type { Meta, StoryObj } from '@storybook/react';
import { ButtonShimmer } from './ButtonShimmer';
import { ArrowRight, Sparkles } from 'lucide-react';

const meta: Meta<typeof ButtonShimmer> = {
  title: 'UI/ButtonShimmer',
  component: ButtonShimmer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonShimmer>;

export const Default: Story = {
  args: {
    children: 'Get Started',
  },
};

export const WithIcon: Story = {
  render: () => (
    <ButtonShimmer>
      <span className="flex items-center gap-2">
        Inizia Ora
        <ArrowRight className="w-4 h-4" />
      </span>
    </ButtonShimmer>
  ),
};

export const WithIconLeft: Story = {
  render: () => (
    <ButtonShimmer>
      <span className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Premium Feature
      </span>
    </ButtonShimmer>
  ),
};

export const LargeButton: Story = {
  render: () => (
    <ButtonShimmer className="h-14 text-lg">
      <span className="px-4">Prova Gratuita</span>
    </ButtonShimmer>
  ),
};

export const MultipleButtons: Story = {
  render: () => (
    <div className="flex gap-4 p-8 bg-slate-900">
      <ButtonShimmer>
        Inizia Ora
      </ButtonShimmer>
      <ButtonShimmer>
        <span className="flex items-center gap-2">
          Scopri di più
          <ArrowRight className="w-4 h-4" />
        </span>
      </ButtonShimmer>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-16 rounded-xl text-center">
      <h2 className="text-4xl font-bold text-white mb-4">
        Trasforma il tuo Business
      </h2>
      <p className="text-xl text-slate-300 mb-8">
        Inizia oggi con una prova gratuita di 14 giorni
      </p>
      <ButtonShimmer onClick={() => alert('Cliccato!')}>
        <span className="flex items-center gap-2">
          Inizia Gratis
          <ArrowRight className="w-4 h-4" />
        </span>
      </ButtonShimmer>
    </div>
  ),
};
