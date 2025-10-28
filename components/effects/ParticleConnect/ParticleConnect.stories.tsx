import type { Meta, StoryObj } from '@storybook/react';
import { ParticleConnect } from './ParticleConnect';

const meta: Meta<typeof ParticleConnect> = {
  title: 'Effects/Backgrounds/ParticleConnect',
  component: ParticleConnect,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Animated particle network background with mouse interaction. Particles attract towards mouse cursor and connect when nearby.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ParticleConnect>;

// Story content component
const StoryContent = () => (
  <div className="relative flex min-h-screen items-center justify-center">
    <div className="relative z-10 max-w-2xl p-8 text-center">
      <h1 className="mb-4 text-5xl font-bold text-white">Particle Connect</h1>
      <p className="text-xl text-white/80">
        Move your mouse to interact with the particles
      </p>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    particleCount: 100,
    particleColor: 'rgba(99, 102, 241, 0.8)',
    lineColor: 'rgba(99, 102, 241, 0.2)',
    connectionDistance: 150,
    speed: 0.5,
    particleSize: 2,
    mouseRadius: 150,
    mouseAttract: true,
    backgroundColor: '#0a0a23',
  },
  render: (args) => (
    <>
      <ParticleConnect {...args} />
      <StoryContent />
    </>
  ),
};

export const Purple: Story = {
  args: {
    particleCount: 150,
    particleColor: 'rgba(168, 85, 247, 0.9)',
    lineColor: 'rgba(168, 85, 247, 0.3)',
    connectionDistance: 120,
    speed: 0.7,
    particleSize: 2.5,
    mouseRadius: 180,
    mouseAttract: true,
    backgroundColor: '#1a0a2e',
  },
  render: (args) => (
    <>
      <ParticleConnect {...args} />
      <StoryContent />
    </>
  ),
};

export const Cyan: Story = {
  args: {
    particleCount: 80,
    particleColor: 'rgba(34, 211, 238, 0.8)',
    lineColor: 'rgba(34, 211, 238, 0.2)',
    connectionDistance: 200,
    speed: 0.3,
    particleSize: 3,
    mouseRadius: 200,
    mouseAttract: true,
    backgroundColor: '#0a1a2e',
  },
  render: (args) => (
    <>
      <ParticleConnect {...args} />
      <StoryContent />
    </>
  ),
};

export const Dense: Story = {
  args: {
    particleCount: 300,
    particleColor: 'rgba(251, 146, 60, 0.7)',
    lineColor: 'rgba(251, 146, 60, 0.15)',
    connectionDistance: 100,
    speed: 0.4,
    particleSize: 1.5,
    mouseRadius: 120,
    mouseAttract: true,
    backgroundColor: '#1a0a0a',
  },
  render: (args) => (
    <>
      <ParticleConnect {...args} />
      <StoryContent />
    </>
  ),
};

export const Minimal: Story = {
  args: {
    particleCount: 50,
    particleColor: 'rgba(255, 255, 255, 0.6)',
    lineColor: 'rgba(255, 255, 255, 0.1)',
    connectionDistance: 180,
    speed: 0.2,
    particleSize: 2,
    mouseRadius: 150,
    mouseAttract: true,
    backgroundColor: 'transparent',
  },
  render: (args) => (
    <>
      <ParticleConnect {...args} />
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative z-10 max-w-2xl p-8 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Minimal Particles</h1>
          <p className="text-xl text-white/70">
            Subtle and elegant particle animation
          </p>
        </div>
      </div>
    </>
  ),
};
