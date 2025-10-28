import type { Meta, StoryObj } from '@storybook/react';
import { AuroraWaves } from './AuroraWaves';

const meta: Meta<typeof AuroraWaves> = {
  title: 'Effects/Backgrounds/AuroraWaves',
  component: AuroraWaves,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Beautiful aurora-inspired wave animation with parallax mouse effect, resembling northern lights.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuroraWaves>;

const StoryContent = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative flex min-h-screen items-center justify-center">
    <div className="relative z-10 max-w-2xl p-8 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-2xl">{title}</h1>
      <p className="text-xl text-white/90 drop-shadow-lg">{subtitle}</p>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    colors: ['rgba(0, 255, 255, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(255, 105, 180, 0.3)'],
    speed: 5,
    amplitude: 100,
    waveCount: 3,
    blur: 30,
    parallax: true,
    parallaxIntensity: 0.3,
    backgroundColor: 'rgba(10, 10, 35, 1)',
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Aurora Waves"
        subtitle="Move your mouse to experience the parallax effect"
      />
    </>
  ),
};

export const NorthernLights: Story = {
  args: {
    colors: [
      'rgba(0, 255, 150, 0.4)',
      'rgba(0, 180, 255, 0.4)',
      'rgba(100, 255, 200, 0.3)',
    ],
    speed: 4,
    amplitude: 120,
    waveCount: 4,
    blur: 40,
    parallax: true,
    parallaxIntensity: 0.4,
    backgroundColor: 'rgba(5, 10, 25, 1)',
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Northern Lights"
        subtitle="Classic aurora borealis colors"
      />
    </>
  ),
};

export const SunsetWaves: Story = {
  args: {
    colors: [
      'rgba(255, 100, 100, 0.3)',
      'rgba(255, 150, 0, 0.3)',
      'rgba(255, 200, 100, 0.3)',
    ],
    speed: 6,
    amplitude: 80,
    waveCount: 3,
    blur: 35,
    parallax: true,
    parallaxIntensity: 0.25,
    backgroundColor: 'rgba(20, 5, 10, 1)',
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Sunset Waves"
        subtitle="Warm and vibrant colors"
      />
    </>
  ),
};

export const DeepOcean: Story = {
  args: {
    colors: [
      'rgba(0, 100, 255, 0.3)',
      'rgba(0, 200, 255, 0.3)',
      'rgba(100, 150, 255, 0.3)',
    ],
    speed: 3,
    amplitude: 150,
    waveCount: 5,
    blur: 45,
    parallax: true,
    parallaxIntensity: 0.5,
    backgroundColor: 'rgba(0, 5, 20, 1)',
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Deep Ocean"
        subtitle="Calm and mysterious depths"
      />
    </>
  ),
};

export const ElectricPurple: Story = {
  args: {
    colors: [
      'rgba(138, 43, 226, 0.4)',
      'rgba(186, 85, 211, 0.4)',
      'rgba(221, 160, 221, 0.3)',
    ],
    speed: 7,
    amplitude: 90,
    waveCount: 4,
    blur: 25,
    parallax: true,
    parallaxIntensity: 0.3,
    backgroundColor: 'rgba(15, 5, 25, 1)',
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Electric Purple"
        subtitle="Bold and energetic vibes"
      />
    </>
  ),
};

export const Gentle: Story = {
  args: {
    colors: [
      'rgba(100, 200, 255, 0.2)',
      'rgba(150, 180, 255, 0.2)',
      'rgba(180, 150, 255, 0.2)',
    ],
    speed: 2,
    amplitude: 60,
    waveCount: 2,
    blur: 50,
    parallax: true,
    parallaxIntensity: 0.15,
    backgroundColor: 'rgba(10, 15, 30, 1)',
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Gentle Waves"
        subtitle="Soft and relaxing movement"
      />
    </>
  ),
};

export const NoParallax: Story = {
  args: {
    colors: ['rgba(0, 255, 255, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(255, 105, 180, 0.3)'],
    speed: 5,
    amplitude: 100,
    waveCount: 3,
    blur: 30,
    parallax: false,
    backgroundColor: 'rgba(10, 10, 35, 1)',
    shimmer: true,
    showStars: true,
    starCount: 100,
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Static Waves"
        subtitle="No mouse parallax, just pure animation"
      />
    </>
  ),
};

export const WithStars: Story = {
  args: {
    colors: ['rgba(0, 255, 255, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(255, 105, 180, 0.3)'],
    speed: 4,
    amplitude: 100,
    waveCount: 3,
    blur: 30,
    parallax: true,
    parallaxIntensity: 0.3,
    backgroundColor: 'rgba(5, 5, 20, 1)',
    shimmer: true,
    showStars: true,
    starCount: 200,
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Starry Night"
        subtitle="Aurora with twinkling stars background"
      />
    </>
  ),
};

export const ShimmerEffect: Story = {
  args: {
    colors: [
      'rgba(100, 200, 255, 0.4)',
      'rgba(150, 150, 255, 0.4)',
      'rgba(200, 100, 255, 0.4)',
    ],
    speed: 6,
    amplitude: 110,
    waveCount: 4,
    blur: 35,
    parallax: true,
    parallaxIntensity: 0.4,
    backgroundColor: 'rgba(10, 5, 25, 1)',
    shimmer: true,
    showStars: false,
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Shimmer Waves"
        subtitle="Enhanced with dynamic shimmer highlights"
      />
    </>
  ),
};

export const ColorShifting: Story = {
  args: {
    colors: [
      'rgba(255, 100, 100, 0.4)',
      'rgba(100, 255, 100, 0.4)',
      'rgba(100, 100, 255, 0.4)',
    ],
    speed: 5,
    amplitude: 100,
    waveCount: 3,
    blur: 30,
    parallax: true,
    parallaxIntensity: 0.3,
    backgroundColor: 'rgba(10, 10, 20, 1)',
    shimmer: true,
    showStars: true,
    starCount: 150,
    colorShift: true,
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Color Shifting"
        subtitle="Watch the colors gradually shift and transform"
      />
    </>
  ),
};

export const FullEnhanced: Story = {
  args: {
    colors: [
      'rgba(0, 255, 200, 0.4)',
      'rgba(100, 150, 255, 0.4)',
      'rgba(200, 100, 255, 0.4)',
      'rgba(255, 100, 150, 0.4)',
    ],
    speed: 5,
    amplitude: 120,
    waveCount: 4,
    blur: 35,
    parallax: true,
    parallaxIntensity: 0.4,
    backgroundColor: 'rgba(5, 5, 15, 1)',
    shimmer: true,
    showStars: true,
    starCount: 250,
    colorShift: true,
  },
  render: (args) => (
    <>
      <AuroraWaves {...args} />
      <StoryContent
        title="Ultimate Aurora"
        subtitle="All enhancements enabled for maximum visual impact"
      />
    </>
  ),
};
