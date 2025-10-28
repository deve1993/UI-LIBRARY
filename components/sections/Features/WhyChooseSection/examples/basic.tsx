import { WhyChooseSection } from '../WhyChooseSection';
import { Users, Zap, Award, TrendingUp } from 'lucide-react';

/**
 * Esempio base di WhyChooseSection
 *
 * Questo esempio mostra l'utilizzo minimo con:
 * - Titolo e sottotitolo
 * - 4 benefici standard
 * - Statistiche semplici
 */
export default function BasicExample() {
  return (
    <WhyChooseSection
      title="Perché sceglierci"
      subtitle="I numeri parlano chiaro"
      benefits={[
        {
          icon: Users,
          title: 'Utenti Attivi',
          description: 'Una community in crescita che utilizza quotidianamente la nostra piattaforma.',
          gradient: 'from-blue-500 to-cyan-500',
          stat: '10K+',
          statLabel: 'Utenti',
        },
        {
          icon: Zap,
          title: 'Performance',
          description: 'Velocità di elaborazione superiore alla media del mercato.',
          gradient: 'from-purple-500 to-pink-500',
          stat: '5x',
          statLabel: 'Più veloce',
        },
        {
          icon: Award,
          title: 'Affidabilità',
          description: 'Uptime costante e monitorato 24/7 per garantire continuità.',
          gradient: 'from-orange-500 to-red-500',
          stat: '99.9%',
          statLabel: 'Uptime',
        },
        {
          icon: TrendingUp,
          title: 'Crescita',
          description: 'I nostri clienti vedono risultati concreti fin dal primo mese.',
          gradient: 'from-green-500 to-emerald-500',
          stat: '+150%',
          statLabel: 'ROI medio',
        },
      ]}
    />
  );
}
