import React, { useEffect } from 'react';
import backScreen from '@/shared/assets/img/backScreen.png';
import closeScreen from '@/shared/assets/img/close.png';
import LoadingGrid from '@/shared/components/LoadingGrid';
import { soundManager } from '@/shared/utils/SoundManager';
import CloseButton from '@/shared/components/CloseButton';
import BackButton from '@/shared/components/BackButton';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';
import { usePromocionesStore } from '@/store/promocionesStore';
import { IBeneficio, ISeccion } from '@/shared/types/iview.types';

const MiregaScreen = () => {
  const { data, loading, loadPromociones } = usePromocionesStore();

  useEffect(() => {
    loadPromociones();
  }, [loadPromociones]);

  // ✅ Buscar la sección "Beneficios"
  const beneficiosSection = data?.data.find(
    (s: ISeccion) => s.nombre === 'Beneficios'
  );

  // ✅ Filtrar los beneficios con promoción = "MIREGA"
  const listaMirega: IBeneficio[] =
    (beneficiosSection?.lista as IBeneficio[] | undefined)?.filter(
      (item) => item.promocion === 'MIREGA'
    ) ?? [];

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden bg-purple-950">
      <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white/5 backdrop-blur-[80px] min-h-[56px] h-[56px]">
        <BackButton
          title="Beneficios"
          onClick={() => soundManager.play('button')}
        />
        <CloseButton
          width="60px"
          height="55px"
          onClick={() => soundManager.play('button')}
        />
      </header>

      <main className="flex-1 p-[24px] overflow-y-auto scrollbar-none overflow-x-hidden">
        <div className="grid grid-cols-2 gap-[24px] max-w-[474px] mx-auto">
          {loading
            ? listaMirega.map((_, index) => <LoadingGrid key={index} />)
            : listaMirega.map((item, index) => (
                <ProductCardBeneficio
                  key={item.id}
                  idRoom={index}
                  beneficio={item}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default MiregaScreen;
