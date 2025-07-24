import BackButton from '@/shared/components/BackButton';
import CloseButton from '@/shared/components/CloseButton';
import HeaderProgressBar from '@/shared/components/HeaderProgressBar';
import LoadingGrid from '@/shared/components/LoadingGrid';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';
import ProgressBar from '@/shared/components/ProgressBar';
import { getPromoImage, getPromoImageLogo } from '@/shared/utils/getPromoImage';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useViewStore } from '@/store/viewStore';
import { usePromocionesStore } from '@/store/promocionesStore';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import bgInfo from '@/shared/assets/img/mirega_dorega_star.png';
import {
  IBeneficio,
  ITorneoItem,
  IPromocionItem,
  IBeneficioGRID,
} from '@/shared/types/iview.types';
import { useUserStore } from '@/store/userStore';
import {
  calculatePuntosPorcentaje,
  formatFechaLatina,
  getDayOfWeek,
} from '@/shared/utils/Utils';
import ProductCardTipoBeneficioGrid from '@/shared/components/ProductCardBeneficioGrid';
import { useIsLVDS } from '@/shared/hooks/useDetectIview';
import ProductCardBeneficioGridNoClick from '@/shared/components/ProductCardBeneficioGridNoClick';
import BackButton2 from '@/shared/components/BackButton2';

const MiregaPreExchange = () => {
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

  const promoLogo = getPromoImageLogo(
    String(userDataPoints[0]?.promocion?.toLowerCase?.() || ''),
    userDataPoints[0]?.isVIP || false
  );

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
    }
  }, [beneficioActual]);

  return (
    <div
      className="h-dvh w-full flex flex-col overflow-hidden bg-no-repeat bg-cover"
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
          ' overflow-hidden flex items-center justify-between  z-30 absolute left-0 w-full',
          !isLVDS ? 'min-h-[56px] h-[56px]' : 'min-h-[48px] h-[48px]'
        )}
      >
        {!isLVDS ? (
          <>
            <BackButton
              className="relative top-[4px]"
              title={``}
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
            <BackButton2
              className="absolute left-0 top-0"
              onClick={() => {
                soundManager.play('button');
                goTo('rooms');
              }}
            />
            <CloseButton
              className="absolute right-0"
              width="52px"
              height="48px"
              onClick={() => soundManager.play('button')}
            />
          </>
        )}
      </header>
      <main
        className={clsx(
          !isLVDS
            ? ' p-[24px] flex items-center justify-center flex-col'
            : 'px-[40px] py-[9px] ',
          'flex-1 overflow-y-auto scrollbar-none overflow-x-hidden relative z-10'
        )}
      >
        {!isLVDS ? (
          <div className="flex flex-row mb-5 items-center justify-center gap-[24px] w-full">
            <div className="w-[50%]">
              {promoLogo && (
                <img
                  src={promoLogo}
                  alt=""
                  className={clsx(
                    !isLVDS
                      ? `w-[220px] top-[15%] left-0`
                      : `min-w-[142px] h-[90px]`,
                    `absolute`
                  )}
                />
              )}
            </div>
            <div className="relative flex-1 flex flex-col">
              <p className="bg-white rounded-full font-bold uppercase text-center text-[14px] z-10 relative text-[#0e348a] top-[8px]">
                {formatFechaLatina(userDataPoints[0].fecha_ini)}
              </p>
              <div
                className="bg-no-repeat flex flex-col items-center justify-center bg-center bg-cover w-[120px] h-[120px] mx-auto z-0 relative top-[-15px]"
                style={{ backgroundImage: `url(${bgInfo})` }}
              >
                <p className="text-white font-bold text-[40px] leading-0 mt-5 h-[45px] overflow-hidden">
                  {userDataPoints[0].puntos_Min}
                </p>
                <p
                  className="text-white font-bold leading-0 tracking-wider text-[18px] uppercase mt-1"
                  style={{ letterSpacing: `1px` }}
                >
                  puntos
                </p>
              </div>

              <span className="text-white leading-0 text-[11px] font-light text-center">
                Acumula y canjea tu regalo de 8 AM a 4 AM{' '}
                {getDayOfWeek(userDataPoints[0].fecha_fin!)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-row mb-2 items-center justify-center gap-[24px]">
            <div className="w-1/3 flex items-center justify-center">
              <p className="bg-white rounded-full font-bold uppercase text-center text-[14px] z-10 relative text-[#0e348a] w-fit px-4">
                {formatFechaLatina(userDataPoints[0].fecha_ini)}
              </p>
            </div>
            <div className="flex-1">
              {promoLogo && (
                <img
                  src={promoLogo}
                  alt=""
                  className={clsx(
                    !isLVDS
                      ? `w-[220px] top-[6%] left-[-1%]`
                      : `min-w-[142px] h-[90px]`,
                    `mx-auto`
                  )}
                />
              )}
            </div>
            <div className="relative flex-1 flex flex-col w1/3">
              <div
                className="bg-no-repeat flex flex-row items-center justify-startrelative top-[4px] bg-contain bg-left w-full h-[80px] mx-auto z-0 relative "
                style={{ backgroundImage: `url(${bgInfo})` }}
              >
                <p className="text-white font-bold text-[30px] flex flex-row items-center justify-start gap-1 relative top-[6px] ml-[13px]">
                  {userDataPoints[0].puntos_Min}{' '}
                  <span className="!font-bold uppercase text-[14px]">
                    {' '}
                    puntos
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div
          className={clsx(
            ` gap-[24px]  mx-auto`,
            !isLVDS
              ? 'grid grid-cols-2 max-w-[474px]'
              : 'flex flex-row w-full flex-nowrap  scrollbar-none pl-[19px]'
          )}
        >
          {loading
            ? productos.map((_, index) => <LoadingGrid key={index} />)
            : productos.map((item, index) => (
                <ProductCardBeneficioGridNoClick
                  key={index}
                  idRoom={index}
                  beneficio={item as IBeneficioGRID}
                  onClick={() => {
                    soundManager.play('error');
                  }}
                  puntos={beneficio?.puntos_Min ?? 0}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default MiregaPreExchange;
