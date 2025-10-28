import type { Meta, StoryObj } from '@storybook/react';
import { CTASectionAdvanced } from './CTASectionAdvanced';

const meta = {
  title: 'Sections/CTASectionAdvanced',
  component: CTASectionAdvanced,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sezione CTA premium con split screen, checklist benefici e indicatori di fiducia.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CTASectionAdvanced>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badge: '🚀 Offerta Lancio',
    title: 'Pronto a trasformare il tuo business?',
    description: 'Unisciti a centinaia di aziende che hanno già digitalizzato i loro processi con la nostra piattaforma. Inizia oggi e ottieni risultati misurabili in poche settimane.',
    benefits: [
      {
        text: 'Setup completo in meno di 5 minuti',
        checked: true,
      },
      {
        text: 'Supporto dedicato 24/7 in italiano',
        checked: true,
      },
      {
        text: 'Nessuna carta di credito richiesta per il trial',
        checked: true,
      },
      {
        text: 'Cancellazione in qualsiasi momento',
        checked: true,
      },
    ],
    cta: {
      text: 'Inizia Gratis per 14 Giorni',
      href: '#signup',
    },
    trustIndicators: {
      avatars: [
        { src: 'https://i.pravatar.cc/150?img=10', alt: 'Cliente 1' },
        { src: 'https://i.pravatar.cc/150?img=11', alt: 'Cliente 2' },
        { src: 'https://i.pravatar.cc/150?img=12', alt: 'Cliente 3' },
        { src: 'https://i.pravatar.cc/150?img=13', alt: 'Cliente 4' },
      ],
      text: '500+ aziende già attive',
      rating: 4.9,
      ratingLabel: 'su Trustpilot',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/600x800/3b82f6/ffffff?text=Dashboard+Preview',
      alt: 'Dashboard Preview',
    },
  },
};

export const WithoutBadge: Story = {
  args: {
    ...Default.args,
    badge: undefined,
  },
};

export const WithMoreBenefits: Story = {
  args: {
    ...Default.args,
    benefits: [
      {
        text: 'Setup completo in meno di 5 minuti',
        checked: true,
      },
      {
        text: 'Integrazione con Stripe, PayPal e altre 50+ piattaforme',
        checked: true,
      },
      {
        text: 'Dashboard analytics in tempo reale',
        checked: true,
      },
      {
        text: 'API RESTful e Webhooks completi',
        checked: true,
      },
      {
        text: 'Backup automatici giornalieri inclusi',
        checked: true,
      },
      {
        text: 'Conformità GDPR e certificazione ISO 27001',
        checked: true,
      },
      {
        text: 'Migrazione dati gratuita dal tuo sistema attuale',
        checked: true,
      },
      {
        text: 'Supporto dedicato 24/7 in italiano',
        checked: true,
      },
    ],
  },
};

export const SaaSProduct: Story = {
  args: {
    badge: '✨ Special Launch Offer',
    title: 'Start Your Free Trial Today',
    description: 'Join 1,000+ companies already using our platform to streamline their workflows and boost productivity by 10x.',
    benefits: [
      {
        text: '14-day free trial, no credit card required',
        checked: true,
      },
      {
        text: 'Unlimited team members on all plans',
        checked: true,
      },
      {
        text: 'Advanced analytics and reporting',
        checked: true,
      },
      {
        text: 'Priority support with <1h response time',
        checked: true,
      },
      {
        text: 'Cancel anytime, no questions asked',
        checked: true,
      },
    ],
    cta: {
      text: 'Start Free Trial',
      href: '#trial',
    },
    trustIndicators: {
      avatars: [
        { src: 'https://i.pravatar.cc/150?img=20', alt: 'User 1' },
        { src: 'https://i.pravatar.cc/150?img=21', alt: 'User 2' },
        { src: 'https://i.pravatar.cc/150?img=22', alt: 'User 3' },
        { src: 'https://i.pravatar.cc/150?img=23', alt: 'User 4' },
        { src: 'https://i.pravatar.cc/150?img=24', alt: 'User 5' },
      ],
      text: 'Trusted by 10,000+ users',
      rating: 5.0,
      ratingLabel: 'on G2',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=SaaS+Dashboard',
      alt: 'SaaS Dashboard',
    },
  },
};

