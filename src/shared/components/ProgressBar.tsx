import React, { FC } from 'react';

interface ProgressBarProps {
  labelHave?: string;
  labelFormat?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({
  labelHave = 'Tiene',
  labelFormat = 'puntos',
}) => {
  return (
    <div className="flex flex-1 items-center justify-center px-6 gap-[10px]">
      <p className="text-[14px] text-white">
        {' '}
        {labelHave} <span className="font-bold">{999}</span> {labelFormat}
      </p>
      <div
        className="min-w-[100px] max-w-full overflow-hidden h-[8px] rounded-full bg-[linear-gradient(90deg,_#9AEE88_0%,_#52B43D_78.96%)]
"
      ></div>
    </div>
  );
};

export default ProgressBar;
