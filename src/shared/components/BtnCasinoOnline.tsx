import React, { FC } from 'react';

interface BtnCasinoOnlineProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  minWidth?: string;
  minHeight?: string;
}

const BtnCasinoOnline: FC<BtnCasinoOnlineProps> = ({
  label,
  minWidth,
  minHeight,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: minWidth,
        width: minWidth,
        minHeight: minHeight,
        height: minHeight,
      }}
      className={` min-h-[38px] bg-[#d7b730] text-black shadow-[0_4px_8px_rgba(33,33,33,0.2)]
 transition-all text-[14px] uppercase text-center font-bold cursor-pointer active:bg-[#b09304] hover:opacity-100 hover:bg-[#e7da82] rounded-lg disabled:bg-white/10 disabled:backdrop-blur-[50px] disabled:text-white/40 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
};

export default BtnCasinoOnline;
