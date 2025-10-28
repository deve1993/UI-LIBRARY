/**
 * Component Registry
 *
 * Auto-generated file - DO NOT EDIT MANUALLY
 * Generated: 2025-10-27T15:12:37.532Z
 *
 * Usage:
 *   import { Button, HeroSection } from '@/components';
 *   import type { ButtonProps, HeroSectionProps } from '@/components';
 */

// ═══════════════════════════════════════════════════════════
// Effects
// ═══════════════════════════════════════════════════════════

export { BackgroundBeams } from './effects/BackgroundBeams';
export type * from './effects/BackgroundBeams/BackgroundBeams.types';
export { BackgroundDots } from './effects/BackgroundDots';
export type * from './effects/BackgroundDots/BackgroundDots.types';
export { BackgroundGrid } from './effects/BackgroundGrid';
export type * from './effects/BackgroundGrid/BackgroundGrid.types';
export { MovingBorder } from './effects/MovingBorder';
export type * from './effects/MovingBorder/MovingBorder.types';
export { Spotlight } from './effects/Spotlight';
export type * from './effects/Spotlight/Spotlight.types';
export { TextGenerateEffect } from './effects/TextGenerateEffect';
export type * from './effects/TextGenerateEffect/TextGenerateEffect.types';
export { TextReveal } from './effects/TextReveal';
export type * from './effects/TextReveal/TextReveal.types';

// ═══════════════════════════════════════════════════════════
// Sections - Now organized by category
// ═══════════════════════════════════════════════════════════

export * from './sections';

// ═══════════════════════════════════════════════════════════
// Ui
// ═══════════════════════════════════════════════════════════

export { Avatar } from './ui/Avatar';
export type * from './ui/Avatar/Avatar.types';
export { Badge } from './ui/Badge';
export type * from './ui/Badge/Badge.types';
export { Button } from './ui/Button';
export type * from './ui/Button/Button.types';
export { ButtonShimmer } from './ui/ButtonShimmer';
export type * from './ui/ButtonShimmer/ButtonShimmer.types';
export { Card } from './ui/Card';
export type * from './ui/Card/Card.types';
export { Card3D } from './ui/Card3D';
export type * from './ui/Card3D/Card3D.types';
export { CardBento } from './ui/CardBento';
export type * from './ui/CardBento/CardBento.types';
export { CardFlip } from './ui/CardFlip';
export type * from './ui/CardFlip/CardFlip.types';
export { CardGlow } from './ui/CardGlow';
export type * from './ui/CardGlow/CardGlow.types';
export { CardHover } from './ui/CardHover';
export type * from './ui/CardHover/CardHover.types';
export { Checkbox } from './ui/Checkbox';
export type * from './ui/Checkbox/Checkbox.types';
export { FloatingNav } from './ui/FloatingNav';
export type * from './ui/FloatingNav/FloatingNav.types';
export { InfiniteMovingCards } from './ui/InfiniteMovingCards';
export type * from './ui/InfiniteMovingCards/InfiniteMovingCards.types';
export { Input } from './ui/Input';
export type * from './ui/Input/Input.types';
export { InputOTP } from './ui/InputOTP';
export type * from './ui/InputOTP/InputOTP.types';
export { Label } from './ui/Label';
export type * from './ui/Label/Label.types';
export { MobileMenu } from './ui/MobileMenu';
export type * from './ui/MobileMenu/MobileMenu.types';
export { Modal } from './ui/Modal';
export type * from './ui/Modal/Modal.types';
export { MultiStepForm } from './ui/MultiStepForm';
export type * from './ui/MultiStepForm/MultiStepForm.types';
export { ParallaxScroll } from './ui/ParallaxScroll';
export type * from './ui/ParallaxScroll/ParallaxScroll.types';
export { Radio } from './ui/Radio';
export type * from './ui/Radio/Radio.types';
export { Select } from './ui/Select';
export type * from './ui/Select/Select.types';
export { Switch } from './ui/Switch';
export type * from './ui/Switch/Switch.types';
export { Textarea } from './ui/Textarea';
export type * from './ui/Textarea/Textarea.types';
export { Tooltip } from './ui/Tooltip';
export type * from './ui/Tooltip/Tooltip.types';

// ═══════════════════════════════════════════════════════════
// Component List (60 total)
// ═══════════════════════════════════════════════════════════

export const AVAILABLE_COMPONENTS = [
  'Avatar',
  'BackgroundBeams',
  'BackgroundDots',
  'BackgroundGrid',
  'Badge',
  'BenefitsSection',
  'Button',
  'ButtonShimmer',
  'Card',
  'Card3D',
  'CardBento',
  'CardFlip',
  'CardGlow',
  'CardHover',
  'Checkbox',
  'ClientLogosSection',
  'ContactSection',
  'CTAGradient',
  'CTANewsletter',
  'CTASectionAdvanced',
  'FeaturesBento',
  'FeaturesGrid',
  'FeaturesSection',
  'FeaturesTabs',
  'FeaturesTimeline',
  'FloatingNav',
  'Footer',
  'HeroAnimatedBeam',
  'HeroGradient',
  'HeroMeteor',
  'HeroParticles',
  'HeroSection',
  'HeroSplitScreen',
  'HeroSpotlight',
  'HeroTypewriter',
  'HeroVideo',
  'HeroWaves',
  'InfiniteMovingCards',
  'Input',
  'InputOTP',
  'IsometricCardsSection',
  'Label',
  'MobileMenu',
  'Modal',
  'MovingBorder',
  'MultiStepForm',
  'NavigationHeader',
  'ParallaxScroll',
  'PricingSection',
  'Radio',
  'RoadmapSection',
  'Select',
  'Spotlight',
  'Switch',
  'TestimonialsSection',
  'Textarea',
  'TextGenerateEffect',
  'TextReveal',
  'Tooltip',
  'WhyChooseSection',
] as const;

export type AvailableComponent = typeof AVAILABLE_COMPONENTS[number];
