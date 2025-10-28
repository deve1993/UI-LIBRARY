import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';
import { Users, TrendingUp, Award, Zap } from 'lucide-react';

/**
 * HeroSection - Sezione hero con effetto typewriter e metriche
 *
 * Componente hero moderno perfetto per landing pages, con animazioni fluide,
 * metriche in evidenza e call-to-action prominenti.
 */
const meta: Meta<typeof HeroSection> = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Una sezione hero moderna con effetto typewriter, metriche animate e CTA buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headline: {
      description: 'Configurazione dell\'headline principale',
      control: 'object',
    },
    subheadline: {
      description: 'Sottotitolo descrittivo',
      control: 'text',
    },
    typewriterPhrases: {
      description: 'Array di frasi per l\'effetto typewriter',
      control: 'object',
    },
    metrics: {
      description: 'Array di metriche da visualizzare',
      control: 'object',
    },
    primaryCta: {
      description: 'Configurazione del bottone CTA primario',
      control: 'object',
    },
    secondaryCta: {
      description: 'Configurazione del bottone CTA secondario',
      control: 'object',
    },
    className: {
      description: 'Classi CSS aggiuntive',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

/**
 * Configurazione base con metriche semplici
 */
export const Default: Story = {
  args: {
    headline: {
      text: "Trasforma il tuo business con",
      highlight: "innovazione digitale"
    },
    subheadline: "La piattaforma all-in-one per far crescere la tua azienda online in modo veloce e sicuro",
    metrics: [
      { value: "10K+", label: "Clienti Soddisfatti" },
      { value: "99%", label: "Uptime Garantito" },
      { value: "24/7", label: "Supporto Dedicato" }
    ],
    primaryCta: {
      label: "Inizia Gratis",
      onClick: () => alert("Primary CTA clicked!")
    },
  },
};

/**
 * Con effetto typewriter animato
 */
export const WithTypewriter: Story = {
  args: {
    headline: {
      text: "Siamo specializzati in",
      highlight: "eccellenza"
    },
    subheadline: "Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi",
    typewriterPhrases: [
      "sviluppo web",
      "design UI/UX",
      "marketing digitale",
      "consulenza strategica"
    ],
    metrics: [
      { value: "500+", label: "Progetti Completati" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "15+", label: "Anni di Esperienza" }
    ],
    primaryCta: {
      label: "Scopri di più",
      onClick: () => alert("CTA clicked!")
    },
  },
};

/**
 * Con icone nelle metriche
 */
export const WithIconMetrics: Story = {
  args: {
    headline: {
      text: "La piattaforma",
      highlight: "più veloce"
    },
    subheadline: "Prestazioni straordinarie per il tuo business digitale",
    metrics: [
      {
        value: "50K+",
        label: "Utenti Attivi",
        icon: <Users className="h-8 w-8" />
      },
      {
        value: "+250%",
        label: "Crescita Media",
        icon: <TrendingUp className="h-8 w-8" />
      },
      {
        value: "#1",
        label: "Nel Settore",
        icon: <Award className="h-8 w-8" />
      }
    ],
    primaryCta: {
      label: "Inizia Ora",
      onClick: () => alert("Started!")
    },
  },
};

/**
 * Con doppio CTA (primario e secondario)
 */
export const WithSecondaryCTA: Story = {
  args: {
    headline: {
      text: "Inizia il tuo",
      highlight: "viaggio digitale"
    },
    subheadline: "Non aspettare, prova gratuitamente la nostra piattaforma oggi stesso",
    typewriterPhrases: [
      "senza carta di credito",
      "senza impegno",
      "cancellazione gratuita"
    ],
    metrics: [
      { value: "7 giorni", label: "Prova Gratuita" },
      { value: "0€", label: "Setup Fee" },
      { value: "∞", label: "Possibilità" }
    ],
    primaryCta: {
      label: "Inizia Gratis",
      onClick: () => alert("Free trial started!")
    },
    secondaryCta: {
      label: "Guarda il Demo",
      href: "#demo"
    },
  },
};

/**
 * Minimal - senza typewriter e con poche metriche
 */
export const Minimal: Story = {
  args: {
    headline: {
      text: "Semplice.",
      highlight: "Potente."
    },
    subheadline: "Tutto ciò di cui hai bisogno, niente di più",
    metrics: [
      { value: "1 minuto", label: "Per iniziare" },
      { value: "Gratis", label: "Per sempre" }
    ],
    primaryCta: {
      label: "Prova Ora",
      onClick: () => alert("Let's go!")
    },
  },
};

/**
 * Startup - perfetto per landing page di startup
 */
export const StartupLanding: Story = {
  args: {
    headline: {
      text: "Il futuro del",
      highlight: "SaaS"
    },
    subheadline: "Automatizza il tuo business con AI e machine learning di ultima generazione",
    typewriterPhrases: [
      "automazione intelligente",
      "insights in tempo reale",
      "scalabilità illimitata"
    ],
    metrics: [
      {
        value: "100K+",
        label: "Aziende che si fidano",
        icon: <Users className="h-8 w-8" />
      },
      {
        value: "3x",
        label: "ROI Medio",
        icon: <TrendingUp className="h-8 w-8" />
      },
      {
        value: "⚡",
        label: "Setup Veloce",
        icon: <Zap className="h-8 w-8" />
      }
    ],
    primaryCta: {
      label: "Richiedi Demo",
      onClick: () => alert("Demo requested!")
    },
    secondaryCta: {
      label: "Vedi Prezzi",
      href: "#pricing"
    },
  },
};
