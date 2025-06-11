import BackButton from '@/shared/components/BackButton';
import CloseButton from '@/shared/components/CloseButton';
import HeaderProgressBar from '@/shared/components/HeaderProgressBar';
import LoadingGrid from '@/shared/components/LoadingGrid';
import ProductCard from '@/shared/components/ProductCard';
import ProgressBar from '@/shared/components/ProgressBar';
import { soundManager } from '@/shared/utils/SoundManager';
import { getDeterministicBoolean } from '@/shared/utils/Utils';
import { useViewStore } from '@/store/viewStore';
import React from 'react';

const MiregaProducts = () => {
  const selectedId = useViewStore((s) => s.selectedId);
  const goTo = useViewStore((s) => s.goTo);
  return (
    <div className="h-dvh w-full flex flex-col  bg-purple-950">
      <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white/5 backdrop-blur-[80px] min-h-[65px] h-[65px]">
        <BackButton
          title="{Miércoles} regalones"
          onClick={() => {
            soundManager.play('button');
            goTo('mirega');
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
      <main className="flex-1  p-[24px]  overflow-y-auto scrollbar-none">
        <div className="grid grid-cols-2 gap-[24px]    max-w-[474px] mx-auto">
          <LoadingGrid />
          {Array.from({ length: 10 }).map((_, index) => {
            return <ProductCard key={index} idRoom={index} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default MiregaProducts;
