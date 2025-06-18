import BackButton from '@/shared/components/BackButton';
import CloseButton from '@/shared/components/CloseButton';
import HeaderProgressBar from '@/shared/components/HeaderProgressBar';
import LoadingGrid from '@/shared/components/LoadingGrid';
import ProductCard from '@/shared/components/ProductCard';
import ProgressBar from '@/shared/components/ProgressBar';
import { getPromoImage } from '@/shared/utils/getPromoImage';
import { soundManager } from '@/shared/utils/SoundManager';
import { useUIStore } from '@/store/uiStore';
import { useViewStore } from '@/store/viewStore';
import clsx from 'clsx';
import React, { useEffect } from 'react';

const MiregaProducts = () => {
  const loading = useUIStore((s) => s.loading);
  const selectedId = useViewStore((s) => s.selectedId);

  const objProducts = Array.from({ length: 4 });

  const goTo = useViewStore((s) => s.goTo);

  useEffect(() => {
    if (loading === true) {
      useUIStore.getState().toggle('loading', false);
    }
  }, [loading]);

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
          title="{Miércoles} regalones"
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
        <ProgressBar />
      </div>
      <main
        className={clsx(
          `flex-1  p-[24px]  overflow-y-auto scrollbar-none`,
          objProducts.length > 4 && `flex items-center justify-center`
        )}
      >
        <div className="grid grid-cols-2 gap-[24px]    max-w-[474px] mx-auto">
          {/*<LoadingGrid /> */}
          {objProducts.map((_, index) => {
            return <ProductCard key={index} idRoom={index} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default MiregaProducts;
