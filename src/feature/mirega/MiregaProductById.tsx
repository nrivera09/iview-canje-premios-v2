import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ConfirmRedeem from '@/shared/components/ConfirmRedeem';
import NotDayExchange from '@/shared/components/NotDayExchange';
import ProductCardById from '@/shared/components/ProductCardById';
import { getPromoImage } from '@/shared/utils/getPromoImage';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { useViewStore } from '@/store/viewStore';
import React, { FC, useEffect } from 'react';
import bgMirega from '@/shared/assets/img/btnMiregaDorega/bgMirega.png';
import bgMiregaVIP from '@/shared/assets/img/btnMiregaDorega/bgMiregaVIP.png';

interface MiregaProductByIdProps {
  id: string;
}

const MiregaProductById: FC<MiregaProductByIdProps> = ({ id }) => {
  const selectedId = useViewStore((s) => s.selectedId);
  const previousId = useViewStore((s) => s.previousId);

  const selectedType = useViewStore((s) => s.selectedType);

  const beneficio = useUserStore((s) => s.selectedBeneficioData);

  const index = Number(selectedId);
  const productoSeleccionado =
    index >= 0 && beneficio?.lista_Regalos?.[index]
      ? beneficio.lista_Regalos[index]
      : null;

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
    beneficio?.canjeado && useUIStore.getState().toggle('postRedeem', true);
  }, []);

  return (
    <>
      <div
        className="h-dvh w-full flex flex-col  bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${bgMirega})`,
          backgroundPosition: 'center top',
        }}
      >
        <header className="flex items-center justify-between w-full  bg-transparent  min-h-[65px] h-[65px]">
          <BackButton
            title=""
            onClick={() => {
              soundManager.play('button');
              goTo('mirega-products', previousId ?? '', selectedType ?? '');
            }}
          />
          <CloseButton
            width="69.33px"
            height="64px"
            onClick={() => soundManager.play('button')}
          />
        </header>
        <main className="flex-1 flex items-center justify-center  px-[84px]  ">
          <ProductCardById
            idRoom={productoSeleccionado?.id ?? 0}
            producto={productoSeleccionado}
          />
        </main>
        <footer className="min-h-[62px] flex items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
          <BtnCasinoOnline
            minWidth="115px"
            label="CANJEAR"
            disabled={disableButton}
            onClick={() =>
              !disableButton &&
              useUIStore.getState().toggle('confirmRedeem', true)
            }
          ></BtnCasinoOnline>
        </footer>
      </div>
    </>
  );
};

export default MiregaProductById;
