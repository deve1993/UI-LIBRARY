import { WhyChooseSection } from '../WhyChooseSection';
import { Users, Zap, Award, TrendingUp, Shield, Clock, Heart, Star } from 'lucide-react';

/**
 * Esempio avanzato di WhyChooseSection
 *
 * Questo esempio mostra configurazione completa con:
 * - 8 benefici per showcase massimo
 * - Statistiche dettagliate e specifiche
 * - Descrizioni più approfondite
 * - Background gradient personalizzato
 * - Mix di icone e colori per varietà visiva
 */
export default function AdvancedExample() {
  return (
    <WhyChooseSection
      title="Perché le Aziende Fortune 500 ci Scelgono"
      subtitle="Risultati misurabili e certificati che dimostrano la nostra leadership nel settore"
      benefits={[
        {
          icon: Users,
          title: 'Community Globale Enterprise',
          description: 'Oltre 50,000 professionisti e 1,000+ aziende Fortune 500 utilizzano quotidianamente la nostra piattaforma in 120+ paesi.',
          gradient: 'from-blue-600 to-blue-400',
          stat: '50K+',
          statLabel: 'Utenti enterprise',
        },
        {
          icon: Clock,
          title: 'Uptime Garantito SLA',
          description: 'Infrastruttura multi-region ridondante con monitoring proattivo 24/7 e incident response in <15 minuti.',
          gradient: 'from-green-600 to-green-400',
          stat: '99.99%',
          statLabel: 'SLA garantito',
        },
        {
          icon: Shield,
          title: 'Sicurezza Certificata',
          description: 'Conformità completa SOC2 Type II, ISO 27001, HIPAA, GDPR con penetration testing trimestrale verificato.',
          gradient: 'from-purple-600 to-purple-400',
          stat: '100%',
          statLabel: 'Compliance',
        },
        {
          icon: Zap,
          title: 'Performance API',
          description: 'Latenza media globale inferiore a 50ms con CDN edge computing e automatic scaling.',
          gradient: 'from-yellow-600 to-yellow-400',
          stat: '<50ms',
          statLabel: 'Latenza API',
        },
        {
          icon: Award,
          title: 'Premi e Riconoscimenti',
          description: 'Leader di settore riconosciuto da Gartner Magic Quadrant e G2 Grid per 4 anni consecutivi.',
          gradient: 'from-orange-600 to-orange-400',
          stat: '20+',
          statLabel: 'Award internazionali',
        },
        {
          icon: TrendingUp,
          title: 'ROI Comprovato',
          description: 'I nostri enterprise client registrano un ROI medio del 340% nei primi 12 mesi con payback in 4 mesi.',
          gradient: 'from-emerald-600 to-emerald-400',
          stat: '+340%',
          statLabel: 'ROI medio a 12 mesi',
        },
        {
          icon: Heart,
          title: 'Customer Success',
          description: 'Net Promoter Score di 72 con 98% customer retention e dedicated CSM per ogni account enterprise.',
          gradient: 'from-pink-600 to-pink-400',
          stat: 'NPS 72',
          statLabel: '98% retention',
        },
        {
          icon: Star,
          title: 'Supporto Premium',
          description: 'Team di esperti disponibile 24/7/365 in 12 lingue con SLA di risposta <1h e resolution <4h.',
          gradient: 'from-indigo-600 to-indigo-400',
          stat: '24/7',
          statLabel: 'Support multilingua',
        },
      ]}
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
    />
  );
}
