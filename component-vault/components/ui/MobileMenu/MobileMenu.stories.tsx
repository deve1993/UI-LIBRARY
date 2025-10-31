import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenu } from './MobileMenu';
import { Home, User, Settings } from 'lucide-react';

const items = [
  { label: 'Home', href: '#', icon: <Home className="w-5 h-5" /> },
  { label: 'Profilo', href: '#', icon: <User className="w-5 h-5" /> },
  { label: 'Impostazioni', href: '#', icon: <Settings className="w-5 h-5" /> },
];

const meta: Meta<typeof MobileMenu> = { title: 'UI/MobileMenu', component: MobileMenu, tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof MobileMenu>;

export const Default: Story = { args: { items } };
