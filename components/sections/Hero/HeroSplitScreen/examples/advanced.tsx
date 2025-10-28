import { HeroSplitScreen } from '../HeroSplitScreen';
import { Zap, Shield, TrendingUp, Sparkles, Award, Users } from 'lucide-react';

/**
 * Esempio avanzato di HeroSplitScreen
 *
 * Questo esempio mostra tutte le funzionalità del componente:
 * - Logo personalizzato
 * - Sottotitolo con emoji
 * - Descrizione dettagliata
 * - 6 features con icone diverse
 * - CTA primaria e secondaria
 * - Indicatori di fiducia con avatars e rating
 * - Mockup con 3 carte galleggianti animate
 * - Background gradient personalizzato
 */
export default function AdvancedExample() {
  return (
    <HeroSplitScreen
      logo={{
        src: 'https://via.placeholder.com/180x40/8b5cf6/ffffff?text=Premium+Brand',
        alt: 'Premium Brand Logo',
        width: 180,
        height: 40,
      }}
      subtitle="✨ La Piattaforma All-in-One per il Tuo Successo"
      description="Gestisci vendite, marketing, analytics e team collaboration da un'unica dashboard potente. Oltre 1,000 aziende si fidano di noi per crescere il loro business."
      features={[
        { icon: Zap, text: 'Performance 10x superiori' },
        { icon: Shield, text: 'Sicurezza enterprise-grade' },
        { icon: TrendingUp, text: 'ROI medio del 240%' },
        { icon: Sparkles, text: 'AI integrata per automazioni' },
        { icon: Award, text: 'Premiata come Best SaaS 2024' },
        { icon: Users, text: 'Community di 50K+ professionisti' },
      ]}
      primaryCta={{
        text: 'Inizia Prova Gratuita 30 Giorni',
        href: '/trial',
      }}
      secondaryCta={{
        text: 'Guarda Demo dal Vivo',
        href: '/demo',
      }}
      trustIndicators={[
        {
          avatars: [
            { src: 'https://i.pravatar.cc/150?img=1', alt: 'CEO Azienda 1' },
            { src: 'https://i.pravatar.cc/150?img=2', alt: 'CEO Azienda 2' },
            { src: 'https://i.pravatar.cc/150?img=3', alt: 'CEO Azienda 3' },
            { src: 'https://i.pravatar.cc/150?img=4', alt: 'CEO Azienda 4' },
            { src: 'https://i.pravatar.cc/150?img=5', alt: 'CEO Azienda 5' },
          ],
          text: '1,000+ aziende Fortune 500',
          rating: 4.9,
          ratingLabel: 'su G2 e Capterra',
        },
      ]}
      mockupImage={{
        src: 'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Advanced+Dashboard',
        alt: 'Advanced Dashboard with Analytics',
        floatingCards: [
          {
            title: 'Revenue Growth',
            value: '+240%',
            trend: 'up',
            description: 'Q1 2024',
            delay: 0,
          },
          {
            title: 'Active Users',
            value: '50K+',
            trend: 'up',
            description: 'This month',
            delay: 1,
          },
          {
            title: 'Customer Satisfaction',
            value: '4.9/5',
            trend: 'up',
            description: 'Trustpilot rating',
            delay: 2,
          },
        ],
      }}
      className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    />
  );
}
