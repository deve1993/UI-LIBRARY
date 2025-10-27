import type { Meta, StoryObj } from '@storybook/react';
import { Spotlight } from './Spotlight';

const meta: Meta<typeof Spotlight> = {
  title: 'Effects/Spotlight',
  component: Spotlight,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Spotlight>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-black/90 flex items-center justify-center overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Spotlight Effect
        </h1>
        <p className="text-xl text-gray-300">
          Smooth animated spotlight with fade-in effect
        </p>
      </div>
    </div>
  ),
};

export const BlueSpotlight: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Blue Spotlight
        </h1>
        <p className="text-xl text-gray-300">
          Custom color variant
        </p>
      </div>
    </div>
  ),
};

export const MultipleSpotlights: Story = {
  render: () => (
    <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <Spotlight className="-top-40 left-0" fill="blue" />
      <Spotlight className="-top-40 right-0" fill="purple" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Multiple Spotlights
        </h1>
        <p className="text-xl text-gray-300">
          Combine multiple spotlights for dramatic effects
        </p>
      </div>
    </div>
  ),
};
