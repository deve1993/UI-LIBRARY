/**
 * ContactSection Component
 * @component
 */
import React, { useState, FormEvent } from 'react';
import type { ContactSectionProps } from './ContactSection.types';

/**
 * ContactSection - Form di contatto con validazione e progress bar
 *
 * @component
 */

export const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  onSubmit,
  socialProof,
  privacyPolicyUrl,
  className = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  // Calculate form completion progress
  const calculateProgress = () => {
    const fields = ['name', 'email', 'message', 'privacyAccepted'];
    const completed = fields.filter((field) => {
      if (field === 'privacyAccepted') return formData.privacyAccepted;
      return formData[field as keyof ContactFormData]?.toString().trim() !== '';
    }).length;
    return (completed / fields.length) * 100;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome richiesto';
    if (!formData.email.trim()) {
      newErrors.email = 'Email richiesta';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }
    if (!formData.message.trim()) newErrors.message = 'Messaggio richiesto';
    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = 'Devi accettare la privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        privacyAccepted: false,
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const progress = calculateProgress();

  return (
    <section
      className={`py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              id="contact-title"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Completamento del modulo
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 md:p-12 shadow-2xl border border-gray-100"
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
                  placeholder="Mario Rossi"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
                  placeholder="mario.rossi@esempio.it"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Company & Phone (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Azienda
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    placeholder="La tua azienda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    placeholder="+39 123 456 7890"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Messaggio *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors resize-none`}
                  placeholder="Come possiamo aiutarti?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Accetto la{' '}
                    {privacyPolicyUrl ? (
                      <a
                        href={privacyPolicyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        privacy policy
                      </a>
                    ) : (
                      <span className="text-blue-600">privacy policy</span>
                    )}{' '}
                    *
                  </span>
                </label>
                {errors.privacyAccepted && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.privacyAccepted}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                  <p className="text-green-800 text-center font-medium">
                    ✓ Messaggio inviato con successo! Ti risponderemo presto.
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                  <p className="text-red-800 text-center font-medium">
                    ✗ Si è verificato un errore. Riprova più tardi.
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Social Proof */}
          {socialProof && socialProof.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialProof.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white shadow-md border border-gray-100"
                >
                  <div className="text-blue-600">{metric.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
