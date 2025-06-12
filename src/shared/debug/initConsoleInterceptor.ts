// src/shared/debug/initConsoleInterceptor.ts

import { useDebugStore } from '@/store/debugStore';
import { DebugLogType } from '@/store/debugStore';

let isInitialized = false;

export const initConsoleInterceptor = () => {
  if (isInitialized) return; // Evitar múltiples inicializaciones
  isInitialized = true;

  const addLog = useDebugStore.getState().addLog;

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  const logHandler =
    (type: DebugLogType) =>
    (...args: any[]) => {
      const message = args
        .map((arg) => {
          try {
            if (typeof arg === 'object' && arg !== null) {
              return JSON.stringify(arg);
            }
            return String(arg);
          } catch (err) {
            return String(arg);
          }
        })
        .join(' ');

      addLog(message, type);
      if (type === 'info') originalLog(...args);
      if (type === 'error') originalError(...args);
      if (type === 'warning') originalWarn(...args);
    };

  console.log = logHandler('info');
  console.error = logHandler('error');
  console.warn = logHandler('warning');
};
