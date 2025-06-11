import React from 'react';

export const ProductExchangeLabel: React.FC = () => (
  <div className="absolute top-0 ml-[-16px] mt-[7px]">
    <svg
      width="181"
      height="42"
      viewBox="0 0 181 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_871_2476)">
        <path
          d="M4 32H169.034C173.452 32 177 28.4183 177 24V8C177 3.58172 173.418 0 169 0H12C7.58172 0 4 3.58172 4 8V32Z"
          fill="url(#paint0_linear_871_2476)"
        />
      </g>
      <path d="M4 32H16V42L4 32Z" fill="#2F5B0D" />
      <defs>
        <filter
          id="filter0_d_871_2476"
          x="0"
          y="0"
          width="181"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_871_2476"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_871_2476"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_871_2476"
          x1="4"
          y1="12"
          x2="134"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#39802A" />
          <stop offset="1" stopColor="#52B43D" />
        </linearGradient>
      </defs>
    </svg>
    <p className="absolute top-0 left-0 min-w-[173px] min-h-[32px] flex items-center justify-center text-white text-[16px] font-bold">
      ¡Producto canjeado!
    </p>
  </div>
);
