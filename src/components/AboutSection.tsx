import React from 'react';
import { Users, UtensilsCrossed, Star, CheckCircle2, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="about" className="py-20 bg-zinc-50/50 dark:bg-zinc-900/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Heart className="w-4 h-4 fill-amber-500" />
            <span>Tariximiz va falsafamiz</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-balance">
            {t.aboutHeading}
          </h2>
          <p className="font-display text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 italic">
            “{t.aboutQuote}”
          </p>
        </div>

        {/* 3 Statistical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Stat 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm text-center space-y-3 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <div className="font-display font-black text-4xl text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
              {t.statCustomers}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Toshkent va butun respublika bo‘ylab mamnun mijozlarimiz va doimiy muxlislarimiz.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm text-center space-y-3 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <div className="font-display font-black text-4xl text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
              {t.statBurgers}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Klassik, pishloqli, o‘tkir va tovuqli burgerlar hamda hamyonbop foydali kombolar.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm text-center space-y-3 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
              <Star className="w-7 h-7 fill-yellow-500" />
            </div>
            <div className="font-display font-black text-4xl text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
              {t.statTaste}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Yuqori sifatli tabiiy ingredientlar, 100% halollik va har doim yangi non kafolati.
            </p>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="bg-white dark:bg-zinc-800/90 rounded-3xl p-8 sm:p-12 border border-zinc-200 dark:border-zinc-700/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Chorsu ta’mini sevuvchilar uchun yaratilgan
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.aboutStory}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Har kuni o‘zimizda pishiriladigan xushbo‘y brioş nonlari</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Muzlatilmagan yangi mol go‘shti va halol sertifikat</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Tez va issiq yetkazib berish xizmati</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-zinc-100 dark:border-zinc-700">
              <img
                src="/src/assets/images/chorsu_classic_burger_1792402611764.jpg"
                alt="Chorsu Burger Kitchen Craft"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
