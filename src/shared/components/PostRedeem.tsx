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
import bgDM from '@/shared/assets/img/DM.png';
import bgLVDS from '@/shared/assets/img/LVDS.png';
import { usePromocionesStore } from '@/store/promocionesStore';
import ConfettiCanvas from './ConfettiCanvas';
import { useConfettiStore } from '@/store/confettiStore';

interface PostRedeemProps {
  id: string;
}

interface IRegalo {
  estado: number;
  id_articulo: number;
  nombre: string;
  nombreImagen: string;
  stock: number;
}

const PostRedeem: FC<PostRedeemProps> = ({ id }) => {
  const isLVDS = useIsLVDS();
  const { userDataPoints } = useUserStore();
  const { goTo } = useViewStore();
  //const { isExchange } = useUIStore();
  const isExchange = useUIStore((s) => s.isExchange);

  const resetUI = useUIStore((s) => s.resetUI);
  const lastProductExchange = useViewStore((s) => s.lastRedeemedProduct);

  const isExchangeProductGetData = (id: number) => {
    return userDataPoints
      ? (userDataPoints[0]?.lista_Regalos as IRegalo[])?.find(
          (item) => item.id_articulo === id
        )?.nombreImagen
      : null;
  };

  const isExchangeProductID =
    userDataPoints[0]?.id_articulo_canjeado > 0
      ? isExchangeProductGetData(userDataPoints[0]?.id_articulo_canjeado)
      : lastProductExchange?.nombreImagen;

  console.log('data: ', isExchangeProductGetData, isExchangeProductID);
  const [imgBase64, setImgBase64] = useState<any>(null);
  const toggle = useUIStore((s) => s.toggle);
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

  /*const enableConfetti =
    userDataPoints[0]?.reservado && !userDataPoints[0]?.canjeado ? true : false;*/

  const enableConfetti =
    userDataPoints[0]?.reservado && !userDataPoints[0]?.canjeado ? true : false;

  // 🧨 escucha el estado del confetti store
  const confettiActive = useConfettiStore((s) => s.active);
  const resetConfetti = useConfettiStore((s) => s.reset);

  // Mostrar confetti si cualquiera de las condiciones está activa
  const showConfetti = confettiActive || enableConfetti;

  // Auto–reset del confetti si vino por store (para evitar que quede prendido)
  useEffect(() => {
    if (!confettiActive) return;
    const t = setTimeout(() => resetConfetti(), 6000);
    return () => clearTimeout(t);
  }, [confettiActive, resetConfetti]);

  useEffect(() => {
    usePromocionesStore.getState().loadPromociones();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      useUIStore.getState().toggle('loading', false);
      useUIStore.getState().setLoadingLabel();
    }, 1500);
  }, []);

  useEffect(() => {
    const getImg = async () => {
      await usePromocionesStore.getState().loadPromociones();
      if (!isExchangeProductID) return;
      const result = await fetchImgBase64(isExchangeProductID);

      setImgBase64(result);
    };
    getImg();
  }, [isExchangeProductID]);

  return (
    <div
      className=" h-dvh w-full flex flex-col overflow-hidden  bg-cover absolute top-0 left-0  bg-no-repeat z-50 "
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
          `z-50 flex-1 flex  flex-col justify-center`,
          !isLVDS ? `px-[31px] items-start` : `p-[20px] items-center `
        )}
      >
        <div
          className={clsx(
            !isLVDS
              ? `min-w-[338px] min-h-[300px] relative`
              : `min-w-[340px]  relative`
          )}
        >
          <div className="relative ">
            {!isLVDS ? (
              <img
                src="/assets/DM.png"
                className="w-full backdrop-blur-xl "
                alt=""
              />
            ) : (
              <img
                src="/assets/LVDS.png"
                className="w-[534px] h-[138px] backdrop-blur-xl "
                alt=""
              />
            )}
            <div
              className={clsx(
                'cont absolute top-0 left-0 w-full h-full flex items-center justify-center ',
                !isLVDS ? `flex-col py-[32px] px-[24px]` : `flex-row`
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
                    !isLVDS ? `h-[216px] w-full` : ` min-w-[180px] h-[120px]`
                  )}
                />
              </div>
              <div
                className={clsx(
                  !isLVDS ? 'mx-auto pt-[24px] pb-[24px]' : 'mx-auto py-[0px]'
                )}
              >
                <LineaProductExchange></LineaProductExchange>
              </div>
              <div
                className={clsx(
                  `info flex items-start justify-start flex-col gap-[8px]`,
                  isLVDS && `pl-[16px] py-[8px] pr-[8px]`,
                  !isLVDS ? `min-h-[117px] !items-start !justify-start` : ``
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
      <footer className="z-50 min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
        <BtnCasinoOnline
          minWidth="142px"
          label="IR A BENEFICIOS"
          onClick={() => {
            resetUI();
            goTo('rooms');
          }}
        ></BtnCasinoOnline>
      </footer>
      {showConfetti && <ConfettiCanvas />}
    </div>
  );
};

export default PostRedeem;
