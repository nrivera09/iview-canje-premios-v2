import { useDebugStore } from '@/store/debugStore';

export class ErrorCatcher {
  static init() {
    const addLog = useDebugStore.getState().addLog;

    window.onerror = (message, source, lineno, colno, error) => {
      addLog(`JS Error: ${message} at ${source}:${lineno}:${colno}`, 'error');
    };

    window.onunhandledrejection = (event) => {
      addLog(`Unhandled Rejection: ${event.reason}`, 'error');
    };
  }
}
