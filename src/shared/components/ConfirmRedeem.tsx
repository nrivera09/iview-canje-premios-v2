import BackButton from '@/shared/components/BackButton';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import CloseButton from '@/shared/components/CloseButton';
import ProductCardById from '@/shared/components/ProductCardById';
import { soundManager } from '@/shared/utils/SoundManager';
import { useViewStore } from '@/store/viewStore';
import React, { FC, useEffect, useState } from 'react';
import BtnCasinoOnlineBack from './BtnCasinoOnlineBack';
import { useUIStore } from '@/store/uiStore';
import { getPromoImage } from '../utils/getPromoImage';
import { useUserStore } from '@/store/userStore';
import clsx from 'clsx';
import { useIsLVDS } from '../hooks/useDetectIview';
import { canjearPremio } from '../api/iviewApi';

interface ConfirmRedeemProps {
  id: string;
}

const ConfirmRedeem: FC<ConfirmRedeemProps> = ({ id }) => {
  const isLVDS = useIsLVDS();
  const resetUI = useUIStore((s) => s.resetUI);
  const { userDataPoints } = useUserStore();
  const selectedId = useViewStore((s) => s.selectedId);
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const toggle = useUIStore((s) => s.toggle);
  const disableButton = (beneficio?.puntos ?? 0) < (beneficio?.puntos_Min ?? 0);
  const [canjePogress, setCanjeProgress] = useState<boolean>(false);
  return (
    <div
      className="h-dvh w-full flex flex-col overflow-hidden   absolute top-0 left-0  bg-no-repeat bg-cover z-50"
      style={{
        backgroundImage: `url(${getPromoImage(
          String(userDataPoints[0].promocion.toLocaleLowerCase()),
          userDataPoints[0].isVIP || false,
          isLVDS
        )})`,
        backgroundPosition: 'center top',
      }}
    >
      <main className="flex-1 flex items-center flex-col justify-center  p-[64px]  ">
        <p
          className={clsx(
            'text-white text-center font-bold  ',
            isLVDS ? 'text-[20px]' : 'text-[24px]'
          )}
        >
          ¿Deseas obtener este regalo?
        </p>
        <span
          className={clsx(
            '!text-white text-center font-light ',
            isLVDS ? ' text-[16px]' : ' text-[18px]'
          )}
        >
          El stock es limitado, canjéalo ahora que podría acabarse.
        </span>
      </main>
      <footer className="min-h-[62px] gap-[16px] flex flex-row items-center justify-center border-b-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]">
        <BtnCasinoOnlineBack
          onClick={() => {
            soundManager.play('button');
            useUIStore.getState().toggle('confirmRedeem', false);
            useViewStore
              .getState()
              .goTo('dorega-productbyid', selectedId, 'DOREGA');
            // useViewStore .getState().goTo('dorega-productbyid', index.toString(), 'DOREGA');
          }}
          minWidth="115px"
          label="VOLVER"
        ></BtnCasinoOnlineBack>
        <BtnCasinoOnline
          minWidth="115px"
          disabled={disableButton || canjePogress}
          label="CANJEAR"
          onClick={async () => {
            //useViewStore.getState().resetViews();
            resetUI();
            soundManager.play('button');
            useUIStore.getState().toggle('loading', true);
            useUIStore.getState().setLoadingLabel('Cargando ...');
            setCanjeProgress(true);
            if (!disableButton) {
              const success = await canjearPremio();
              if (success === 'no-stock') return toggle('noStock', true);
              if (success === 'canje')
                return useUIStore.getState().toggle('postRedeem', true);
              if (success === 'no-canje')
                return toggle('postRedeem', true, true);
            }

            toggle('loading', false);
          }}
        ></BtnCasinoOnline>
      </footer>
    </div>
  );
};

export default ConfirmRedeem;
