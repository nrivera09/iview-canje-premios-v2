import React, { useState } from 'react';
import { ConsoleOverlay } from './ConsoleOverlay';
import { IoBugOutline } from 'react-icons/io5';
import { soundManager } from '../utils/SoundManager';

const IViewDebug = () => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <button
        className="absolute p-2 rounded-tl-xl rounded-bl-xl flex items-center justify-center top-1/2 right-0 bg-white/40 backdrop-blur-sm"
        onClick={() => {
          soundManager.play('button');
          setShow(!show);
        }}
      >
        <IoBugOutline className="size-5" />
      </button>
      <ConsoleOverlay show={show} open={() => setShow(false)} />
    </>
  );
};

export default IViewDebug;
