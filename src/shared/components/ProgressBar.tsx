import { useUserStore } from '@/store/userStore';
import React, { FC, useEffect, useState } from 'react';

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

  return (
    <div className="flex flex-1 items-center justify-center px-6 gap-[10px]">
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
  );
};

export default ProgressBar;
