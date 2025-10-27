import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhyChooseSection } from './WhyChooseSection';
import { Users, Zap, Award, TrendingUp } from 'lucide-react';

const mockProps = {
  title: 'Why Choose Us',
  subtitle: 'Real results that speak for themselves',
  benefits: [
    {
      icon: Users,
      title: 'Global Community',
      description: 'Join thousands of satisfied users worldwide using our platform daily.',
      gradient: 'from-blue-500 to-cyan-500',
      stat: '50K+',
      statLabel: 'Active users',
    },
    {
      icon: Zap,
      title: 'Exceptional Performance',
      description: 'Loading speed 10x faster than competitors for a smooth experience.',
      gradient: 'from-purple-500 to-pink-500',
      stat: '10x',
      statLabel: 'Faster',
    },
    {
      icon: Award,
      title: 'Certified Quality',
      description: 'Recognized as industry leader with international awards for innovation.',
      gradient: 'from-orange-500 to-red-500',
      stat: '15+',
      statLabel: 'Awards won',
    },
    {
      icon: TrendingUp,
      title: 'Guaranteed Growth',
      description: 'Our clients see an average increase of 240% in the first 6 months.',
      gradient: 'from-green-500 to-emerald-500',
      stat: '+240%',
      statLabel: 'Average growth',
    },
  ],
};

describe('WhyChooseSection', () => {
  it('renders without crashing', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(screen.getByText('Real results that speak for themselves')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const propsWithoutSubtitle = { ...mockProps, subtitle: undefined };
    render(<WhyChooseSection {...propsWithoutSubtitle} />);
    expect(screen.queryByText('Real results that speak for themselves')).not.toBeInTheDocument();
  });

  it('renders all benefit cards', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(screen.getByText('Global Community')).toBeInTheDocument();
    expect(screen.getByText('Exceptional Performance')).toBeInTheDocument();
    expect(screen.getByText('Certified Quality')).toBeInTheDocument();
    expect(screen.getByText('Guaranteed Growth')).toBeInTheDocument();
  });

  it('renders benefit descriptions', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(
      screen.getByText('Join thousands of satisfied users worldwide using our platform daily.')
    ).toBeInTheDocument();
  });

  it('renders all statistics', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(screen.getByText('50K+')).toBeInTheDocument();
    expect(screen.getByText('10x')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('+240%')).toBeInTheDocument();
  });

  it('renders all stat labels', () => {
    render(<WhyChooseSection {...mockProps} />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('Faster')).toBeInTheDocument();
    expect(screen.getByText('Awards won')).toBeInTheDocument();
    expect(screen.getByText('Average growth')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <WhyChooseSection {...mockProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders benefit icons with aria-hidden', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const icons = container.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has correct semantic structure', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(4);
  });

  it('renders correct number of benefits', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(mockProps.benefits.length);
  });

  it('handles three benefits', () => {
    const threeProps = {
      title: 'Key Benefits',
      benefits: mockProps.benefits.slice(0, 3),
    };
    render(<WhyChooseSection {...threeProps} />);
    expect(screen.getByText('Global Community')).toBeInTheDocument();
    expect(screen.getByText('Exceptional Performance')).toBeInTheDocument();
    expect(screen.getByText('Certified Quality')).toBeInTheDocument();
    expect(screen.queryByText('Guaranteed Growth')).not.toBeInTheDocument();
  });

  it('handles six benefits', () => {
    const sixProps = {
      title: 'All Benefits',
      benefits: [
        ...mockProps.benefits,
        {
          icon: Users,
          title: 'Extra 1',
          description: 'Description 1',
          gradient: 'from-blue-500 to-cyan-500',
          stat: '100%',
          statLabel: 'Satisfaction',
        },
        {
          icon: Zap,
          title: 'Extra 2',
          description: 'Description 2',
          gradient: 'from-purple-500 to-pink-500',
          stat: '24/7',
          statLabel: 'Support',
        },
      ],
    };
    render(<WhyChooseSection {...sixProps} />);
    const { container } = render(<WhyChooseSection {...sixProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(6);
  });

  it('applies gradient classes to icon containers', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const gradientElements = container.querySelectorAll('.from-blue-500');
    expect(gradientElements.length).toBeGreaterThan(0);
  });

  it('uses section tag for semantic HTML', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('uses article tag for each benefit', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(4);
  });

  it('renders separator between description and stats', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const separators = container.querySelectorAll('.border-t');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('stats are in strong tags for accessibility', () => {
    const { container } = render(<WhyChooseSection {...mockProps} />);
    const strongTags = container.querySelectorAll('strong');
    expect(strongTags.length).toBeGreaterThan(0);
  });
});
