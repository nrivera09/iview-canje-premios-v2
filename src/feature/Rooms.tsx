import React, { useEffect } from 'react';
import LoadingGrid from '@/shared/components/LoadingGrid';
import { soundManager } from '@/shared/utils/SoundManager';
import bg from '@/shared/assets/img/bgDM.png';
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

const Rooms = () => {
  const { data, loading, loadPromociones } = usePromocionesStore();
  const goTo = useViewStore((s) => s.goTo);
  const toggle = useUIStore((s) => s.toggle);

  const isLVDS = useIsLVDS();

  useEffect(() => {
    loadPromociones();
  }, [loadPromociones]);

  const secciones: ISeccion[] = Array.isArray(data?.data)
    ? (data!.data as ISeccion[])
    : [];

  const goRoomProducts = (beneficio: string, idRoom: number) => {
    soundManager.play('button');
    useUIStore.getState().toggle('loading', true);
    setTimeout(() => {
      beneficio === 'MIREGA'
        ? goTo('mirega-products', idRoom.toString(), beneficio ?? '')
        : goTo('dorega-products', idRoom.toString(), beneficio ?? '');
    }, 2000);
  };

  /*useEffect(() => {
    toggle('postRedeem', true);
  }, [toggle]);*/
  return (
    <div
      className="h-dvh w-full flex flex-col bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {!isLVDS ? (
        <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px] min-h-[65px] h-[65px]">
          <BackButton
            title="Beneficios"
            onClick={() => soundManager.play('button')}
          />
          <CloseButton
            width="69.33px"
            height="64px"
            onClick={() => soundManager.play('button')}
          />
        </header>
      ) : (
        <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px] min-h-[44px] h-[44px]">
          <BackButton
            width="28px"
            height="28px"
            title="Beneficios"
            onClick={() => soundManager.play('button')}
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
          'flex-1 overflow-y-auto scrollbar-none'
        )}
      >
        {secciones
          .filter((seccion) => seccion.nombre === 'Beneficios')
          .map((seccion, sectionIndex) => (
            <div key={sectionIndex} className={!isLVDS ? 'mb-8' : 'mb-0'}>
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
                  ? seccion.lista.map((_, index) => <LoadingGrid key={index} />)
                  : seccion.lista.map((item: any, index: number) => {
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
                                : 0
                            )
                          }
                        />
                      );
                    })}
              </div>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Rooms;
