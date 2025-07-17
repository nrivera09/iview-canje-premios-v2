import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ProductCardById from '@/shared/components/ProductCardById';
import { soundManager } from '@/shared/utils/SoundManager';
import { useViewStore } from '@/store/viewStore';
import React, { FC, useEffect, useState } from 'react';
import BtnCasinoOnlineBack from './BtnCasinoOnlineBack';
import { useUIStore } from '@/store/uiStore';
import { BackgroundProductExchange } from './BackgroundProductExchange';
import { ProductExchangeLabel } from './ProductExchangeLabel';
import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import { LineaProductExchange } from './LineaProductExchange';
import { getPromoImage } from '../utils/getPromoImage';
import { useUserStore } from '@/store/userStore';
import clsx from 'clsx';
import { useIsLVDS } from '../hooks/useDetectIview';
import { fetchImgBase64 } from '../api/iviewApi';
import { IBeneficioRegalo } from '../types/iview.types';

interface PostRedeemProps {
  id: string;
}

const PostRedeem: FC<PostRedeemProps> = ({ id }) => {
  const isLVDS = useIsLVDS();
  const { userDataPoints } = useUserStore();
  const { goTo } = useViewStore();
  //const { isExchange } = useUIStore();
  const isExchange = useUIStore((s) => s.isExchange);

  const isExchangeProductID = userDataPoints[0]?.id_articulo_canjeado;
  const isExchangeProductGetData = userDataPoints
    ? userDataPoints[0]?.lista_Regalos?.filter(
        (item) => item.id_articulo === isExchangeProductID
      )
    : null;
  const [imgBase64, setImgBase64] = useState<any>(null);
  const selectedId = useViewStore((s) => s.selectedId);
  const previousId = useViewStore((s) => s.previousId);

  const selectedType = useViewStore((s) => s.selectedType);

  const beneficio = useUserStore((s) => s.selectedBeneficioData);

  const index = Number(selectedId);

  const productoSeleccionado: IBeneficioRegalo | undefined =
    userDataPoints &&
    userDataPoints[0]?.lista_Regalos?.find(
      (item) => item.id_articulo === Number(selectedId)
    );
  const resetUI = useUIStore((s) => s.resetUI);

  useEffect(() => {
    const getImg = async () => {
      if (!productoSeleccionado?.nombreImagen) return;
      const result = await fetchImgBase64(productoSeleccionado.nombreImagen);
      setImgBase64(result);
    };
    getImg();
  }, [productoSeleccionado?.nombreImagen]);

  return (
    <div
      className="h-dvh w-full flex flex-col  bg-cover absolute top-0 left-0  bg-no-repeat z-50 "
      style={{
        backgroundImage: `url(${getPromoImage(
          String(userDataPoints[0].promocion.toLocaleLowerCase()),
          userDataPoints[0].isVIP || false,
          isLVDS
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
                !isLVDS ? `flex-col p-[24px]` : `flex-row`
              )}
            >
              <div
                className={clsx(
                  !isLVDS ? 'w-full ' : ' py-[8px] pl-[8px] pr-[16px]'
                )}
              >
                <img
                  src={!imgBase64 ? imgDemo : imgBase64}
                  alt=""
                  className={clsx(
                    'overflow-hidden rounded-xl object-contain bg-center  ',
                    !isLVDS ? `h-[215px] w-full` : ` min-w-[180px] h-[120px]`
                  )}
                />
              </div>
              <div
                className={clsx(
                  !isLVDS ? 'mx-auto pt-[24px] pb-[15px]' : 'mx-auto py-[0px]'
                )}
              >
                <LineaProductExchange></LineaProductExchange>
              </div>
              <div
                className={clsx(
                  `info flex items-start justify-start flex-col gap-[8px]`,
                  isLVDS && `pl-[16px] py-[8px] pr-[8px]`
                )}
              >
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
                      !isLVDS
                        ? `text-[16px] leading-[20px]`
                        : `text-[16px] leading-[18px]`
                    )}
                  >
                    El próximo{' '}
                    {beneficio?.promocion.toLowerCase() === 'mirega'
                      ? `Miércoles`
                      : `Domingo`}{' '}
                    tendremos nuevas opciones para ti. Recuerda que Atlantic
                    siempre te premia.
                  </span>
                ) : (
                  <span
                    className={clsx(
                      'text-white text-left font-light',
                      !isLVDS
                        ? `text-[16px] leading-[20px]`
                        : `text-[16px] leading-[18px]`
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
