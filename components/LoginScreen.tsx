'use client';
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const AVATARS = ['🎓', '💰', '💻', '🔥', '🚀', '👑', '💪', '🧠', '🎯', '⭐'];

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = name.trim();
    if (!trimmed) {
      setError('Bro, even Guild needs a name to work with.');
      return;
    }
    if (trimmed.length < 2) {
      setError('That short? Even your attention span is longer.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });

      if (!res.ok) throw new Error('Auth failed');

      const data = await res.json();
      localStorage.setItem(
        'guild_user',
        JSON.stringify({ ...data.user, avatar: AVATARS[selectedAvatar] }),
      );
      onLogin(trimmed);
    } catch {
      localStorage.setItem(
        'guild_user',
        JSON.stringify({ name: trimmed, avatar: AVATARS[selectedAvatar], joinedAt: new Date().toISOString() }),
      );
      onLogin(trimmed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-2xl font-bold text-emerald-400">
              G
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">GUILD</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Your AI Life Operating System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-xs font-medium text-zinc-400">Choose your vibe</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {AVATARS.map((avatar, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAvatar(i)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition ${
                      selectedAvatar === i
                        ? 'border border-emerald-500 bg-emerald-500/20 scale-110'
                        : 'border border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400">What should we call you?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Your name or alias..."
                maxLength={30}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-zinc-600 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                autoFocus
              />
              {error && (
                <p className="mt-1 text-xs text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-black transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Initializing...
                </span>
              ) : (
                'Enter the Guild'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-zinc-600">
            No password needed. Just vibes. Your data stays local.
          </p>
        </div>
      </div>
    </div>
  );
}
