import React, { FC } from 'react';
import imgLoading1 from '@/shared/assets/img/loading1.png';
import imgLoading2 from '@/shared/assets/img/loading2.png';
import imgLoading3 from '@/shared/assets/img/loading3.png';
import bg from '@/shared/assets/img/bgDM.png';

interface LoadingProps {
  msj?: string;
}

const Loading: FC<LoadingProps> = ({ msj = 'Cargando...' }) => {
  return (
    <div
      className="h-dvh w-full flex flex-col gap-2  items-center justify-center bg-no-repeat bg-center bg-cover fixed top-0 left-0"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative flex items-center justify-center">
        <img
          src={imgLoading1}
          alt=""
          className="w-[80px] animate-spin-reverse"
        />
        <img
          src={imgLoading2}
          alt=""
          className="w-[70px] absolute animate-spin-slow"
        />
        <img src={imgLoading3} alt="" className="w-[30px] absolute" />
      </div>

      <p className="font-medium text-white">{msj}</p>
    </div>
  );
};

export default Loading;
