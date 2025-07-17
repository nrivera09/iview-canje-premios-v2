import BackButton from '@/shared/components/BackButton';
import CloseButton from '@/shared/components/CloseButton';
import arrowGIF from '@/shared/assets/img/arrowGif.gif';
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
import {
  calculatePuntosPorcentaje,
  isPeruTimeAfterAPI,
} from '@/shared/utils/Utils';
import ProductCardTipoBeneficioGrid from '@/shared/components/ProductCardBeneficioGrid';
import { useIsLVDS } from '@/shared/hooks/useDetectIview';
import MiregaPreExchange from './MiregaPreExchange';

const MiregaProducts = () => {
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
  console.log('beneficio: ', beneficio);
  useEffect(() => {
    if (beneficio?.promocion === 'MIREGA') {
      if (beneficio?.reservado && !beneficio?.canjeado) {
        beneficio?.reservado &&
          useUIStore.getState().toggle('postRedeem', true);
      }
      if (beneficio?.reservado && beneficio?.canjeado) {
        beneficio?.reservado &&
          useUIStore.getState().toggle('postRedeem', true, true);
      }
    }
  }, [beneficio]);

  useEffect(() => {
    if (beneficio?.tipo === 'Post_Informativo') {
      goTo('post-exchange-day');
    }
  }, [beneficio, goTo]);

  useEffect(() => {
    if (loading) {
      useUIStore.getState().toggle('loading', false);
    }
  }, [loading]);

  useEffect(() => {
    if (beneficioActual) {
      useUserStore.getState().setSelectedBeneficioData(beneficioActual);
    }
  }, [beneficioActual]);

  if (beneficioActual?.tipo === 'Informativo') return <MiregaPreExchange />;
  return (
    <div
      className="h-dvh w-full flex flex-col bg-no-repeat bg-cover"
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
          'flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px]  ',
          !isLVDS ? 'min-h-[56px] h-[56px]' : 'min-h-[48px] h-[48px]'
        )}
      >
        {!isLVDS ? (
          <>
            <BackButton
              title={
                userDataPoints[0].isVIP
                  ? `Miércoles regalones VIP`
                  : `Miércoles regalones`
              }
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
              title={
                userDataPoints[0].isVIP
                  ? `Miércoles regalones VIP`
                  : `Miércoles regalones`
              }
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
          'flex-1 overflow-y-auto scrollbar-none w-full items-center flex justify-start'
        )}
      >
        <div
          className={clsx(
            ` gap-[24px]  mx-auto`,
            !isLVDS
              ? 'grid grid-cols-2 w-full'
              : 'flex gap-[24px]  snap-x snap-mandatory scrollbar-none'
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
                      .goTo('mirega-productbyid', item.id_articulo, 'MIREGA');
                  }}
                  puntos={beneficio?.puntos_Min ?? 0}
                />
              ))}
        </div>
      </main>
      {isLVDS && (productos?.length ?? 0) >= 4 && (
        <div className="arrow absolute top-0 right-0 w-[52px] h-full flex pt-[48px]">
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.4)]">
            <img src={arrowGIF} className="-rotate-90 opacity-80" alt="" />
          </div>
        </div>
      )}
      {!isLVDS && (productos?.length ?? 0) >= 7 && (
        <div className="arrow absolute bottom-0 left-0 w-full min-h-[52px] flex ">
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.4)] pb-3">
            <img src={arrowGIF} className="w-14 opacity-80 " alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MiregaProducts;
