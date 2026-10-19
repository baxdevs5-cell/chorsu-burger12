import React, { useState, useEffect, useRef } from 'react';
import { Award, Gift, Sparkles, Play, RotateCcw, Check, Trophy } from 'lucide-react';
import { Language, BonusReward } from '../types';
import { translations } from '../data/translations';
import { bonusRewards } from '../data/products';

interface BonusQuestSectionProps {
  currentLang: Language;
  coins: number;
  onAddCoins: (amount: number, reason: string) => void;
  onClaimReward: (reward: BonusReward) => void;
  claimedRewardIds: string[];
}

interface TargetBurger {
  id: number;
  x: number; // percentage 10-85
  y: number; // percentage 10-80
  emoji: string;
}

export const BonusQuestSection: React.FC<BonusQuestSectionProps> = ({
  currentLang,
  coins,
  onAddCoins,
  onClaimReward,
  claimedRewardIds,
}) => {
  const t = translations[currentLang];

  // Mini-Game State
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameCoinsEarned, setGameCoinsEarned] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [targetBurger, setTargetBurger] = useState<TargetBurger | null>(null);
  const [floatingPops, setFloatingPops] = useState<{ id: number; x: number; y: number }[]>([]);

  const timerRef = useRef<number | null>(null);
  const popCounter = useRef(0);

  // Spawn a burger inside the game arena
  const spawnBurger = () => {
    const emojis = ['🍔', '🍔', '🍔', '🍟', '🧀'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const x = Math.floor(Math.random() * 75) + 10;
    const y = Math.floor(Math.random() * 65) + 15;
    setTargetBurger({
      id: Date.now(),
      x,
      y,
      emoji,
    });
  };

  const startGame = () => {
    setGameOver(false);
    setGameCoinsEarned(0);
    setTimeLeft(30);
    setGameActive(true);
    spawnBurger();
  };

  // Timer countdown effect
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameOver(true);
      setTargetBurger(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameActive, timeLeft]);

  // Handle catching the burger
  const handleCatchBurger = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameActive || !targetBurger) return;

    // Trigger visual pop animation
    const rect = e.currentTarget.getBoundingClientRect();
    const newPop = {
      id: popCounter.current++,
      x: targetBurger.x,
      y: targetBurger.y,
    };
    setFloatingPops((prev) => [...prev, newPop]);
    setTimeout(() => {
      setFloatingPops((prev) => prev.filter((p) => p.id !== newPop.id));
    }, 800);

    // Increment coins
    setGameCoinsEarned((prev) => prev + 10);
    onAddCoins(10, 'Burger Catch mini-game!');

    // Re-spawn next burger immediately
    spawnBurger();
  };

  // Progress Calculation (Target max 500)
  const maxTarget = 500;
  const progressPercent = Math.min(Math.round((coins / maxTarget) * 100), 100);

  return (
    <section id="bonuses" className="py-20 bg-gradient-to-b from-amber-500/5 via-orange-500/10 to-transparent dark:from-zinc-900/60 dark:to-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4 fill-amber-500" />
            <span>Loyalty & Game Station</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-balance">
            {t.questTitle}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            {t.questSubtitle}
          </p>
        </div>

        {/* User Coins HUD Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Coins Balance Box */}
            <div className="md:col-span-5 flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/30">
                🪙
              </div>
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">
                  {t.myCoins}
                </div>
                <div className="font-display font-black text-4xl sm:text-5xl text-amber-500 font-mono tabular-nums">
                  {coins}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  100 coin = bepul ichimlik yoki chegirma
                </div>
              </div>
            </div>

            {/* Progress Bar & Milestones */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-600 dark:text-zinc-400">Umumiy progress</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono tabular-nums">{coins} / 500 Coin ({progressPercent}%)</span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 p-0.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Tier steps */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-center pt-1">
                <div className={`p-2 rounded-lg border ${coins >= 100 ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                  100 Coin: Ichimlik
                </div>
                <div className={`p-2 rounded-lg border ${coins >= 250 ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                  250 Coin: 10% Chegirma
                </div>
                <div className={`p-2 rounded-lg border ${coins >= 500 ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                  500 Coin: Chorsu Combo
                </div>
              </div>
            </div>

          </div>

          {/* Quick Ways to Earn Info */}
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="font-bold text-zinc-800 dark:text-zinc-200">{t.howToEarn}</span>
            <span>👀 {t.earnLook}</span>
            <span>🛒 {t.earnCart}</span>
            <span>🎮 {t.earnGame}</span>
            <span>📦 {t.earnOrder}</span>
          </div>
        </div>

        {/* 3 Reward Cards with Claim Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bonusRewards.map((reward) => {
            const isClaimed = claimedRewardIds.includes(reward.id);
            const canClaim = coins >= reward.coinsRequired;

            return (
              <div
                key={reward.id}
                className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between bg-white dark:bg-zinc-900 ${
                  canClaim
                    ? 'border-amber-400/80 shadow-lg shadow-amber-500/10'
                    : 'border-zinc-200 dark:border-zinc-800 opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold">
                      🪙 {reward.coinsRequired} Coin
                    </span>
                    <Gift className={`w-5 h-5 ${canClaim ? 'text-amber-500' : 'text-zinc-400'}`} />
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    {reward.title[currentLang]}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {reward.description[currentLang]}
                  </p>
                </div>

                <div>
                  {isClaimed ? (
                    <div className="w-full py-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>{t.claimed} ({reward.code})</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onClaimReward(reward)}
                      disabled={!canClaim}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        canClaim
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 active:scale-98'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>{canClaim ? t.claimBonus : `${t.notEnoughCoins}`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE MINI-GAME: BURGER CATCH */}
        <div className="bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-amber-500/40 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-xl mx-auto text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Trophy className="w-4 h-4" />
              <span>Interaktiv O‘yin</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black">
              {t.gameTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              {t.gameDesc}
            </p>
          </div>

          {/* Game Status Dashboard */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 mb-6">
            <div className="text-center">
              <div className="text-xs text-zinc-400">{t.timeRemaining}</div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                {timeLeft}s
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-zinc-400">{t.score}</div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-yellow-300 tabular-nums">
                +{gameCoinsEarned} 🪙
              </div>
            </div>
          </div>

          {/* Game Arena Container */}
          <div className="relative w-full h-80 rounded-2xl bg-zinc-950/80 border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
            
            {!gameActive && !gameOver && (
              <div className="text-center space-y-4 p-6 z-10">
                <span className="text-6xl animate-bounce block">🍔</span>
                <p className="text-sm text-zinc-300 max-w-sm">
                  Burgerni bosganingizda u yangi joyga ko‘chadi va har safar 10 coin beriladi!
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{t.startGame}</span>
                </button>
              </div>
            )}

            {gameActive && targetBurger && (
              <>
                <button
                  onClick={handleCatchBurger}
                  style={{
                    position: 'absolute',
                    left: `${targetBurger.x}%`,
                    top: `${targetBurger.y}%`,
                  }}
                  className="text-5xl sm:text-6xl transform -translate-x-1/2 -translate-y-1/2 cursor-pointer active:scale-90 hover:scale-110 transition-transform focus:outline-none drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)] select-none animate-bounce"
                  aria-label="Catch burger"
                >
                  {targetBurger.emoji}
                </button>

                {/* Floating Coin Pops */}
                {floatingPops.map((pop) => (
                  <div
                    key={pop.id}
                    style={{
                      left: `${pop.x}%`,
                      top: `${pop.y}%`,
                    }}
                    className="absolute pointer-events-none transform -translate-x-1/2 text-amber-400 font-mono font-black text-xl animate-pop-coin z-20"
                  >
                    +10 🪙
                  </div>
                ))}
              </>
            )}

            {gameOver && (
              <div className="text-center space-y-4 p-6 z-10 animate-in fade-in">
                <span className="text-6xl block">🎉</span>
                <h4 className="font-display text-2xl font-black text-amber-400">
                  {t.gameOver}
                </h4>
                <p className="text-base text-zinc-200">
                  {t.gameResult.replace('{score}', String(gameCoinsEarned))}
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.playAgain}</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
