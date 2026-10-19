import React, { useState, useEffect } from 'react';
import { Language, Theme, Product, CartItem, ToastMessage, BonusReward } from './types';
import { products, bonusRewards } from './data/products';
import { translations } from './data/translations';
import { BackgroundFloating } from './components/BackgroundFloating';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BurgerSpotlight } from './components/BurgerSpotlight';
import { BonusQuestSection } from './components/BonusQuestSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';
import { PageLoader } from './components/PageLoader';
import { Footer } from './components/Footer';

export default function App() {
  // Page Loader State
  const [isLoaded, setIsLoaded] = useState(false);

  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('chorsu_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Language State
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('chorsu_lang');
    if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
    return 'uz';
  });

  // Coins State (Default 0 as requested, saved in localStorage)
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('chorsu_coins');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Claimed Rewards IDs State
  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chorsu_claimed_rewards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chorsu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart Drawer & Checkout Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [appliedVoucherCode, setAppliedVoucherCode] = useState('');

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Active section for navbar scrollspy
  const [activeSection, setActiveSection] = useState('hero');

  // Track inspected items in this session to award coins only once per item
  const [inspectedProductIds, setInspectedProductIds] = useState<Set<string>>(new Set());

  // Apply Theme class to document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('chorsu_theme', theme);
  }, [theme]);

  // Persist Language
  useEffect(() => {
    localStorage.setItem('chorsu_lang', currentLang);
  }, [currentLang]);

  // Persist Coins
  useEffect(() => {
    localStorage.setItem('chorsu_coins', coins.toString());
  }, [coins]);

  // Persist Claimed Rewards
  useEffect(() => {
    localStorage.setItem('chorsu_claimed_rewards', JSON.stringify(claimedRewardIds));
  }, [claimedRewardIds]);

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('chorsu_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scrollspy observer for active navbar link
  useEffect(() => {
    const sectionIds = ['hero', 'menu', 'burgers', 'bonuses', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'coin' | 'cart' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Coins with Toast
  const addCoins = (amount: number, reason: string) => {
    setCoins((prev) => prev + amount);
    showToast(`+${amount} 🪙 Bonus Coin! (${reason})`, 'coin');
  };

  // Add to Cart (+5 coins award)
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Reward 5 coins for cart action
    addCoins(5, 'Savatchaga qo‘shildi');
    showToast(`${product.name[currentLang]} savatchaga qo‘shildi!`, 'cart');
  };

  // Inspect Product (+2 coins award on first inspection)
  const handleInspectProduct = (product: Product) => {
    if (!inspectedProductIds.has(product.id)) {
      setInspectedProductIds((prev) => new Set(prev).add(product.id));
      addCoins(2, `${product.name[currentLang]} ko‘rildi`);
    }
  };

  // Cart Stepper
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove single item
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Theme Toggle with Toast
  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    showToast(nextTheme === 'dark' ? '🌙 Dark Mode yoqildi' : '☀️ Light Mode yoqildi', 'info');
  };

  // Claim Reward from Quest Section
  const handleClaimReward = (reward: BonusReward) => {
    if (coins < reward.coinsRequired) {
      showToast('Kechirasiz, coinlar yetarli emas!', 'info');
      return;
    }

    // Mark as claimed and deduct coins
    setCoins((prev) => prev - reward.coinsRequired);
    setClaimedRewardIds((prev) => [...prev, reward.id]);

    // If it has a discount, automatically apply it to cart
    if (reward.discountPercentage) {
      setAppliedDiscountPercent(reward.discountPercentage);
      setAppliedVoucherCode(reward.code);
    }

    showToast(`🎉 Tabriklaymiz! "${reward.title[currentLang]}" kodi: ${reward.code}`, 'success');
  };

  // Promo code verification handler inside cart
  const handleApplyVoucher = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CHORSU10') {
      setAppliedDiscountPercent(10);
      setAppliedVoucherCode('CHORSU10');
      return { success: true, discount: 10, msg: '10% chegirma muvaffaqiyatli qo‘llandi!' };
    }
    if (cleanCode === 'KING-CHORSU-500') {
      setAppliedDiscountPercent(25);
      setAppliedVoucherCode('KING-CHORSU-500');
      return { success: true, discount: 25, msg: '25% King Chorsu chegirmasi qo‘llandi!' };
    }
    if (cleanCode === 'FREE-DRINK-100') {
      setAppliedDiscountPercent(5);
      setAppliedVoucherCode('FREE-DRINK-100');
      return { success: true, discount: 5, msg: 'Bepul ichimlik vaucheri faollashtirildi!' };
    }
    return { success: false, discount: 0, msg: 'Bunday kod topilmadi yoki muddati o‘tgan' };
  };

  // Open Checkout Modal
  const handleProceedToCheckout = (discount: number, voucher: string) => {
    setAppliedDiscountPercent(discount);
    setAppliedVoucherCode(voucher);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // On successful order
  const handleOrderSuccess = (orderId: string) => {
    // Award 50 bonus coins for completing an order
    addCoins(50, `Buyurtma #${orderId}`);
    setCartItems([]);
    setAppliedDiscountPercent(0);
    setAppliedVoucherCode('');
    showToast(`Buyurtma muvaffaqiyatli qabul qilindi! Raqam: ${orderId}`, 'success');
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-amber-400 selection:text-zinc-900 transition-colors duration-200">
      
      {/* 1. Initial Page Loader */}
      {!isLoaded && <PageLoader onLoaded={() => setIsLoaded(true)} />}

      {/* 2. Interactive Subtle Animated Background */}
      <BackgroundFloating />

      {/* 3. Sticky Responsive Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        coins={coins}
        activeSection={activeSection}
      />

      {/* Main Content Sections (All 6 core sections) */}
      <main className="relative z-10">
        {/* Section 1: Bosh sahifa (Hero) */}
        <Hero currentLang={currentLang} />

        {/* Section 2: Menyu (Menu with search & filter) */}
        <MenuSection
          currentLang={currentLang}
          onAddToCart={handleAddToCart}
          onInspectProduct={handleInspectProduct}
        />

        {/* Section 3: Burgerlar (Signature Craftsmanship) */}
        <BurgerSpotlight
          currentLang={currentLang}
          onSelectBurger={handleAddToCart}
          products={products}
        />

        {/* Section 4: Bonuslar (Burger Quest & Mini-Game) */}
        <BonusQuestSection
          currentLang={currentLang}
          coins={coins}
          onAddCoins={addCoins}
          onClaimReward={handleClaimReward}
          claimedRewardIds={claimedRewardIds}
        />

        {/* Section 5: Biz haqimizda (About & Stats) */}
        <AboutSection currentLang={currentLang} />

        {/* Section 6: Aloqa (Contact Form) */}
        <ContactSection
          currentLang={currentLang}
          onSuccessToast={(msg) => showToast(msg, 'success')}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentLang={currentLang}
        onProceedToCheckout={handleProceedToCheckout}
        appliedDiscountPercent={appliedDiscountPercent}
        appliedVoucherCode={appliedVoucherCode}
        onApplyVoucher={handleApplyVoucher}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscountPercent={appliedDiscountPercent}
        appliedVoucherCode={appliedVoucherCode}
        currentLang={currentLang}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Toast Feedback Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
