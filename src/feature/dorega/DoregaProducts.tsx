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
} from '@/shared/types/iview.types';
import { useUserStore } from '@/store/userStore';
import { calculatePuntosPorcentaje } from '@/shared/utils/Utils';

const DoregaProducts = () => {
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
    }
  }, [beneficioActual]);

  return (
    <div
      className="h-dvh w-full flex flex-col bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${getPromoImage('mirega', 'vip')})`,
        backgroundPosition: 'center top',
      }}
    >
      <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white bg-opacity-5 backdrop-blur-[40px] min-h-[65px] h-[65px] ">
        <BackButton
          title={`${
            selectedType === 'MIREGA' ? 'Miercoles' : 'Domingos'
          } regalones`}
          onClick={() => {
            soundManager.play('button');
            goTo('rooms');
          }}
        />
        <CloseButton
          width="69.33px"
          height="64px"
          onClick={() => soundManager.play('button')}
        />
      </header>
      <div className=" h-[34px] bg-[#ffffff3d] flex items-center justify-between">
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
          `flex-1 p-[24px] overflow-y-auto scrollbar-none`,
          productos.length > 4 && `flex items-center justify-center`
        )}
      >
        <div className="grid grid-cols-2 gap-[24px] max-w-[474px] mx-auto">
          {loading
            ? productos.map((_, index) => <LoadingGrid key={index} />)
            : productos.map((item, index) => (
                <ProductCardBeneficio
                  key={index}
                  idRoom={index}
                  beneficio={item as IBeneficio}
                  onClick={() => {
                    soundManager.play('button');
                    useUIStore.getState().toggle('loading', true);
                    useViewStore.getState().setPreviousId(selectedId ?? '');
                    useViewStore
                      .getState()
                      .goTo('dorega-productbyid', index.toString(), 'DOREGA');
                  }}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default DoregaProducts;
