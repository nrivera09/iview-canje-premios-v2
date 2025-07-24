import React from 'react';
import backScreen from '@/shared/assets/img/backScreen.png';
import closeScreen from '@/shared/assets/img/close.png';
import LoadingGrid from '@/shared/components/LoadingGrid';

const DoregaScreen = () => {
  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden  bg-purple-950">
      <header className="overflow-hidden flex items-center justify-between w-full border-t-0 border-r-0 border-l-0 border border-white/10 bg-white/5 backdrop-blur-[80px]">
        <button className="flex items-center justify-center flex-row gap-2 px-[16px]">
          <img src={backScreen} alt="" />
          <p className="text-white font-semibold">Beneficios</p>
        </button>
        <button>
          <img src={closeScreen} className="w-[69px]" alt="" />
        </button>
      </header>
      <main className="flex-1  px-[16px] pt-[16px] sm:px-[24px] sm:pt-[24px] overflow-y-auto scrollbar-none overflow-x-hidden">
        <div className="grid grid-cols-2 gap-[16px] xs:gap-[12px] sm:gap-[24px]   max-w-[474px] mx-auto">
          <LoadingGrid />
          <div className="bg-red-400 rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 w-full rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 w-full rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 w-full rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 w-full rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 w-full rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
          <div className="bg-red-400 rounded-md xs:min-w-full xs:min-h-[145px] min-w-[180px] min-h-[165px]  md:min-w-[225px] md:min-h-[200px] flex items-center justify-center">
            x
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoregaScreen;
