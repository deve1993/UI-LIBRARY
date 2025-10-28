import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const meta: Meta<typeof Footer> = {
  title: 'Sections/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    logo: {
      text: 'MioBrand',
      alt: 'MioBrand Logo',
    },
    tagline: 'Soluzioni innovative per il tuo business digitale',
    columns: [
      {
        title: 'Prodotto',
        links: [
          { label: 'Funzionalità', href: '/features' },
          { label: 'Prezzi', href: '/pricing' },
          { label: 'Casi Studio', href: '/case-studies' },
          { label: 'Roadmap', href: '/roadmap' },
          { label: 'Changelog', href: '/changelog' },
        ],
      },
      {
        title: 'Azienda',
        links: [
          { label: 'Chi Siamo', href: '/about' },
          { label: 'Blog', href: '/blog' },
          { label: 'Carriere', href: '/careers' },
          { label: 'Press Kit', href: '/press' },
          { label: 'Contatti', href: '/contact' },
        ],
      },
      {
        title: 'Risorse',
        links: [
          { label: 'Documentazione', href: '/docs' },
          { label: 'Guide', href: '/guides' },
          { label: 'API Reference', href: '/api' },
          { label: 'Community', href: '/community' },
          { label: 'Supporto', href: '/support' },
        ],
      },
      {
        title: 'Legale',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Cookie Policy', href: '/cookies' },
          { label: 'Termini di Servizio', href: '/terms' },
          { label: 'GDPR', href: '/gdpr' },
        ],
      },
    ],
    socialLinks: [
      {
        platform: 'Facebook',
        url: 'https://facebook.com',
        icon: <Facebook className="w-5 h-5" />,
        ariaLabel: 'Seguici su Facebook',
      },
      {
        platform: 'Twitter',
        url: 'https://twitter.com',
        icon: <Twitter className="w-5 h-5" />,
        ariaLabel: 'Seguici su Twitter',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com',
        icon: <Linkedin className="w-5 h-5" />,
        ariaLabel: 'Seguici su LinkedIn',
      },
      {
        platform: 'Instagram',
        url: 'https://instagram.com',
        icon: <Instagram className="w-5 h-5" />,
        ariaLabel: 'Seguici su Instagram',
      },
      {
        platform: 'Github',
        url: 'https://github.com',
        icon: <Github className="w-5 h-5" />,
        ariaLabel: 'Seguici su Github',
      },
    ],
    contactInfo: {
      address: 'Via Roma 123, 20100 Milano, Italia',
      email: 'info@miobrand.com',
      phone: '+39 02 1234567',
    },
    legalLinks: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
    copyright: '© 2024 MioBrand. Tutti i diritti riservati.',
  },
};
