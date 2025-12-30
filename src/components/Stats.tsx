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
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  return (
    <motion.div
      className="stats-panel grid grid-cols-[1fr_auto_1fr_auto_auto] items-center gap-4 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Sessions */}
      <div className="flex items-start gap-3">
        <div className="text-cream-dark/70 mt-1">
          <Target size={22} />
        </div>
        <div>
          <motion.div
            key={sessionsToday}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-semibold text-cream-light leading-none"
          >
            {sessionsToday}
          </motion.div>
          <div className="text-sm text-cream-dark/80 mt-1">Sessions</div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-px h-10 bg-cream-dark/30" />

      {/* Temps de travail */}
      <div className="flex items-start gap-3">
        <div className="text-cream-dark/70 mt-1">
          <Clock size={22} />
        </div>
        <div>
          <motion.div
            key={totalWorkTimeToday}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-semibold text-cream-light leading-none"
          >
            {formatTime(totalWorkTimeToday)}
          </motion.div>
          <div className="text-sm text-cream-dark/80 mt-1">Temps de travail</div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-px h-10 bg-cream-dark/30" />

      {/* Reset button */}
      <button
        type="button"
        onClick={resetStats}
        className="text-cream-dark/60 hover:text-cream-light transition-colors p-2 rounded-lg hover:bg-white/10"
        title="Réinitialiser les stats"
      >
        <RotateCcw size={20} />
      </button>
    </motion.div>
  );
}
