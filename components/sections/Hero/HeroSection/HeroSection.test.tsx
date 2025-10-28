import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import type { HeroSectionProps } from './HeroSection.types';

describe('HeroSection', () => {
  const mockProps: HeroSectionProps = {
    headline: {
      text: "Benvenuto",
      highlight: "al futuro"
    },
    subheadline: "La soluzione perfetta per il tuo business",
    metrics: [
      { value: "10K+", label: "Utenti" },
      { value: "99%", label: "Uptime" },
      { value: "24/7", label: "Supporto" }
    ],
    primaryCta: {
      label: "Inizia Ora",
      onClick: vi.fn()
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('dovrebbe renderizzare il componente correttamente', () => {
      render(<HeroSection {...mockProps} />);

      expect(screen.getByText("Benvenuto")).toBeInTheDocument();
      expect(screen.getByText("al futuro")).toBeInTheDocument();
      expect(screen.getByText("La soluzione perfetta per il tuo business")).toBeInTheDocument();
    });

    it('dovrebbe renderizzare tutte le metriche', () => {
      render(<HeroSection {...mockProps} />);

      expect(screen.getByText("10K+")).toBeInTheDocument();
      expect(screen.getByText("Utenti")).toBeInTheDocument();
      expect(screen.getByText("99%")).toBeInTheDocument();
      expect(screen.getByText("Uptime")).toBeInTheDocument();
      expect(screen.getByText("24/7")).toBeInTheDocument();
      expect(screen.getByText("Supporto")).toBeInTheDocument();
    });

    it('dovrebbe renderizzare il bottone CTA primario', () => {
      render(<HeroSection {...mockProps} />);

      const primaryButton = screen.getByRole('button', { name: /inizia ora/i });
      expect(primaryButton).toBeInTheDocument();
    });

    it('dovrebbe renderizzare il CTA secondario quando fornito', () => {
      const propsWithSecondaryCta = {
        ...mockProps,
        secondaryCta: {
          label: "Scopri di più",
          href: "/learn-more"
        }
      };

      render(<HeroSection {...propsWithSecondaryCta} />);

      const secondaryLink = screen.getByText(/scopri di più/i);
      expect(secondaryLink).toBeInTheDocument();
      expect(secondaryLink).toHaveAttribute('href', '/learn-more');
    });

    it('dovrebbe applicare className personalizzata', () => {
      const { container } = render(
        <HeroSection {...mockProps} className="custom-class" />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Interazioni', () => {
    it('dovrebbe chiamare onClick quando il CTA primario viene cliccato', () => {
      render(<HeroSection {...mockProps} />);

      const primaryButton = screen.getByRole('button', { name: /inizia ora/i });
      fireEvent.click(primaryButton);

      expect(mockProps.primaryCta.onClick).toHaveBeenCalledTimes(1);
    });

    it('dovrebbe avere focus states corretti', () => {
      render(<HeroSection {...mockProps} />);

      const primaryButton = screen.getByRole('button', { name: /inizia ora/i });
      primaryButton.focus();

      expect(primaryButton).toHaveFocus();
    });
  });

  describe('Effetto Typewriter', () => {
    it('dovrebbe renderizzare l\'effetto typewriter quando le frasi sono fornite', () => {
      const propsWithTypewriter = {
        ...mockProps,
        typewriterPhrases: ["test phrase 1", "test phrase 2"]
      };

      render(<HeroSection {...propsWithTypewriter} />);

      // Verifica che il container typewriter esista
      const typewriterContainer = screen.getByText(/\|/);
      expect(typewriterContainer).toBeInTheDocument();
    });

    it('non dovrebbe renderizzare typewriter senza frasi', () => {
      render(<HeroSection {...mockProps} />);

      // Non dovrebbe esserci il cursore "|"
      const typewriterElements = screen.queryByText(/\|/);
      expect(typewriterElements).not.toBeInTheDocument();
    });
  });

  describe('Metriche con Icone', () => {
    it('dovrebbe renderizzare le icone quando fornite', () => {
      const propsWithIcons = {
        ...mockProps,
        metrics: [
          {
            value: "100",
            label: "Test",
            icon: <span data-testid="test-icon">Icon</span>
          }
        ]
      };

      render(<HeroSection {...propsWithIcons} />);

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('dovrebbe renderizzare senza icone quando non fornite', () => {
      render(<HeroSection {...mockProps} />);

      // Verifica che le metriche siano comunque renderizzate
      expect(screen.getByText("10K+")).toBeInTheDocument();
    });
  });

  describe('Accessibilità', () => {
    it('dovrebbe avere il corretto aria-label sulla sezione', () => {
      const { container } = render(<HeroSection {...mockProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-label', 'Hero section');
    });

    it('dovrebbe avere elementi semantici corretti', () => {
      const { container } = render(<HeroSection {...mockProps} />);

      // Verifica la presenza di h1 per l'headline
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('i bottoni dovrebbero essere accessibili da tastiera', () => {
      render(<HeroSection {...mockProps} />);

      const primaryButton = screen.getByRole('button', { name: /inizia ora/i });

      // Simula Tab per focus
      primaryButton.focus();
      expect(primaryButton).toHaveFocus();

      // Simula Enter per click
      fireEvent.keyDown(primaryButton, { key: 'Enter', code: 'Enter' });
      expect(mockProps.primaryCta.onClick).toHaveBeenCalled();
    });
  });

  describe('Responsive', () => {
    it('dovrebbe avere classi responsive corrette', () => {
      const { container } = render(<HeroSection {...mockProps} />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('py-20');
      expect(section?.className).toContain('sm:py-28');
      expect(section?.className).toContain('lg:py-36');
    });
  });
});
