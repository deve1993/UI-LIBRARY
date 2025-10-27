import type { Meta, StoryObj } from '@storybook/react';
import { WhyChooseSection } from './WhyChooseSection';
import { Users, Zap, Award, TrendingUp, Shield, Clock, Heart, Star } from 'lucide-react';

const meta = {
  title: 'Sections/WhyChooseSection',
  component: WhyChooseSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sezione benefici con statistiche integrate per comunicare valore e risultati misurabili.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WhyChooseSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Perché scegliere noi',
    subtitle: 'Risultati concreti che parlano da soli',
    benefits: [
      {
        icon: Users,
        title: 'Community Globale',
        description: 'Unisciti a migliaia di utenti soddisfatti in tutto il mondo che già utilizzano la nostra piattaforma ogni giorno.',
        gradient: 'from-blue-500 to-cyan-500',
        stat: '50K+',
        statLabel: 'Utenti attivi',
      },
      {
        icon: Zap,
        title: 'Performance Eccezionali',
        description: 'Velocità di caricamento 10x superiore rispetto ai competitor, per un\'esperienza utente fluida e senza interruzioni.',
        gradient: 'from-purple-500 to-pink-500',
        stat: '10x',
        statLabel: 'Più veloce',
      },
      {
        icon: Award,
        title: 'Qualità Certificata',
        description: 'Riconosciuti come leader del settore con premi internazionali per innovazione e qualità del servizio.',
        gradient: 'from-orange-500 to-red-500',
        stat: '15+',
        statLabel: 'Premi vinti',
      },
      {
        icon: TrendingUp,
        title: 'Crescita Garantita',
        description: 'I nostri clienti vedono un incremento medio del 240% nei primi 6 mesi di utilizzo della piattaforma.',
        gradient: 'from-green-500 to-emerald-500',
        stat: '+240%',
        statLabel: 'Crescita media',
      },
    ],
  },
};

export const SaaSMetrics: Story = {
  args: {
    title: 'Perché le aziende ci scelgono',
    subtitle: 'Numeri che dimostrano la nostra affidabilità',
    benefits: [
      {
        icon: Users,
        title: 'Enterprise Ready',
        description: 'Utilizzato da Fortune 500 e startup innovative in tutto il mondo.',
        gradient: 'from-blue-600 to-blue-400',
        stat: '500+',
        statLabel: 'Aziende enterprise',
      },
      {
        icon: Clock,
        title: 'Uptime Garantito',
        description: 'Infrastruttura ridondante con monitoring 24/7 e SLA garantito.',
        gradient: 'from-green-600 to-green-400',
        stat: '99.99%',
        statLabel: 'Uptime SLA',
      },
      {
        icon: Shield,
        title: 'Sicurezza Certificata',
        description: 'Conformità SOC2, ISO 27001, GDPR con audit annuali verificati.',
        gradient: 'from-purple-600 to-purple-400',
        stat: '100%',
        statLabel: 'Compliance',
      },
      {
        icon: Zap,
        title: 'Performance',
        description: 'Tempo di risposta API inferiore a 100ms, garantito globalmente.',
        gradient: 'from-yellow-600 to-yellow-400',
        stat: '<100ms',
        statLabel: 'Response time',
      },
    ],
  },
};

export const EcommerceAdvantages: Story = {
  args: {
    title: 'Vantaggi per i tuoi acquisti',
    subtitle: 'Tutto incluso senza costi nascosti',
    benefits: [
      {
        icon: Clock,
        title: 'Spedizione Veloce',
        description: 'Consegna express gratuita per ordini sopra i 50€, tracking in tempo reale.',
        gradient: 'from-blue-500 to-cyan-500',
        stat: '24h',
        statLabel: 'Consegna gratuita',
      },
      {
        icon: Shield,
        title: 'Reso Facile',
        description: 'Reso gratuito entro 30 giorni, nessuna domanda. Rimborso immediato.',
        gradient: 'from-green-500 to-emerald-500',
        stat: '30gg',
        statLabel: 'Reso garantito',
      },
      {
        icon: Heart,
        title: 'Clienti Soddisfatti',
        description: 'Oltre 50,000 recensioni positive da clienti verificati su Trustpilot.',
        gradient: 'from-pink-500 to-rose-500',
        stat: '4.9★',
        statLabel: 'Rating medio',
      },
      {
        icon: Star,
        title: 'Programma Fedeltà',
        description: 'Accumula punti ad ogni acquisto e ottieni sconti esclusivi.',
        gradient: 'from-purple-500 to-indigo-500',
        stat: '10%',
        statLabel: 'Sconto fedeltà',
      },
    ],
  },
};

