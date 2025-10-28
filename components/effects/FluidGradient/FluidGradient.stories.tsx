import type { Meta, StoryObj } from '@storybook/react';
import { FluidGradient } from './FluidGradient';

const meta: Meta<typeof FluidGradient> = {
  title: 'Effects/Backgrounds/FluidGradient',
  component: FluidGradient,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Animated fluid gradient background with colorful blobs that move smoothly and react to mouse movement.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FluidGradient>;

const StoryContent = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative flex min-h-screen items-center justify-center">
    <div className="relative z-10 max-w-2xl p-8 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-lg">{title}</h1>
      <p className="text-xl text-white/90 drop-shadow-md">{subtitle}</p>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
    speed: 5,
    blur: 40,
    interactive: true,
    mouseRadius: 200,
    blobCount: 5,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Fluid Gradient"
        subtitle="Move your mouse to create waves"
      />
    </>
  ),
};

export const NeonColors: Story = {
  args: {
    colors: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'],
    speed: 6,
    blur: 50,
    interactive: true,
    mouseRadius: 250,
    blobCount: 6,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Neon Dreams"
        subtitle="Vibrant and electric gradients"
      />
    </>
  ),
};

export const WarmSunset: Story = {
  args: {
    colors: ['#ff6b6b', '#feca57', '#ee5a6f', '#f79f1f'],
    speed: 4,
    blur: 60,
    interactive: true,
    mouseRadius: 180,
    blobCount: 4,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Warm Sunset"
        subtitle="Cozy and inviting atmosphere"
      />
    </>
  ),
};

export const OceanBlue: Story = {
  args: {
    colors: ['#0077be', '#00a8cc', '#4facfe', '#00d2ff'],
    speed: 3,
    blur: 45,
    interactive: true,
    mouseRadius: 200,
    blobCount: 5,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Ocean Blue"
        subtitle="Deep and calm like the sea"
      />
    </>
  ),
};

export const PastelDream: Story = {
  args: {
    colors: ['#a8e6cf', '#ffd3b6', '#ffaaa5', '#ff8b94'],
    speed: 4,
    blur: 70,
    interactive: true,
    mouseRadius: 220,
    blobCount: 7,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Pastel Dream"
        subtitle="Soft and gentle gradients"
      />
    </>
  ),
};

export const Fast: Story = {
  args: {
    colors: ['#667eea', '#764ba2', '#f093fb'],
    speed: 10,
    blur: 35,
    interactive: true,
    mouseRadius: 150,
    blobCount: 4,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Fast Motion"
        subtitle="Quick and energetic movement"
      />
    </>
  ),
};

export const NonInteractive: Story = {
  args: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
    speed: 5,
    blur: 40,
    interactive: false,
    blobCount: 5,
    glow: true,
    glowIntensity: 0.5,
    morphing: true,
    morphSpeed: 0.02,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Auto Animate"
        subtitle="No mouse interaction, just beautiful motion"
      />
    </>
  ),
};

export const EnhancedGlow: Story = {
  args: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
    speed: 5,
    blur: 40,
    interactive: true,
    mouseRadius: 200,
    blobCount: 5,
    glow: true,
    glowIntensity: 0.8,
    morphing: true,
    morphSpeed: 0.02,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Enhanced Glow"
        subtitle="Increased glow intensity for a luminous effect"
      />
    </>
  ),
};

export const MorphingBlobs: Story = {
  args: {
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'],
    speed: 4,
    blur: 50,
    interactive: true,
    mouseRadius: 220,
    blobCount: 6,
    glow: true,
    glowIntensity: 0.6,
    morphing: true,
    morphSpeed: 0.04,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Morphing Blobs"
        subtitle="Watch the blobs smoothly change size"
      />
    </>
  ),
};

export const NoGlow: Story = {
  args: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
    speed: 5,
    blur: 40,
    interactive: true,
    mouseRadius: 200,
    blobCount: 5,
    glow: false,
    morphing: true,
    morphSpeed: 0.02,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Without Glow"
        subtitle="Clean gradient without glow layer"
      />
    </>
  ),
};

export const StaticSize: Story = {
  args: {
    colors: ['#00d2ff', '#3a7bd5', '#6a11cb'],
    speed: 6,
    blur: 45,
    interactive: true,
    mouseRadius: 200,
    blobCount: 4,
    glow: true,
    glowIntensity: 0.5,
    morphing: false,
  },
  render: (args) => (
    <>
      <FluidGradient {...args} />
      <StoryContent
        title="Static Size"
        subtitle="No morphing - blobs maintain constant size"
      />
    </>
  ),
};
