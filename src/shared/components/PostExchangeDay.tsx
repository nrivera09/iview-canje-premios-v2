import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ProductCardById from '@/shared/components/ProductCardById';
import { soundManager } from '@/shared/utils/SoundManager';
import { useViewStore } from '@/store/viewStore';
import React, { FC } from 'react';
import BtnCasinoOnlineBack from './BtnCasinoOnlineBack';
import { useUIStore } from '@/store/uiStore';
import { BackgroundProductExchange } from './BackgroundProductExchange';
import { ProductExchangeLabel } from './ProductExchangeLabel';
import imgDemo from '@/shared/assets/img/product-demo.jpg';
import { LineaProductExchange } from './LineaProductExchange';
import { getPromoImage, getPromoImageLogo } from '../utils/getPromoImage';
import miercolesRegalones from '@/shared/assets/img/miercolesRegalones.png';
import { useIsLVDS } from '../hooks/useDetectIview';
import clsx from 'clsx';
import { useUserStore } from '@/store/userStore';

interface PostExchangeDayProps {
  id: string;
}

const PostExchangeDay: FC<PostExchangeDayProps> = ({ id }) => {
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const isLVDS = useIsLVDS();
  const { activeViews, selectedId, goTo } = useViewStore();
  const { userDataPoints } = useUserStore();
  const isExchange = true;
  const resetUI = useUIStore((s) => s.resetUI);

  const promoLogo = getPromoImageLogo(
    String(userDataPoints[0]?.promocion?.toLowerCase?.() || ''),
    userDataPoints[0]?.isVIP || false
  );

  return (
    <div
      className="h-dvh w-full flex flex-col   absolute top-0 left-0 z-10 bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${getPromoImage(
          String(userDataPoints[0].promocion.toLocaleLowerCase()),
          userDataPoints[0].isVIP || false
        )})`,
        backgroundPosition: 'center top',
      }}
    >
      {!isLVDS ? (
        <header className="flex items-center justify-between w-full   min-h-[56px] h-[56px]">
          <BackButton
            onClick={() => {
              soundManager.play('button');
              goTo('rooms');
            }}
          />
          <CloseButton
            width="60px"
            height="55px"
            onClick={() => soundManager.play('button')}
          />
        </header>
      ) : (
        <header className="flex items-center justify-between w-full absolute left-0 top-0   min-h-[48px] h-[48px]">
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
        className={`flex-1 flex items-center flex-col justify-start p-[24px] gap-3  px-[64px] ${
          !isLVDS ? `py-[60px]` : `py-[32px]`
        }`}
      >
        {promoLogo && (
          <img
            src={promoLogo}
            alt=""
            className={clsx(
              !isLVDS ? `min-w-[189px] h-[119px]` : `min-w-[142px] h-[90px]`
            )}
          />
        )}

        {!isLVDS ? (
          <>
            <p className="text-white font-bold text-[24px] text-center">
              ¡Prepárate para el próximo Miércoles regalón!
            </p>
            <span className="text-white text-[18px] font-light text-center">
              Vuelve pronto para descubrirlo.
            </span>
          </>
        ) : (
          <>
            <p className="text-white font-bold text-[20px] text-center">
              ¡Prepárate para el próximo Miércoles regalón!
            </p>
            <span className="text-white text-[16px] font-light text-center">
              Vuelve pronto para descubrirlo.
            </span>
          </>
        )}
      </main>
      <footer className="min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px] !hidden">
        <BtnCasinoOnline
          minWidth="142px"
          label="IR A BENEFICIOS"
          onClick={() => {
            resetUI();
            goTo('rooms');
          }}
        ></BtnCasinoOnline>
      </footer>
    </div>
  );
};

export default PostExchangeDay;
