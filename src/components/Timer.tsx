'use client';

import { BambooFrame } from './BambooFrame';
import { TimerDisplay } from './TimerDisplay';
import { Controls } from './Controls';
import { Stats } from './Stats';
import { Emote } from './Emote';
import { useTimer } from '@/hooks/useTimer';

interface TimerProps {
  compact?: boolean;
  showStats?: boolean;
  showEmote?: boolean;
}

export function Timer({ compact = false, showStats = true, showEmote = true }: TimerProps) {
  useTimer();

  if (compact) {
    return (
      <BambooFrame compact className="inline-flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          {showEmote && <Emote size="sm" />}
          <TimerDisplay compact />
        </div>
        <Controls compact />
      </BambooFrame>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <BambooFrame className="w-full">
        <div className="flex flex-col items-center gap-6">
          {/* Emote */}
          {showEmote && (
            <div className="mb-2">
              <Emote size="lg" />
            </div>
          )}

          {/* Timer Display */}
          <TimerDisplay />

          {/* Controls */}
          <div className="mt-4">
            <Controls />
          </div>
        </div>
      </BambooFrame>

      {/* Stats */}
      {showStats && (
        <div className="w-full">
          <Stats />
        </div>
      )}
    </div>
  );
}
