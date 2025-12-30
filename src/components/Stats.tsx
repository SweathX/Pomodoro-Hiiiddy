'use client';

import { motion } from 'framer-motion';
import { useTimerStore } from '@/stores/timerStore';
import { BookOpen, Clock, Coffee, Plus, Minus, RotateCcw } from 'lucide-react';

export function Stats() {
  const sessionsToday = useTimerStore((state) => state.stats.sessionsToday);
  const totalWorkTimeToday = useTimerStore((state) => state.stats.totalWorkTimeToday);
  const coffeeCount = useTimerStore((state) => state.stats.coffeeCount || 0);
  const resetStats = useTimerStore((state) => state.resetStats);
  const incrementCoffee = useTimerStore((state) => state.incrementCoffee);
  const decrementCoffee = useTimerStore((state) => state.decrementCoffee);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h${minutes.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="stats-panel flex items-center justify-center gap-5 px-8 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Sessions */}
      <div className="flex items-center gap-2">
        <BookOpen size={18} style={{ color: '#c9b896' }} />
        <motion.span
          key={sessionsToday}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-semibold text-cream-light"
        >
          {sessionsToday}
        </motion.span>
        <span className="text-sm" style={{ color: '#c9b896' }}>sessions</span>
      </div>

      {/* Separator */}
      <div className="w-px h-5" style={{ background: '#a89070' }} />

      {/* Temps de travail */}
      <div className="flex items-center gap-2">
        <Clock size={18} style={{ color: '#c9b896' }} />
        <motion.span
          key={totalWorkTimeToday}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-semibold text-cream-light"
        >
          {formatTime(totalWorkTimeToday)}
        </motion.span>
        <span className="text-sm" style={{ color: '#c9b896' }}>travail</span>
      </div>

      {/* Separator */}
      <div className="w-px h-5" style={{ background: '#a89070' }} />

      {/* Coffee counter */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={decrementCoffee}
          className="hover:text-cream-light transition-colors p-0.5 rounded"
          style={{ color: '#a89070' }}
        >
          <Minus size={14} />
        </button>
        <Coffee size={18} style={{ color: '#c9b896' }} />
        <motion.span
          key={coffeeCount}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-semibold text-cream-light min-w-[20px] text-center"
        >
          {coffeeCount}
        </motion.span>
        <button
          type="button"
          onClick={incrementCoffee}
          className="hover:text-cream-light transition-colors p-0.5 rounded"
          style={{ color: '#a89070' }}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-5" style={{ background: '#a89070' }} />

      {/* Reset button */}
      <button
        type="button"
        onClick={resetStats}
        className="hover:text-cream-light transition-colors p-1"
        style={{ color: '#a89070' }}
        title="Réinitialiser les stats"
      >
        <RotateCcw size={16} />
      </button>
    </motion.div>
  );
}
