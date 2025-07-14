import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ProductCardById from '@/shared/components/ProductCardById';
import { soundManager } from '@/shared/utils/SoundManager';
import { useViewStore } from '@/store/viewStore';
import React, { FC } from 'react';
import BtnCasinoOnlineBack from './BtnCasinoOnlineBack';
import { useUIStore } from '@/store/uiStore';
import { useIsLVDS } from '../hooks/useDetectIview';
import clsx from 'clsx';

interface NotDayExchangeProps {
  id: string;
}

const NotDayExchange: FC<NotDayExchangeProps> = ({ id }) => {
  const isLVDS = useIsLVDS();
  const selectedId = useViewStore((s) => s.selectedId);
  const toggle = useUIStore((s) => s.toggle);
  const resetUI = useUIStore((s) => s.resetUI);

  return (
    <div className="h-dvh w-full flex flex-col  bg-purple-950 absolute top-0 left-0 z-10 ">
      <main className="flex-1 flex items-center flex-col justify-center  p-[64px]  ">
        <p
          className={clsx(
            'text-white text-center font-bold  ',
            isLVDS ? 'text-[20px]' : 'text-[24px]'
          )}
        >
          ¿Deseas obtener este regalo?
        </p>
        <span
          className={clsx(
            '!text-white text-center font-light ',
            isLVDS ? ' text-[16px]' : ' text-[18px]'
          )}
        >
          El stock es limitado, canjéalo ahora que podría acabarse.
        </span>
      </main>
      <footer className="min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
        <BtnCasinoOnline
          minWidth="115px"
          label="IR A BENEFICIOS"
          onClick={() => {
            resetUI();
            toggle('postRedeem', true);
          }}
        ></BtnCasinoOnline>
      </footer>
    </div>
  );
};

export default NotDayExchange;
