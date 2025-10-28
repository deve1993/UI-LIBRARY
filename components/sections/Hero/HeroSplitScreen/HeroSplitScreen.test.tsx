import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSplitScreen } from './HeroSplitScreen';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const mockProps = {
  logo: {
    src: '/logo.svg',
    alt: 'Test Logo',
    width: 180,
    height: 40,
  },
  subtitle: '🚀 Test Subtitle',
  description: 'Test description for hero section',
  features: [
    { icon: Zap, text: 'Fast performance' },
    { icon: Shield, text: 'Secure platform' },
    { icon: TrendingUp, text: 'Growth guaranteed' },
  ],
  primaryCta: {
    text: 'Get Started',
    href: '/signup',
  },
  mockupImage: {
    src: '/mockup.png',
    alt: 'Mockup Image',
  },
};

describe('HeroSplitScreen', () => {
  it('renders without crashing', () => {
    render(<HeroSplitScreen {...mockProps} />);
    expect(screen.getByText('Test description for hero section')).toBeInTheDocument();
  });

  it('renders logo with correct attributes', () => {
    render(<HeroSplitScreen {...mockProps} />);
    const logo = screen.getByAltText('Test Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('width', '180');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('renders subtitle', () => {
    render(<HeroSplitScreen {...mockProps} />);
    expect(screen.getByText('🚀 Test Subtitle')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<HeroSplitScreen {...mockProps} />);
    expect(screen.getByText('Test description for hero section')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<HeroSplitScreen {...mockProps} />);
    expect(screen.getByText('Fast performance')).toBeInTheDocument();
    expect(screen.getByText('Secure platform')).toBeInTheDocument();
    expect(screen.getByText('Growth guaranteed')).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    render(<HeroSplitScreen {...mockProps} />);
    const ctaButton = screen.getByRole('link', { name: 'Get Started' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/signup');
  });

  it('renders secondary CTA button when provided', () => {
    const propsWithSecondary = {
      ...mockProps,
      secondaryCta: {
        text: 'Learn More',
        href: '/features',
      },
    };
    render(<HeroSplitScreen {...propsWithSecondary} />);
    const secondaryButton = screen.getByRole('link', { name: 'Learn More' });
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toHaveAttribute('href', '/features');
  });

  it('does not render secondary CTA when not provided', () => {
    render(<HeroSplitScreen {...mockProps} />);
    expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
  });

  it('renders mockup image', () => {
    render(<HeroSplitScreen {...mockProps} />);
    const mockupImg = screen.getByAltText('Mockup Image');
    expect(mockupImg).toBeInTheDocument();
    expect(mockupImg).toHaveAttribute('src', '/mockup.png');
  });

  it('renders trust indicators when provided', () => {
    const propsWithTrust = {
      ...mockProps,
      trustIndicators: [
        {
          avatars: [
            { src: '/avatar1.jpg', alt: 'User 1' },
            { src: '/avatar2.jpg', alt: 'User 2' },
          ],
          text: '500+ happy clients',
          rating: 4.9,
          ratingLabel: 'on Trustpilot',
        },
      ],
    };
    render(<HeroSplitScreen {...propsWithTrust} />);
    expect(screen.getByText('500+ happy clients')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('on Trustpilot')).toBeInTheDocument();
  });

  it('renders floating cards when provided', () => {
    const propsWithCards = {
      ...mockProps,
      mockupImage: {
        src: '/mockup.png',
        alt: 'Mockup Image',
        floatingCards: [
          {
            title: 'Analytics',
            value: '+127%',
            trend: 'up' as const,
            description: 'Monthly growth',
            delay: 0,
          },
          {
            title: 'Users',
            value: '12.5K',
            trend: 'up' as const,
            description: 'Active now',
            delay: 2,
          },
        ],
      },
    };
    render(<HeroSplitScreen {...propsWithCards} />);
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('+127%')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('12.5K')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <HeroSplitScreen {...mockProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders feature icons with aria-hidden', () => {
    const { container } = render(<HeroSplitScreen {...mockProps} />);
    const icons = container.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has correct semantic structure', () => {
    const { container } = render(<HeroSplitScreen {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders trust indicator avatars', () => {
    const propsWithTrust = {
      ...mockProps,
      trustIndicators: [
        {
          avatars: [
            { src: '/avatar1.jpg', alt: 'User 1' },
            { src: '/avatar2.jpg', alt: 'User 2' },
            { src: '/avatar3.jpg', alt: 'User 3' },
          ],
          text: 'Trusted by users',
        },
      ],
    };
    render(<HeroSplitScreen {...propsWithTrust} />);
    expect(screen.getByAltText('User 1')).toBeInTheDocument();
    expect(screen.getByAltText('User 2')).toBeInTheDocument();
    expect(screen.getByAltText('User 3')).toBeInTheDocument();
  });

  it('renders rating stars when rating is provided', () => {
    const propsWithRating = {
      ...mockProps,
      trustIndicators: [
        {
          avatars: [],
          text: 'Rated',
          rating: 5.0,
          ratingLabel: 'stars',
        },
      ],
    };
    const { container } = render(<HeroSplitScreen {...propsWithRating} />);
    const stars = container.querySelectorAll('svg[fill="currentColor"]');
    expect(stars.length).toBeGreaterThan(0);
  });
});
