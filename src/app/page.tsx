'use client';

import { Timer, ObjectiveDisplay, BackgroundDecorations } from '@/components';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <BackgroundDecorations />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-4xl font-bold text-cream-light mb-2 drop-shadow-lg">
          Pomodoro Hiiiddy
        </h1>
        <p className="text-cream-dark/80 text-lg">
          Session de révision
        </p>
      </motion.header>

      <ObjectiveDisplay />

      <Timer />

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-cream-dark/60 text-sm"
      >
        Fait avec amour pour les streams de révision
      </motion.footer>
    </main>
  );
}
