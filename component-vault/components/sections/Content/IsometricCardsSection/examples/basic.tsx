import { IsometricCardsSection } from '../IsometricCardsSection';
import { Zap, Shield, Sparkles } from 'lucide-react';

/**
 * Esempio base di IsometricCardsSection
 *
 * Questo esempio mostra l'utilizzo minimo del componente con:
 * - Titolo e sottotitolo
 * - 3 carte con icone, titoli, descrizioni
 * - Gradienti base
 */
export default function BasicExample() {
  return (
    <IsometricCardsSection
      title="Funzionalità Principali"
      subtitle="Tutto ciò che ti serve per iniziare"
      cards={[
        {
          icon: Zap,
          title: 'Velocità',
          description: 'Caricamento istantaneo e prestazioni ottimali su ogni dispositivo.',
          gradient: 'from-blue-500 to-cyan-500',
        },
        {
          icon: Shield,
          title: 'Sicurezza',
          description: 'Protezione avanzata con crittografia end-to-end certificata.',
          gradient: 'from-purple-500 to-pink-500',
        },
        {
          icon: Sparkles,
          title: 'Semplicità',
          description: 'Interfaccia intuitiva che non richiede formazione specifica.',
          gradient: 'from-orange-500 to-red-500',
        },
      ]}
    />
  );
}
