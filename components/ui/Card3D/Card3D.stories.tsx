import type { Meta, StoryObj } from '@storybook/react';
import { Card3D } from './Card3D';
import { Sparkles, Zap, Shield } from 'lucide-react';

const meta: Meta<typeof Card3D> = {
  title: 'UI/Card3D',
  component: Card3D,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card3D>;

export const Default: Story = {
  render: () => (
    <Card3D className="bg-white rounded-xl shadow-2xl p-8 w-80">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">
        Card 3D Effect
      </h3>
      <p className="text-gray-600">
        Muovi il mouse sopra questa card per vedere l'effetto 3D interattivo!
      </p>
    </Card3D>
  ),
};

export const GradientCard: Story = {
  render: () => (
    <Card3D className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl p-8 w-80">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-8 h-8 text-white" />
        <h3 className="text-2xl font-bold text-white">Premium Feature</h3>
      </div>
      <p className="text-white/90">
        Effetto tilt 3D con gradiente colorato per un look premium
      </p>
    </Card3D>
  ),
};

export const FeatureCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <Card3D className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Velocità</h3>
          <p className="text-gray-600">Performance ottimizzate per un'esperienza fluida</p>
        </div>
      </Card3D>

      <Card3D className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Design</h3>
          <p className="text-gray-600">Interfaccia moderna e intuitiva</p>
        </div>
      </Card3D>

      <Card3D className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Sicurezza</h3>
          <p className="text-gray-600">Protezione avanzata dei tuoi dati</p>
        </div>
      </Card3D>
    </div>
  ),
};

export const DarkCard: Story = {
  render: () => (
    <div className="bg-slate-900 p-12">
      <Card3D className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8 w-80">
        <h3 className="text-2xl font-bold mb-4 text-white">
          Dark Mode
        </h3>
        <p className="text-slate-300">
          Perfetto anche in modalità scura con bordi sottili
        </p>
      </Card3D>
    </div>
  ),
};
