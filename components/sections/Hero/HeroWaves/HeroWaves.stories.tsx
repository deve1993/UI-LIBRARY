import type { Meta, StoryObj } from '@storybook/react';
import { HeroWaves } from './HeroWaves';

const meta: Meta<typeof HeroWaves> = { title: 'Sections/HeroWaves', component: HeroWaves, tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof HeroWaves>;

export const Default: Story = { args: { title: 'Onde Animate', subtitle: 'Effetto oceano', ctaText: 'Scopri' } };
