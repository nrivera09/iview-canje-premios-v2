import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ProductCardById from '@/shared/components/ProductCardById';
import { soundManager } from '@/shared/utils/SoundManager';
import { useViewStore } from '@/store/viewStore';
import React, { FC } from 'react';
import BtnCasinoOnlineBack from './BtnCasinoOnlineBack';
import { useUIStore } from '@/store/uiStore';

interface NotDayExchangeProps {
  id: string;
}

const NotDayExchange: FC<NotDayExchangeProps> = ({ id }) => {
  const selectedId = useViewStore((s) => s.selectedId);
  const toggle = useUIStore((s) => s.toggle);
  const resetUI = useUIStore((s) => s.resetUI);

  return (
    <div className="h-dvh w-full flex flex-col  bg-purple-950 absolute top-0 left-0 z-10 ">
      <main className="flex-1 flex items-center flex-col justify-center  p-[24px]  ">
        <p className="text-white text-center font-bold text-[24px]">
          ¿Deseas obtener este regalo?x
        </p>
        <span className="text-white text-center font-normal text-[18px]">
          El stock es limitado, canjéalo ahora que podría acabarse.
        </span>
      </main>
      <footer className="min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20">
        <BtnCasinoOnline
          minWidth="115px"
          label="IR A BENEFICIOSx"
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
