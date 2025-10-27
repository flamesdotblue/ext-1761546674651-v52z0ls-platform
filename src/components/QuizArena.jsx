import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Star, ChevronRight, ShieldCheck } from 'lucide-react';

const sampleQuestion = {
  id: 1,
  text: 'Who holds the record for the highest individual score in ODI cricket?',
  options: [
    'Sachin Tendulkar',
    'Rohit Sharma',
    'Chris Gayle',
    'Virender Sehwag',
  ],
  correctIndex: 1,
  hint: 'He scored 264 vs Sri Lanka at Eden Gardens.',
};

function useCountdown(start = 30) {
  const [time, setTime] = useState(start);
  React.useEffect(() => {
    const id = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function QuizArena() {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const time = useCountdown(25);
  const progress = useMemo(() => 1 - time / 25, [time]);

  const submit = (idx) => {
    if (locked) return;
    setSelected(idx);
    setLocked(true);
    setTimeout(() => {
      setShowHint(true);
    }, 500);
  };

  const reset = () => {
    setSelected(null);
    setLocked(false);
    setShowHint(false);
  };

  const isCorrect = selected === sampleQuestion.correctIndex;

  return (
    <section className="relative">
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-red-500/40 via-rose-500/30 to-transparent blur-xl opacity-60" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 to-black/60">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <CricketPitchOverlay />
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LiveBall />
              <p className="uppercase tracking-widest text-xs text-white/60">Over 1.1</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Timer size={16} className="text-rose-400" />
              <span>{String(time).padStart(2, '0')}s</span>
            </div>
          </div>

          <div className="mt-5">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl font-semibold"
            >
              {sampleQuestion.text}
            </motion.h2>
            <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(100, progress * 100)}%` }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sampleQuestion.options.map((opt, idx) => {
              const picked = selected === idx;
              const correct = idx === sampleQuestion.correctIndex;
              let state = 'idle';
              if (locked) state = correct ? 'correct' : picked ? 'wrong' : 'idle';
              return (
                <OptionButton
                  key={opt}
                  label={opt}
                  index={idx}
                  onClick={() => submit(idx)}
                  state={state}
                />
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={16} className="animate-pulse" />
              <p className="text-sm">Streak x2</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
              >
                Next Ball
              </button>
              <button className="group px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 hover:to-rose-700 transition text-sm font-medium flex items-center gap-1">
                Lock In
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-4 flex items-center gap-2 text-sm text-white/80"
              >
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>{sampleQuestion.hint}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function OptionButton({ label, index, onClick, state }) {
  const variants = {
    idle: 'bg-white/5 border-white/10 hover:bg-white/10',
    correct: 'bg-emerald-500/15 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    wrong: 'bg-rose-500/15 border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.25)]',
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full text-left px-4 py-3 rounded-xl border transition ${variants[state]}`}
    >
      <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_0_14px_rgba(244,63,94,0.8)]" />
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-white/10 grid place-items-center text-xs text-white/70">
          {String.fromCharCode(65 + index)}
        </div>
        <p className="text-sm sm:text-base">{label}</p>
      </div>
    </motion.button>
  );
}

function CricketPitchOverlay() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(244,63,94,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="800" height="400" fill="url(#g)" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={i}
          x1={i * 50}
          y1={0}
          x2={i * 50}
          y2={400}
          stroke="rgba(255,255,255,0.06)"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * 50}
          x2={800}
          y2={i * 50}
          stroke="rgba(255,255,255,0.06)"
        />
      ))}
      <rect x="360" y="120" width="80" height="160" fill="rgba(244,63,94,0.08)" rx="6" />
      <circle cx="400" cy="200" r="4" fill="rgba(244,63,94,0.8)" />
    </svg>
  );
}

function LiveBall() {
  return (
    <div className="relative h-6 w-6">
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-ping opacity-60" />
      <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-red-400 to-rose-500" />
    </div>
  );
}
