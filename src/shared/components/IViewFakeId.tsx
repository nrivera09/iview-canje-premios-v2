import React from 'react';
import { soundManager } from '../utils/SoundManager';
import UserFakeSetter from './UserFakeSetter';
import { FiAlertTriangle } from 'react-icons/fi';
import { useDebugUIStore } from '@/store/debugUiStore';

const IViewFakeId = () => {
  const toggleFakeId = useDebugUIStore((s) => s.toggleFakeId);

  return (
    <>
      <button
        className="absolute p-2 rounded-tl-xl rounded-bl-xl flex items-center justify-center top-1/2 mt-[-50px] right-0 bg-yellow-300 backdrop-blur-sm"
        onClick={() => {
          soundManager.play('button');
          toggleFakeId();
        }}
      >
        <FiAlertTriangle className="size-5" />
      </button>
      <UserFakeSetter />
    </>
  );
};

export default IViewFakeId;
