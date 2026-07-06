'use client';
import React, { useState } from 'react';

export default function RoastWidget() {
  const [input, setInput] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setRoast(data.roast);
    } catch {
      setRoast("You're so cooked our AI couldn't even process your expenses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Roast My Life
          </h3>
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          Drop your last 3 UPI expenses & sleep schedule. Our AI will roast you mercilessly.
        </p>

        <form onSubmit={handleRoast} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Swiggy ₹340, Chai ₹40, Amazon ₹499. Sleep at 3 AM."
            className="flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-zinc-500 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-black transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Analyzing...
              </span>
            ) : (
              'Roast Me'
            )}
          </button>
        </form>

        {roast && (
          <div className="mt-6 animate-in rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 fade-in slide-in-from-top-2 duration-300">
            <p className="font-mono text-xs uppercase tracking-wider text-emerald-400">
              Guild Reality Check:
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200 md:text-base">{roast}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roast);
              }}
              className="mt-3 rounded-md border border-white/10 px-3 py-1 text-[11px] text-zinc-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
            >
              Copy Roast
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
