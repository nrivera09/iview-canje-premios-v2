import { useViewStore } from '@/store/viewStore';
import React, { FC, useMemo } from 'react';
import { soundManager } from '../utils/SoundManager';
import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import clsx from 'clsx';
import { useUIStore } from '@/store/uiStore';
import { IBeneficio } from '../types/iview.types';

interface ProductCardBeneficioProps {
  idRoom: number;
  beneficio: IBeneficio;
  onClick?: () => void;
}

const ProductCardBeneficio: FC<ProductCardBeneficioProps> = ({
  idRoom,
  beneficio,
  onClick,
}) => {
  const { promocion, puntos_Min, canjeado } = beneficio;
  const goTo = useViewStore((s) => s.goTo);
  const isReadyToExchange = false;

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      onClick={onClick}
      style={{ backgroundImage: `url(${imgDemo})` }}
      className={clsx(
        'cursor-pointer bg-white rounded-xl bg-center xs:min-w-full min-w-[225px] min-h-[200px] relative overflow-hidden'
      )}
    >
      <div className={clsx(`card flex flex-col justify-start items-center `)}>
        <div className="w-full relative flex items-center justify-center">
          {!isReadyToExchange && (
            <span className="points text-white font-bold min-w-[140px] min-h-[28px] bg-[linear-gradient(90deg,_#306A24_0%,_#459A33_100%)] text-[14px] flex items-center justify-center absolute top-0 left-0 rounded-br-md rounded-tl-md  ">
              ¡Listo para canjear!<div className="!hidden"> - {idRoom}</div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardBeneficio;
