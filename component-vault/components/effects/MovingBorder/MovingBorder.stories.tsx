import type { Meta, StoryObj } from '@storybook/react';
import { MovingBorder } from './MovingBorder';
import { Sparkles } from 'lucide-react';

const meta: Meta<typeof MovingBorder> = {
  title: 'Effects/MovingBorder',
  component: MovingBorder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0f172a' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovingBorder>;

export const Default: Story = {
  render: () => (
    <MovingBorder>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Moving Border</h3>
        <p className="text-slate-300">Animated gradient border effect</p>
      </div>
    </MovingBorder>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <MovingBorder>
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Premium Feature</h3>
          <p className="text-slate-400 text-sm">Unlock full access</p>
        </div>
      </div>
    </MovingBorder>
  ),
};

export const Button: Story = {
  render: () => (
    <MovingBorder className="inline-block">
      <button className="px-8 py-4 text-white font-semibold hover:bg-slate-800 transition-colors">
        Get Started Now
      </button>
    </MovingBorder>
  ),
};

export const GreenGradient: Story = {
  render: () => (
    <MovingBorder borderColors={['#22c55e', '#10b981', '#14b8a6']}>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Success</h3>
        <p className="text-slate-300">Green gradient border</p>
      </div>
    </MovingBorder>
  ),
};

export const SlowAnimation: Story = {
  render: () => (
    <MovingBorder duration={6}>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Slow Motion</h3>
        <p className="text-slate-300">6 second animation cycle</p>
      </div>
    </MovingBorder>
  ),
};

export const FastAnimation: Story = {
  render: () => (
    <MovingBorder duration={1.5}>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Fast Motion</h3>
        <p className="text-slate-300">1.5 second animation cycle</p>
      </div>
    </MovingBorder>
  ),
};
