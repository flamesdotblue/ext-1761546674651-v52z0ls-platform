import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[78vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/hinHjJppKaZFIbCr/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,63,94,0.25),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(244,63,94,0.15),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 h-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid place-items-center text-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            Level Up Your Cricket IQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-3 text-white/70 max-w-2xl mx-auto"
          >
            Fast-paced, immersive, and built for Gen Z. Smash through overs of trivia with stunning visuals and dynamic feedback.
          </motion.p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_40px_rgba(244,63,94,0.35)] hover:shadow-[0_0_50px_rgba(244,63,94,0.5)] active:scale-95 transition font-semibold"
            >
              Start Match
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition"
            >
              Practice Nets
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
