/**
 * Esempio Base - NavigationHeader
 *
 * Questo esempio mostra l'uso più semplice del componente NavigationHeader
 * con le configurazioni minime necessarie.
 */

import React from 'react';
import { NavigationHeader } from '../NavigationHeader';

export function BasicExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        logo={{
          text: 'MioBrand',
          alt: 'MioBrand Logo',
        }}
        links={[
          { label: 'Home', href: '/' },
          { label: 'Prodotti', href: '/prodotti' },
          { label: 'Servizi', href: '/servizi' },
          { label: 'Chi Siamo', href: '/chi-siamo' },
          { label: 'Contatti', href: '/contatti' },
        ]}
        ctaButton={{
          label: 'Inizia Ora',
          onClick: () => {
            console.log('Bottone CTA cliccato!');
            // Qui puoi gestire l'azione, ad esempio:
            // window.location.href = '/signup';
          },
        }}
      />

      {/* Contenuto della pagina */}
      <main className="pt-16">
        {/* pt-16 per compensare l'header fisso */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Benvenuto!
          </h1>
          <p className="text-lg text-gray-600">
            Questo è un esempio base del NavigationHeader. Scorri la pagina per
            vedere come l'header rimane fisso in alto.
          </p>

          {/* Contenuto aggiuntivo per testare lo scroll */}
          <div className="mt-8 space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">
                  Sezione {i + 1}
                </h2>
                <p className="text-gray-600">
                  Contenuto di esempio per dimostrare lo scroll. L'header
                  dovrebbe rimanere fisso in alto durante lo scroll della
                  pagina.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default BasicExample;
