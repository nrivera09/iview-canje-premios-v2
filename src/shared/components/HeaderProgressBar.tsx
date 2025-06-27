import React, { FC } from 'react';
import * as signalR from '@microsoft/signalr';
import { useIsLVDS } from '../hooks/useDetectIview';
import clsx from 'clsx';

interface HeaderProgressBarProps {
  label?: string;
}

const HeaderProgressBar: FC<HeaderProgressBarProps> = ({
  label = 'Seleccione su regalo:',
}) => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="172"
            height="34"
            viewBox="0 0 172 34"
            fill="none"
          >
            <defs>
              <clipPath
                id="bgblur_0_1102_2038_clip_path"
                transform="translate(80 80)"
              >
                <path d="M172 0H0V34H150.741C155.715 34 160.173 30.9315 161.95 26.2857L172 0Z" />
              </clipPath>
            </defs>

            {/* Blur layer */}
            <foreignObject x="-80" y="-80" width="332" height="194">
              <div
                style={{
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  clipPath: 'url(#bgblur_0_1102_2038_clip_path)',
                  height: '100%',
                  width: '100%',
                }}
              />
            </foreignObject>

            {/* Shape */}
            <path
              d="M172 0H0V34H150.741C155.715 34 160.173 30.9315 161.95 26.2857L172 0Z"
              fill="white"
              fillOpacity="0.2"
            />
          </svg>
          <span className="font-normal min-w-[172px] min-h-[34px] text-white flex items-center justify-start absolute left-0 top-0  z-10 text-[14px] pl-[20px]">
            {label}
          </span>
        </div>
      ) : (
        <div
          className={clsx(
            `relative z-10 top-[5px] overflow-hidden`,
            'w-[197px] h-[44px]'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="197"
            height="44"
            viewBox="0 0 197 44"
            fill="none"
          >
            <defs>
              <clipPath
                id="bgblur_0_1321_3657_clip_path"
                transform="translate(80 80)"
              >
                <path d="M197 0H0V44H171.829C176.794 44 181.246 40.9428 183.029 36.3093L197 0Z" />
              </clipPath>
            </defs>

            {/* Blur background */}
            <foreignObject x="-80" y="-80" width="357" height="204">
              <div
                style={{
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  clipPath: 'url(#bgblur_0_1321_3657_clip_path)',
                  height: '100%',
                  width: '100%',
                }}
              />
            </foreignObject>

            {/* Shape with semi-transparent white fill */}
            <path
              d="M197 0H0V44H171.829C176.794 44 181.246 40.9428 183.029 36.3093L197 0Z"
              fill="white"
              fillOpacity="0.2"
            />
          </svg>
          <span className="font-normal min-w-[197px] min-h-[44px] text-white flex items-center justify-start pl-[15px] absolute left-0 top-0  z-10">
            {label}
          </span>
        </div>
      )}
    </>
  );
};

export default HeaderProgressBar;
