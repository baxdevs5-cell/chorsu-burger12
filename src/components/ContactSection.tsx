import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
  onSuccessToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  onSuccessToast,
}) => {
  const t = translations[currentLang];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(currentLang === 'uz' ? 'Iltimos, ismingizni kiriting.' : currentLang === 'ru' ? 'Пожалуйста, введите ваше имя.' : 'Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError(currentLang === 'uz' ? 'Iltimos, to‘g‘ri telefon raqam kiriting.' : currentLang === 'ru' ? 'Пожалуйста, введите корректный номер телефона.' : 'Please enter a valid phone number.');
      return;
    }
    if (!message.trim()) {
      setError(currentLang === 'uz' ? 'Iltimos, xabaringizni yozing.' : currentLang === 'ru' ? 'Пожалуйста, напишите ваше сообщение.' : 'Please enter your message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(t.contactSuccess);
      setName('');
      setPhone('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Phone className="w-4 h-4" />
            <span>{t.navContact} · Biz bilan aloqa</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-balance">
            {t.contactHeading}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Xabar qoldiring
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-display text-lg font-bold text-emerald-800 dark:text-emerald-200">
                  {t.contactSuccess}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Tez orada operatorimiz siz bilan bog‘lanadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    {t.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    {t.phoneLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    {t.messageLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.sending : t.sendBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase font-bold text-zinc-400">
                  {t.addressTitle}
                </div>
                <div className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {t.addressValue}
                </div>
                <div className="text-xs text-zinc-500">Mo‘ljal: Chorsu metrosi, 1-chi chiqish</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase font-bold text-zinc-400">
                  {t.hoursTitle}
                </div>
                <div className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {t.hoursValue}
                </div>
                <div className="text-xs text-zinc-500">Dam olish kunlarisiz, tunu kun tezkor oshxona</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase font-bold text-zinc-400">
                  Yagona aloqa markazi
                </div>
                <div className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
                  {t.phoneContact}
                </div>
                <div className="text-xs text-zinc-500">Buyurtma va savollar uchun 24/7 qo‘ng‘iroq qiling</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
