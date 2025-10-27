import { CTASectionAdvanced } from '../CTASectionAdvanced';

/**
 * Esempio avanzato di CTASectionAdvanced
 *
 * Questo esempio mostra tutte le funzionalità:
 * - Badge distintivo con emoji
 * - Titolo persuasivo
 * - Descrizione dettagliata
 * - 8 benefici completi
 * - CTA con urgency
 * - Trust indicators con avatars e rating
 * - Mockup professionale
 * - Background gradient custom
 */
export default function AdvancedExample() {
  return (
    <CTASectionAdvanced
      badge="🎉 Offerta Speciale - Solo per i Primi 100 Iscritti"
      title="Trasforma il Tuo Business con la Piattaforma All-in-One N°1 in Italia"
      description="Oltre 1,500 aziende italiane hanno già digitalizzato completamente i loro processi con la nostra piattaforma. Risultati misurabili dal primo mese, supporto dedicato in italiano, e tecnologia enterprise che scala con te. Non perdere questa opportunità esclusiva."
      benefits={[
        {
          text: 'Setup guidato completo in meno di 5 minuti, zero competenze tecniche richieste',
          checked: true,
        },
        {
          text: 'Integrazione nativa con Stripe, PayPal, Shopify, WooCommerce e altre 200+ piattaforme',
          checked: true,
        },
        {
          text: 'Dashboard analytics avanzata con AI-powered insights e report personalizzabili',
          checked: true,
        },
        {
          text: 'API RESTful completa, Webhooks real-time e SDK per tutti i linguaggi principali',
          checked: true,
        },
        {
          text: 'Backup automatici ogni 6 ore con retention di 90 giorni e restore in 1-click',
          checked: true,
        },
        {
          text: 'Conformità GDPR certificata, hosting in EU, ISO 27001 e SOC2 Type II verified',
          checked: true,
        },
        {
          text: 'Migrazione dati completamente gratuita con team dedicato dal tuo sistema attuale',
          checked: true,
        },
        {
          text: 'Supporto prioritario 24/7 in italiano via chat, email, telefono con SLA <1h',
          checked: true,
        },
      ]}
      cta={{
        text: 'Inizia Prova Gratuita 30 Giorni - Senza Carta',
        href: '/trial',
      }}
      trustIndicators={{
        avatars: [
          { src: 'https://i.pravatar.cc/150?img=10', alt: 'CEO TechCorp' },
          { src: 'https://i.pravatar.cc/150?img=11', alt: 'Founder StartupXYZ' },
          { src: 'https://i.pravatar.cc/150?img=12', alt: 'CTO Innovation Labs' },
          { src: 'https://i.pravatar.cc/150?img=13', alt: 'Director E-commerce Plus' },
          { src: 'https://i.pravatar.cc/150?img=14', alt: 'Manager Digital Solutions' },
        ],
        text: '1,500+ aziende italiane già attive',
        rating: 4.9,
        ratingLabel: 'su Trustpilot (2,300+ recensioni)',
      }}
      mockupImage={{
        src: 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=Premium+Dashboard',
        alt: 'Premium Dashboard Interface',
      }}
      className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    />
  );
}
