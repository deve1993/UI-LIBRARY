import React, { useState } from 'react';
import type { NavigationHeaderProps } from './NavigationHeader.types';

/**
 * NavigationHeader - Header di navigazione fisso responsive
 *
 * Componente header completo con:
 * - Logo e brand text
 * - Menu di navigazione responsive
 * - Selettore di lingua con dropdown
 * - Bottone CTA principale
 * - Menu mobile con hamburger icon
 *
 * @example
 * ```tsx
 * <NavigationHeader
 *   logo={{ text: "MioBrand", alt: "Logo" }}
 *   links={[
 *     { label: "Home", href: "/" },
 *     { label: "Prodotti", href: "/prodotti" }
 *   ]}
 *   ctaButton={{ label: "Inizia ora", onClick: () => {} }}
 * />
 * ```
 */
export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  logo,
  links,
  languages,
  ctaButton,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm ${className}`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center space-x-2"
              aria-label={logo.alt}
            >
              {logo.src && (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto"
                />
              )}
              {logo.text && (
                <span className="text-xl font-bold text-gray-900">
                  {logo.text}
                </span>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                aria-label={link.ariaLabel}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Language Switcher + CTA */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Language Switcher */}
            {languages && (
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Select language"
                  aria-expanded={languageMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="text-sm font-medium uppercase">
                    {languages.current}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      languageMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Language Dropdown */}
                {languageMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                  >
                    <div className="py-1">
                      {languages.options.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            languages.onChange?.(lang.code);
                            setLanguageMenuOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                            lang.code === languages.current
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700'
                          }`}
                          role="menuitem"
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={ctaButton.onClick}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {ctaButton.label}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pb-3 pt-2">
            <div className="space-y-1 px-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  aria-label={link.ariaLabel}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 px-2 space-y-2">
              {languages && (
                <div className="space-y-1">
                  {languages.options.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => languages.onChange?.(lang.code)}
                      className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                        lang.code === languages.current
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={ctaButton.onClick}
                className="w-full rounded-lg bg-blue-600 px-6 py-2 text-base font-semibold text-white shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                {ctaButton.label}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavigationHeader;
