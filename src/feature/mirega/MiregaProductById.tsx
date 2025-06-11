import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ConfirmRedeem from '@/shared/components/ConfirmRedeem';
import NotDayExchange from '@/shared/components/NotDayExchange';
import ProductCardById from '@/shared/components/ProductCardById';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useViewStore } from '@/store/viewStore';
import React, { FC } from 'react';

interface MiregaProductByIdProps {
  id: string;
}

const MiregaProductById: FC<MiregaProductByIdProps> = ({ id }) => {
  const selectedId = useViewStore((s) => s.selectedId);
  const confirmRedeem = useUIStore((s) => s.confirmRedeem);
  const goTo = useViewStore((s) => s.goTo);
  return (
    <>
      <div className="h-dvh w-full flex flex-col  bg-purple-950">
        <header className="flex items-center justify-between w-full  bg-transparent backdrop-blur-[80px] min-h-[65px] h-[65px]">
          <BackButton
            title=""
            onClick={() => {
              soundManager.play('button');
              goTo('mirega-products');
            }}
          />
          <CloseButton
            width="69.33px"
            height="64px"
            onClick={() => soundManager.play('button')}
          />
        </header>
        <main className="flex-1 flex items-center justify-center  p-[24px]  ">
          <ProductCardById idRoom={2}></ProductCardById>
        </main>
        <footer className="min-h-[62px] flex items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20">
          <BtnCasinoOnline
            minWidth="115px"
            label="CANJEAR"
            onClick={() => useUIStore.getState().toggle('confirmRedeem', true)}
          ></BtnCasinoOnline>
        </footer>
      </div>
    </>
  );
};

export default MiregaProductById;
