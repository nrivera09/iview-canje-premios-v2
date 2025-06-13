import React from 'react';
import { ConsoleOverlay } from './ConsoleOverlay';
import { IoBugOutline } from 'react-icons/io5';
import { soundManager } from '../utils/SoundManager';
import { useDebugUIStore } from '@/store/debugUiStore';

const IViewDebug = () => {
  const toggleDebug = useDebugUIStore((s) => s.toggleDebug);

  return (
    <>
      <button
        className="absolute p-2 rounded-tl-xl rounded-bl-xl flex items-center justify-center top-1/2 right-0 bg-red-600 backdrop-blur-sm text-white"
        onClick={() => {
          soundManager.play('button');
          toggleDebug();
        }}
      >
        <IoBugOutline className="size-5" />
      </button>
      <ConsoleOverlay />
    </>
  );
};

export default IViewDebug;
