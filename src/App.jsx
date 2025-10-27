import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import QuizArena from './components/QuizArena';
import ScoreTicker from './components/ScoreTicker';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <NavBar />
      <Hero />
      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24">
        <QuizArena />
      </main>
      <div className="mt-10">
        <ScoreTicker />
      </div>
    </div>
  );
}
