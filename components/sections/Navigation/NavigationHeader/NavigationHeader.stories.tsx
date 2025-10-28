import type { Meta, StoryObj } from '@storybook/react';
import { NavigationHeader } from './NavigationHeader';

/**
 * NavigationHeader è un componente header fisso e responsive con menu di navigazione,
 * selettore lingua e bottone CTA.
 */
const meta = {
  title: 'Sections/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header di navigazione completo con supporto multi-lingua, menu mobile e CTA button. Ideale per landing pages e applicazioni web.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    logo: {
      description: 'Configurazione del logo (immagine o testo)',
      control: 'object',
    },
    links: {
      description: 'Array di link di navigazione',
      control: 'object',
    },
    languages: {
      description: 'Configurazione del selettore di lingua (opzionale)',
      control: 'object',
    },
    ctaButton: {
      description: 'Configurazione del bottone CTA',
      control: 'object',
    },
    className: {
      description: 'Classi CSS aggiuntive',
      control: 'text',
    },
  },
} satisfies Meta<typeof NavigationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Configurazione base con logo testuale e link essenziali.
 */
export const Default: Story = {
  args: {
    logo: {
      text: 'MioBrand',
      alt: 'MioBrand Logo',
    },
    links: [
      { label: 'Home', href: '/' },
      { label: 'Prodotti', href: '/prodotti' },
      { label: 'Servizi', href: '/servizi' },
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'Contatti', href: '/contatti' },
    ],
    ctaButton: {
      label: 'Inizia Ora',
      onClick: () => alert('CTA clicked!'),
    },
  },
};

/**
 * Header con logo immagine invece di testo.
 */
export const WithImageLogo: Story = {
  args: {
    logo: {
      src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Logo',
      alt: 'Company Logo',
    },
    links: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
    ],
    ctaButton: {
      label: 'Get Started',
      onClick: () => console.log('Get Started clicked'),
    },
  },
};

/**
 * Header completo con selettore di lingua.
 */
export const WithLanguageSwitch: Story = {
  args: {
    logo: {
      text: 'QuickFy',
      alt: 'QuickFy Logo',
    },
    links: [
      { label: 'Produkty', href: '/produkty' },
      { label: 'Funkce', href: '/funkce' },
      { label: 'Výhody', href: '/vyhody' },
      { label: 'Ceny', href: '/ceny' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
    languages: {
      current: 'cs',
      options: [
        { code: 'cs', label: 'Čeština' },
        { code: 'en', label: 'English' },
        { code: 'de', label: 'Deutsch' },
        { code: 'fr', label: 'Français' },
        { code: 'it', label: 'Italiano' },
      ],
      onChange: (code) => console.log(`Language changed to: ${code}`),
    },
    ctaButton: {
      label: 'Začněte nyní',
      onClick: () => console.log('CTA clicked'),
    },
  },
};

/**
 * Variante con stile personalizzato (background gradient).
 */
export const CustomStyling: Story = {
  args: {
    logo: {
      text: 'Brand',
      alt: 'Brand Logo',
    },
    links: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'About', href: '/about' },
    ],
    ctaButton: {
      label: 'Sign Up',
      onClick: () => console.log('Sign Up clicked'),
    },
    className: 'bg-gradient-to-r from-purple-600 to-pink-600',
  },
};

/**
 * Header minimal con pochi link.
 */
export const Minimal: Story = {
  args: {
    logo: {
      text: 'Minimal',
      alt: 'Minimal Logo',
    },
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ],
    ctaButton: {
      label: 'Contact',
      onClick: () => console.log('Contact clicked'),
    },
  },
};

/**
 * Header con molti link (test di overflow).
 */
export const ManyLinks: Story = {
  args: {
    logo: {
      text: 'MegaSite',
      alt: 'MegaSite Logo',
    },
    links: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'Support', href: '/support' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: {
      label: 'Get Started',
      onClick: () => console.log('Get Started clicked'),
    },
  },
};

/**
 * Header con ARIA labels per accessibilità.
 */
export const WithAriaLabels: Story = {
  args: {
    logo: {
      text: 'Accessible',
      alt: 'Accessible Brand Logo',
    },
    links: [
      { label: 'Home', href: '/', ariaLabel: 'Vai alla homepage' },
      { label: 'Dashboard', href: '/dashboard', ariaLabel: 'Accedi alla tua dashboard' },
      { label: 'Settings', href: '/settings', ariaLabel: 'Gestisci le impostazioni' },
    ],
    ctaButton: {
      label: 'Login',
      onClick: () => console.log('Login clicked'),
    },
  },
};
