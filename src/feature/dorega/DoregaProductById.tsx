import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ConfirmRedeem from '@/shared/components/ConfirmRedeem';
import bgDorega from '@/shared/assets/img/btnMiregaDorega/bgDorega.png';
import bgDoregaVIP from '@/shared/assets/img/btnMiregaDorega/bgDoregaVIP.png';
import NotDayExchange from '@/shared/components/NotDayExchange';
import ProductCardById from '@/shared/components/ProductCardById';
import { getPromoImage } from '@/shared/utils/getPromoImage';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { useViewStore } from '@/store/viewStore';
import React, { FC, useEffect } from 'react';
import PostRedeem from '../../shared/components/PostRedeem';
import { useIsLVDS } from '@/shared/hooks/useDetectIview';
import clsx from 'clsx';

interface DoregaProductByIdProps {
  id: string;
}

const DoregaProductById: FC<DoregaProductByIdProps> = ({ id }) => {
  const isLVDS = useIsLVDS();
  const { userDataPoints } = useUserStore();
  const selectedId = useViewStore((s) => s.selectedId);
  const previousId = useViewStore((s) => s.previousId);

  const selectedType = useViewStore((s) => s.selectedType);

  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const index = Number(selectedId);
  const productoSeleccionado = beneficio?.lista_Regalos?.find(
    (item) => item.id_articulo === index
  );

  const confirmRedeem = useUIStore((s) => s.confirmRedeem);
  const goTo = useViewStore((s) => s.goTo);

  const disableButton =
    (beneficio?.puntos ?? 0) < (beneficio?.puntos_Min ?? 0) ||
    productoSeleccionado?.stock === 0;

  useEffect(() => {
    setTimeout(() => {
      useUIStore.getState().toggle('loading', false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (beneficio?.reservado && !beneficio?.canjeado) {
      beneficio?.reservado && useUIStore.getState().toggle('postRedeem', true);
    }
    if (beneficio?.reservado && beneficio?.canjeado) {
      beneficio?.reservado &&
        useUIStore.getState().toggle('postRedeem', true, true);
    }
  }, [beneficio]);
  return (
    <>
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
        <header
          className={clsx(
            'flex items-center justify-between w-full  ',
            !isLVDS
              ? 'min-h-[56px] h-[56px]'
              : 'min-h-[32px] h-[32px] top-[10px] relative'
          )}
        >
          {!isLVDS ? (
            <>
              <BackButton
                title=""
                onClick={() => {
                  soundManager.play('button');
                  goTo('dorega-products', previousId ?? '', selectedType ?? '');
                }}
              />
              <CloseButton
                width="60px"
                height="55px"
                onClick={() => soundManager.play('button')}
              />
            </>
          ) : (
            <>
              <BackButton
                title=""
                width="28px"
                height="28px"
                onClick={() => {
                  soundManager.play('button');
                  goTo('dorega-products', previousId ?? '', selectedType ?? '');
                }}
              />
              <CloseButton
                className="relative top-[-2px]"
                width="52px"
                height="48px"
                onClick={() => soundManager.play('button')}
              />
            </>
          )}
        </header>
        <main
          className={clsx(
            `flex-1 flex items-center justify-center  px-[80px]`,
            isLVDS && `pb-[32px]`
          )}
        >
          <ProductCardById
            idRoom={productoSeleccionado?.id_articulo ?? 0}
            producto={productoSeleccionado}
            disableButton={disableButton}
          />
        </main>
        {!isLVDS && (
          <footer className="min-h-[62px] flex items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
            <BtnCasinoOnline
              minWidth="115px"
              label="CANJEAR"
              disabled={disableButton}
              onClick={() => {
                soundManager.play('button');
                if (!disableButton) {
                  useUIStore.getState().toggle('confirmRedeem', true);
                }
              }}
            ></BtnCasinoOnline>
          </footer>
        )}
      </div>
    </>
  );
};

export default DoregaProductById;
