import React, { FC } from 'react';
import { MdOutlineChevronLeft } from 'react-icons/md';

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
      className={`flex flex-row items-center justify-center  min-h-[38px] bg-transparent text-white shadow-[0_4px_8px_rgba(33,33,33,0.2)]
 transition-all text-[14px] uppercase text-center font-bold cursor-pointer active:bg-[#E7DA82]  hover:bg-[#F7F5D4] rounded-lg border-2 border-white hover:text-black active:text-black`}
    >
      <MdOutlineChevronLeft className="size-6" />
      <p className="min-h-[24px] flex items-center justify-center leading-none tracking-none">
        {label}
      </p>
    </button>
  );
};

export default BtnCasinoOnlineBack;
