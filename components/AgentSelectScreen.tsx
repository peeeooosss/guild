'use client';
import React, { useState } from 'react';

type AgentId = 'therapist' | 'finance';

interface AgentInfo {
  id: AgentId | 'fitness' | 'astrologer' | 'career';
  name: string;
  icon: string;
  tagline: string;
  description: string;
  locked: boolean;
  unlocksAt?: string;
  color: string;
}

const ALL_AGENTS: AgentInfo[] = [
  {
    id: 'therapist',
    name: 'The Therapist',
    icon: '🧠',
    tagline: 'Your safe space',
    description: 'Trauma, relationships, dark secrets — tell them anything. No judgment, no lectures. Just a friend who listens.',
    locked: false,
    color: 'emerald',
  },
  {
    id: 'finance',
    name: 'The Treasurer',
    icon: '💰',
    tagline: 'Budget watchdog',
    description: 'Tracks your UPI leaks, calls out your Swiggy addiction, and helps you save for that Goa trip.',
    locked: false,
    color: 'purple',
  },
  {
    id: 'fitness',
    name: 'The Fitness Sergeant',
    icon: '💪',
    tagline: 'Physical discipline',
    description: 'Gets you off the bed, fixes your diet, and builds habits that actually stick.',
    locked: true,
    unlocksAt: '2,000 waitlist members',
    color: 'zinc',
  },
  {
    id: 'astrologer',
    name: 'The Vedic Astrologer',
    icon: '🔮',
    tagline: 'Daily alignment',
    description: 'Cosmic guidance for your daily decisions. Know when to act and when to wait.',
    locked: true,
    unlocksAt: '3,500 waitlist members',
    color: 'zinc',
  },
  {
    id: 'career',
    name: 'The Career Hacker',
    icon: '💻',
    tagline: 'Internships & roadmap',
    description: 'Tech roadmap, resume hacks, internship strategies — your career shortcut.',
    locked: true,
    unlocksAt: '5,000 waitlist members',
    color: 'zinc',
  },
];

interface Props {
  initialSelected: AgentId[];
  onConfirm: (selected: AgentId[]) => void;
}

export default function AgentSelectScreen({ initialSelected, onConfirm }: Props) {
  const [selected, setSelected] = useState<AgentId[]>(initialSelected);

  const toggle = (id: AgentId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Choose Your Agents</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Pick the advisors you want on your team. You can change anytime.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_AGENTS.map((agent) => {
          const isEnabled = !agent.locked && selected.includes(agent.id as AgentId);
          const canToggle = !agent.locked;
          const isTherapist = agent.id === 'therapist';
          const isFinance = agent.id === 'finance';

          return (
            <button
              key={agent.id}
              onClick={() => canToggle && toggle(agent.id as AgentId)}
              disabled={agent.locked}
              className={`relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                agent.locked
                  ? 'border-white/5 bg-black/40 opacity-50 cursor-not-allowed'
                  : isEnabled
                    ? isTherapist
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : isFinance
                        ? 'border-purple-500/30 bg-purple-500/10'
                        : 'border-white/10 bg-white/[0.02]'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              {!agent.locked && isEnabled && (
                <div className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full ${
                  isTherapist ? 'bg-emerald-500' : 'bg-purple-500'
                } text-[10px] font-bold text-black`}>
                  ✓
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-2xl">{agent.icon}</span>
                <div>
                  <p className="font-semibold text-white">{agent.name}</p>
                  <p className="text-xs text-zinc-500">{agent.tagline}</p>
                </div>
                {agent.locked && <span className="ml-auto text-sm">🔒</span>}
              </div>

              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">{agent.description}</p>

              {agent.locked && agent.unlocksAt && (
                <div className="mt-3 border-t border-white/5 pt-2">
                  <p className="font-mono text-[10px] text-emerald-500/60">{agent.unlocksAt}</p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onConfirm(selected)}
          disabled={selected.length === 0}
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 font-semibold text-black transition hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-40"
        >
          {selected.length === 0
            ? 'Select at least one agent'
            : `Enter Chat with ${selected.length} agent${selected.length > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
