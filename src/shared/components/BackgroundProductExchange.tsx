import React from 'react';
import { useIsLVDS } from '../hooks/useDetectIview';

export const BackgroundProductExchange: React.FC = () => {
  const isLVDS = useIsLVDS();
  return !isLVDS ? (
    <svg
      width="340"
      height="448"
      viewBox="0 0 340 448"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject x="-50" y="-49.2959" width="440" height="547">
        <div
          style={{
            backdropFilter: 'blur(25px)',
            clipPath: 'url(#bgblur_0_1440_4895_clip_path)',
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>
      <g data-figma-bg-blur-radius="50">
        <mask
          id="path-1-outside-1_1440_4895"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0.704102"
          width="340"
          height="447"
          fill="black"
        >
          <rect fill="white" y="0.704102" width="340" height="447" />
          <path d="M323 1.7041C331.837 1.7041 339 8.86755 339 17.7041V276.704C330.163 276.704 323 283.868 323 292.704C323 301.541 330.163 308.704 339 308.704V430.704C339 439.541 331.837 446.704 323 446.704H17C8.16345 446.704 1 439.541 1 430.704V308.704C9.83656 308.704 17 301.541 17 292.704C17 283.868 9.83656 276.704 1 276.704V17.7041C1 8.86755 8.16345 1.7041 17 1.7041H323Z" />
        </mask>
        <path
          d="M323 1.7041C331.837 1.7041 339 8.86755 339 17.7041V276.704C330.163 276.704 323 283.868 323 292.704C323 301.541 330.163 308.704 339 308.704V430.704C339 439.541 331.837 446.704 323 446.704H17C8.16345 446.704 1 439.541 1 430.704V308.704C9.83656 308.704 17 301.541 17 292.704C17 283.868 9.83656 276.704 1 276.704V17.7041C1 8.86755 8.16345 1.7041 17 1.7041H323Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          d="M323 1.7041V0.704102V1.7041ZM339 17.7041H340H339ZM339 276.704V277.704H340V276.704H339ZM339 308.704H340V307.704H339V308.704ZM339 430.704H340H339ZM323 446.704V447.704V446.704ZM17 446.704V447.704V446.704ZM1 430.704H0H1ZM1 308.704V307.704H0V308.704H1ZM1 276.704H0V277.704H1V276.704ZM1 17.7041H0H1ZM17 1.7041V0.704102V1.7041ZM323 1.7041V2.7041C331.284 2.7041 338 9.41983 338 17.7041H339H340C340 8.31526 332.389 0.704105 323 0.704102V1.7041ZM339 17.7041H338V276.704H339H340V17.7041H339ZM339 276.704V275.704C329.611 275.704 322 283.315 322 292.704H323H324C324 284.42 330.716 277.704 339 277.704V276.704ZM323 292.704H322C322 302.093 329.611 309.704 339 309.704V308.704V307.704C330.716 307.704 324 300.988 324 292.704H323ZM339 308.704H338V430.704H339H340V308.704H339ZM339 430.704H338C338 438.988 331.284 445.704 323 445.704V446.704V447.704C332.389 447.704 340 440.093 340 430.704H339ZM323 446.704V445.704H17V446.704V447.704H323V446.704ZM17 446.704V445.704C8.71573 445.704 2 438.988 2 430.704H1H0C1.19209e-07 440.093 7.61116 447.704 17 447.704V446.704ZM1 430.704H2V308.704H1H0V430.704H1ZM1 308.704V309.704C10.3888 309.704 18 302.093 18 292.704H17H16C16 300.988 9.28427 307.704 1 307.704V308.704ZM17 292.704H18C18 283.315 10.3888 275.704 1 275.704V276.704V277.704C9.28427 277.704 16 284.42 16 292.704H17ZM1 276.704H2V17.7041H1H0V276.704H1ZM1 17.7041H2C2 9.41983 8.71573 2.7041 17 2.7041V1.7041V0.704102C7.61116 0.704102 3.8743e-06 8.31526 0 17.7041H1ZM17 1.7041V2.7041H323V1.7041V0.704102H17V1.7041Z"
          fill="url(#paint0_radial_1440_4895)"
          mask="url(#path-1-outside-1_1440_4895)"
        />
      </g>
      <defs>
        <clipPath
          id="bgblur_0_1440_4895_clip_path"
          transform="translate(50 49.2959)"
        >
          <path d="M323 1.7041C331.837 1.7041 339 8.86755 339 17.7041V276.704C330.163 276.704 323 283.868 323 292.704C323 301.541 330.163 308.704 339 308.704V430.704C339 439.541 331.837 446.704 323 446.704H17C8.16345 446.704 1 439.541 1 430.704V308.704C9.83656 308.704 17 301.541 17 292.704C17 283.868 9.83656 276.704 1 276.704V17.7041C1 8.86755 8.16345 1.7041 17 1.7041H323Z" />
        </clipPath>
        <radialGradient
          id="paint0_radial_1440_4895"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.5 106.079) rotate(44.5572) scale(457.512 559.304)"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="0.337444" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.853003" stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="534"
      height="138"
      viewBox="0 0 534 138"
      fill="none"
      data-x="x"
    >
      {/* Fondo con blur */}
      <foreignObject x="-50" y="-50" width="634" height="238">
        <div
          style={{
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            clipPath: 'url(#bgblur_clip)',
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>

      {/* Contenido de la tarjeta con bordes curvos y gradiente */}
      <g>
        <mask
          id="card-mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="534"
          height="138"
          fill="black"
        >
          <rect width="534" height="138" fill="white" />
          <path d="M1 9C1 4.58172 4.58172 1 9 1H197.633C197.9 4.87971 201.131 7.9441 205.078 7.94433C209.026 7.94433 212.256 4.87983 212.523 1H525C529.418 1 533 4.58172 533 9V129C533 133.418 529.418 137 525 137H212.918C212.651 133.12 209.422 130.055 205.474 130.055C201.526 130.055 198.294 133.12 198.027 137H9C4.58172 137 1 133.418 1 129V9Z" />
        </mask>

        <path
          d="M1 9C1 4.58172 4.58172 1 9 1H197.633C197.9 4.87971 201.131 7.9441 205.078 7.94433C209.026 7.94433 212.256 4.87983 212.523 1H525C529.418 1 533 4.58172 533 9V129C533 133.418 529.418 137 525 137H212.918C212.651 133.12 209.422 130.055 205.474 130.055C201.526 130.055 198.294 133.12 198.027 137H9C4.58172 137 1 133.418 1 129V9Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          d="M1 9C1 4.58172 4.58172 1 9 1H197.633C197.9 4.87971 201.131 7.9441 205.078 7.94433C209.026 7.94433 212.256 4.87983 212.523 1H525C529.418 1 533 4.58172 533 9V129C533 133.418 529.418 137 525 137H212.918C212.651 133.12 209.422 130.055 205.474 130.055C201.526 130.055 198.294 133.12 198.027 137H9C4.58172 137 1 133.418 1 129V9Z"
          fill="url(#glass-gradient)"
          mask="url(#card-mask)"
        />
      </g>

      <defs>
        <clipPath id="bgblur_clip" transform="translate(50 50)">
          <path d="M1 9C1 4.58172 4.58172 1 9 1H197.633C197.9 4.87971 201.131 7.9441 205.078 7.94433C209.026 7.94433 212.256 4.87983 212.523 1H525C529.418 1 533 4.58172 533 9V129C533 133.418 529.418 137 525 137H212.918C212.651 133.12 209.422 130.055 205.474 130.055C201.526 130.055 198.294 133.12 198.027 137H9C4.58172 137 1 133.418 1 129V9Z" />
        </clipPath>

        <radialGradient
          id="glass-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(70.081 156.429) rotate(-45.55) scale(213.473 260.952)"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="0.337" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.853" stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  );
};
