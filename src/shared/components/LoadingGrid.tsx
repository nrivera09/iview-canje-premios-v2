import clsx from 'clsx';
import React from 'react';
import { useIsLVDS } from '../hooks/useDetectIview';

const LoadingGrid = () => {
  const isLVDS = useIsLVDS();
  return (
    <div
      className={clsx(
        `backdrop-blur-[80px] bg-[linear-gradient(230.99deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.6)_100%)]
 w-full rounded-md xs:min-w-full  flex items-center justify-center animate-pulse`,

        !isLVDS
          ? `w-[160px] min-w-[160px] h-[144px]`
          : `w-[160px] min-w-[160px] h-[150px] `
      )}
    ></div>
  );
};

export default LoadingGrid;
