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
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    // Créer un son de cloche/notification
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Son de type cloche
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.type = 'sine';

    // Volume avec fade out
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch {
    // Ignore errors (autoplay restrictions, etc.)
  }
}
