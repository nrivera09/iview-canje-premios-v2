'use client';

import React, { FC } from 'react';
import { useDebugStore } from '@/store/debugStore';

const MAX_LINES = 50;

interface ConsoleOverlayProps {
  show: boolean;
  open: () => void;
}

export const ConsoleOverlay: FC<ConsoleOverlayProps> = ({
  show = false,
  open,
}) => {
  const logs = useDebugStore((state) => state.logs);
  const clearLogs = useDebugStore((state) => state.clearLogs);
  const slicedLogs = logs.slice(-MAX_LINES);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: '#111',
        color: '#0f0',
        padding: '8px',
        fontSize: '12px',
        maxHeight: '30vh',
        overflowY: 'auto',
        width: '100%',
        zIndex: 9999,
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
      }}
      className={`flex flex-col transform transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div
        style={{ marginBottom: '5px' }}
        className="flex flex-row items-center justify-between"
      >
        <p>Consola de depuración</p>
        <div className="flex flex-row gap-2">
          <button
            className="rounded-md"
            style={{
              backgroundColor: '#333',
              color: '#0f0',
              border: '1px solid #0f0',
              padding: '2px 5px',
              cursor: 'pointer',
            }}
            onClick={clearLogs}
          >
            Limpiar
          </button>
          <button
            className="rounded-md"
            style={{
              backgroundColor: '#333',
              color: '#0f0',
              border: '1px solid #0f0',
              padding: '2px 5px',
              cursor: 'pointer',
            }}
            onClick={open}
          >
            X
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {slicedLogs.map((log, i) => (
          <div key={i}>
            [{log.timestamp.toLocaleTimeString()}] {log.type.toUpperCase()}:{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};
