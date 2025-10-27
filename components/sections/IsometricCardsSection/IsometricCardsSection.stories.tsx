import type { Meta, StoryObj } from '@storybook/react';
import { IsometricCardsSection } from './IsometricCardsSection';
import { Zap, Shield, Sparkles, TrendingUp, Award, Users, Rocket, Star } from 'lucide-react';

const meta = {
  title: 'Sections/IsometricCardsSection',
  component: IsometricCardsSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sezione con carte 3D isometriche, effetti hover fluidi e gradienti vibranti.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IsometricCardsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Funzionalità Innovative',
    subtitle: 'Tutto ciò che ti serve per crescere',
    cards: [
      {
        icon: Zap,
        title: 'Performance Veloci',
        description: 'Caricamento istantaneo e risposta immediata per la migliore esperienza utente possibile.',
        gradient: 'from-blue-500 to-cyan-500',
        hoverGradient: 'from-blue-600 to-cyan-600',
      },
      {
        icon: Shield,
        title: 'Sicurezza Avanzata',
        description: 'Protezione enterprise-grade con crittografia end-to-end e compliance certificata.',
        gradient: 'from-purple-500 to-pink-500',
        hoverGradient: 'from-purple-600 to-pink-600',
        badge: 'Più Popolare',
      },
      {
        icon: Sparkles,
        title: 'AI Integrata',
        description: 'Automazione intelligente che impara dalle tue abitudini e ottimizza i workflow.',
        gradient: 'from-orange-500 to-red-500',
        hoverGradient: 'from-orange-600 to-red-600',
      },
    ],
  },
};

export const SixCards: Story = {
  args: {
    title: 'Piattaforma Completa',
    subtitle: 'Tutti gli strumenti di cui hai bisogno',
    cards: [
      {
        icon: Zap,
        title: 'Velocità Estrema',
        description: 'Tempi di caricamento sotto i 100ms in tutto il mondo.',
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Shield,
        title: 'Sicurezza',
        description: 'Crittografia militare e conformità GDPR.',
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        icon: TrendingUp,
        title: 'Analytics',
        description: 'Dashboard in tempo reale con insights avanzati.',
        gradient: 'from-green-500 to-emerald-500',
      },
      {
        icon: Users,
        title: 'Collaborazione',
        description: 'Lavora in team con strumenti di comunicazione integrati.',
        gradient: 'from-orange-500 to-red-500',
      },
      {
        icon: Award,
        title: 'Premiato',
        description: 'Riconosciuto come leader del settore per 3 anni consecutivi.',
        gradient: 'from-yellow-400 to-orange-500',
        badge: 'Award Winner',
      },
      {
        icon: Rocket,
        title: 'Scalabilità',
        description: 'Cresci da 10 a 10 milioni di utenti senza problemi.',
        gradient: 'from-indigo-500 to-purple-500',
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    title: 'I Nostri Piani',
    cards: [
      {
        icon: Users,
        title: 'Starter',
        description: 'Perfetto per team piccoli che vogliono iniziare velocemente.',
        gradient: 'from-gray-400 to-gray-600',
        badge: 'Gratis',
      },
      {
        icon: Star,
        title: 'Professional',
        description: 'Per aziende in crescita che necessitano di funzionalità avanzate.',
        gradient: 'from-blue-500 to-purple-500',
        badge: '⭐ Più Scelto',
      },
      {
        icon: Award,
        title: 'Enterprise',
        description: 'Soluzione completa con supporto dedicato e SLA garantito.',
        gradient: 'from-yellow-400 to-orange-500',
        badge: 'Premium',
      },
    ],
  },
};

export const TechStack: Story = {
  args: {
    title: 'Tecnologie Moderne',
    subtitle: 'Stack all\'avanguardia per performance ottimali',
    cards: [
      {
        icon: Zap,
        title: 'React 18',
        description: 'Framework UI più popolare con concurrent rendering e automatic batching.',
        gradient: 'from-cyan-400 to-blue-500',
      },
      {
        icon: Sparkles,
        title: 'TypeScript',
        description: 'Type safety completa per codice robusto e manutenibile.',
        gradient: 'from-blue-500 to-indigo-600',
      },
      {
        icon: Rocket,
        title: 'Next.js 14',
        description: 'Server components, streaming SSR e ottimizzazioni automatiche.',
        gradient: 'from-purple-500 to-pink-500',
      },
    ],
  },
};

export const ServiceShowcase: Story = {
  args: {
    title: 'I Nostri Servizi',
    subtitle: 'Soluzioni su misura per ogni esigenza',
    cards: [
      {
        icon: Users,
        title: 'Consulenza',
        description: 'Strategia digitale personalizzata con esperti del settore.',
        gradient: 'from-green-400 to-emerald-600',
      },
      {
        icon: Rocket,
        title: 'Sviluppo',
        description: 'Applicazioni web e mobile scalabili e performanti.',
        gradient: 'from-blue-500 to-cyan-500',
        badge: 'Più Richiesto',
      },
      {
        icon: TrendingUp,
        title: 'Marketing',
        description: 'Campagne data-driven con ROI misurabile e ottimizzato.',
        gradient: 'from-orange-500 to-red-500',
      },
    ],
  },
};

export const ColorfulVariant: Story = {
  args: {
    title: 'Creatività Senza Limiti',
    cards: [
      {
        icon: Sparkles,
        title: 'Design Innovativo',
        description: 'Interfacce che sorprendono e convertono.',
        gradient: 'from-pink-400 via-purple-400 to-indigo-400',
      },
      {
        icon: Star,
        title: 'UX Eccezionale',
        description: 'User experience studiata nei minimi dettagli.',
        gradient: 'from-green-400 via-teal-400 to-cyan-400',
      },
      {
        icon: Award,
        title: 'Risultati Concreti',
        description: 'Incremento medio del 240% in conversioni.',
        gradient: 'from-yellow-400 via-orange-400 to-red-400',
      },
    ],
  },
};

export const MinimalTwo: Story = {
  args: {
    title: 'Semplice ma Potente',
    cards: [
      {
        icon: Zap,
        title: 'Veloce',
        description: 'Setup in 5 minuti, risultati immediati.',
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Shield,
        title: 'Sicuro',
        description: 'Protezione totale dei tuoi dati.',
        gradient: 'from-purple-500 to-pink-500',
      },
    ],
  },
};

export const WithDarkBackground: Story = {
  args: {
    ...Default.args,
    className: 'bg-gray-900 text-white',
  },
};

export const WithGradientBackground: Story = {
  args: {
    ...Default.args,
    className: 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50',
  },
};