export const EcommerceCTA: Story = {
  args: {
    badge: '🏷️ Sconto 50% - Solo Oggi',
    title: 'Non perdere questa opportunità unica',
    description: 'Migliaia di clienti hanno già acquistato. Scorte limitate! Offerta valida solo per le prossime 24 ore.',
    benefits: [
      {
        text: 'Spedizione gratuita in tutta Italia',
        checked: true,
      },
      {
        text: 'Garanzia soddisfatti o rimborsati 30 giorni',
        checked: true,
      },
      {
        text: 'Pagamento sicuro con PayPal o Carta',
        checked: true,
      },
      {
        text: '2 anni di garanzia inclusa',
        checked: true,
      },
    ],
    cta: {
      text: 'Acquista Ora al 50% di Sconto',
      href: '#checkout',
    },
    trustIndicators: {
      avatars: [
        { src: 'https://i.pravatar.cc/150?img=30', alt: 'Cliente 1' },
        { src: 'https://i.pravatar.cc/150?img=31', alt: 'Cliente 2' },
        { src: 'https://i.pravatar.cc/150?img=32', alt: 'Cliente 3' },
      ],
      text: '2,500+ acquirenti soddisfatti',
      rating: 4.8,
      ratingLabel: 'su Amazon',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/600x800/ec4899/ffffff?text=Prodotto',
      alt: 'Prodotto',
    },
  },
};

export const AppDownload: Story = {
  args: {
    badge: '📱 Disponibile su iOS e Android',
    title: 'Scarica l\'app e inizia in 60 secondi',
    description: 'Porta il tuo business sempre con te, ovunque tu sia. Accesso completo a tutte le funzionalità da mobile.',
    benefits: [
      {
        text: 'Download gratuito per iOS e Android',
        checked: true,
      },
      {
        text: 'Sincronizzazione in tempo reale',
        checked: true,
      },
      {
        text: 'Funziona anche offline',
        checked: true,
      },
      {
        text: 'Notifiche push personalizzabili',
        checked: true,
      },
      {
        text: 'Face ID e Touch ID supportati',
        checked: true,
      },
    ],
    cta: {
      text: 'Scarica Gratis l\'App',
      href: '#download',
    },
    trustIndicators: {
      avatars: [
        { src: 'https://i.pravatar.cc/150?img=40', alt: 'User 1' },
        { src: 'https://i.pravatar.cc/150?img=41', alt: 'User 2' },
        { src: 'https://i.pravatar.cc/150?img=42', alt: 'User 3' },
        { src: 'https://i.pravatar.cc/150?img=43', alt: 'User 4' },
      ],
      text: '50K+ download',
      rating: 4.7,
      ratingLabel: 'sull\'App Store',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/400x800/10b981/ffffff?text=Mobile+App',
      alt: 'Mobile App Screenshots',
    },
  },
};

export const MinimalVersion: Story = {
  args: {
    title: 'Ready to get started?',
    description: 'Join thousands of satisfied customers and start your journey today.',
    benefits: [
      {
        text: 'Free to start',
        checked: true,
      },
      {
        text: 'No credit card required',
        checked: true,
      },
      {
        text: 'Cancel anytime',
        checked: true,
      },
    ],
    cta: {
      text: 'Get Started Free',
      href: '#start',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/600x800/6366f1/ffffff?text=Simple+Interface',
      alt: 'Interface',
    },
  },
};

export const WithoutTrustIndicators: Story = {
  args: {
    badge: '🎯 Prova Gratuita',
    title: 'Inizia oggi senza rischi',
    description: 'Testa tutte le funzionalità premium per 30 giorni. Nessun vincolo, nessuna carta richiesta.',
    benefits: [
      {
        text: '30 giorni di prova gratuita',
        checked: true,
      },
      {
        text: 'Accesso a tutte le funzionalità premium',
        checked: true,
      },
      {
        text: 'Supporto prioritario incluso',
        checked: true,
      },
    ],
    cta: {
      text: 'Inizia la Tua Prova Gratuita',
      href: '#trial',
    },
    mockupImage: {
      src: 'https://via.placeholder.com/600x800/f59e0b/ffffff?text=Premium+Features',
      alt: 'Premium Features',
    },
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
    className: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
  },
};

export const CustomGradient: Story = {
  args: {
    ...Default.args,
    className: 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50',
  },
};
