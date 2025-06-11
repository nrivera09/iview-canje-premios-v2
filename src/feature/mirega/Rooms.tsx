import React from 'react';
import backScreen from '@/shared/assets/img/backScreen.png';
import closeScreen from '@/shared/assets/img/close.png';
import LoadingGrid from '@/shared/components/LoadingGrid';
import { soundManager } from '@/shared/utils/SoundManager';
import ProductCard from '@/shared/components/ProductCard';
import CloseButton from '@/shared/components/CloseButton';
import BackButton from '@/shared/components/BackButton';
import ProductCardBeneficio from '@/shared/components/ProductCardBeneficio';

const Rooms = () => {
  return (
    <div className="h-dvh w-full flex flex-col  bg-purple-950">
      <header className="flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/20 bg-white/5 backdrop-blur-[80px] min-h-[65px] h-[65px]">
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
      <main className="flex-1  p-[24px] overflow-y-auto scrollbar-none">
        <div className="grid grid-cols-2 gap-[24px]    max-w-[474px] mx-auto">
          <LoadingGrid />
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardBeneficio key={index} idRoom={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Rooms;
