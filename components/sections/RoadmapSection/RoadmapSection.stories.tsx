import type { Meta, StoryObj } from '@storybook/react';
import { RoadmapSection } from './RoadmapSection';

const meta: Meta<typeof RoadmapSection> = {
  title: 'Sections/RoadmapSection',
  component: RoadmapSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RoadmapSection>;

export const Default: Story = {
  args: {
    title: 'La nostra Roadmap',
    subtitle: 'Scopri cosa abbiamo fatto e cosa stiamo costruendo per il futuro',
    milestones: [
      {
        date: 'Q1 2024',
        title: 'Lancio Beta',
        description: 'Rilascio della versione beta con funzionalità core complete e test con early adopters.',
        status: 'completed',
        features: [
          'Autenticazione utenti',
          'Dashboard principale',
          'Sistema di notifiche',
          'API REST v1.0',
        ],
      },
      {
        date: 'Q2 2024',
        title: 'Funzionalità Avanzate',
        description: 'Implementazione di analytics, integrazioni di terze parti e miglioramenti UI/UX.',
        status: 'completed',
        features: [
          'Analytics in tempo reale',
          'Integrazioni Slack e Discord',
          'Editor avanzato',
          'Export dati CSV/JSON',
        ],
      },
      {
        date: 'Q3 2024',
        title: 'Mobile e Ottimizzazioni',
        description: 'Sviluppo app mobile nativa e ottimizzazioni delle performance della piattaforma.',
        status: 'in-progress',
        features: [
          'App iOS nativa',
          'App Android nativa',
          'Ottimizzazione performance',
          'Offline mode',
        ],
      },
      {
        date: 'Q4 2024',
        title: 'AI e Machine Learning',
        description: 'Integrazione di funzionalità AI per suggerimenti intelligenti e automazione.',
        status: 'planned',
        features: [
          'Assistente AI',
          'Raccomandazioni personalizzate',
          'Auto-tagging contenuti',
          'Previsioni trend',
        ],
      },
      {
        date: 'Q1 2025',
        title: 'Enterprise Features',
        description: 'Funzionalità dedicate per aziende: SSO, white label, compliance avanzata.',
        status: 'planned',
        features: [
          'Single Sign-On (SSO)',
          'White label completo',
          'Compliance GDPR/SOC2',
          'Gestione team avanzata',
        ],
      },
    ],
  },
};
