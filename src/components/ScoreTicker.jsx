import React from 'react';

const items = [
  'IND vs PAK • Kohli 82* (53)',
  'AUS vs ENG • Stoinis 59 (18)',
  'Records • Rohit 264 (173) ODI',
  'World Cup • ENG 2019 Champions',
  'IPL • CSK 5x Champions',
];

export default function ScoreTicker() {
  return (
    <div className="relative overflow-hidden border-t border-b border-white/10 bg-black/60">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />
      <div className="whitespace-nowrap flex gap-8 py-3 animate-[ticker_30s_linear_infinite] will-change-transform">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="text-xs sm:text-sm text-white/80 tracking-wide px-4 py-1 rounded-full bg-white/5 border border-white/10"
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
