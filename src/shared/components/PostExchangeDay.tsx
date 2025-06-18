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
import { getPromoImage } from '../utils/getPromoImage';
import miercolesRegalones from '@/shared/assets/img/miercolesRegalones.png';

interface PostExchangeDayProps {
  id: string;
}

const PostExchangeDay: FC<PostExchangeDayProps> = ({ id }) => {
  const { activeViews, selectedId, goTo } = useViewStore();
  const isExchange = true;
  const resetUI = useUIStore((s) => s.resetUI);
  return (
    <div
      className="h-dvh w-full flex flex-col   absolute top-0 left-0 z-10 bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${getPromoImage('mirega', 'novip')})`,
        backgroundPosition: 'center top',
      }}
    >
      <header className="flex items-center justify-between w-full bg-opacity-5 backdrop-blur-[40px]min-h-[65px] h-[65px]">
        <BackButton
          title="Beneficios"
          onClick={() => soundManager.play('button')}
        />
        <CloseButton
          width="69.33px"
          height="64px"
          onClick={() => soundManager.play('button')}
        />
      </header>
      <main className="flex-1 flex items-center flex-col justify-start p-[24px] gap-3  px-[64px] py-[60px]">
        <img
          src={miercolesRegalones}
          alt=""
          className="min-w-[189px] h-[119px]"
        />
        <p className="text-white font-bold text-[24px] text-center">
          ¡Prepárate para el próximo Miércoles regalón!
        </p>
        <span className="text-white text-[18px] font-light text-center">
          Vuelve pronto para descubrirlo.
        </span>
      </main>
      <footer className="min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
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
