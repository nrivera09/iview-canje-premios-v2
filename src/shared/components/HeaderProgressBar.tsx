import React, { FC } from 'react';
import * as signalR from '@microsoft/signalr';

interface HeaderProgressBarProps {
  label?: string;
}

const HeaderProgressBar: FC<HeaderProgressBarProps> = ({
  label = 'Seleccione su regalo:',
}) => {
  return (
    <>
      <svg
        width="224"
        height="44"
        viewBox="0 0 224 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="-80" y="-80" width="384" height="204">
          <div
            style={{
              backdropFilter: 'blur(40px)',
              clipPath: 'url(#bgblur_0_1398_5640_clip_path)',
              height: '100%',
              width: '100%',
            }}
          />
        </foreignObject>
        <path
          data-figma-bg-blur-radius="80"
          d="M224 0H0V44H198.829C203.794 44 208.246 40.9428 210.029 36.3093L224 0Z"
          fill="white"
          fillOpacity="0.2"
        />
        <defs>
          <clipPath
            id="bgblur_0_1398_5640_clip_path"
            transform="translate(80 80)"
          >
            <path d="M224 0H0V44H198.829C203.794 44 208.246 40.9428 210.029 36.3093L224 0Z" />
          </clipPath>
        </defs>
      </svg>
      <span className="font-normal min-w-[206px] min-h-[39px] text-white flex items-center justify-center absolute left-0 top-[64px]">
        {label}
      </span>
    </>
  );
};

export default HeaderProgressBar;
