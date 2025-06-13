'use client';

import React from 'react';
import { useDebugStore } from '@/store/debugStore';
import { useDebugUIStore } from '@/store/debugUiStore';

const MAX_LINES = 50;

export const ConsoleOverlay = () => {
  const logs = useDebugStore((state) => state.logs);
  const clearLogs = useDebugStore((state) => state.clearLogs);
  const slicedLogs = logs.slice(-MAX_LINES);

  const show = useDebugUIStore((state) => state.activePanel === 'debug');
  const closeAll = useDebugUIStore((state) => state.closeAll);

  return (
    <div
      className={`fixed bottom-0 left-0 bg-[#111111] text-[#00ff00] p-2 text-[12px] max-h-[30vh] w-full z-[9999] font-mono whitespace-pre-wrap flex flex-col transform transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex flex-row items-center justify-between mb-[5px]">
        <p>Consola de depuración</p>
        <div className="flex flex-row gap-2">
          <button
            className="rounded-md bg-[#333] text-[#0f0] border border-[#0f0] px-[5px] py-[2px] cursor-pointer"
            onClick={clearLogs}
          >
            Limpiar
          </button>
          <button
            className="rounded-md bg-[#333] text-[#0f0] border border-[#0f0] px-[5px] py-[2px] cursor-pointer"
            onClick={closeAll}
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
