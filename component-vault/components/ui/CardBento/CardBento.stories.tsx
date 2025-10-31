import type { Meta, StoryObj } from '@storybook/react';
import { CardBento } from './CardBento';

const meta: Meta<typeof CardBento> = { title: 'UI/CardBento', component: CardBento, tags: ['autodocs'], parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof CardBento>;

export const Default: Story = { args: { children: <div><h3 className="text-xl font-bold dark:text-white">Bento Card</h3><p className="text-slate-600 dark:text-slate-400">Contenuto card</p></div> } };
export const Wide: Story = { args: { span: 2, children: <div><h3 className="text-xl font-bold dark:text-white">Wide Card</h3></div> } };
