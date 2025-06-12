import React, { useState } from 'react';

import { soundManager } from '../utils/SoundManager';
import UserFakeSetter from './UserFakeSetter';
import { FiAlertTriangle } from 'react-icons/fi';

const IViewFakeId = () => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <button
        className="absolute p-2 rounded-tl-xl rounded-bl-xl flex items-center justify-center top-1/2 mt-[-50px] right-0 bg-white/40 backdrop-blur-sm"
        onClick={() => {
          soundManager.play('button');
          setShow(!show);
        }}
      >
        <FiAlertTriangle className="size-5" />
      </button>
      <UserFakeSetter show={show} open={() => setShow(false)} />
    </>
  );
};

export default IViewFakeId;
