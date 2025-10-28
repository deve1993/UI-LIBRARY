'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import type { FooterMinimalProps } from './FooterMinimal.types';

export const FooterMinimal: React.FC<FooterMinimalProps> = ({
  logo,
  tagline = 'Building the future, one line at a time.',
  links = [],
  socialLinks = [],
  copyrightText,
  variant = 'dark',
  showBackToTop = true,
  className = '',
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} All rights reserved.`;

  const isDark = variant === 'dark';

  return (
    <footer
      className={`relative ${
        isDark
          ? 'bg-gray-900 text-gray-300'
          : 'bg-gray-50 text-gray-600'
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Left: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            {logo && (
              <div className="mb-4 transition-transform hover:scale-105">
                {logo}
              </div>
            )}
            <p
              className={`max-w-xs text-center text-sm md:text-left ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {tagline}
            </p>
          </div>

          {/* Center: Quick Links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`text-sm transition-all duration-200 hover:translate-y-[-2px] ${
                    isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right: Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className={`transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          className={`my-8 h-px ${
            isDark ? 'bg-gray-800' : 'bg-gray-200'
          }`}
        />

        {/* Bottom: Copyright */}
        <div className="flex items-center justify-center">
          <p
            className={`text-center text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            {copyrightText || defaultCopyright}
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed bottom-8 right-8 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            isDark
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};
