'use client';

import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/stores/timerStore';

export function useTimer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const status = useTimerStore((state) => state.status);
  const mode = useTimerStore((state) => state.mode);

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        useTimerStore.getState().tick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status]);

  const prevModeRef = useRef(mode);
  useEffect(() => {
    if (prevModeRef.current !== mode && mode !== 'idle') {
      playNotificationSound();
    }
    prevModeRef.current = mode;
  }, [mode]);

  return {
    isRunning: status === 'running',
    isPaused: status === 'paused',
    isStopped: status === 'stopped',
  };
}

function playNotificationSound() {
  try {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch {
  }
}
