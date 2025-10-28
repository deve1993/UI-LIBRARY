import type { Meta, StoryObj } from '@storybook/react';
import { FooterMinimal } from './FooterMinimal';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const meta: Meta<typeof FooterMinimal> = {
  title: 'Sections/Footers/FooterMinimal',
  component: FooterMinimal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FooterMinimal>;

const mockLogo = (
  <div className="flex items-center gap-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
      <span className="text-xl font-bold text-white">L</span>
    </div>
    <span className="text-xl font-bold">Logo</span>
  </div>
);

const mockLinks = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const mockSocialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: <Instagram className="h-5 w-5" />,
  },
];

export const Dark: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    tagline: 'Building the future, one line at a time.',
    links: mockLinks,
    socialLinks: mockSocialLinks,
    showBackToTop: true,
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    logo: mockLogo,
    tagline: 'Building the future, one line at a time.',
    links: mockLinks,
    socialLinks: mockSocialLinks,
    showBackToTop: true,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'dark',
    copyrightText: '© 2025 Company Name. All rights reserved.',
  },
};

export const WithoutBackToTop: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    links: mockLinks,
    socialLinks: mockSocialLinks,
    showBackToTop: false,
  },
};
