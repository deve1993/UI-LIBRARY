import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IsometricCardsSection } from './IsometricCardsSection';
import { Zap, Shield, Sparkles } from 'lucide-react';

const mockProps = {
  title: 'Our Features',
  subtitle: 'Everything you need',
  cards: [
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Lightning fast loading times for the best user experience.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade protection with end-to-end encryption.',
      gradient: 'from-purple-500 to-pink-500',
      badge: 'Popular',
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      description: 'Intelligent automation that learns from your behavior.',
      gradient: 'from-orange-500 to-red-500',
    },
  ],
};

describe('IsometricCardsSection', () => {
  it('renders without crashing', () => {
    render(<IsometricCardsSection {...mockProps} />);
    expect(screen.getByText('Our Features')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<IsometricCardsSection {...mockProps} />);
    expect(screen.getByText('Our Features')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<IsometricCardsSection {...mockProps} />);
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const propsWithoutSubtitle = { ...mockProps, subtitle: undefined };
    render(<IsometricCardsSection {...propsWithoutSubtitle} />);
    expect(screen.queryByText('Everything you need')).not.toBeInTheDocument();
  });

  it('renders all cards', () => {
    render(<IsometricCardsSection {...mockProps} />);
    expect(screen.getByText('Fast Performance')).toBeInTheDocument();
    expect(screen.getByText('Advanced Security')).toBeInTheDocument();
    expect(screen.getByText('AI Powered')).toBeInTheDocument();
  });

  it('renders card descriptions', () => {
    render(<IsometricCardsSection {...mockProps} />);
    expect(
      screen.getByText('Lightning fast loading times for the best user experience.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise-grade protection with end-to-end encryption.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Intelligent automation that learns from your behavior.')
    ).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<IsometricCardsSection {...mockProps} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('does not render badge for cards without it', () => {
    render(<IsometricCardsSection {...mockProps} />);
    const badges = screen.getAllByText(/Popular/i);
    expect(badges).toHaveLength(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <IsometricCardsSection {...mockProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders card icons with aria-hidden', () => {
    const { container } = render(<IsometricCardsSection {...mockProps} />);
    const icons = container.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has correct semantic structure', () => {
    const { container } = render(<IsometricCardsSection {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(3);
  });

  it('renders correct number of cards', () => {
    render(<IsometricCardsSection {...mockProps} />);
    const { container } = render(<IsometricCardsSection {...mockProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(mockProps.cards.length);
  });

  it('applies gradient classes to cards', () => {
    const { container } = render(<IsometricCardsSection {...mockProps} />);
    const gradientElements = container.querySelectorAll('.from-blue-500');
    expect(gradientElements.length).toBeGreaterThan(0);
  });

  it('handles single card', () => {
    const singleCardProps = {
      title: 'Single Feature',
      cards: [
        {
          icon: Zap,
          title: 'Only Feature',
          description: 'The one and only',
          gradient: 'from-blue-500 to-cyan-500',
        },
      ],
    };
    render(<IsometricCardsSection {...singleCardProps} />);
    expect(screen.getByText('Only Feature')).toBeInTheDocument();
  });

  it('handles many cards', () => {
    const manyCardsProps = {
      title: 'Many Features',
      cards: Array(6)
        .fill(null)
        .map((_, i) => ({
          icon: Zap,
          title: `Feature ${i + 1}`,
          description: `Description ${i + 1}`,
          gradient: 'from-blue-500 to-cyan-500',
        })),
    };
    render(<IsometricCardsSection {...manyCardsProps} />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 6')).toBeInTheDocument();
  });

  it('renders with hover gradient when provided', () => {
    const propsWithHover = {
      title: 'Features',
      cards: [
        {
          icon: Zap,
          title: 'Feature',
          description: 'Description',
          gradient: 'from-blue-500 to-cyan-500',
          hoverGradient: 'from-blue-600 to-cyan-600',
        },
      ],
    };
    render(<IsometricCardsSection {...propsWithHover} />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
  });

  it('uses section tag for semantic HTML', () => {
    const { container } = render(<IsometricCardsSection {...mockProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('uses article tag for each card', () => {
    const { container } = render(<IsometricCardsSection {...mockProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(3);
  });
});
