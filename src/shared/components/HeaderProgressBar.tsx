import React, { FC } from 'react';
import * as signalR from '@microsoft/signalr';
import { useIsLVDS } from '../hooks/useDetectIview';
import clsx from 'clsx';
import bgProgressBar from '@/shared/assets/img/bg1ProgressBar.png';
import bgProgressBarLVDS from '@/shared/assets/img/bg1ProgressBarLVDS.png';
import bgProgressBar2 from '@/shared/assets/img/bg2ProgressBar.png';
import bgProgressBar2LVDS from '@/shared/assets/img/bg2ProgressBarLVDS.png';
import { useViewStore } from '@/store/viewStore';

interface HeaderProgressBarProps {
  label?: string;
}

const HeaderProgressBar: FC<HeaderProgressBarProps> = ({
  label = 'Seleccione su regalo:',
}) => {
  const selectedType = useViewStore((s) => s.selectedType);
  console.log('selectedType: ', selectedType);
  const isLVDS = useIsLVDS();
  return (
    <>
      {isLVDS ? (
        <div
          className={clsx(
            `relative z-10  overflow-hidden top-[5px] `,
            'h-[44px]'
          )}
        >
          <img
            src={
              selectedType === 'MIREGA' ? bgProgressBarLVDS : bgProgressBar2LVDS
            }
            alt=""
          />
          <span className="font-normal min-w-[172px] min-h-[34px] text-white flex items-center justify-start absolute left-0 top-0  z-10 text-[14px] pl-[20px]">
            {label}
          </span>
        </div>
      ) : (
        <div
          className={clsx(
            `relative z-10 top-[5px] overflow-hidden`,
            'min-w-[188px] h-[44px]'
          )}
        >
          <img
            src={selectedType === 'MIREGA' ? bgProgressBar : bgProgressBar2}
            alt=""
          />
          <span className="font-light w-full min-h-[44px] text-white flex items-center justify-center  absolute left-0 top-0  z-10">
            {label}
          </span>
        </div>
      )}
    </>
  );
};

export default HeaderProgressBar;
