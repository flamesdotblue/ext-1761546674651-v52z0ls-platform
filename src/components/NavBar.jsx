import React from 'react';
import { Play, Trophy, Settings } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-0 rounded-xl bg-red-500/30 blur-md" />
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 grid place-items-center shadow-[0_0_20px_rgba(244,63,94,0.6)]">
              <Play size={18} className="text-white" />
            </div>
          </div>
          <div className="leading-tight">
            <p className="text-white font-semibold tracking-wide">Cricket IQ</p>
            <p className="text-xs text-white/60">GenZ Quiz Arena</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="group hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Trophy size={16} className="text-yellow-400 group-hover:scale-110 transition" />
            <span className="text-sm">Leaderboard</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Settings size={16} />
            <span className="text-sm hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
