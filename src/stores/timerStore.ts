import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerMode = 'idle' | 'work' | 'break' | 'longBreak';
export type TimerStatus = 'stopped' | 'running' | 'paused';

interface TimerConfig {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

interface Stats {
  sessionsToday: number;
  totalWorkTimeToday: number;
  coffeeCount: number;
  lastResetDate: string;
}

interface StreamObjective {
  targetHours: number;
  isActive: boolean;
}

interface TimerState {
  config: TimerConfig;
  mode: TimerMode;
  status: TimerStatus;
  timeRemaining: number;
  currentSession: number;

  stats: Stats;
  objective: StreamObjective;

  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
  updateConfig: (config: Partial<TimerConfig>) => void;
  resetStats: () => void;
  incrementCoffee: () => void;
  decrementCoffee: () => void;
  setObjective: (hours: number) => void;
  toggleObjective: () => void;
  resetObjective: () => void;
}

const DEFAULT_CONFIG: TimerConfig = {
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsBeforeLongBreak: 4,
};

const getToday = () => new Date().toISOString().split('T')[0];

const checkAndResetDailyStats = (stats: Stats): Stats => {
  const today = getToday();
  if (stats.lastResetDate !== today) {
    return {
      sessionsToday: 0,
      totalWorkTimeToday: 0,
      coffeeCount: 0,
      lastResetDate: today,
    };
  }
  return stats;
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      config: DEFAULT_CONFIG,
      mode: 'idle',
      status: 'stopped',
      timeRemaining: DEFAULT_CONFIG.workDuration,
      currentSession: 1,
      stats: {
        sessionsToday: 0,
        totalWorkTimeToday: 0,
        coffeeCount: 0,
        lastResetDate: getToday(),
      },
      objective: {
        targetHours: 8,
        isActive: true,
      },

      start: () => {
        const state = get();
        if (state.mode === 'idle') {
          set({
            mode: 'work',
            status: 'running',
            timeRemaining: state.config.workDuration,
          });
        } else {
          set({ status: 'running' });
        }
      },

      pause: () => {
        set({ status: 'paused' });
      },

      reset: () => {
        const state = get();
        set({
          mode: 'idle',
          status: 'stopped',
          timeRemaining: state.config.workDuration,
          currentSession: 1,
        });
      },

      skip: () => {
        const state = get();
        const { config, mode, currentSession } = state;

        if (mode === 'work') {
          const isLongBreak = currentSession >= config.sessionsBeforeLongBreak;
          set({
            mode: isLongBreak ? 'longBreak' : 'break',
            timeRemaining: isLongBreak ? config.longBreakDuration : config.breakDuration,
            status: 'running',
          });
        } else if (mode === 'break' || mode === 'longBreak') {
          const newSession = mode === 'longBreak' ? 1 : currentSession + 1;
          set({
            mode: 'work',
            timeRemaining: config.workDuration,
            currentSession: newSession,
            status: 'running',
          });
        } else {
          set({
            mode: 'work',
            timeRemaining: config.workDuration,
            status: 'running',
          });
        }
      },

      tick: () => {
        const state = get();
        if (state.status !== 'running') return;

        const { config, mode, currentSession, stats } = state;
        let updatedStats = checkAndResetDailyStats(stats);
        const newTime = state.timeRemaining - 1;

        if (mode === 'work') {
          updatedStats = {
            ...updatedStats,
            totalWorkTimeToday: updatedStats.totalWorkTimeToday + 1,
          };
        }

        if (newTime <= 0) {
          if (mode === 'work') {
            updatedStats = {
              ...updatedStats,
              sessionsToday: updatedStats.sessionsToday + 1,
            };

            const isLongBreak = currentSession >= config.sessionsBeforeLongBreak;
            set({
              mode: isLongBreak ? 'longBreak' : 'break',
              timeRemaining: isLongBreak ? config.longBreakDuration : config.breakDuration,
              status: 'running',
              stats: updatedStats,
            });
          } else {
            const newSession = mode === 'longBreak' ? 1 : currentSession + 1;
            set({
              mode: 'work',
              timeRemaining: config.workDuration,
              currentSession: newSession,
              status: 'running',
              stats: updatedStats,
            });
          }
        } else {
          set({ timeRemaining: newTime, stats: updatedStats });
        }
      },

      setMode: (mode: TimerMode) => {
        const state = get();
        const { config } = state;
        let duration = config.workDuration;

        switch (mode) {
          case 'work':
            duration = config.workDuration;
            break;
          case 'break':
            duration = config.breakDuration;
            break;
          case 'longBreak':
            duration = config.longBreakDuration;
            break;
          case 'idle':
            duration = config.workDuration;
            break;
        }

        set({
          mode,
          timeRemaining: duration,
          status: 'stopped',
        });
      },

      updateConfig: (newConfig: Partial<TimerConfig>) => {
        const state = get();
        set({
          config: { ...state.config, ...newConfig },
        });
      },

      resetStats: () => {
        set({
          stats: {
            sessionsToday: 0,
            totalWorkTimeToday: 0,
            coffeeCount: 0,
            lastResetDate: getToday(),
          },
        });
      },

      incrementCoffee: () => {
        const state = get();
        set({
          stats: {
            ...state.stats,
            coffeeCount: (state.stats.coffeeCount || 0) + 1,
          },
        });
      },

      decrementCoffee: () => {
        const state = get();
        set({
          stats: {
            ...state.stats,
            coffeeCount: Math.max(0, (state.stats.coffeeCount || 0) - 1),
          },
        });
      },

      setObjective: (hours: number) => {
        set({
          objective: {
            targetHours: hours,
            isActive: true,
          },
        });
      },

      toggleObjective: () => {
        const state = get();
        set({
          objective: {
            ...state.objective,
            isActive: !state.objective.isActive,
          },
        });
      },

      resetObjective: () => {
        set({
          objective: {
            targetHours: 8,
            isActive: true,
          },
          stats: {
            sessionsToday: 0,
            totalWorkTimeToday: 0,
            coffeeCount: 0,
            lastResetDate: getToday(),
          },
        });
      },
    }),
    {
      name: 'pomodoro-hiiiddy-storage',
      partialize: (state) => ({
        config: state.config,
        stats: state.stats,
        objective: state.objective,
        mode: state.mode,
        status: state.status,
        timeRemaining: state.timeRemaining,
        currentSession: state.currentSession,
      }),
    }
  )
);

// Synchronisation entre les fenêtres/overlays via localStorage
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'pomodoro-hiiiddy-storage' && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue).state;
        useTimerStore.setState({
          stats: newState.stats,
          objective: newState.objective,
          mode: newState.mode,
          status: newState.status,
          timeRemaining: newState.timeRemaining,
          currentSession: newState.currentSession,
        });
      } catch (e) {
        // Ignore parsing errors
      }
    }
  });
}