export const AgencyPortfolio: Story = {
  args: {
    title: 'Il nostro track record',
    subtitle: 'Anni di esperienza al tuo servizio',
    benefits: [
      {
        icon: Award,
        title: 'Progetti Completati',
        description: 'Oltre 200 progetti di successo per clienti nazionali e internazionali.',
        gradient: 'from-orange-500 to-red-500',
        stat: '200+',
        statLabel: 'Progetti',
      },
      {
        icon: Heart,
        title: 'Soddisfazione Clienti',
        description: 'Il 98% dei nostri clienti ci consiglierebbe ad altre aziende.',
        gradient: 'from-pink-500 to-rose-500',
        stat: '98%',
        statLabel: 'Soddisfazione',
      },
      {
        icon: Users,
        title: 'Team Esperto',
        description: 'Professionisti certificati con media di 8+ anni di esperienza.',
        gradient: 'from-blue-500 to-indigo-500',
        stat: '8+',
        statLabel: 'Anni esperienza',
      },
      {
        icon: TrendingUp,
        title: 'ROI Medio',
        description: 'I nostri clienti vedono un ritorno di investimento del 340% in media.',
        gradient: 'from-green-500 to-teal-500',
        stat: '+340%',
        statLabel: 'ROI medio',
      },
    ],
  },
};

export const ThreeBenefits: Story = {
  args: {
    title: 'Benefici Chiave',
    benefits: [
      {
        icon: Zap,
        title: 'Veloce',
        description: 'Setup completo in meno di 5 minuti, risultati immediati dal primo giorno.',
        gradient: 'from-blue-500 to-cyan-500',
        stat: '5min',
        statLabel: 'Setup time',
      },
      {
        icon: Shield,
        title: 'Sicuro',
        description: 'Crittografia end-to-end e backup automatici giornalieri inclusi.',
        gradient: 'from-purple-500 to-pink-500',
        stat: '256-bit',
        statLabel: 'Encryption',
      },
      {
        icon: Star,
        title: 'Affidabile',
        description: 'Supporto tecnico 24/7 disponibile in italiano via chat, email e telefono.',
        gradient: 'from-yellow-500 to-orange-500',
        stat: '24/7',
        statLabel: 'Support',
      },
    ],
    className: '[&_.benefits-grid]:lg:grid-cols-3',
  },
};

export const SixBenefits: Story = {
  args: {
    title: 'Piattaforma Completa',
    subtitle: 'Tutto ciò di cui hai bisogno in un unico posto',
    benefits: [
      {
        icon: Users,
        title: 'Utenti Attivi',
        description: 'Community in crescita costante con engagement elevato.',
        gradient: 'from-blue-500 to-cyan-500',
        stat: '100K+',
        statLabel: 'Utenti',
      },
      {
        icon: Zap,
        title: 'Velocità',
        description: 'Performance ottimizzate per ogni dispositivo.',
        gradient: 'from-purple-500 to-pink-500',
        stat: '<50ms',
        statLabel: 'Latenza',
      },
      {
        icon: Shield,
        title: 'Sicurezza',
        description: 'Protezione avanzata con certificazioni internazionali.',
        gradient: 'from-green-500 to-emerald-500',
        stat: 'SOC2',
        statLabel: 'Certificato',
      },
      {
        icon: Award,
        title: 'Qualità',
        description: 'Premiati per eccellenza e innovazione.',
        gradient: 'from-orange-500 to-red-500',
        stat: '20+',
        statLabel: 'Awards',
      },
      {
        icon: TrendingUp,
        title: 'Crescita',
        description: 'Espansione costante in nuovi mercati.',
        gradient: 'from-yellow-500 to-orange-500',
        stat: '+450%',
        statLabel: 'YoY growth',
      },
      {
        icon: Heart,
        title: 'Supporto',
        description: 'Team dedicato sempre disponibile per te.',
        gradient: 'from-pink-500 to-rose-500',
        stat: '5★',
        statLabel: 'Rating',
      },
    ],
  },
};

export const WithGradientBackground: Story = {
  args: {
    ...Default.args,
    className: 'bg-gradient-to-br from-blue-50 to-purple-50',
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
    className: 'bg-gray-900 text-white',
  },
};

export const CompactVersion: Story = {
  args: {
    title: 'Why Choose Us',
    benefits: [
      {
        icon: Zap,
        title: 'Fast',
        description: 'Lightning-fast performance.',
        gradient: 'from-blue-500 to-cyan-500',
        stat: '10x',
        statLabel: 'Faster',
      },
      {
        icon: Shield,
        title: 'Secure',
        description: 'Bank-level security.',
        gradient: 'from-purple-500 to-pink-500',
        stat: '256-bit',
        statLabel: 'Encryption',
      },
      {
        icon: Star,
        title: 'Reliable',
        description: '24/7 uptime guarantee.',
        gradient: 'from-green-500 to-emerald-500',
        stat: '99.9%',
        statLabel: 'Uptime',
      },
      {
        icon: Users,
        title: 'Trusted',
        description: 'Loved by thousands.',
        gradient: 'from-orange-500 to-red-500',
        stat: '10K+',
        statLabel: 'Users',
      },
    ],
  },
};
