'use client';

import { motion } from 'framer-motion';
import { useTimerStore } from '@/stores/timerStore';
import { Target, Clock, RotateCcw } from 'lucide-react';

export function Stats() {
  const sessionsToday = useTimerStore((state) => state.stats.sessionsToday);
  const totalWorkTimeToday = useTimerStore((state) => state.stats.totalWorkTimeToday);
  const resetStats = useTimerStore((state) => state.resetStats);

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
      className="stats-panel flex items-center justify-center gap-6 px-6 py-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Sessions */}
      <div className="flex items-center gap-2">
        <Target size={20} style={{ color: 'rgba(232, 212, 168, 0.7)' }} />
        <motion.span
          key={sessionsToday}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-semibold text-cream-light"
        >
          {sessionsToday}
        </motion.span>
        <span className="text-sm" style={{ color: 'rgba(232, 212, 168, 0.7)' }}>sessions</span>
      </div>

      {/* Separator */}
      <div className="w-px h-6" style={{ background: 'rgba(232, 212, 168, 0.3)' }} />

      {/* Temps de travail */}
      <div className="flex items-center gap-2">
        <Clock size={20} style={{ color: 'rgba(232, 212, 168, 0.7)' }} />
        <motion.span
          key={totalWorkTimeToday}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-semibold text-cream-light"
        >
          {formatTime(totalWorkTimeToday)}
        </motion.span>
        <span className="text-sm" style={{ color: 'rgba(232, 212, 168, 0.7)' }}>travail</span>
      </div>

      {/* Separator */}
      <div className="w-px h-6" style={{ background: 'rgba(232, 212, 168, 0.3)' }} />

      {/* Reset button */}
      <button
        type="button"
        onClick={resetStats}
        className="hover:text-cream-light transition-colors p-1.5 rounded-lg"
        style={{ color: 'rgba(232, 212, 168, 0.5)' }}
        title="Réinitialiser les stats"
      >
        <RotateCcw size={18} />
      </button>
    </motion.div>
  );
}
