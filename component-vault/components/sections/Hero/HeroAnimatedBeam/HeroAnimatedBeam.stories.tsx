import type { Meta, StoryObj } from '@storybook/react';
import { HeroAnimatedBeam } from './HeroAnimatedBeam';

const meta: Meta<typeof HeroAnimatedBeam> = { title: 'Sections/HeroAnimatedBeam', component: HeroAnimatedBeam, tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof HeroAnimatedBeam>;

export const Default: Story = { args: { title: 'Fasci di Luce Animati', subtitle: 'Effetto visivo dinamico', ctaText: 'Inizia Ora' } };
