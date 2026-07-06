'use client';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#09090B] p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs text-zinc-500 transition hover:border-zinc-500 hover:text-white"
        >
          ✕
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xl font-bold text-emerald-400">
            G
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">What is GUILD?</h2>
            <p className="text-xs text-zinc-500">v0.1 — Your AI Life Operating System</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-zinc-300 leading-relaxed">
          <p>
            GUILD is your <strong className="text-emerald-400">personal AI best friend</strong> — a mentor you can share
            anything with. No judgment. No lectures. Just real talk from someone who's got your back.
          </p>

          <p>
            Life is hard. College, money, fitness, career — it's a lot. GUILD brings together a team of AI advisors
            who each specialize in one area of your life. Think of it as assembling your own personal board of
            directors, but they actually care about you.
          </p>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">The Vision</p>
            <p className="mt-2 text-sm text-zinc-300">
              A world where everyone has access to a mentor who truly understands them. Not a chatbot. Not a search engine.
              A friend who helps you become the best version of yourself — one conversation at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/5 bg-black/40 p-3">
              <p className="text-lg">🧠</p>
              <p className="mt-1 text-xs font-semibold text-white">The Mentor</p>
              <p className="text-[10px] text-zinc-500">Your AI best friend</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/40 p-3">
              <p className="text-lg">💰</p>
              <p className="mt-1 text-xs font-semibold text-white">The Treasurer</p>
              <p className="text-[10px] text-zinc-500">Budget & finance coach</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/40 p-3 opacity-50">
              <p className="text-lg">💪</p>
              <p className="mt-1 text-xs font-semibold text-zinc-400">Fitness Sergeant</p>
              <p className="text-[10px] text-zinc-600">Coming soon</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/40 p-3 opacity-50">
              <p className="text-lg">🔮</p>
              <p className="mt-1 text-xs font-semibold text-zinc-400">Vedic Astrologer</p>
              <p className="text-[10px] text-zinc-600">Coming soon</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-center text-[10px] text-zinc-600">
            Built with ❤️ for every student who needs a real one in their corner.
          </p>
        </div>
      </div>
    </div>
  );
}
