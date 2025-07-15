import React, { useEffect, useMemo } from 'react';
import LoadingGrid from '@/shared/components/LoadingGrid';
import { soundManager } from '@/shared/utils/SoundManager';
import bg from '@/shared/assets/img/bgDM.png';
import arrowBg from '@/shared/assets/img/bgFlechaLVDS.png';
import arrowGIF from '@/shared/assets/img/arrowGif.gif';
import CloseButton from '@/shared/components/CloseButton';
import BackButton from '@/shared/components/BackButton';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';
import { usePromocionesStore } from '@/store/promocionesStore';
import { IBeneficio, ISeccion } from '@/shared/types/iview.types';
import { useUIStore } from '@/store/uiStore';
import { useViewStore } from '@/store/viewStore';
import ProductCardTipoBeneficio from '@/shared/components/ProductCardTipoBeneficio';
import { useIsLVDS } from '@/shared/hooks/useDetectIview';
import clsx from 'clsx';
import { useUserStore } from '@/store/userStore';
import { closeIframe } from '@/shared/utils/iframeMessenger';
import PostRedeem from '@/shared/components/PostRedeem';

const Rooms = () => {
  const resetUI = useUIStore((s) => s.resetUI);
  const { data, loading, loadPromociones } = usePromocionesStore();
  const setAssets = useUserStore((s) => s.setUserDataPoints);
  const goTo = useViewStore((s) => s.goTo);
  const toggle = useUIStore((s) => s.toggle);

  const isLVDS = useIsLVDS();

  useEffect(() => {
    loadPromociones();
  }, [loadPromociones]);

  const secciones: ISeccion[] = Array.isArray(data?.data)
    ? (data!.data as ISeccion[])
    : [];

  const goRoomProducts = (
    beneficio: string,
    idRoom: number,
    item: IBeneficio
  ) => {
    soundManager.play('button');
    useUserStore.getState().setUserDataPoints([item]);

    useUIStore.getState().toggle('loading', true);
    setTimeout(() => {
      if (item) {
        if (beneficio === 'MIREGA') {
          (item?.lista_Regalos ?? []).length > 0
            ? goTo('mirega-products', idRoom.toString(), beneficio ?? '')
            : goTo('post-exchange-day');
        } else if (beneficio === 'DOREGA') {
          (item?.lista_Regalos ?? []).length > 0
            ? goTo('dorega-products', idRoom.toString(), beneficio ?? '')
            : goTo('post-exchange-day');
        } else if (beneficio === 'DERBY') {
          goTo('derby', idRoom.toString(), beneficio ?? '');
        } else if (beneficio.trim().startsWith('MULTIPLICADOR')) {
          goTo('multiplicador', idRoom.toString(), beneficio ?? '');
        }
      }
    }, 1000);
  };

  const beneficiosDisplay = useMemo(() => {
    const raw = secciones.find((seccion) => seccion.nombre === 'Beneficios');
    if (!raw) return undefined;
    return {
      ...raw,
      lista: raw.lista.filter((item: IBeneficio) => item.estado === 1),
    };
  }, [secciones]);

  useEffect(() => {
    if (!beneficiosDisplay) return;

    if ((beneficiosDisplay.lista?.length ?? 0) === 0) {
      goTo('no-tournaments');
    } else {
      resetUI();
    }
  }, [beneficiosDisplay, goTo, resetUI]);

  return (
    <div
      className="h-dvh w-full flex flex-col bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {!isLVDS ? (
        <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px] min-h-[56px] h-[56px]">
          <BackButton
            title="Beneficios"
            onClick={() => {
              soundManager.play('button');
              closeIframe();
            }}
          />
          <CloseButton
            width="60px"
            height="55px"
            onClick={() => soundManager.play('button')}
          />
        </header>
      ) : (
        <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px] min-h-[48px] h-[48px]">
          <BackButton
            width="28px"
            height="28px"
            title="Beneficios"
            onClick={() => {
              soundManager.play('button');
              closeIframe();
            }}
          />
          <CloseButton
            width="52px"
            height="48px"
            onClick={() => soundManager.play('button')}
          />
        </header>
      )}

      <main
        className={clsx(
          !isLVDS ? ' p-[24px] ' : 'px-[20px] py-[24px] ',
          'flex-1 overflow-y-auto scrollbar-none relative w-full flex flex-col items-start justify-center'
        )}
      >
        {secciones
          .filter((seccion) => seccion.nombre === 'Beneficios')
          .map((seccion, sectionIndex) => (
            <div
              key={sectionIndex}
              className={!isLVDS ? 'mb-0 w-full' : 'mb-0'}
            >
              <h2 className="text-white text-lg font-semibold mb-4 !hidden">
                {seccion.nombre}
              </h2>
              <div
                className={clsx(
                  ` gap-[24px]  mx-auto`,
                  !isLVDS
                    ? 'grid grid-cols-2 max-w-[474px]'
                    : 'flex flex-row w-full flex-nowrap  scrollbar-none'
                )}
              >
                {loading
                  ? seccion.lista
                      .filter((item) => item.estado === 1)
                      .map((_, index) => <LoadingGrid key={index} />)
                  : seccion.lista
                      .filter((item) => item.estado === 1)
                      .map((item: any, index: number) => {
                        return (
                          <ProductCardTipoBeneficio
                            key={item.id ?? index}
                            idRoom={
                              seccion.nombre === 'Promociones'
                                ? item.promocionId
                                : seccion.nombre === 'Beneficios'
                                ? item.promocion_Tipo_Id
                                : seccion.nombre === 'Torneos'
                                ? item.promocion_Id
                                : 0
                            }
                            beneficio={item}
                            onClick={() =>
                              goRoomProducts(
                                item.promocion,
                                seccion.nombre === 'Promociones'
                                  ? item.promocionId
                                  : seccion.nombre === 'Beneficios'
                                  ? item.promocion_Tipo_Id
                                  : seccion.nombre === 'Torneos'
                                  ? item.promocion_Id
                                  : 0,
                                item
                              )
                            }
                          />
                        );
                      })}
              </div>
            </div>
          ))}
      </main>
      {isLVDS && (beneficiosDisplay?.lista?.length ?? 0) >= 4 && (
        <div className="arrow absolute top-0 right-0 w-[52px] h-full flex pt-[44px]">
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.4)]">
            <img src={arrowGIF} className="-rotate-90 opacity-80" alt="" />
          </div>
        </div>
      )}
      {!isLVDS && (beneficiosDisplay?.lista?.length ?? 0) >= 7 && (
        <div className="arrow absolute bottom-0 left-0 w-full min-h-[52px] flex ">
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.4)] pb-3">
            <img src={arrowGIF} className="w-14 opacity-80 " alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
