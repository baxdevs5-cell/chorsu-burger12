import React from 'react';
import { Flame, CheckCircle2, Award, Clock } from 'lucide-react';
import { Language, Product } from '../types';
import { translations } from '../data/translations';

interface BurgerSpotlightProps {
  currentLang: Language;
  onSelectBurger: (product: Product) => void;
  products: Product[];
}

export const BurgerSpotlight: React.FC<BurgerSpotlightProps> = ({
  currentLang,
  onSelectBurger,
  products,
}) => {
  const t = translations[currentLang];
  const featured = products.find((p) => p.id === 'chorsu-special') || products[0];

  return (
    <section id="burgers" className="py-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Award className="w-4 h-4 fill-amber-500" />
            <span>{t.navBurgers} · Master Craftsmanship</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-balance">
            {t.craftHeading}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Chorsu Burger retseptlari xalqaro burger madaniyati va sharqona saxovatning betakror uyg‘unligidir.
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Visual with Highlights */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-900 group">
              <img
                src={featured.image}
                alt={featured.name[currentLang]}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-1">
                  ⭐ {featured.badge ? featured.badge[currentLang] : 'Signature'}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black">
                  {featured.name[currentLang]}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mt-1">
                  {featured.description[currentLang]}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillar Craftsmanship Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-xs flex items-start gap-4 hover:border-amber-400 dark:hover:border-amber-600 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {t.craft1Title}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.craft1Desc} Har bir kotlet 180°C olovda qovurilib, go‘shtning ichki sharbati to‘liq saqlanadi.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-xs flex items-start gap-4 hover:border-amber-400 dark:hover:border-amber-600 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {t.craft2Title}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.craft2Desc} Fransuz brioş texnologiyasi bilan tayyorlanadigan sariyog‘li yumshoq bulochkalar.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-xs flex items-start gap-4 hover:border-amber-400 dark:hover:border-amber-600 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {t.craft3Title}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.craft3Desc} 7 xil maxfiy tabiiy ziravorlar va yangi tayyorlangan tomat-relish bazasi.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectBurger(featured)}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Ushbu burgerni tatib ko‘rish</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
