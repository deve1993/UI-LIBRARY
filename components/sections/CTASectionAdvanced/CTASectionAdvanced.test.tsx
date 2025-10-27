import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CTASectionAdvanced } from './CTASectionAdvanced';

const mockProps = {
  badge: '🚀 Launch Offer',
  title: 'Ready to transform your business?',
  description: 'Join hundreds of companies that have already digitalized their processes with our platform.',
  benefits: [
    {
      text: 'Complete setup in less than 5 minutes',
      checked: true,
    },
    {
      text: 'Dedicated 24/7 support in Italian',
      checked: true,
    },
    {
      text: 'No credit card required for trial',
      checked: true,
    },
    {
      text: 'Cancel anytime',
      checked: true,
    },
  ],
  cta: {
    text: 'Start Free for 14 Days',
    href: '/signup',
  },
  mockupImage: {
    src: '/dashboard-preview.png',
    alt: 'Dashboard Preview',
  },
};

describe('CTASectionAdvanced', () => {
  it('renders without crashing', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    expect(screen.getByText('Ready to transform your business?')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    expect(screen.getByText('Ready to transform your business?')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    expect(
      screen.getByText(
        'Join hundreds of companies that have already digitalized their processes with our platform.'
      )
    ).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    expect(screen.getByText('🚀 Launch Offer')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    const propsWithoutBadge = { ...mockProps, badge: undefined };
    render(<CTASectionAdvanced {...propsWithoutBadge} />);
    expect(screen.queryByText('🚀 Launch Offer')).not.toBeInTheDocument();
  });

  it('renders all benefits', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    expect(screen.getByText('Complete setup in less than 5 minutes')).toBeInTheDocument();
    expect(screen.getByText('Dedicated 24/7 support in Italian')).toBeInTheDocument();
    expect(screen.getByText('No credit card required for trial')).toBeInTheDocument();
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument();
  });

  it('renders checkmarks for checked benefits', () => {
    const { container } = render(<CTASectionAdvanced {...mockProps} />);
    const checkmarks = container.querySelectorAll('.bg-gradient-to-br');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('renders CTA button', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    const ctaButton = screen.getByRole('link', { name: 'Start Free for 14 Days' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/signup');
  });

  it('renders mockup image', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    const mockupImg = screen.getByAltText('Dashboard Preview');
    expect(mockupImg).toBeInTheDocument();
    expect(mockupImg).toHaveAttribute('src', '/dashboard-preview.png');
  });

  it('renders trust indicators when provided', () => {
    const propsWithTrust = {
      ...mockProps,
      trustIndicators: {
        avatars: [
          { src: '/avatar1.jpg', alt: 'Client 1' },
          { src: '/avatar2.jpg', alt: 'Client 2' },
        ],
        text: '500+ companies already active',
        rating: 4.9,
        ratingLabel: 'on Trustpilot',
      },
    };
    render(<CTASectionAdvanced {...propsWithTrust} />);
    expect(screen.getByText('500+ companies already active')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('on Trustpilot')).toBeInTheDocument();
  });

  it('renders trust indicator avatars', () => {
    const propsWithTrust = {
      ...mockProps,
      trustIndicators: {
        avatars: [
          { src: '/avatar1.jpg', alt: 'Client 1' },
          { src: '/avatar2.jpg', alt: 'Client 2' },
          { src: '/avatar3.jpg', alt: 'Client 3' },
        ],
        text: 'Trusted users',
      },
    };
    render(<CTASectionAdvanced {...propsWithTrust} />);
    expect(screen.getByAltText('Client 1')).toBeInTheDocument();
    expect(screen.getByAltText('Client 2')).toBeInTheDocument();
    expect(screen.getByAltText('Client 3')).toBeInTheDocument();
  });

  it('does not render trust indicators when not provided', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    expect(screen.queryByText('500+ companies')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CTASectionAdvanced {...mockProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct semantic structure', () => {
    const { container } = render(<CTASectionAdvanced {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders benefits as an unordered list', () => {
    const { container } = render(<CTASectionAdvanced {...mockProps} />);
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
  });

  it('renders correct number of benefits', () => {
    const { container } = render(<CTASectionAdvanced {...mockProps} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(mockProps.benefits.length);
  });

  it('handles many benefits', () => {
    const manyBenefitsProps = {
      ...mockProps,
      benefits: [
        ...mockProps.benefits,
        { text: 'Extra benefit 1', checked: true },
        { text: 'Extra benefit 2', checked: true },
        { text: 'Extra benefit 3', checked: true },
      ],
    };
    render(<CTASectionAdvanced {...manyBenefitsProps} />);
    expect(screen.getByText('Extra benefit 1')).toBeInTheDocument();
    expect(screen.getByText('Extra benefit 2')).toBeInTheDocument();
    expect(screen.getByText('Extra benefit 3')).toBeInTheDocument();
  });

  it('renders rating stars when rating is provided', () => {
    const propsWithRating = {
      ...mockProps,
      trustIndicators: {
        avatars: [],
        text: 'Rated',
        rating: 5.0,
        ratingLabel: 'stars',
      },
    };
    const { container } = render(<CTASectionAdvanced {...propsWithRating} />);
    const stars = container.querySelectorAll('svg[fill="currentColor"]');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('checkmarks have proper aria labels', () => {
    const { container } = render(<CTASectionAdvanced {...mockProps} />);
    const checkmarks = container.querySelectorAll('[aria-label="Incluso"]');
    expect(checkmarks.length).toBe(mockProps.benefits.length);
  });

  it('uses section tag for semantic HTML', () => {
    const { container } = render(<CTASectionAdvanced {...mockProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('CTA button has correct styling classes', () => {
    render(<CTASectionAdvanced {...mockProps} />);
    const ctaButton = screen.getByRole('link', { name: 'Start Free for 14 Days' });
    expect(ctaButton).toHaveClass('bg-gradient-to-r');
  });
});
