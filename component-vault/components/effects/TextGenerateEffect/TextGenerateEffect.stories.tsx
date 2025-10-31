import type { Meta, StoryObj } from '@storybook/react';
import { TextGenerateEffect } from './TextGenerateEffect';

const meta: Meta<typeof TextGenerateEffect> = {
  title: 'Effects/TextGenerateEffect',
  component: TextGenerateEffect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TextGenerateEffect>;

export const Default: Story = {
  args: {
    words: 'Welcome to our amazing platform where innovation meets simplicity',
    className: 'text-4xl',
  },
};

export const LargeHeadline: Story = {
  render: () => (
    <div className="max-w-4xl p-8">
      <TextGenerateEffect
        words="Transform Your Business With Cutting-Edge Technology"
        className="text-5xl md:text-6xl font-bold text-center"
      />
    </div>
  ),
};

export const FastAnimation: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <TextGenerateEffect
        words="This text appears quickly with a fast animation speed"
        className="text-3xl"
        duration={0.2}
      />
    </div>
  ),
};

export const SlowAnimation: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <TextGenerateEffect
        words="This text reveals slowly for dramatic effect"
        className="text-3xl"
        duration={0.8}
      />
    </div>
  ),
};

export const NoBlur: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <TextGenerateEffect
        words="Simple fade-in without blur effect for cleaner look"
        className="text-3xl"
        filter={false}
      />
    </div>
  ),
};

export const DarkBackground: Story = {
  render: () => (
    <div className="bg-slate-950 p-12 rounded-xl max-w-4xl">
      <TextGenerateEffect
        words="Experience the future of digital innovation today"
        className="text-5xl font-bold text-white text-center"
      />
    </div>
  ),
};
