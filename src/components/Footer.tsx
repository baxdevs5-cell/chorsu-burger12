import React from 'react';
import { Flame, ArrowUp, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="font-display font-black text-xl text-zinc-900 dark:text-zinc-100">
                CHORSU<span className="text-amber-500">BURGER</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
              {t.aboutQuote} Toshkentning eng sara fast-food restorani. Har kuni sifatli go‘sht, yangi non va ajoyib kayfiyat.
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{t.phoneContact}</span>
              <span>·</span>
              <span>{t.hoursValue}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-3">
              Sahifalar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-amber-500 cursor-pointer">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-amber-500 cursor-pointer">
                  {t.navMenu}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('burgers')} className="hover:text-amber-500 cursor-pointer">
                  {t.navBurgers}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('bonuses')} className="hover:text-amber-500 cursor-pointer">
                  {t.navBonuses}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-amber-500 cursor-pointer">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-amber-500 cursor-pointer">
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* School Project Info & Back to Top */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Loyiha haqida
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Ushbu veb-sayt maktab loyihasi uchun eng zamonaviy web-standartlar, real interaktivlik va yuqori estetikada yaratilgan.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Yuqoriga qaytish</span>
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-1">
            <span>Yaratildi:</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Chorsu Burger jamoasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
