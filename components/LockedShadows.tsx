'use client';
import React from 'react';

const SHADOW_AGENTS = [
  {
    name: 'The Fitness Sergeant',
    role: 'Physical Discipline & Diet',
    unlocksAt: '2,000 Waitlist',
    icon: '💪',
  },
  {
    name: 'The Vedic Astrologer',
    role: 'Daily Alignment & Focus',
    unlocksAt: '3,500 Waitlist',
    icon: '🔮',
  },
  {
    name: 'The Career Hacker',
    role: 'Internships & Tech Roadmap',
    unlocksAt: '5,000 Waitlist',
    icon: '💻',
  },
];

const WAITLIST_PROGRESS = 1420;
const WAITLIST_TARGET = 5000;
const PROGRESS_PCT = Math.min((WAITLIST_PROGRESS / WAITLIST_TARGET) * 100, 100);

export default function LockedShadows() {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-md">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="font-semibold text-white">🔒 The Shadow Syndicate (Coming Soon)</h4>
          <p className="text-xs text-zinc-400">
            Additional Guild advisors unlock automatically as the community scales.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
              style={{ width: `${PROGRESS_PCT}%` }}
            />
          </div>
          <span className="font-mono text-xs text-emerald-400">
            {WAITLIST_PROGRESS.toLocaleString()} / {WAITLIST_TARGET.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SHADOW_AGENTS.map((agent, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/40 p-4 opacity-60 transition hover:opacity-80 hover:border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500">LOCKED NODE</span>
                <span className="text-sm">{agent.icon}</span>
              </div>
              <p className="mt-2 font-bold text-zinc-300">{agent.name}</p>
              <p className="text-xs text-zinc-500">{agent.role}</p>
              <div className="mt-4 flex items-center gap-1 border-t border-white/5 pt-2 font-mono text-[10px] text-emerald-500/80">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                Unlocks at {agent.unlocksAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
