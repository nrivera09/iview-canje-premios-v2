import React, { FC } from 'react';

interface CloseButtonProps {
  onClick: () => void;
  width?: string;
  height?: string;
}

const CloseButton: FC<CloseButtonProps> = ({
  onClick,
  width = '72',
  height = '65',
}) => {
  return (
    <button onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 72 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="-79.2324" y="-81" width="232.232" height="226">
          <div
            style={{
              backdropFilter: 'blur(40px)',
              clipPath: 'url(#bgblur_0_1504_1577_clip_path)',
              height: '100%',
              width: '100%',
            }}
          />
        </foreignObject>
        <g data-figma-bg-blur-radius="80">
          <path
            d="M2 0H72V64H31.6924C22.2333 64 14.0677 57.3732 12.1207 48.1167L2 0Z"
            fill="url(#paint0_linear_1504_1577)"
          />
          <path
            d="M72.5 -0.5V64.5H31.6924C22.1482 64.5 13.8888 57.918 11.7295 48.6621L11.6318 48.2197L1.51074 0.102539L1.38379 -0.5H72.5Z"
            stroke="white"
            strokeOpacity="0.4"
          />
        </g>
        <path
          d="M45.9667 25.7097C45.5767 25.3197 44.9467 25.3197 44.5567 25.7097L39.6667 30.5897L34.7767 25.6997C34.3867 25.3097 33.7567 25.3097 33.3667 25.6997C32.9767 26.0897 32.9767 26.7197 33.3667 27.1097L38.2567 31.9997L33.3667 36.8897C32.9767 37.2797 32.9767 37.9097 33.3667 38.2997C33.7567 38.6897 34.3867 38.6897 34.7767 38.2997L39.6667 33.4097L44.5567 38.2997C44.9467 38.6897 45.5767 38.6897 45.9667 38.2997C46.3567 37.9097 46.3567 37.2797 45.9667 36.8897L41.0767 31.9997L45.9667 27.1097C46.3467 26.7297 46.3467 26.0897 45.9667 25.7097Z"
          fill="white"
        />
        <defs>
          <clipPath
            id="bgblur_0_1504_1577_clip_path"
            transform="translate(79.2324 81)"
          >
            <path d="M2 0H72V64H31.6924C22.2333 64 14.0677 57.3732 12.1207 48.1167L2 0Z" />
          </clipPath>
          <linearGradient
            id="paint0_linear_1504_1577"
            x1="-8.76922"
            y1="69.3333"
            x2="71.3361"
            y2="-0.75882"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.3" />
            <stop offset="1" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
};

export default CloseButton;
