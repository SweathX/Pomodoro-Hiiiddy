'use client';

import { motion } from 'framer-motion';
import { useTimerStore } from '@/stores/timerStore';
import { useTimer } from '@/hooks/useTimer';
import { WoodButton } from './WoodButton';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ControlsProps {
  compact?: boolean;
}

export function Controls({ compact = false }: ControlsProps) {
  const { start, pause, reset, skip, mode } = useTimerStore();
  const { isRunning } = useTimer();

  const handlePlayPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  return (
    <motion.div
      className={`flex ${compact ? 'gap-2' : 'gap-4'} justify-center flex-wrap`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Play/Pause Button */}
      <WoodButton
        onClick={handlePlayPause}
        size={compact ? 'sm' : 'lg'}
        aria-label={isRunning ? 'Pause' : 'Démarrer'}
      >
        {isRunning ? (
          <span className="flex items-center gap-2">
            <Pause size={20} />
            {!compact && 'Pause'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Play size={20} />
            {!compact && (mode === 'idle' ? 'Démarrer' : 'Reprendre')}
          </span>
        )}
      </WoodButton>

      {/* Reset Button */}
      <WoodButton
        onClick={reset}
        size={compact ? 'sm' : 'md'}
        variant="secondary"
        aria-label="Réinitialiser"
      >
        <span className="flex items-center gap-2">
          <RotateCcw size={18} />
          {!compact && 'Reset'}
        </span>
      </WoodButton>

      {/* Skip Button */}
      {mode !== 'idle' && (
        <WoodButton
          onClick={skip}
          size={compact ? 'sm' : 'md'}
          variant="secondary"
          aria-label="Passer"
        >
          <span className="flex items-center gap-2">
            <SkipForward size={18} />
            {!compact && 'Skip'}
          </span>
        </WoodButton>
      )}
    </motion.div>
  );
}
