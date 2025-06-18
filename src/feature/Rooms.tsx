import React, { useEffect } from 'react';
import LoadingGrid from '@/shared/components/LoadingGrid';
import { soundManager } from '@/shared/utils/SoundManager';
import bg from '@/shared/assets/img/bgDM.png';
import CloseButton from '@/shared/components/CloseButton';
import BackButton from '@/shared/components/BackButton';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';
import { usePromocionesStore } from '@/store/promocionesStore';

const Rooms = () => {
  const { data, loading, loadPromociones } = usePromocionesStore();

  useEffect(() => {
    loadPromociones();
  }, [loadPromociones]);

  const cantidadItems = data?.data?.sorteo.length ?? 10;

  return (
    <div
      className="h-dvh w-full flex flex-col bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
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

      <main className="flex-1 p-[24px] overflow-y-auto scrollbar-none">
        <div className="grid grid-cols-2 gap-[24px] max-w-[474px] mx-auto">
          {loading
            ? Array.from({ length: cantidadItems }).map((_, index) => (
                <LoadingGrid key={index} />
              ))
            : data?.data?.sorteo.map((item, index) => (
                <ProductCardBeneficio key={index} idRoom={index} />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Rooms;
