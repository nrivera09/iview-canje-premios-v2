import React, { FC } from 'react';

interface BtnCasinoOnlineBackProps {
  onClick?: () => void;
  label: string;
  minWidth?: string;
}

const BtnCasinoOnlineBack: FC<BtnCasinoOnlineBackProps> = ({
  label,
  minWidth,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ minWidth: minWidth }}
      className={` min-h-[38px] bg-transparent text-white shadow-[0_4px_8px_rgba(33,33,33,0.2)]
 transition-all text-[14px] uppercase text-center font-bold cursor-pointer active:bg-[#E7DA82]  hover:bg-[#F7F5D4] rounded-lg border-2 border-white hover:text-black active:text-black`}
    >
      {label}
    </button>
  );
};

export default BtnCasinoOnlineBack;
