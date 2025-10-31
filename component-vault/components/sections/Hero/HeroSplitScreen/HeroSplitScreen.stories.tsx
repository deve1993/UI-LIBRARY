import type { Meta, StoryObj } from '@storybook/react';
import { HeroSplitScreen } from './HeroSplitScreen';
import { Zap, Shield, TrendingUp, Sparkles, Award, Users } from 'lucide-react';

const meta = {
  title: 'Sections/HeroSplitScreen',
  component: HeroSplitScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sezione hero avanzata con layout split screen, carte galleggianti glass morphism e indicatori di fiducia.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSplitScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: {
      src: 'https://via.placeholder.com/180x40/3b82f6/ffffff?text=Brand+Logo',
      alt: 'Brand Logo',
      width: 180,
      height: 40,
    },
    subtitle: '🚀 Innovazione e Tecnologia',
    description: 'Trasforma il tuo business con la nostra piattaforma all-in-one. Veloce, sicura e scalabile per aziende di ogni dimensione.',
    features: [
      { icon: Zap, text: 'Performance eccezionali' },
      { icon: Shield, text: 'Sicurezza avanzata' },
      { icon: TrendingUp, text: 'Crescita garantita' },
    ],
    primaryCta: {
      text: 'Inizia Gratis',
      href: '#signup',
    },
    secondaryCta: {
      text: 'Scopri di più',
      href: '#features',
    },
    trustIndicators: [
      {
        avatars: [
          { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
          { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
          { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
        ],
        text: '500+ clienti soddisfatti',
        rating: 4.9,
        ratingLabel: 'su Trustpilot',
      },
    ],
    mockupImage: {
      src: 'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Dashboard+Mockup',
      alt: 'Dashboard Preview',
      floatingCards: [
        {
          title: 'Analytics',
          value: '+127%',
          trend: 'up',
          description: 'Crescita mensile',
          delay: 0,
        },
        {
          title: 'Utenti Attivi',
          value: '12.5K',
          trend: 'up',
          description: 'Questo mese',
          delay: 2,
        },
      ],
    },
  },
};

export const WithoutSecondaryButton: Story = {
  args: {
    ...Default.args,
    secondaryCta: undefined,
  },
};

export const WithMoreFeatures: Story = {
  args: {
    ...Default.args,
    features: [
      { icon: Zap, text: 'Performance eccezionali' },
      { icon: Shield, text: 'Sicurezza enterprise' },
      { icon: TrendingUp, text: 'Crescita esponenziale' },
      { icon: Sparkles, text: 'AI integrata' },
      { icon: Award, text: 'Premiato internazionalmente' },
      { icon: Users, text: 'Community globale' },
    ],
  },
};

export const WithMultipleFloatingCards: Story = {
  args: {
    ...Default.args,
    mockupImage: {
      src: 'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Advanced+Dashboard',
      alt: 'Advanced Dashboard',
      floatingCards: [
        {
          title: 'Revenue',
          value: '+240%',
          trend: 'up',
          description: 'Q1 2024',
          delay: 0,
        },
        {
          title: 'Active Users',
          value: '50K+',
          trend: 'up',
          description: 'Right now',
          delay: 1,
        },
        {
          title: 'Satisfaction',
          value: '4.9/5',
          trend: 'up',
          description: 'Trustpilot',
          delay: 2,
        },
      ],
    },
  },
};

export const SaaSProduct: Story = {
  args: {
    logo: {
      src: 'https://via.placeholder.com/180x40/8b5cf6/ffffff?text=SaaS+Pro',
      alt: 'SaaS Pro',
      width: 180,
      height: 40,
    },
    subtitle: '✨ All-in-One Business Platform',
    description: 'Manage your entire business from one powerful dashboard. CRM, Analytics, Automation, and more.',
    features: [
      { icon: Users, text: 'Team collaboration tools' },
      { icon: TrendingUp, text: 'Real-time analytics' },
      { icon: Shield, text: 'Bank-level security' },
      { icon: Zap, text: 'Lightning-fast performance' },
    ],
    primaryCta: {
      text: 'Start Free Trial',
      href: '#trial',
    },
    secondaryCta: {
      text: 'Watch Demo',
      href: '#demo',
    },
    trustIndicators: [
      {
        avatars: [
          { src: 'https://i.pravatar.cc/150?img=4', alt: 'CEO 1' },
          { src: 'https://i.pravatar.cc/150?img=5', alt: 'CEO 2' },
          { src: 'https://i.pravatar.cc/150?img=6', alt: 'CEO 3' },
          { src: 'https://i.pravatar.cc/150?img=7', alt: 'CEO 4' },
        ],
        text: 'Trusted by 1,000+ companies',
        rating: 5.0,
        ratingLabel: 'on G2',
      },
    ],
    mockupImage: {
      src: 'https://via.placeholder.com/800x600/ec4899/ffffff?text=SaaS+Dashboard',
      alt: 'SaaS Dashboard',
      floatingCards: [
        {
          title: 'MRR',
          value: '$125K',
          trend: 'up',
          description: 'Monthly revenue',
          delay: 0,
        },
        {
          title: 'Churn',
          value: '0.8%',
          trend: 'down',
          description: 'Lowest ever',
          delay: 2,
        },
      ],
    },
  },
};

export const MinimalVersion: Story = {
  args: {
    logo: {
      src: 'https://via.placeholder.com/160x36/000000/ffffff?text=Minimal',
      alt: 'Minimal',
      width: 160,
      height: 36,
    },
    subtitle: 'Simple. Powerful. Effective.',
    description: 'Everything you need, nothing you don\'t. Built for modern teams.',
    features: [
      { icon: Zap, text: 'Fast setup' },
      { icon: Shield, text: 'Secure by default' },
    ],
    primaryCta: {
      text: 'Get Started',
      href: '#start',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/800x600/6366f1/ffffff?text=Simple+Interface',
      alt: 'Simple Interface',
    },
  },
};

export const WithCustomGradient: Story = {
  args: {
    ...Default.args,
    className: 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50',
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
    className: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white',
  },
};
