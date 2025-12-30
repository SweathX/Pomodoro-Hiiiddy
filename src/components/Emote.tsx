'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTimerStore } from '@/stores/timerStore';
import type { TimerMode } from '@/stores/timerStore';
import Image from 'next/image';

interface EmoteProps {
  size?: 'sm' | 'md' | 'lg';
}

// Mapping des modes vers les emotes
const modeToEmote: Record<TimerMode, string> = {
  idle: 'wave',      // Salut
  work: 'think',     // Concentration
  break: 'happy',    // Joyeux
  longBreak: 'sleep', // Dodo
};

export function Emote({ size = 'md' }: EmoteProps) {
  const { mode, status, stats } = useTimerStore();

  let currentEmote = modeToEmote[mode];

  if (stats.sessionsToday > 0 && stats.sessionsToday % 4 === 0 && mode === 'break') {
    currentEmote = 'stars';
  }

  const sizeValues = {
    sm: 64,
    md: 96,
    lg: 128,
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEmote}
          initial={{ scale: 0, rotate: -10 }}
          animate={{
            scale: 1,
            rotate: 0,
            y: status === 'running' ? [0, -5, 0] : 0,
          }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{
            scale: { duration: 0.3, ease: 'backOut' },
            y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
          }}
          className="w-full h-full"
        >
          <Image
            src={`/emotes/${currentEmote}.png`}
            alt={`Emote ${currentEmote}`}
            width={sizeValues[size]}
            height={sizeValues[size]}
            className="w-full h-full object-contain drop-shadow-lg"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
