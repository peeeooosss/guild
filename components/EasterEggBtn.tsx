'use client';
import React, { useState } from 'react';

export default function EasterEggBtn() {
  const [clicked, setClicked] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const playLeak = () => {
    if (clicked) return;
    setClicked(true);
    setShowWarning(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        "Warning. You accessed a restricted Guild developer node. Typing in this chatbox is just the beginning. Our real-time voice calling neural network deploys to your smartphone next month. Prepare your aura.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.pitch = 0.8;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => setShowWarning(false), 4000);
  };

  return (
    <div className="relative">
      <button
        onClick={playLeak}
        disabled={clicked}
        className="animate-pulse rounded-full border border-red-500/40 bg-red-950/40 px-3 py-1 text-[11px] font-mono font-semibold tracking-wider text-red-400 shadow-lg transition hover:bg-red-900/50 disabled:animate-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        ⚠️ INTERNAL DEV ONLY: DO NOT CLICK
      </button>

      {showWarning && (
        <div className="absolute right-0 top-full mt-2 w-72 animate-in rounded-xl border border-red-500/20 bg-red-950/30 p-3 backdrop-blur-xl fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-red-400">
              Restricted Access
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-300">
            Voice calling neural network deploying next month. Prepare your aura.
          </p>
        </div>
      )}
    </div>
  );
}
