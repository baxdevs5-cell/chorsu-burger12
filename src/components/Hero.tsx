import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10">
            {/* Editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Chorsu Fast Food Cafe · Est. 2026</span>
            </div>

            {/* Main Display Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.08] text-balance">
                CHORSU <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">BURGER</span>
              </h1>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-500 dark:text-amber-400 italic">
                “{t.heroTagline}”
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.viewMenu}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('bonuses')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-amber-400/80 dark:border-amber-500/70 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-extrabold text-base tracking-wide hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🪙 {t.getBonuses}</span>
              </button>
            </div>

            {/* Trust Markers Bar (Clean unboxed metadata) */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-3 gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.featureHalal}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.featureSpeed}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Award className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{t.featureFresh}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient radial glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-orange-400/30 to-yellow-300/20 rounded-3xl blur-2xl transform scale-95" />

            <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 dark:border-zinc-800/60 bg-zinc-900 group">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_chorsu_burger_1792402611169.jpg"
                  alt="Chorsu Burger Signature Gourmet Cheeseburger"
                  referrerPolicy="no-referrer"
                  className={`w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                /* Fallback container */
                <div className="w-full aspect-[4/3] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-700 via-orange-800 to-zinc-900 text-white text-center">
                  <span className="text-6xl mb-3">🍔</span>
                  <h3 className="font-display text-2xl font-black">CHORSU BURGER</h3>
                  <p className="text-sm text-amber-200 mt-1">{t.heroTagline}</p>
                </div>
              )}

              {/* Floating Quality Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-zinc-900/90 backdrop-blur-md border border-white/10 text-white rounded-2xl p-3.5 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-2xl shrink-0">
                  🔥
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    {t.statTaste}
                  </div>
                  <div className="font-display font-black text-sm sm:text-base text-zinc-100">
                    Olovda pishirilgan taomlar
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
