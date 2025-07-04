import React from 'react';
import trofeo from '@/shared/assets/img/trofeopng.png';
import bg from '@/shared/assets/img/bgDM.png';
import BackButton from './BackButton';
import CloseButton from './CloseButton';
import { soundManager } from '../utils/SoundManager';
import { useIsLVDS } from '../hooks/useDetectIview';
import { useViewStore } from '@/store/viewStore';

const WithOurTournaments = () => {
  soundManager.play('button');
  const goTo = useViewStore((s) => s.goTo);
  const isLVDS = useIsLVDS();
  return (
    <div
      className="h-dvh w-full flex flex-col bg-no-repeat  bg-center bg-cover "
      style={{ backgroundImage: `url(${bg})` }}
    >
      {!isLVDS ? (
        <header className="flex items-center justify-between w-full   min-h-[65px] h-[65px] z-10">
          <BackButton
            onClick={() => {
              soundManager.play('button');
              goTo('rooms');
            }}
          />
          <CloseButton
            width="69.33px"
            height="64px"
            onClick={() => soundManager.play('button')}
          />
        </header>
      ) : (
        <header className="flex items-center justify-between w-full absolute left-0 top-0   min-h-[48px] h-[48px] z-10">
          <BackButton
            width="28px"
            height="28px"
            onClick={() => {
              soundManager.play('button');
              goTo('rooms');
            }}
          />
          <CloseButton
            width="52px"
            height="48px"
            onClick={() => soundManager.play('button')}
          />
        </header>
      )}
      <main
        className={`flex-1 absolute left-0 top-0 p-[24px] w-full h-full z-0 flex ${
          !isLVDS ? `flex-col` : `flex-row`
        } items-center justify-center ${
          !isLVDS ? `py-[16px] px-[64px]` : `px-[105px] py-[60px]`
        } `}
      >
        <img
          src={trofeo}
          alt=""
          className={`mx-auto ${
            !isLVDS ? `min-w-[202px]  mb-[16px]` : `w-[120px]`
          }`}
        />
        <div className={` flex flex-col text-center ${isLVDS && `flex-1`}`}>
          <p
            className={`font-bold ${
              !isLVDS ? `text-[24px]` : `text-[20px]`
            }  text-white text-center mb-[8px]`}
          >
            ¡Nuevos torneos se aproximan!
          </p>
          <span className="text-white font-light text-center">
            ¡Vuelve pronto para descubrilos!
          </span>
        </div>
      </main>
    </div>
  );
};

export default WithOurTournaments;
