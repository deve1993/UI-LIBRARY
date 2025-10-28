import type { Meta, StoryObj } from '@storybook/react';
import { FooterMega } from './FooterMega';
import { Github, Twitter, Linkedin, Facebook, CreditCard, Smartphone } from 'lucide-react';

const meta: Meta<typeof FooterMega> = {
  title: 'Sections/Footers/FooterMega',
  component: FooterMega,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FooterMega>;

const mockLogo = (
  <div className="flex items-center gap-2">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
      <span className="text-2xl font-bold text-white">C</span>
    </div>
    <div>
      <div className="text-xl font-bold">Company</div>
      <div className="text-xs text-gray-500">Your Tagline Here</div>
    </div>
  </div>
);

const mockColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
      { label: 'Roadmap', href: '/roadmap', badge: 'New' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers', badge: 'Hiring' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Guides', href: '/guides' },
      { label: 'Support', href: '/support' },
    ],
  },
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
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <Facebook className="h-5 w-5" />,
  },
];

const mockContactInfo = {
  address: '123 Business Street, Suite 100, San Francisco, CA 94105',
  email: 'hello@company.com',
  phone: '+1 (555) 123-4567',
};

const mockPaymentMethods = [
  {
    name: 'Visa',
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: 'Mastercard',
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: 'PayPal',
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: 'Apple Pay',
    icon: <Smartphone className="h-4 w-4" />,
  },
];

const mockLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export const Dark: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    description:
      'We are committed to providing the best service and products to our customers worldwide. Join thousands of satisfied users today.',
    columns: mockColumns,
    contactInfo: mockContactInfo,
    socialLinks: mockSocialLinks,
    paymentMethods: mockPaymentMethods,
    legalLinks: mockLegalLinks,
    showBackToTop: true,
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    logo: mockLogo,
    description:
      'We are committed to providing the best service and products to our customers worldwide. Join thousands of satisfied users today.',
    columns: mockColumns,
    contactInfo: mockContactInfo,
    socialLinks: mockSocialLinks,
    paymentMethods: mockPaymentMethods,
    legalLinks: mockLegalLinks,
    showBackToTop: true,
  },
};

export const WithoutPayments: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    columns: mockColumns,
    socialLinks: mockSocialLinks,
    legalLinks: mockLegalLinks,
  },
};

export const CompactVersion: Story = {
  args: {
    variant: 'dark',
    logo: mockLogo,
    columns: mockColumns.slice(0, 2),
    socialLinks: mockSocialLinks,
    showBackToTop: false,
  },
};
