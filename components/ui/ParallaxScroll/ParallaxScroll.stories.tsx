import type { Meta, StoryObj } from '@storybook/react';
import { ParallaxScroll } from './ParallaxScroll';

const meta: Meta<typeof ParallaxScroll> = { title: 'UI/ParallaxScroll', component: ParallaxScroll, tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof ParallaxScroll>;

const demoImages = ['https://via.placeholder.com/400x600', 'https://via.placeholder.com/400x700', 'https://via.placeholder.com/400x500', 'https://via.placeholder.com/400x650'];
export const Default: Story = { args: { images: demoImages } };
