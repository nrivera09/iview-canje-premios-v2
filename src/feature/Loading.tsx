import React, { FC } from 'react';
import imgLoading from '@/shared/assets/img/loading.png';

interface LoadingProps {
  msj?: string;
}

const Loading: FC<LoadingProps> = ({ msj = 'Cargando...' }) => {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center bg-purple-950">
      <img src={imgLoading} alt="" className="mb-4 w-[80px]" />
      <p className="font-medium text-white">{msj}</p>
    </div>
  );
};

export default Loading;
