'use client';
import { useState } from 'react';
import AboutModal from './AboutModal';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-400">
              G
            </div>
            <span className="text-sm font-bold tracking-tight text-white">GUILD</span>
            <span className="hidden text-[10px] font-mono text-zinc-600 md:inline-block">
              v0.1
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAboutOpen(true)}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
            >
              About
            </button>
            {userName && (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-[10px] font-bold text-black">
                  {userName[0].toUpperCase()}
                </div>
                <span className="hidden text-sm text-zinc-300 md:inline-block">{userName}</span>
              </div>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-red-500/30 hover:text-red-400"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </nav>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
