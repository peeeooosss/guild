'use client';
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import CalendarExportBtn from './CalendarExportBtn';

type AgentId = 'therapist' | 'finance';

const AGENT_OPTIONS = [
  { id: 'therapist' as const, label: 'Therapist', icon: '🧠', color: 'emerald' },
  { id: 'finance' as const, label: 'Treasurer', icon: '💰', color: 'purple' },
];

function getModeLabel(types: AgentId[]): string {
  if (types.includes('therapist') && types.includes('finance')) return 'Therapist + Treasurer';
  if (types.includes('finance')) return 'Treasurer';
  return 'Therapist';
}

function getModeEmoji(types: AgentId[]): string {
  if (types.includes('therapist') && types.includes('finance')) return '🧠💰';
  if (types.includes('finance')) return '💰';
  return '🧠';
}

function getAgentInfo(id: AgentId) {
  return AGENT_OPTIONS.find((a) => a.id === id)!;
}

interface Props {
  initialAgentTypes?: AgentId[];
  onBack?: () => void;
}

export default function ChatDashboard({ initialAgentTypes, onBack }: Props) {
  const [agentTypes, setAgentTypes] = useState<AgentId[]>(initialAgentTypes ?? ['therapist', 'finance']);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingChats, setRemainingChats] = useState(30);
  const [rateLimited, setRateLimited] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [lastTask, setLastTask] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const both = agentTypes.includes('therapist') && agentTypes.includes('finance');
      const greet = both
        ? "Hey! I'm your Therapist + Treasurer combo. Heart and wallet — I've got you covered on both. What's on your mind today?"
        : agentTypes.includes('finance')
          ? "Aye, The Treasurer here. Let's be real — how much did you blow on Zomato this week? Be honest, I won't judge. Much."
          : "Hey, I'm The Therapist. This is a safe space — no judgment, no filters. Tell me what's on your heart. I'm here to listen.";
      setMessages([{ role: 'assistant', content: greet }]);
    }
  }, [agentTypes]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleAgent = (id: AgentId) => {
    setAgentTypes((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((a) => a !== id);
      }
      return [...prev, id];
    });
    setMessages([]);
    setRateLimited(false);
    setShowCalendar(false);
    setInput('');
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || rateLimited) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }],
          agentTypes,
        }),
      });

      const data = await res.json();

      if (data.rateLimited) {
        setRateLimited(true);
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        setRemainingChats(0);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        setRemainingChats(data.remainingChats);
        if (userMsg.toLowerCase().includes('study') || userMsg.toLowerCase().includes('read') || userMsg.toLowerCase().includes('solve') || userMsg.toLowerCase().includes('lock in')) {
          setShowCalendar(true);
          setLastTask(userMsg);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Even I need a breather sometimes. Try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const modeLabel = getModeLabel(agentTypes);
  const modeEmoji = getModeEmoji(agentTypes);

  return (
    <div className="flex h-[80vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{modeEmoji}</span>
          <div>
            <p className="text-sm font-semibold text-white">{modeLabel}</p>
            {!rateLimited && (
              <p className="font-mono text-[10px] text-zinc-600">{remainingChats} / 30 today</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-zinc-400 transition hover:text-zinc-200"
            >
              Agents
            </button>
          )}

          {/* Agent Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-zinc-400 transition hover:text-zinc-200"
            >
              <span>Add Agents</span>
              <span className={`transition ${dropdownOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-white/10 bg-[#09090B] p-2 shadow-2xl backdrop-blur-xl z-50">
                {AGENT_OPTIONS.map((opt) => {
                  const active = agentTypes.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        toggleAgent(opt.id);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
                        active
                          ? opt.id === 'therapist'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-purple-500/10 text-purple-400'
                          : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      <span className="text-base">{opt.icon}</span>
                      <span className="flex-1 text-left font-medium">{opt.label}</span>
                      {active ? (
                        <span className={`text-[10px] ${opt.id === 'therapist' ? 'text-emerald-400' : 'text-purple-400'}`}>
                          ✓ ON
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-600">OFF</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2">
        <p className="text-center text-xs text-amber-400/80">
          ⚠️ These agents don&apos;t hold back. They&apos;ll keep it real with you — consider yourself warned.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} agentTypes={agentTypes} />
        ))}

        {loading && (
          <div className="flex justify-start my-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400">
                  Guild Advisor is constructing advice
                </span>
                <span className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 delay-150" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 delay-300" />
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Calendar Export */}
      {showCalendar && lastTask && !rateLimited && (
        <div className="border-t border-white/10 px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Lock in this session?</span>
            <CalendarExportBtn taskName={lastTask} durationHours={2} />
          </div>
        </div>
      )}

      {/* Rate Limit */}
      {rateLimited && (
        <div className="border-t border-red-500/20 bg-red-950/20 px-4 py-3">
          <p className="text-center text-xs text-red-400">
            Daily messages exhausted. Come back tomorrow or share Guild with friends to unlock more!
          </p>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center justify-between pb-1">
          {rateLimited ? (
            <span className="font-mono text-[10px] text-red-500">Locked for today</span>
          ) : remainingChats <= 5 ? (
            <span className="font-mono text-[10px] text-amber-500">Only {remainingChats} left today</span>
          ) : (
            <span className="font-mono text-[10px] text-zinc-600">{remainingChats} / 30 remaining</span>
          )}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={rateLimited ? 'See you tomorrow...' : `Tell ${modeLabel} what's on your mind...`}
            disabled={rateLimited}
            className="flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || rateLimited}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 font-semibold text-black transition hover:opacity-90 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
