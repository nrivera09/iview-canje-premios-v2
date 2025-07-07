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
import { useUserStore } from '@/store/userStore';
import clsx from 'clsx';
import { useIsLVDS } from '../hooks/useDetectIview';

interface PostRedeemProps {
  id: string;
}

const PostRedeem: FC<PostRedeemProps> = ({ id }) => {
  const isLVDS = useIsLVDS();
  const { userDataPoints } = useUserStore();
  const { goTo } = useViewStore();
  const { isExchange } = useUIStore();
  const selectedId = useViewStore((s) => s.selectedId);
  const previousId = useViewStore((s) => s.previousId);

  const selectedType = useViewStore((s) => s.selectedType);

  const beneficio = useUserStore((s) => s.selectedBeneficioData);

  const index = Number(selectedId);
  const productoSeleccionado =
    index >= 0 && beneficio?.lista_Regalos?.[index]
      ? beneficio.lista_Regalos[index]
      : null;

  const resetUI = useUIStore((s) => s.resetUI);
  return (
    <div
      className="h-dvh w-full flex flex-col  bg-cover absolute top-0 left-0 z-10 bg-no-repeat "
      style={{
        backgroundImage: `url(${getPromoImage(
          String(userDataPoints[0].promocion.toLocaleLowerCase()),
          userDataPoints[0].isVIP || false
        )})`,
        backgroundPosition: 'center top',
      }}
    >
      <main
        className={clsx(
          `flex-1 flex items-center flex-col justify-center`,
          !isLVDS ? `px-[24px]` : `p-[20px] `
        )}
      >
        <div
          className={clsx(
            !isLVDS
              ? `min-w-[340px] min-h-[448px] relative`
              : `min-w-[340px]  relative`
          )}
        >
          <div className="relative">
            <BackgroundProductExchange />
            <div
              className={clsx(
                'cont absolute top-0 left-0 w-full h-full flex items-center justify-center ',
                !isLVDS ? `flex-col` : `flex-row`
              )}
            >
              <div
                className={clsx(
                  !isLVDS
                    ? 'pt-[32px] pl-[24px] pr-[24px] w-full '
                    : ' py-[8px] pl-[8px] pr-[16px]'
                )}
              >
                <img
                  src={imgDemo}
                  alt=""
                  className={clsx(
                    'overflow-hidden rounded-xl object-cover bg-center  ',
                    !isLVDS ? `h-[215px] w-full` : ` min-w-[180px] h-[120px]`
                  )}
                />
              </div>
              <div
                className={clsx(
                  !isLVDS ? 'mx-auto py-[24px]' : 'mx-auto py-[0px]'
                )}
              >
                <LineaProductExchange></LineaProductExchange>
              </div>
              <div className="info flex items-start justify-start flex-col gap-[8px] px-[24px]">
                <p
                  className={clsx(
                    'font-bold text-left text-white',
                    !isLVDS ? ` text-[24px]` : ` text-[20px]`
                  )}
                >
                  {isExchange ? `¡Ya canjeaste tu regalo!` : `¡Canje exitoso!`}
                </p>
                {isExchange ? (
                  <span
                    className={clsx(
                      'text-white text-left font-light',
                      isLVDS && `text-[16px] leading-[18px]`
                    )}
                  >
                    Ya recibiste tu presente. El próximo {`miércoles`} tendremos
                    nuevos regalos para ti.
                  </span>
                ) : (
                  <span
                    className={clsx(
                      'text-white text-left font-light',
                      isLVDS && `text-[16px] leading-[18px]`
                    )}
                  >
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
