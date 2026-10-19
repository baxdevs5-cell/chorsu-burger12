import React from 'react';
import { CheckCircle2, ShoppingBag, Sparkles, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bgStyle = 'bg-zinc-900/95 dark:bg-white/95 text-white dark:text-zinc-900 border-zinc-800';

        if (toast.type === 'coin') {
          Icon = Sparkles;
          bgStyle = 'bg-amber-600 dark:bg-amber-500 text-white border-amber-400';
        } else if (toast.type === 'cart') {
          Icon = ShoppingBag;
          bgStyle = 'bg-orange-600 dark:bg-orange-500 text-white border-orange-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${bgStyle}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className="w-5 h-5 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold truncate">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-75 hover:opacity-100 transition-opacity"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
