import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface PageLoaderProps {
  onLoaded: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoaded }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onLoaded, 400);
    }, 700);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white transition-opacity duration-400 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center space-y-4">
        {/* Animated Brand Emblem */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center shadow-2xl shadow-orange-500/40 animate-bounce">
          <Flame className="w-12 h-12 text-white fill-white" />
        </div>

        <div className="text-center">
          <h1 className="font-display text-2xl font-black tracking-tight text-white">
            CHORSU <span className="text-amber-500">BURGER</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mt-1 animate-pulse">
            Ta’mi esda qoladi · Yuklanmoqda...
          </p>
        </div>

        {/* Loading progress bar */}
        <div className="w-48 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
};
