import BackButton from '@/shared/components/BackButton';
import CloseButton from '@/shared/components/CloseButton';
import HeaderProgressBar from '@/shared/components/HeaderProgressBar';
import LoadingGrid from '@/shared/components/LoadingGrid';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';
import ProgressBar from '@/shared/components/ProgressBar';
import { getPromoImage } from '@/shared/utils/getPromoImage';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useViewStore } from '@/store/viewStore';
import { usePromocionesStore } from '@/store/promocionesStore';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import {
  IBeneficio,
  ITorneoItem,
  IPromocionItem,
  IBeneficioGRID,
} from '@/shared/types/iview.types';
import { useUserStore } from '@/store/userStore';
import { calculatePuntosPorcentaje } from '@/shared/utils/Utils';
import ProductCardTipoBeneficioGrid from '@/shared/components/ProductCardBeneficioGrid';
import { useIsLVDS } from '@/shared/hooks/useDetectIview';

const DoregaProducts = () => {
  const isLVDS = useIsLVDS();

  const { userDataPoints } = useUserStore();
  const [beneficioActual, setBeneficioActual] =
    React.useState<IBeneficio | null>(null);
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const loading = useUIStore((s) => s.loading);
  const selectedId = useViewStore((s) => s.selectedId);
  const selectedType = useViewStore((s) => s.selectedType);
  const { data } = usePromocionesStore();

  const goTo = useViewStore((s) => s.goTo);

  useEffect(() => {
    if (loading) {
      useUIStore.getState().toggle('loading', false);
    }
  }, [loading]);

  // 🔍 Filtrado dinámico según el tipo
  const productos = useMemo(() => {
    if (!data || !selectedId || typeof selectedType !== 'string') return [];

    const secciones = data.data;
    switch (selectedType.toUpperCase()) {
      case 'MIREGA':
      case 'DOREGA': {
        const beneficioList =
          secciones.find((s) => s.nombre === 'Beneficios')?.lista ?? [];

        const beneficio = (beneficioList as IBeneficio[]).find(
          (item) => item.promocion_Tipo_Id.toString() === selectedId
        );

        setBeneficioActual(beneficio ?? null); //

        return beneficio?.lista_Regalos ?? [];
      }

      case 'TORNEO':
        return (
          secciones
            .find((s) => s.nombre === 'Torneos')
            ?.lista?.filter(
              (item: ITorneoItem) => item.promocion_Id.toString() === selectedId
            ) ?? []
        );

      case 'PROMOCIONES':
        return (
          secciones
            .find((s) => s.nombre === 'Promociones')
            ?.lista?.filter(
              (item: IPromocionItem) => item.id.toString() === selectedId
            ) ?? []
        );

      default:
        return [];
    }
  }, [data, selectedId, selectedType]);

  useEffect(() => {
    if (beneficioActual) {
      useUserStore.getState().setSelectedBeneficioData(beneficioActual);
      console.log('se activo dorega: ', beneficioActual);
    }
  }, [beneficioActual]);

  return (
    <div
      className="h-dvh w-full flex flex-col bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${getPromoImage(
          String(userDataPoints[0].promocion.toLocaleLowerCase()),
          userDataPoints[0].isVIP || false
        )})`,
        backgroundPosition: 'center top',
      }}
    >
      <header
        className={clsx(
          'flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]  ',
          !isLVDS ? 'min-h-[56px] h-[56px]' : 'min-h-[48px] h-[48px]'
        )}
      >
        {!isLVDS ? (
          <>
            <BackButton
              title={`Domingos regalones`}
              onClick={() => {
                soundManager.play('button');
                goTo('rooms');
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
              title={`Domingos regalones`}
              width="28px"
              height="28px"
              onClick={() => {
                soundManager.play('button');
                goTo('rooms');
              }}
            />
            <CloseButton
              width="52px"
              height="48px"
              onClick={() => soundManager.play('button')}
            />
          </>
        )}
      </header>
      <div className=" h-[34px]  flex items-center justify-between">
        <HeaderProgressBar />
        <ProgressBar
          value={calculatePuntosPorcentaje(
            beneficio?.puntos ?? 0,
            beneficio?.puntos_Min ?? 0
          )}
        />
      </div>
      <main
        className={clsx(
          !isLVDS ? ' p-[24px] ' : 'px-[20px] py-[9px] flex items-center ',
          'flex-1 overflow-y-auto scrollbar-none'
        )}
      >
        <div
          className={clsx(
            ` gap-[24px]  mx-auto`,
            !isLVDS
              ? 'grid grid-cols-2 max-w-[474px]'
              : 'flex flex-row w-full flex-nowrap  scrollbar-none'
          )}
        >
          {loading
            ? productos.map((_, index) => <LoadingGrid key={index} />)
            : productos.map((item, index) => (
                <ProductCardTipoBeneficioGrid
                  key={index}
                  idRoom={index}
                  beneficio={item as IBeneficioGRID}
                  onClick={() => {
                    soundManager.play('button');
                    useUIStore.getState().toggle('loading', true);
                    useViewStore.getState().setPreviousId(selectedId ?? '');
                    useViewStore
                      .getState()
                      .goTo('dorega-productbyid', item.id_articulo, 'DOREGA');
                  }}
                  puntos={beneficio?.puntos_Min ?? 0}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default DoregaProducts;
