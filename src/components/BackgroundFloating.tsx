import React from 'react';

export const BackgroundFloating: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-400/10 dark:bg-amber-500/5 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-orange-500/10 dark:bg-orange-600/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-yellow-400/10 dark:bg-yellow-500/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating subtle food illustration SVGs and particles */}
      {/* 1. Burger Icon floating top left */}
      <div className="absolute top-28 left-[6%] animate-float-slow opacity-25 dark:opacity-15 text-amber-500">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11a8 8 0 0 1 16 0H4Z" />
          <path d="M3 15h18" />
          <path d="M4 18h16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" />
          <path d="m8 11 .5 1" />
          <path d="m12 11 .5 1" />
          <path d="m16 11 .5 1" />
        </svg>
      </div>

      {/* 2. Cheese Slice floating mid right */}
      <div className="absolute top-72 right-[8%] animate-float-reverse opacity-25 dark:opacity-15 text-orange-400">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 19h20L19 7H5L2 19zm14-7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-6 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-4-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" opacity="0.8"/>
        </svg>
      </div>

      {/* 3. Tomato slice / fresh ingredient floating mid left */}
      <div className="absolute top-[48%] left-[4%] animate-float-slow opacity-20 dark:opacity-15 text-red-400" style={{ animationDelay: '3s' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6a6 6 0 0 1 6 6" strokeDasharray="2 2" />
          <circle cx="9" cy="10" r="1.5" fill="currentColor" />
          <circle cx="14" cy="10" r="1.5" fill="currentColor" />
          <circle cx="11.5" cy="15" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* 4. Golden French Fries floating lower right */}
      <div className="absolute top-[68%] right-[5%] animate-float-reverse opacity-25 dark:opacity-15 text-yellow-500" style={{ animationDelay: '1.5s' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 10V4h2v6M10 10V2h2v8M14 10V5h2v5" />
          <path d="M5 10h14l-2 11H7L5 10Z" />
        </svg>
      </div>

      {/* 5. Floating Sparkle particles */}
      <div className="absolute top-44 left-1/3 animate-float-slow opacity-30 dark:opacity-20 text-amber-400" style={{ animationDelay: '2.5s' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-300" />
      </div>
      <div className="absolute top-96 right-1/4 animate-float-reverse opacity-25 dark:opacity-15 text-orange-400" style={{ animationDelay: '4.5s' }}>
        <div className="w-2 h-2 rounded-full bg-orange-400 shadow-sm shadow-orange-300" />
      </div>
      <div className="absolute bottom-40 left-1/5 animate-float-slow opacity-25 dark:opacity-15 text-yellow-400" style={{ animationDelay: '1s' }}>
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
      </div>

      {/* 6. Beverage Cup Icon floating near footer */}
      <div className="absolute bottom-24 right-1/6 animate-float-slow opacity-20 dark:opacity-10 text-amber-500">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 8h12l-1.5 12h-9L6 8Z" />
          <path d="M5 8h14" />
          <path d="M12 2v6" />
          <path d="M16 2l-4 6" />
        </svg>
      </div>
    </div>
  );
};
