import BackButton from '@/shared/components/BackButton';
import CloseButton from '@/shared/components/CloseButton';
import { useIsLVDS } from '@/shared/hooks/useDetectIview';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { useViewStore } from '@/store/viewStore';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { fetchPromoBackground } from '@/shared/utils/fetchPromoBackground';
import ArrowButton from '@/shared/components/ArrowButton';
import { getTodayType } from '@/shared/utils/Utils';

const DerbyPromo = () => {
  const [bgBase64LVDS, setBgBase64LVDS] = useState<string | null>(null);
  const [bgBase64DM, setBgBase64DM] = useState<string | null>(null);

  const userDataPoints = useUserStore((s) => s.userDataPoints);
  const isLVDS = useIsLVDS();
  const tipoDia = getTodayType();

  const selectedId = useViewStore((s) => s.selectedId);
  const previousId = useViewStore((s) => s.previousId);

  const selectedType = useViewStore((s) => s.selectedType);

  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const index = Number(selectedId);
  const productoSeleccionado = beneficio?.lista_Regalos?.find(
    (item) => item.id_articulo === index
  );

  const tarjetaId = useUserStore((s) => s.card);

  const confirmRedeem = useUIStore((s) => s.confirmRedeem);
  const goTo = useViewStore((s) => s.goTo);

  const disableButton =
    (beneficio?.puntos ?? 0) < (beneficio?.puntos_Min ?? 0) ||
    productoSeleccionado?.stock === 0;

  useEffect(() => {
    beneficio?.canjeado && useUIStore.getState().toggle('postRedeem', true);
  }, [beneficio?.canjeado]);

  useEffect(() => {
    const fetchBackground = async () => {
      const base64 = await fetchPromoBackground(
        userDataPoints[0].promocionCodigo ?? '',
        tarjetaId ?? ''
      );
      if (base64) {
        /*const assetDM = base64.assets.find((item) =>
          item.fileName.startsWith('DM/')
        );
        setBgBase64DM(assetDM?.base64 ?? null);
        const assetLVDS = base64.assets.find((item) =>
          item.fileName.startsWith('LVDS/')
        );
        setBgBase64LVDS(assetLVDS?.base64 ?? null);*/
        if (tipoDia === 'MIERCOLES') {
          const assetDM = base64.assets.find((item) =>
            item.fileName.startsWith('DM/miercoles/')
          );
          const assetLVDS = base64.assets.find((item) =>
            item.fileName.startsWith('LVDS/miercoles/')
          );
          setBgBase64DM(assetDM?.base64 ?? null);
          setBgBase64LVDS(assetLVDS?.base64 ?? null);
        } else if (tipoDia === 'VIERNES') {
          const assetDM = base64.assets.find((item) =>
            item.fileName.startsWith('DM/viernes/')
          );
          const assetLVDS = base64.assets.find((item) =>
            item.fileName.startsWith('LVDS/viernes/')
          );
          setBgBase64DM(assetDM?.base64 ?? null);
          setBgBase64LVDS(assetLVDS?.base64 ?? null);
        } else {
          const assetDM = base64.assets.find((item) =>
            item.fileName.startsWith('DM/bg_informative')
          );
          const assetLVDS = base64.assets.find((item) =>
            item.fileName.startsWith('LVDS/bg_informative')
          );
          setBgBase64DM(assetDM?.base64 ?? null);
          setBgBase64LVDS(assetLVDS?.base64 ?? null);
        }

        useUIStore.getState().toggle('loading', false);
      }
    };

    fetchBackground();
  }, [beneficio, tarjetaId]);

  return (
    <>
      <div
        className="h-dvh w-full flex flex-col  bg-no-repeat relative"
        style={{
          backgroundImage:
            bgBase64DM && bgBase64LVDS
              ? `url(${isLVDS ? bgBase64LVDS : bgBase64DM})`
              : undefined,
          backgroundPosition: 'center top',
          backgroundSize: '100% 100%',
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
                  goTo('rooms', previousId ?? '', selectedType ?? '');
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
              <ArrowButton
                onClick={() => {
                  soundManager.play('button');
                  goTo('rooms', previousId ?? '', selectedType ?? '');
                }}
              />
              <CloseButton
                className="absolute right-0 top-[-8px]"
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
        ></main>
        {!isLVDS ? (
          <div className="mockDM absolute bottom-0 right-0 w-full">
            <div className="div max-w-[81%] min-h-[160px] mx-auto  mb-[62px]">
              <div className="flex flex-row gap-16px]">
                <div className="w-[50%] min-h-[160px] flex flex-col items-center justify-items-center justify-center gap-3">
                  <p className="w-full font-bold text-white text-center text-[16px]">
                    40 puntos
                  </p>
                  <p className="w-full font-bold text-white text-center text-[16px]">
                    200 opciones
                  </p>
                </div>
                <div className="w-[50%] min-h-[160px] flex items-center justify-items-center justify-center ">
                  <p className="w-full font-bold text-white text-center text-[16px]">
                    40 puntos
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mockLVDS absolute right-0 top-0 w-[50%] h-[50%]">
            <div className="w-full h-full p-5 flex flex-col justify-between pt-[29px]">
              <div className="h-[31px] flex items-center justify-center px-2 w-[113px]">
                <p className="w-full font-bold text-black text-center text-[16px] ">
                  40 puntos
                </p>
              </div>
              <div className="h-[30px] relative top-[-2px] flex items-center justify-center px-2 w-[113px]">
                <p className="w-full font-bold text-black text-center text-[16px]">
                  40 puntos
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DerbyPromo;
