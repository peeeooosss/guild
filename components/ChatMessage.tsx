'use client';
import React, { useState } from 'react';

interface MsgProps {
  role: 'user' | 'assistant';
  content: string;
  agentTypes?: ('therapist' | 'finance')[];
}

export default function ChatMessage({ role, content, agentTypes }: MsgProps) {
  const [speaking, setSpeaking] = useState(false);
  const isCombined = agentTypes?.includes('therapist') && agentTypes?.includes('finance');
  const isFinance = !isCombined && agentTypes?.includes('finance');

  const speakText = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const label = isCombined ? 'Combined' : isFinance ? 'Treasurer' : 'Therapist';

  return (
    <div className={`flex w-full ${role === 'user' ? 'justify-end' : 'justify-start'} my-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm ${
          role === 'user'
            ? 'bg-emerald-600 text-white font-medium shadow-lg'
            : isCombined
              ? 'border border-teal-500/10 bg-white/5 text-zinc-200 backdrop-blur-md'
              : isFinance
                ? 'border border-purple-500/10 bg-white/5 text-zinc-200 backdrop-blur-md'
                : 'border border-emerald-500/10 bg-white/5 text-zinc-200 backdrop-blur-md'
        }`}
      >
        <p className="leading-relaxed">{content}</p>
        {role === 'assistant' && (
          <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
            <span className="flex items-center gap-1.5">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  speaking ? 'animate-pulse' : ''
                } ${isCombined ? 'bg-teal-500' : isFinance ? 'bg-purple-500' : 'bg-emerald-500'}`}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                {label}
              </span>
            </span>
            <button
              onClick={speakText}
              title={speaking ? 'Stop' : 'Listen to advice'}
              className={`flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white ${
                speaking ? 'text-emerald-400' : ''
              }`}
            >
              {speaking ? '⏹' : '🔊'}
              <span className="text-[10px]">{speaking ? 'Stop' : 'Speak'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
