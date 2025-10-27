import type { Meta, StoryObj } from '@storybook/react';
import { FloatingNav } from './FloatingNav';
import { Home, Zap, DollarSign, User, Mail } from 'lucide-react';

const meta: Meta<typeof FloatingNav> = {
  title: 'UI/FloatingNav',
  component: FloatingNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FloatingNav>;

const basicItems = [
  { name: 'Home', link: '#home' },
  { name: 'Features', link: '#features' },
  { name: 'Pricing', link: '#pricing' },
  { name: 'Contact', link: '#contact' },
];

const itemsWithIcons = [
  { name: 'Home', link: '#home', icon: <Home className="w-4 h-4" /> },
  { name: 'Features', link: '#features', icon: <Zap className="w-4 h-4" /> },
  { name: 'Pricing', link: '#pricing', icon: <DollarSign className="w-4 h-4" /> },
  { name: 'About', link: '#about', icon: <User className="w-4 h-4" /> },
  { name: 'Contact', link: '#contact', icon: <Mail className="w-4 h-4" /> },
];

export const Default: Story = {
  args: {
    navItems: basicItems,
  },
  render: (args) => (
    <div>
      <FloatingNav {...args} />
      <div className="min-h-[200vh] bg-slate-950 p-20">
        <div className="max-w-4xl mx-auto text-white space-y-8">
          <h1 className="text-5xl font-bold mb-4">Floating Navigation</h1>
          <p className="text-xl text-slate-300">
            Scrolla verso il basso per vedere la navigazione scomparire.
            Scrolla verso l'alto per vederla riapparire.
          </p>
          <div className="space-y-4 text-slate-400">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    navItems: itemsWithIcons,
  },
  render: (args) => (
    <div>
      <FloatingNav {...args} />
      <div className="min-h-[200vh] bg-gradient-to-b from-slate-900 to-slate-950 p-20">
        <div className="max-w-4xl mx-auto text-white space-y-8">
          <h1 className="text-5xl font-bold mb-4">Navigation With Icons</h1>
          <p className="text-xl text-slate-300">
            Navigazione completa con icone Lucide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Sezione {i}</h3>
                <p className="text-slate-400">Contenuto della sezione</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MinimalNav: Story = {
  args: {
    navItems: [
      { name: 'Home', link: '#home' },
      { name: 'Work', link: '#work' },
      { name: 'Contact', link: '#contact' },
    ],
  },
  render: (args) => (
    <div>
      <FloatingNav {...args} />
      <div className="min-h-[200vh] bg-black p-20">
        <div className="max-w-4xl mx-auto text-white text-center space-y-12">
          <h1 className="text-6xl font-bold">Minimal Design</h1>
          <p className="text-2xl text-slate-400">
            Navigazione essenziale e pulita
          </p>
        </div>
      </div>
    </div>
  ),
};
