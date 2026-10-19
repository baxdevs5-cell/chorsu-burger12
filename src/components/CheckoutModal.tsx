import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Coins, MapPin, Phone, User, CreditCard, Banknote } from 'lucide-react';
import { CartItem, Language, OrderDetails } from '../types';
import { translations } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscountPercent: number;
  appliedVoucherCode: string;
  currentLang: Language;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscountPercent,
  appliedVoucherCode,
  currentLang,
  onOrderSuccess,
}) => {
  const t = translations[currentLang];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'payme' | 'click'>('cash');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError(currentLang === 'uz' ? 'Iltimos, ismingizni kiriting.' : 'Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError(currentLang === 'uz' ? 'Iltimos, telefon raqamingizni kiriting.' : 'Please enter your phone number.');
      return;
    }
    if (!address.trim()) {
      setError(currentLang === 'uz' ? 'Iltimos, yetkazib berish manzilini kiriting.' : 'Please enter delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = `CB-${Math.floor(10000 + Math.random() * 90000)}`;
      setIsSubmitting(false);
      setOrderConfirmedId(generatedOrderId);
      onOrderSuccess(generatedOrderId);
    }, 800);
  };

  const handleFinish = () => {
    setOrderConfirmedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={orderConfirmedId ? handleFinish : onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmedId ? (
          /* Checkout Form */
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-display text-2xl font-black text-zinc-900 dark:text-zinc-50">
                {t.checkoutTitle}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Buyurtmangiz 25-35 daqiqada issiq holda yetkazib beriladi
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.nameLabel}</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.phoneLabel}</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.deliveryAddress}</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.addressPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  {t.paymentMethod}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cash', label: t.payCash, icon: Banknote },
                    { id: 'card', label: t.payCard, icon: CreditCard },
                    { id: 'payme', label: 'Payme', icon: CreditCard },
                    { id: 'click', label: 'Click', icon: CreditCard },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    const active = paymentMethod === pm.id;
                    return (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          active
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  {t.orderNotes}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.orderNotesPlaceholder}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Summary box */}
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-xs space-y-1">
                <div className="flex justify-between text-zinc-500">
                  <span>Mahsulotlar soni:</span>
                  <span className="font-bold">{items.reduce((a, b) => a + b.quantity, 0)} ta</span>
                </div>
                {appliedVoucherCode && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Chegirma:</span>
                    <span>-{discountAmount.toLocaleString()} {t.priceUzs} ({appliedVoucherCode})</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-zinc-900 dark:text-zinc-100 pt-1 border-t border-zinc-200 dark:border-zinc-700">
                  <span>To‘lov summasi:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                    {total.toLocaleString()} {t.priceUzs}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                {isSubmitting ? 'Rasmiylashtirilmoqda...' : t.confirmOrder}
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmed Success Screen */
          <div className="p-8 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-black text-zinc-900 dark:text-white">
                {t.orderSuccessTitle}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                {t.orderSuccessDesc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">{t.orderIdText}:</span>
                <span className="font-mono font-bold text-amber-500 text-sm">{orderConfirmedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Taxminiy vaqt:</span>
                <span className="font-bold flex items-center gap-1 text-zinc-800 dark:text-zinc-200">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  25–35 daqiqa
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">To‘lov holati:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                  {total.toLocaleString()} {t.priceUzs} ({paymentMethod.toUpperCase()})
                </span>
              </div>
            </div>

            {/* Coin reward banner */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center text-lg shrink-0">
                🪙
              </div>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
                {t.earnedCoinsText}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md"
            >
              {t.close}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
