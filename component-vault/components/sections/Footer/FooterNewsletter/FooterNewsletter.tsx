'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { FooterNewsletterProps } from './FooterNewsletter.types';

export const FooterNewsletter: React.FC<FooterNewsletterProps> = ({
  logo,
  newsletterConfig = {
    title: 'Stay in the loop',
    description: 'Subscribe to our newsletter for the latest updates and exclusive offers.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },
  quickLinks = [],
  socialLinks = [],
  copyrightText,
  variant = 'dark',
  showWave = true,
  gradientColors = {
    from: 'from-blue-600',
    via: 'via-purple-600',
    to: 'to-pink-600',
  },
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    if (newsletterConfig.onSubmit) {
      await newsletterConfig.onSubmit(email);
    }
    setEmail('');
    setIsSubmitting(false);
  };

  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} All rights reserved.`;

  const isDark = variant === 'dark';

  return (
    <footer className={`relative overflow-hidden ${className}`}>
      {/* Wave SVG */}
      {showWave && (
        <div className="absolute inset-x-0 top-0 -translate-y-full">
          <svg
            className="w-full"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className={
                isDark ? 'fill-gray-900' : 'fill-gray-50'
              }
            />
          </svg>
        </div>
      )}

      {/* Main Footer */}
      <div
        className={`relative ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        {/* Newsletter Section with Gradient */}
        <div
          className={`bg-gradient-to-r ${gradientColors.from} ${
            gradientColors.via || ''
          } ${gradientColors.to} py-16`}
        >
          <div className="mx-auto max-w-4xl px-6 text-center">
            {logo && (
              <div className="mb-6 flex justify-center">{logo}</div>
            )}
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              {newsletterConfig.title}
            </h2>
            <p className="mb-8 text-lg text-white/90">
              {newsletterConfig.description}
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterConfig.placeholder}
                className="flex-1 rounded-lg border-0 px-6 py-4 text-gray-900 shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-gray-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50"
              >
                <span>{newsletterConfig.buttonText}</span>
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Links & Social Section */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Quick Links */}
            {quickLinks.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-6">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-sm font-medium transition-all hover:-translate-y-0.5 ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className={`rounded-full p-2 transition-all hover:scale-110 ${
                      isDark
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'bg-white text-gray-600 shadow hover:text-gray-900 hover:shadow-md'
                    }`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Copyright */}
          <div
            className={`mt-8 border-t pt-8 text-center ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              {copyrightText || defaultCopyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
