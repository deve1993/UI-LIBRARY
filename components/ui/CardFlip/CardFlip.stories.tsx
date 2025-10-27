import type { Meta, StoryObj } from '@storybook/react';
import { CardFlip } from './CardFlip';

const meta: Meta<typeof CardFlip> = { title: 'UI/CardFlip', component: CardFlip, tags: ['autodocs'], parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof CardFlip>;

export const Default: Story = { args: { front: <div><h3 className="text-2xl font-bold">Fronte</h3><p>Clicca per girare</p></div>, back: <div><h3 className="text-2xl font-bold">Retro</h3><p>Informazioni aggiuntive</p></div> } };
