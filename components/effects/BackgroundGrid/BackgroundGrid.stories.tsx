import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundGrid } from './BackgroundGrid';

const meta: Meta<typeof BackgroundGrid> = {
  title: 'Effects/BackgroundGrid',
  component: BackgroundGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BackgroundGrid>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      <BackgroundGrid />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Background Grid
        </h1>
        <p className="text-xl text-gray-300">
          Modern grid background with gradient overlay
        </p>
      </div>
    </div>
  ),
};

export const LargeGrid: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-slate-900 flex items-center justify-center">
      <BackgroundGrid gridSize={100} />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Large Grid
        </h1>
        <p className="text-xl text-gray-300">
          Custom grid size: 100px
        </p>
      </div>
    </div>
  ),
};

export const ColoredGrid: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      <BackgroundGrid gridColor="rgba(59, 130, 246, 0.2)" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Colored Grid
        </h1>
        <p className="text-xl text-gray-300">
          Custom blue grid color
        </p>
      </div>
    </div>
  ),
};

export const NoGradient: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      <BackgroundGrid showGradient={false} />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          No Gradient
        </h1>
        <p className="text-xl text-gray-300">
          Pure grid without gradient overlay
        </p>
      </div>
    </div>
  ),
};
