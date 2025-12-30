'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTimerStore } from '@/stores/timerStore';
import type { TimerMode } from '@/stores/timerStore';

interface TimerDisplayProps {
  compact?: boolean;
}

export function TimerDisplay({ compact = false }: TimerDisplayProps) {
  const { timeRemaining, mode, currentSession, config } = useTimerStore();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const getModeLabel = (mode: TimerMode) => {
    switch (mode) {
      case 'work':
        return 'Travail';
      case 'break':
        return 'Pause';
      case 'longBreak':
        return 'Longue pause';
      case 'idle':
        return 'Prêt';
    }
  };

  const getModeColorClass = (mode: TimerMode) => {
    switch (mode) {
      case 'work':
        return 'text-red-400';
      case 'break':
        return 'text-green-400';
      case 'longBreak':
        return 'text-blue-400';
      case 'idle':
        return 'text-bamboo-dark';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Mode label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`text-xl font-medium mb-2 ${getModeColorClass(mode)}`}
        >
          {getModeLabel(mode)}
        </motion.div>
      </AnimatePresence>

      {/* Timer */}
      <div className={`timer-display ${compact ? 'text-4xl' : 'text-7xl'} flex items-center justify-center`}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`min-${minutes}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(minutes)}
          </motion.span>
        </AnimatePresence>

        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="mx-1"
        >
          :
        </motion.span>

        <AnimatePresence mode="popLayout">
          <motion.span
            key={`sec-${seconds}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(seconds)}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Session indicator */}
      {!compact && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: config.sessionsBeforeLongBreak }).map((_, i) => (
            <motion.div
              key={`session-indicator-${i}`}
              className={`w-3 h-3 rounded-full ${
                i < currentSession
                  ? 'bg-bamboo-medium'
                  : 'bg-cream-dark'
              }`}
              initial={false}
              animate={{
                scale: i === currentSession - 1 && mode === 'work' ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: i === currentSession - 1 && mode === 'work' ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
