import { IsometricCardsSection } from '../IsometricCardsSection';
import { Zap, Shield, Sparkles, TrendingUp, Award, Users } from 'lucide-react';

/**
 * Esempio avanzato di IsometricCardsSection
 *
 * Questo esempio mostra tutte le funzionalità:
 * - 6 carte per layout completo
 * - Hover gradients personalizzati
 * - Badge su carte selezionate
 * - Background gradient custom
 * - Varietà di colori e icone
 */
export default function AdvancedExample() {
  return (
    <IsometricCardsSection
      title="Piattaforma Completa per il Tuo Business"
      subtitle="Tutti gli strumenti di cui hai bisogno, integrati perfettamente"
      cards={[
        {
          icon: Zap,
          title: 'Performance Estreme',
          description: 'Tempi di risposta sotto i 50ms garantiti globalmente con CDN edge computing.',
          gradient: 'from-blue-500 to-cyan-500',
          hoverGradient: 'from-blue-600 to-cyan-600',
        },
        {
          icon: Shield,
          title: 'Sicurezza Enterprise',
          description: 'SOC2 Type II, ISO 27001, GDPR compliance con audit annuali verificati.',
          gradient: 'from-purple-500 to-pink-500',
          hoverGradient: 'from-purple-600 to-pink-600',
          badge: '⭐ Più Sicuro',
        },
        {
          icon: TrendingUp,
          title: 'Analytics Avanzati',
          description: 'Dashboard in tempo reale con ML-powered insights e previsioni automatiche.',
          gradient: 'from-green-500 to-emerald-500',
          hoverGradient: 'from-green-600 to-emerald-600',
        },
        {
          icon: Users,
          title: 'Team Collaboration',
          description: 'Workspace condivisi, chat integrata, video calls e project management.',
          gradient: 'from-orange-500 to-red-500',
          hoverGradient: 'from-orange-600 to-red-600',
        },
        {
          icon: Award,
          title: 'Premiato e Certificato',
          description: 'Leader riconosciuto per 3 anni consecutivi da Gartner e G2 Crowd.',
          gradient: 'from-yellow-400 to-orange-500',
          hoverGradient: 'from-yellow-500 to-orange-600',
          badge: '🏆 Best of 2024',
        },
        {
          icon: Sparkles,
          title: 'AI & Automazione',
          description: 'Machine learning integrato per automazioni intelligenti e workflow optimization.',
          gradient: 'from-indigo-500 to-purple-500',
          hoverGradient: 'from-indigo-600 to-purple-600',
        },
      ]}
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    />
  );
}
