import React from 'react';
import trofeo from '@/shared/assets/img/trofeopng.png';
import { useUIStore } from '@/store/uiStore';

const WithOurTournaments = () => {
  return (
    <div className="h-dvh w-full flex flex-col  bg-purple-950">
      <main className="flex-1 p-[24px] flex flex-col items-center justify-center py-[16px] px-[64px] ">
        <img src={trofeo} alt="" className="mx-auto min-w-[202px] mb-[16px]" />
        <p className="font-bold text-[24px]  text-white text-center mb-[8px]">
          Nuevos torneos se aproximan.
        </p>
        <span className="text-white font-light text-center">
          ¡Vuelve pronto para descubrilos!
        </span>
      </main>
    </div>
  );
};

export default WithOurTournaments;
