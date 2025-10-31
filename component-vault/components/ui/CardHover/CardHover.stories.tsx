import type { Meta, StoryObj } from '@storybook/react';
import { CardHover } from './CardHover';
import { Zap, Shield, Sparkles } from 'lucide-react';

const meta: Meta<typeof CardHover> = {
  title: 'UI/CardHover',
  component: CardHover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CardHover>;

export const Default: Story = {
  render: () => (
    <CardHover>
      <div className="p-8 w-80">
        <h3 className="text-2xl font-bold mb-2 dark:text-white">Card Hover</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Passa il mouse sopra per vedere l'effetto spotlight
        </p>
      </div>
    </CardHover>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <CardHover>
      <div className="p-8 w-80">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2 dark:text-white">Velocità</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Performance ottimizzate per un'esperienza ultra-rapida
        </p>
      </div>
    </CardHover>
  ),
};

export const FeatureCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <CardHover>
        <div className="p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Velocità</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Performance ottimizzate
          </p>
        </div>
      </CardHover>

      <CardHover>
        <div className="p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Design</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Interfaccia moderna
          </p>
        </div>
      </CardHover>

      <CardHover>
        <div className="p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Sicurezza</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Protezione avanzata
          </p>
        </div>
      </CardHover>
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <CardHover>
      <div className="w-80">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600" />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            Premium Product
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            €99.99
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Aggiungi al Carrello
          </button>
        </div>
      </div>
    </CardHover>
  ),
};
