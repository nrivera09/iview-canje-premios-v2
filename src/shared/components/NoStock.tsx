import React from 'react';
import BtnCasinoOnline from './BtnCasinoOnline';
import imgStock from '@/shared/assets/img/productoSinStock.png';
import { soundManager } from '../utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useIsLVDS } from '../hooks/useDetectIview';
import { useViewStore } from '@/store/viewStore';
import { useUserStore } from '@/store/userStore';

const NoStock = () => {
  const isLVDS = useIsLVDS();
  const resetUI = useUIStore.getState().resetUI;

  const toggle = useUIStore((s) => s.toggle);
  const goTo = useViewStore((s) => s.goTo);
  const { userDataPoints } = useUserStore();
  const selectedId = useViewStore((s) => s.selectedId);
  const previousId = useViewStore((s) => s.previousId);
  const selectedType = useViewStore((s) => s.selectedType);
  const beneficio = userDataPoints.find(
    (item) => item.promocion_Tipo_Id === Number(previousId)
  );

  return (
    <div className="fixed top-0 left-0 w-full h-dvh bg-black/70 flex items-center justify-center  z-50">
      {!isLVDS ? (
        <div className="box w-[360px] h-[219px] backdrop-blur-[25px] bg-[#4f4f4f] border border-white/20 rounded-2xl  ">
          <div className="w-full min-h-[148px] pt-[48px] px-[24px] text-center relative">
            <div className="absolute left-0 w-full">
              <img
                src={imgStock}
                alt=""
                className="mx-auto relative top-[-127px] w-[120px] min-w-[120px]"
              />
            </div>
            <p className="text-white text-center font-bold text-[24px]">
              Producto agotado
            </p>
            <span className="text-white text-center text-[16px] font-normal">
              Te invitamos a revisar otros regalos disponibles
            </span>
          </div>
          <div className="flex-1 flex w-full  items-center justify-center py-3 border-2 border-l-0 border-r-0 border-b-0 border-t-white/20">
            <BtnCasinoOnline
              onClick={() => {
                soundManager.play('button');
                beneficio && selectedType === 'MIREGA'
                  ? goTo('mirega-products', previousId, `MIREGA`)
                  : goTo('dorega-products', previousId, `DOREGA`);
                useUIStore.getState().toggle('confirmRedeem', false);
                toggle('noStock', false);
              }}
              label="ENTENDIDO"
              minWidth="160px"
              minHeight="44px"
            />
          </div>
        </div>
      ) : (
        <div className="box w-[440px] h-auto backdrop-blur-[25px] bg-[#4f4f4f] border border-white/20 rounded-2xl  ">
          <div className="w-full min-h-[76px] py-[12px] pl-[72px] pr-[24px] text-center relative">
            <div className="absolute left-0 w-full">
              <img
                src={imgStock}
                alt=""
                className="mx-auto w-[120px] min-w-[120px] absolute -left-[60px]"
              />
            </div>
            <p className="text-white text-center font-bold text-[20px]">
              Producto agotado
            </p>
            <span className="text-white text-center text-[16px] font-normal">
              Te invitamos a revisar otros regalos disponibles
            </span>
          </div>
          <div className="min-h-auto flex-1 flex w-full  items-center justify-center py-3 border-2 border-l-0 border-r-0 border-b-0 border-t-white/20">
            <BtnCasinoOnline
              onClick={() => {
                soundManager.play('button');
                beneficio && selectedType === 'MIREGA'
                  ? goTo('mirega-products', previousId, `MIREGA`)
                  : goTo('dorega-products', previousId, `DOREGA`);
                useUIStore.getState().toggle('confirmRedeem', false);
                toggle('noStock', false);
              }}
              label="ENTENDIDO"
              minWidth="112px"
              minHeight="38px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoStock;
