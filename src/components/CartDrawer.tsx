import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { CartItem, Language, Product } from '../types';
import { translations } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentLang: Language;
  onProceedToCheckout: (appliedDiscountPercent: number, appliedVoucher: string) => void;
  appliedDiscountPercent: number;
  appliedVoucherCode: string;
  onApplyVoucher: (code: string) => { success: boolean; discount: number; msg: string };
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentLang,
  onProceedToCheckout,
  appliedDiscountPercent,
  appliedVoucherCode,
  onApplyVoucher,
}) => {
  const t = translations[currentLang];
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const res = onApplyVoucher(promoInput.trim());
    if (res.success) {
      setPromoMessage({ text: res.msg, isError: false });
    } else {
      setPromoMessage({ text: res.msg, isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100">
                {t.cartTitle}
              </h2>
              {items.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                  {items.reduce((acc, it) => acc + it.quantity, 0)}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <span className="text-6xl block">🛒</span>
                <h3 className="font-display font-bold text-lg text-zinc-800 dark:text-zinc-200">
                  {t.cartEmpty}
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {t.cartEmptySubtitle}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md"
                >
                  Menyuga qaytish
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-zinc-500 pb-1">
                  <span>Tanlangan taomlar</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    {t.clearCart}
                  </button>
                </div>

                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center gap-3.5"
                  >
                    <img
                      src={product.image}
                      alt={product.name[currentLang]}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-zinc-200"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {product.name[currentLang]}
                      </h4>
                      <div className="font-mono tabular-nums text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                        {product.price.toLocaleString()} {t.priceUzs}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.promoCodeLabel}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Masalan: CHORSU10"
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-xl text-xs font-bold"
                    >
                      {t.applyPromo}
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs font-medium ${promoMessage.isError ? 'text-red-500' : 'text-emerald-500'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                  {appliedVoucherCode && (
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Faol kupon: {appliedVoucherCode} (-{appliedDiscountPercent}%)
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Total */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/90 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>{t.subtotal}</span>
                  <span className="font-mono tabular-nums">{subtotal.toLocaleString()} {t.priceUzs}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>{t.discount} ({appliedDiscountPercent}%)</span>
                    <span className="font-mono tabular-nums">-{discountAmount.toLocaleString()} {t.priceUzs}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-zinc-100 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>{t.total}</span>
                  <span className="font-display font-black text-xl text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                    {total.toLocaleString()} {t.priceUzs}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onProceedToCheckout(appliedDiscountPercent, appliedVoucherCode)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-101 active:scale-99"
              >
                <span>{t.orderNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
