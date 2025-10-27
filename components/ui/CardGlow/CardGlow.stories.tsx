import type { Meta, StoryObj } from '@storybook/react';
import { CardGlow } from './CardGlow';
import { Star, Zap, Crown } from 'lucide-react';

const meta: Meta<typeof CardGlow> = {
  title: 'UI/CardGlow',
  component: CardGlow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CardGlow>;

export const Default: Story = {
  render: () => (
    <CardGlow>
      <div className="p-8 w-80">
        <h3 className="text-2xl font-bold mb-2 dark:text-white">Card Glow</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Passa il mouse per vedere l'effetto glow
        </p>
      </div>
    </CardGlow>
  ),
};

export const PurpleGlow: Story = {
  render: () => (
    <CardGlow glowColor="rgba(168, 85, 247, 0.5)">
      <div className="p-8 w-80">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
          <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2 dark:text-white">Purple Glow</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Glow viola personalizzato
        </p>
      </div>
    </CardGlow>
  ),
};

export const ColoredCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <CardGlow glowColor="rgba(59, 130, 246, 0.5)">
        <div className="p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Blue</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Glow blu elettrico
          </p>
        </div>
      </CardGlow>

      <CardGlow glowColor="rgba(168, 85, 247, 0.5)">
        <div className="p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Purple</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Glow viola reale
          </p>
        </div>
      </CardGlow>

      <CardGlow glowColor="rgba(236, 72, 153, 0.5)">
        <div className="p-6">
          <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Pink</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Glow rosa vibrante
          </p>
        </div>
      </CardGlow>
    </div>
  ),
};

export const DarkBackground: Story = {
  render: () => (
    <div className="bg-slate-950 p-12 rounded-xl">
      <CardGlow glowColor="rgba(59, 130, 246, 0.7)">
        <div className="p-8 w-96">
          <h3 className="text-2xl font-bold mb-2 text-white">Premium Card</h3>
          <p className="text-slate-300 mb-4">
            L'effetto glow è ancora più evidente su sfondo scuro
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Scopri di più
          </button>
        </div>
      </CardGlow>
    </div>
  ),
};
