import React, { FC } from 'react';
import { callHandleClose } from '../utils/iviewCoreHelpers';
import { closeIview } from '../utils/iframeMessenger';
import clsx from 'clsx';

interface CloseButtonProps {
  onClick: () => void;
  width?: string;
  height?: string;
  className?: string;
}

const CloseButton: FC<CloseButtonProps> = ({
  onClick,
  width = '72',
  height = '65',
  className,
}) => {
  return (
    <button
      onClick={() => {
        onClick();
        if (typeof (window as any).handleCloseClick === 'function') {
          (window as any).handleCloseClick();
        }
        closeIview();
      }}
      className={clsx(className, `!overflow-hidden relative top-[-1px]`)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="62"
        height="57"
        viewBox="0 0 62 57"
        fill="none"
        className="relative z-0"
      >
        <foreignObject x="-79.2324" y="-80.125" width="222.389" height="217">
          <div
            style={{
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              clipPath: 'url(#bgblur_0_2944_1210_clip_path)',
              height: '100%',
              width: '100%',
            }}
          />
        </foreignObject>
        <g data-figma-bg-blur-radius="80">
          <path
            d="M2 0.875H62.1562V55.875H29.7994C20.3403 55.875 12.1747 49.2482 10.2277 39.9916L2 0.875Z"
            fill="url(#paint0_linear_2944_1210)"
          />
          <path
            d="M62.6562 0.375V56.375H29.7998C20.1043 56.375 11.734 49.5826 9.73828 40.0947L1.51074 0.977539L1.38379 0.375H62.6562Z"
            stroke="white"
            strokeOpacity="0.4"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_2944_1210_clip_path"
            transform="translate(79.2324 80.125)"
          >
            <path d="M2 0.875H62.1562V55.875H29.7994C20.3403 55.875 12.1747 49.2482 10.2277 39.9916L2 0.875Z" />
          </clipPath>
          <linearGradient
            id="paint0_linear_2944_1210"
            x1="-7.2548"
            y1="60.4583"
            x2="61.5857"
            y2="0.222893"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.3" />
            <stop offset="1" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute right-0 top-0 z-10 w-[62px] h-[57px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M18.3002 6.5857C17.9102 6.1957 17.2802 6.1957 16.8902 6.5857L12.0002 11.4657L7.11022 6.5757C6.72022 6.1857 6.09021 6.1857 5.70021 6.5757C5.31021 6.9657 5.31021 7.5957 5.70021 7.9857L10.5902 12.8757L5.70021 17.7657C5.31021 18.1557 5.31021 18.7857 5.70021 19.1757C6.09021 19.5657 6.72022 19.5657 7.11022 19.1757L12.0002 14.2857L16.8902 19.1757C17.2802 19.5657 17.9102 19.5657 18.3002 19.1757C18.6902 18.7857 18.6902 18.1557 18.3002 17.7657L13.4102 12.8757L18.3002 7.9857C18.6802 7.6057 18.6802 6.9657 18.3002 6.5857Z"
            fill="white"
          />
        </svg>
      </div>
    </button>
  );
};

export default CloseButton;
