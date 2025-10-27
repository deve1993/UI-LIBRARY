import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundDots } from './BackgroundDots';

const meta: Meta<typeof BackgroundDots> = {
  title: 'Effects/BackgroundDots',
  component: BackgroundDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BackgroundDots>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      <BackgroundDots />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Dot Pattern</h1>
        <p className="text-xl text-slate-300">Minimalist background effect</p>
      </div>
    </div>
  ),
};

export const LargeDots: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      <BackgroundDots dotSize={2} dotSpacing={30} />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Large Dots</h1>
        <p className="text-xl text-slate-300">Larger dots with more spacing</p>
      </div>
    </div>
  ),
};

export const ColoredDots: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-slate-900 flex items-center justify-center">
      <BackgroundDots dotColor="rgba(59, 130, 246, 0.4)" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Blue Dots</h1>
        <p className="text-xl text-slate-300">Custom colored dots</p>
      </div>
    </div>
  ),
};

export const DensePattern: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      <BackgroundDots dotSpacing={12} />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Dense Pattern</h1>
        <p className="text-xl text-slate-300">Tighter dot spacing</p>
      </div>
    </div>
  ),
};
