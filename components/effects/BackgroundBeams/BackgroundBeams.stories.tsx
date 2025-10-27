import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundBeams } from './BackgroundBeams';

const meta: Meta<typeof BackgroundBeams> = {
  title: 'Effects/BackgroundBeams',
  component: BackgroundBeams,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BackgroundBeams>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <BackgroundBeams />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Background Beams</h1>
          <p className="text-xl text-slate-300">
            Animated light beams create a futuristic atmosphere
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ManyBeams: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <BackgroundBeams beamCount={16} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">More Beams</h1>
          <p className="text-xl text-slate-300">16 animated beams</p>
        </div>
      </div>
    </div>
  ),
};

export const FewBeams: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <BackgroundBeams beamCount={4} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Minimal Beams</h1>
          <p className="text-xl text-slate-300">Subtle effect with 4 beams</p>
        </div>
      </div>
    </div>
  ),
};

export const WithCard: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <BackgroundBeams />
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">Sign Up</h2>
          <p className="text-slate-300 mb-6">
            Join thousands of users already using our platform
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  ),
};
