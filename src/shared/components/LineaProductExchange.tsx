import React from 'react';
import { useIsLVDS } from '../hooks/useDetectIview';

export const LineaProductExchange: React.FC = () => {
  const isLVDS = useIsLVDS();
  return !isLVDS ? (
    <svg
      width="292"
      height="2"
      viewBox="0 0 292 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.2959H291"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeDasharray="8 8"
      />
    </svg>
  ) : (
    <svg
      className="relative top-[-4px]"
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="114"
      viewBox="0 0 2 114"
      fill="none"
    >
      <path
        d="M1 113L1 1"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeDasharray="8 8"
      />
    </svg>
  );
};
