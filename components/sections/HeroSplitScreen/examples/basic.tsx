import { HeroSplitScreen } from '../HeroSplitScreen';
import { Zap, Shield, TrendingUp } from 'lucide-react';

/**
 * Esempio base di HeroSplitScreen
 *
 * Questo esempio mostra l'utilizzo minimo del componente con:
 * - Logo aziendale
 * - Sottotitolo con emoji
 * - Descrizione breve
 * - 3 features principali
 * - CTA primaria
 * - Mockup immagine semplice
 */
export default function BasicExample() {
  return (
    <HeroSplitScreen
      logo={{
        src: 'https://via.placeholder.com/180x40/3b82f6/ffffff?text=Brand',
        alt: 'Brand Logo',
        width: 180,
        height: 40,
      }}
      subtitle="🚀 Innovazione Tecnologica"
      description="Trasforma il tuo business con la nostra piattaforma all-in-one. Semplice, veloce e sicura."
      features={[
        { icon: Zap, text: 'Performance eccezionali' },
        { icon: Shield, text: 'Sicurezza avanzata' },
        { icon: TrendingUp, text: 'Crescita garantita' },
      ]}
      primaryCta={{
        text: 'Inizia Gratis',
        href: '/signup',
      }}
      mockupImage={{
        src: 'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Dashboard',
        alt: 'Dashboard Preview',
      }}
    />
  );
}
