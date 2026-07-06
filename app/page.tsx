'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatDashboard from '@/components/ChatDashboard';
import AgentSelectScreen from '@/components/AgentSelectScreen';
import ParticleBackground from '@/components/ParticleBackground';
import LoginScreen from '@/components/LoginScreen';

type ViewState = 'login' | 'landing' | 'select' | 'dashboard';

export default function Home() {
  const [view, setView] = useState<ViewState>('login');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('guild_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.name) {
          setUserName(parsed.name);
          setView('landing');
        }
      } catch {
        localStorage.removeItem('guild_user');
      }
    }
  }, []);

  const handleLogin = (name: string) => {
    setUserName(name);
    setView('landing');
  };

  const handleLogout = () => {
    localStorage.removeItem('guild_user');
    setUserName('');
    setView('login');
  };

  if (view === 'login') {
    return (
      <>
        <ParticleBackground />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <ParticleBackground />
      <Navbar userName={userName} onLogout={handleLogout} />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-16">
        {view === 'landing' && (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-2xl font-bold text-emerald-400">
              G
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Welcome to the <span className="text-emerald-400">Guild</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-400 md:text-base max-w-md">
              {userName}, your personal AI advisory team is ready. Pick your agents and start talking.
            </p>
            <button
              onClick={() => setView('select')}
              className="mt-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 text-base font-semibold text-black transition hover:opacity-90 hover:scale-105 active:scale-95"
            >
              Enter Command Center
            </button>
          </div>
        )}

        {view === 'select' && (
          <AgentSelectScreen
            initialSelected={['therapist', 'finance']}
            onConfirm={() => setView('dashboard')}
          />
        )}

        {view === 'dashboard' && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white md:text-2xl">Command Center</h2>
                <p className="text-xs text-zinc-500">Your agents are ready. Start talking.</p>
              </div>
              <button
                onClick={() => setView('landing')}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
              >
                ← Home
              </button>
            </div>

            <ChatDashboard
              initialAgentTypes={['therapist', 'finance']}
              onBack={() => setView('select')}
            />
          </>
        )}
      </main>
    </>
  );
}
