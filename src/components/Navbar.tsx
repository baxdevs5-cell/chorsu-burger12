import React, { useState } from 'react';
import { ShoppingBag, Sun, Moon, Menu as MenuIcon, X, Flame } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  cartCount: number;
  onOpenCart: () => void;
  coins: number;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  theme,
  onThemeToggle,
  cartCount,
  onOpenCart,
  coins,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const navLinks = [
    { id: 'hero', label: t.navHome },
    { id: 'menu', label: t.navMenu },
    { id: 'burgers', label: t.navBurgers },
    { id: 'bonuses', label: t.navBonuses },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-amber-200/50 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group text-left focus:outline-none"
          aria-label="Chorsu Burger Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1">
              CHORSU<span className="text-amber-500">BURGER</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
              {t.heroTagline}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Coins, Cart, Theme, Lang, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Coins Pill Counter */}
          <button
            onClick={() => scrollToSection('bonuses')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 font-semibold text-xs sm:text-sm hover:scale-105 transition-transform shadow-xs"
            title={t.questTitle}
            aria-label={`${coins} bonus coins`}
          >
            <span className="text-base leading-none">🪙</span>
            <span className="font-mono tabular-nums font-bold">{coins}</span>
            <span className="hidden sm:inline text-xs opacity-75">{t.coins}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-700" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="relative inline-flex items-center">
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="text-xs sm:text-sm font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 py-1.5 px-2 cursor-pointer focus:outline-none border border-zinc-200 dark:border-zinc-700"
              aria-label="Select Language"
            >
              <option value="uz">🇺🇿 UZ</option>
              <option value="ru">🇷🇺 RU</option>
              <option value="en">🇬🇧 EN</option>
            </select>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-md shadow-orange-500/20 hover:scale-105 transition-all duration-150 focus:outline-none"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center px-1 shadow-sm border-2 border-white dark:border-zinc-900 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle (☰) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/98 dark:bg-zinc-950/98 px-4 pt-3 pb-6 shadow-xl transition-all">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold text-left transition-colors ${
                  activeSection === link.id
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-zinc-400">→</span>
              </button>
            ))}

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-2">
              <span className="text-xs text-zinc-500">{t.myCoins}:</span>
              <span className="font-bold text-amber-500 text-sm">🪙 {coins} {t.coins}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
