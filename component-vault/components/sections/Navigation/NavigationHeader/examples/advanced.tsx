/**
 * Esempio Avanzato - NavigationHeader
 *
 * Questo esempio mostra tutte le funzionalità avanzate del componente,
 * incluso il selettore di lingua, gestione dello stato e integrazione
 * con sistemi di internazionalizzazione.
 */

import React, { useState } from 'react';
import { NavigationHeader } from '../NavigationHeader';

export function AdvancedExample() {
  // Stato per gestire la lingua corrente
  const [currentLanguage, setCurrentLanguage] = useState('it');

  // Stato per gestire l'autenticazione (simulato)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configurazione delle lingue disponibili
  const languages = {
    current: currentLanguage,
    options: [
      { code: 'it', label: 'Italiano' },
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'Français' },
      { code: 'de', label: 'Deutsch' },
      { code: 'es', label: 'Español' },
    ],
    onChange: (code: string) => {
      setCurrentLanguage(code);
      console.log(`Lingua cambiata a: ${code}`);

      // Qui puoi integrare con il tuo sistema i18n:
      // i18n.changeLanguage(code);
      // oppure:
      // localStorage.setItem('language', code);
      // window.location.reload();
    },
  };

  // Traduzioni di esempio (in un'app reale, useresti i18n)
  const translations = {
    it: {
      home: 'Home',
      products: 'Prodotti',
      features: 'Funzionalità',
      pricing: 'Prezzi',
      about: 'Chi Siamo',
      contact: 'Contatti',
      cta: isAuthenticated ? 'Dashboard' : 'Inizia Gratis',
      welcome: 'Benvenuto!',
      description: 'Esempio avanzato con selettore di lingua e gestione dello stato.',
    },
    en: {
      home: 'Home',
      products: 'Products',
      features: 'Features',
      pricing: 'Pricing',
      about: 'About Us',
      contact: 'Contact',
      cta: isAuthenticated ? 'Dashboard' : 'Get Started',
      welcome: 'Welcome!',
      description: 'Advanced example with language switcher and state management.',
    },
    fr: {
      home: 'Accueil',
      products: 'Produits',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      about: 'À Propos',
      contact: 'Contact',
      cta: isAuthenticated ? 'Tableau de bord' : 'Commencer',
      welcome: 'Bienvenue!',
      description: 'Exemple avancé avec sélecteur de langue et gestion d\'état.',
    },
    de: {
      home: 'Startseite',
      products: 'Produkte',
      features: 'Funktionen',
      pricing: 'Preise',
      about: 'Über Uns',
      contact: 'Kontakt',
      cta: isAuthenticated ? 'Dashboard' : 'Jetzt Starten',
      welcome: 'Willkommen!',
      description: 'Erweitertes Beispiel mit Sprachauswahl und Zustandsverwaltung.',
    },
    es: {
      home: 'Inicio',
      products: 'Productos',
      features: 'Características',
      pricing: 'Precios',
      about: 'Sobre Nosotros',
      contact: 'Contacto',
      cta: isAuthenticated ? 'Panel' : 'Comenzar',
      welcome: '¡Bienvenido!',
      description: 'Ejemplo avanzado con selector de idioma y gestión de estado.',
    },
  };

  const t = translations[currentLanguage as keyof typeof translations];

  // Handler per il bottone CTA
  const handleCtaClick = () => {
    if (isAuthenticated) {
      console.log('Navigating to dashboard...');
      // window.location.href = '/dashboard';
    } else {
      console.log('Opening signup modal...');
      // openSignupModal();
    }
  };

  // Link di navigazione dinamici basati sulla lingua
  const navigationLinks = [
    { label: t.home, href: '/', ariaLabel: `${t.home} page` },
    { label: t.products, href: '/products', ariaLabel: `${t.products} page` },
    { label: t.features, href: '/features', ariaLabel: `${t.features} page` },
    { label: t.pricing, href: '/pricing', ariaLabel: `${t.pricing} page` },
    { label: t.about, href: '/about', ariaLabel: `${t.about} page` },
    { label: t.contact, href: '/contact', ariaLabel: `${t.contact} page` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <NavigationHeader
        logo={{
          src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Logo',
          alt: 'Company Logo',
        }}
        links={navigationLinks}
        languages={languages}
        ctaButton={{
          label: t.cta,
          onClick: handleCtaClick,
        }}
        className="shadow-lg"
      />

      {/* Contenuto della pagina */}
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {t.welcome}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* Demo Controls */}
          <div className="max-w-md mx-auto mb-12 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Demo Controls</h2>

            <div className="space-y-4">
              {/* Language Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Language
                </label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="font-mono text-blue-600">
                    {currentLanguage.toUpperCase()} -{' '}
                    {languages.options.find((l) => l.code === currentLanguage)?.label}
                  </span>
                </div>
              </div>

              {/* Auth Toggle */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAuthenticated}
                    onChange={(e) => setIsAuthenticated(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Simula utente autenticato
                  </span>
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  Cambia il testo del bottone CTA
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Multi-lingua',
                description: 'Supporto completo per internazionalizzazione',
                icon: '🌍',
              },
              {
                title: 'Responsive',
                description: 'Ottimizzato per tutti i dispositivi',
                icon: '📱',
              },
              {
                title: 'Accessibile',
                description: 'WCAG 2.1 compliant con ARIA labels',
                icon: '♿',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Code Example */}
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="text-white text-lg font-semibold mb-4">
              Esempio di Integrazione
            </h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
              {`<NavigationHeader
  logo={{ src: "/logo.png", alt: "Logo" }}
  links={translatedLinks}
  languages={{
    current: currentLang,
    options: availableLanguages,
    onChange: handleLanguageChange
  }}
  ctaButton={{
    label: isAuth ? "Dashboard" : "Sign Up",
    onClick: handleCta
  }}
/>`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdvancedExample;
