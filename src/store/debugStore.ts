import { create } from 'zustand';

export type DebugLogType = 'info' | 'error' | 'warning';

export interface DebugLog {
  timestamp: Date;
  message: string;
  type: DebugLogType;
}

interface DebugState {
  logs: DebugLog[];
  addLog: (message: string, type?: DebugLogType) => void;
  clearLogs: () => void;
}

export const useDebugStore = create<DebugState>((set) => ({
  logs: [],
  addLog: (message, type = 'info') =>
    set((state) => ({
      logs: [...state.logs, { message, type, timestamp: new Date() }],
    })),
  clearLogs: () => set({ logs: [] }),
}));
