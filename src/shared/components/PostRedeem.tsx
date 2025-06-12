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

interface PostRedeemProps {
  id: string;
}

const PostRedeem: FC<PostRedeemProps> = ({ id }) => {
  const { activeViews, selectedId, goTo } = useViewStore();
  const isExchange = true;
  const resetUI = useUIStore((s) => s.resetUI);
  return (
    <div className="h-dvh w-full flex flex-col  bg-purple-950 absolute top-0 left-0 z-10 ">
      <main className="flex-1 flex items-center flex-col justify-center  p-[24px]  ">
        <div className="min-w-[340px] min-h-[448px] relative">
          <div className="relative">
            <BackgroundProductExchange />
            <div className="cont absolute top-0 left-0 w-full h-full flex items-start justify-start flex-col">
              <div className="pt-[32px] pl-[24px] pr-[24px] w-full ">
                <img
                  src={imgDemo}
                  alt=""
                  className="overflow-hidden rounded-xl object-cover bg-center w-full h-[215px]"
                />
              </div>
              <div className="mx-auto py-[24px]">
                <LineaProductExchange></LineaProductExchange>
              </div>
              <div className="info flex items-start justify-start flex-col gap-[8px] px-[24px]">
                <p className="font-bold text-[24px] text-left text-white">
                  {isExchange ? `¡Ya canjeaste tu regalo!` : `Product name`}
                </p>
                {isExchange ? (
                  <span className="text-white text-left font-light">
                    Ya recibiste tu presente. El próximo {`miércoles`} tendremos
                    nuevos regalos para ti.
                  </span>
                ) : (
                  <span className="text-white text-left font-light">
                    Tu regalo te espera en el counter de Atlantic Club. Ten en
                    cuenta que tu canje se mantendrá solo hasta las 4:00 AM.
                  </span>
                )}
              </div>
            </div>
          </div>
          <ProductExchangeLabel />
        </div>
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

export default PostRedeem;
