import type { Meta, StoryObj } from '@storybook/react';
import { FooterNewsletter } from './FooterNewsletter';
import { Github, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const meta: Meta<typeof FooterNewsletter> = {
  title: 'Sections/Footers/FooterNewsletter',
  component: FooterNewsletter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FooterNewsletter>;

const mockLogo = (
  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
    <span className="text-3xl font-bold text-white">N</span>
  </div>
);

const mockQuickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Help Center', href: '/help' },
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
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: <Youtube className="h-5 w-5" />,
  },
];

const mockNewsletterConfig = {
  title: 'Stay in the loop',
  description: 'Subscribe to our newsletter for the latest updates, exclusive offers, and industry insights.',
  placeholder: 'Enter your email',
  buttonText: 'Subscribe',
  onSubmit: (email: string) => {
    console.log('Newsletter subscription:', email);
    return Promise.resolve();
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    newsletterConfig: mockNewsletterConfig,
    quickLinks: mockQuickLinks,
    socialLinks: mockSocialLinks,
    showWave: true,
    gradientColors: {
      from: 'from-blue-600',
      via: 'via-purple-600',
      to: 'to-pink-600',
    },
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    logo: mockLogo,
    newsletterConfig: mockNewsletterConfig,
    quickLinks: mockQuickLinks,
    socialLinks: mockSocialLinks,
    showWave: true,
    gradientColors: {
      from: 'from-blue-600',
      via: 'via-purple-600',
      to: 'to-pink-600',
    },
  },
};

export const GreenGradient: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    newsletterConfig: {
      title: 'Join our community',
      description: 'Get weekly insights, tips, and exclusive content delivered to your inbox.',
      placeholder: 'you@example.com',
      buttonText: 'Join Now',
    },
    quickLinks: mockQuickLinks,
    socialLinks: mockSocialLinks,
    showWave: true,
    gradientColors: {
      from: 'from-green-500',
      via: 'via-teal-500',
      to: 'to-cyan-500',
    },
  },
};

export const OrangeGradient: Story = {
  args: {
    variant: 'light',
    logo: mockLogo,
    newsletterConfig: {
      title: 'Never miss an update',
      description: 'Be the first to know about new features, product launches, and special promotions.',
      placeholder: 'Enter email address',
      buttonText: 'Get Started',
    },
    quickLinks: mockQuickLinks,
    socialLinks: mockSocialLinks,
    showWave: true,
    gradientColors: {
      from: 'from-orange-500',
      via: 'via-red-500',
      to: 'to-pink-500',
    },
  },
};

export const WithoutWave: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    newsletterConfig: mockNewsletterConfig,
    quickLinks: mockQuickLinks,
    socialLinks: mockSocialLinks,
    showWave: false,
    gradientColors: {
      from: 'from-indigo-600',
      via: 'via-purple-600',
      to: 'to-pink-600',
    },
  },
};

export const MinimalNewsletter: Story = {
  args: {
    variant: 'dark',
    newsletterConfig: {
      title: 'Subscribe',
      description: 'Get updates directly to your inbox.',
      placeholder: 'Your email',
      buttonText: 'Subscribe',
    },
    showWave: false,
    gradientColors: {
      from: 'from-gray-800',
      to: 'to-gray-900',
    },
  },
};
