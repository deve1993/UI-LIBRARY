'use client';

import React from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import type { FooterMegaProps } from './FooterMega.types';

export const FooterMega: React.FC<FooterMegaProps> = ({
  logo,
  description = 'We are committed to providing the best service and products to our customers worldwide.',
  columns = [],
  contactInfo,
  socialLinks = [],
  paymentMethods = [],
  legalLinks = [],
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
          : 'bg-gray-100 text-gray-700'
      } ${className}`}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-2">
            {logo && <div className="mb-6">{logo}</div>}
            <p
              className={`mb-6 text-sm leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {description}
            </p>

            {/* Contact Info */}
            {contactInfo && (
              <div className="space-y-3">
                {contactInfo.address && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span className="text-sm">{contactInfo.address}</span>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center gap-3">
                    <Mail
                      className={`h-5 w-5 flex-shrink-0 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className={`text-sm transition-colors ${
                        isDark
                          ? 'hover:text-white'
                          : 'hover:text-gray-900'
                      }`}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <Phone
                      className={`h-5 w-5 flex-shrink-0 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className={`text-sm transition-colors ${
                        isDark
                          ? 'hover:text-white'
                          : 'hover:text-gray-900'
                      }`}
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Columns 2-5: Link Columns */}
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3
                className={`mb-4 text-sm font-semibold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className={`group inline-flex items-center gap-2 text-sm transition-all ${
                        isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="transition-transform group-hover:translate-x-1">
                        {link.label}
                      </span>
                      {link.badge && (
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-6 lg:justify-start">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.name}
                className={`transition-all duration-300 hover:scale-110 ${
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

      {/* Bottom Bar */}
      <div
        className={`border-t ${
          isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* Copyright */}
            <p
              className={`text-center text-sm lg:text-left ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              {copyrightText || defaultCopyright}
            </p>

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isDark
                        ? 'text-gray-500 hover:text-gray-300'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="flex items-center gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`flex h-8 w-12 items-center justify-center rounded border ${
                      isDark
                        ? 'border-gray-700 bg-gray-800'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    title={method.name}
                  >
                    {method.icon}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed bottom-8 right-8 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};
