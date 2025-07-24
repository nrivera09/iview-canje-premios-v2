import React from 'react';
import backScreen from '@/shared/assets/img/backScreen.png';
import closeScreen from '@/shared/assets/img/close.png';
import LoadingGrid from '@/shared/components/LoadingGrid';
import { soundManager } from '@/shared/utils/SoundManager';
import ProductCard from '@/shared/components/ProductCard';
import CloseButton from '@/shared/components/CloseButton';
import BackButton from '@/shared/components/BackButton';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';
import BtnCasinoOnline from './BtnCasinoOnline';
import { useUIStore } from '@/store/uiStore';
import { getPromoImage } from '../utils/getPromoImage';
import { useUserStore } from '@/store/userStore';
import { useIsLVDS } from '../hooks/useDetectIview';

const PostExchange = () => {
  const isLVDS = useIsLVDS();
  const { userDataPoints } = useUserStore();
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const toggle = useUIStore((s) => s.toggle);
  const resetUI = useUIStore((s) => s.resetUI);
  return (
    <div
      className="h-dvh w-full flex flex-col overflow-hidden  bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${getPromoImage(
          String(userDataPoints[0].promocion.toLocaleLowerCase()),
          userDataPoints[0].isVIP || false,
          isLVDS
        )})`,
        backgroundPosition: 'center top',
      }}
    >
      <header className="overflow-hidden flex items-center justify-between w-full   min-h-[56px] h-[56px]">
        <BackButton title="" onClick={() => soundManager.play('button')} />
        <CloseButton
          width="60px"
          height="55px"
          onClick={() => soundManager.play('button')}
        />
      </header>
      <main className="flex-1 p-[24px] flex flex-col items-center justify-center py-[16px] px-[64px]">
        {!isLVDS ? (
          <>
            <p className="font-bold text-[24px]  text-white text-center">
              ¡Prepárate para el próximo{' '}
              {beneficio?.promocion === 'MIREGA' ? `Miércoles` : `Domingo`}{' '}
              regalón!
            </p>
            <span className="text-white font-light text-center text-[18px]">
              Vuelve pronto para descubrirlo.
            </span>
          </>
        ) : (
          <>
            <p className="font-bold text-[20px]  text-white text-center">
              ¡Prepárate para el próximo{' '}
              {beneficio?.promocion === 'MIREGA' ? `Miércoles` : `Domingo`}{' '}
              regalón!
            </p>
            <span className="text-white font-light text-center text-[16px]">
              Vuelve pronto para descubrirlo.
            </span>
          </>
        )}
      </main>
      <footer className="min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
        <BtnCasinoOnline
          minWidth="142px"
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

export default PostExchange;
