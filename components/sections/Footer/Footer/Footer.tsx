import React from 'react';
import type { FooterProps } from './Footer.types';

/**
 * Footer - Footer completo con link columns e social media
 *
 * Componente footer completo con logo, tagline, colonne di link,
 * social media links, informazioni di contatto e legal links.
 *
 * @component
 */
export const Footer: React.FC<FooterProps> = ({
  logo,
  tagline,
  columns,
  socialLinks,
  contactInfo,
  legalLinks,
  copyright,
  className = '',
}) => {
  return (
    <footer
      className={`bg-gray-900 text-gray-300 ${className}`}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-4">
                {logo.src && (
                  <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
                )}
                {logo.text && (
                  <span className="text-xl font-bold text-white">
                    {logo.text}
                  </span>
                )}
              </div>

              {/* Tagline */}
              {tagline && (
                <p className="text-gray-400 mb-6 leading-relaxed">{tagline}</p>
              )}

              {/* Contact Info */}
              {contactInfo && (
                <div className="space-y-3 mb-6">
                  {contactInfo.address && (
                    <div className="flex items-start space-x-3">
                      <svg
                        className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">{contactInfo.address}</span>
                    </div>
                  )}
                  {contactInfo.email && (
                    <div className="flex items-center space-x-3">
                      <svg
                        className="h-5 w-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <svg
                        className="h-5 w-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Link Columns */}
            {columns.map((column, index) => (
              <div
                key={index}
                className={`lg:col-span-${
                  columns.length === 3 ? '2' : '3'
                } lg:col-span-2`}
              >
                <h3 className="text-white font-semibold mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400">{copyright}</p>

            {/* Legal Links */}
            {legalLinks && legalLinks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
