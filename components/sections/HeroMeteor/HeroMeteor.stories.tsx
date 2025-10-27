import type { Meta, StoryObj } from '@storybook/react';
import { HeroMeteor } from './HeroMeteor';

const meta: Meta<typeof HeroMeteor> = { title: 'Sections/HeroMeteor', component: HeroMeteor, tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof HeroMeteor>;

export const Default: Story = { args: { title: 'Pioggia di Meteore', subtitle: 'Effetto spaziale', ctaText: 'Esplora', meteorCount: 20 } };
