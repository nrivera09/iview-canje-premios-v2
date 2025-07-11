import { useUserStore } from '@/store/userStore';
import React, { FC, useEffect, useState } from 'react';
import { useIsLVDS } from '../hooks/useDetectIview';

interface ProgressBarProps {
  labelHave?: string;
  labelFormat?: string;
  value?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({
  labelHave = 'Tiene',
  labelFormat = 'puntos',
  value = 70,
}) => {
  const isLVDS = useIsLVDS();
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = Math.min(Math.max(value, 0), 100);
    const interval = setInterval(() => {
      current += 1;
      setPercentage(current);
      if (current >= target) {
        clearInterval(interval);
      }
    }, 0);

    return () => clearInterval(interval);
  }, [value]);

  return !isLVDS ? (
    <div className="relative flex-1 z-0 top-[-1px] left-[-13px] w-[180px]">
      <SvgRoundedBlurDM />
      <div className="absolute top-0 left-0 flex items-center justify-center h-full  w-[204px] gap-[10px] pl-[12%]">
        <p className="text-[14px] text-white">
          {labelHave} <span className="font-bold">{beneficio?.puntos}</span>{' '}
          {labelFormat}
        </p>
        <div className="relative min-w-[55px] max-w-full overflow-hidden h-[8px] rounded-full bg-neutral-700">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[linear-gradient(90deg,#9AEE88_0%,#52B43D_78.96%)] shadow-[0_0_10px_rgba(82,180,61,0.6)] transition-all duration-300 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative flex-1 z-0 top-[-1px] left-[-13px]">
      <SvgRoundedBlur />
      <div className="absolute top-0 left-0 flex items-center justify-center h-full  gap-[10px] pl-0 w-[283px]">
        <p className="text-[14px] text-white">
          {labelHave} <span className="font-bold">{beneficio?.puntos}</span>{' '}
          {labelFormat}
        </p>
        <div className="relative min-w-[100px] max-w-full overflow-hidden h-[8px] rounded-full bg-neutral-700">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[linear-gradient(90deg,#9AEE88_0%,#52B43D_78.96%)] shadow-[0_0_10px_rgba(82,180,61,0.6)] transition-all duration-300 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const SvgRoundedBlur: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="283"
      height="32"
      viewBox="0 0 283 32"
      fill="none"
    >
      <defs>
        <clipPath
          id="bgblur_0_1585_1084_clip_path"
          transform="translate(80 80)"
        >
          <path d="M282.385 0L0.00012207 0V32H264.573C269.999 32 274.75 28.3591 276.16 23.1197L282.385 0Z" />
        </clipPath>
      </defs>

      <foreignObject x="-80" y="-80" width="442.385" height="192">
        <div
          style={{
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            clipPath: 'url(#bgblur_0_1585_1084_clip_path)',
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>

      <path
        data-figma-bg-blur-radius="80"
        d="M282.385 0L0.00012207 0V32H264.573C269.999 32 274.75 28.3591 276.16 23.1197L282.385 0Z"
        fill="white"
        fillOpacity="0.2"
      />
    </svg>
  );
};

const SvgRoundedBlurDM: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="283"
      height="32"
      viewBox="0 0 283 32"
      fill="none"
    >
      <defs>
        <clipPath
          id="bgblur_0_1585_1084_clip_path"
          transform="translate(80 80)"
        >
          <path d="M282.385 0L0.00012207 0V32H264.573C269.999 32 274.75 28.3591 276.16 23.1197L282.385 0Z" />
        </clipPath>
      </defs>

      {/* Fondo con blur */}
      <foreignObject x="-80" y="-80" width="442.385" height="192">
        <div
          style={{
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            clipPath: 'url(#bgblur_0_1585_1084_clip_path)',
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>

      {/* Sombra blanca semi-transparente */}
      <path
        d="M282.385 0L0.00012207 0V32H264.573C269.999 32 274.75 28.3591 276.16 23.1197L282.385 0Z"
        fill="white"
        fillOpacity="0.2"
      />
    </svg>
  );
};

export default ProgressBar;
