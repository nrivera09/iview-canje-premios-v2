import { useViewStore } from '@/store/viewStore';
import React, { FC, useMemo } from 'react';
import { soundManager } from '../utils/SoundManager';
import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import imgPtsInferior from '@/shared/assets/img/PuntosinferiorProducto.png';
import clsx from 'clsx';
import { useUIStore } from '@/store/uiStore';
import { IBeneficio } from '../types/iview.types';
import { useIsLVDS } from '../hooks/useDetectIview';

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
  const isLVDS = useIsLVDS();
  const { promocion, puntos_Min, canjeado } = beneficio;
  const goTo = useViewStore((s) => s.goTo);
  const typePromo = beneficio.promocion;
  const isReadyToExchange =
    beneficio.puntos >= beneficio.puntos_Min &&
    (typePromo === 'MIREGA' || typePromo === 'DOREGA') &&
    beneficio?.tipo === 'Canje' &&
    !beneficio?.reservado;
  const showPoints = false;
  const isOutStock = false;

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      onClick={onClick}
      style={{ backgroundImage: `url(${imgDemo})` }}
      className={clsx(
        'cursor-pointer bg-white rounded-xl bg-center xs:min-w-full min-w-[160px] h-[144px] relative overflow-hidden bg-cover'
      )}
    >
      <div className={clsx(`card flex flex-col justify-start items-center `)}>
        <div className="w-full relative flex items-center justify-center">
          {isReadyToExchange && (
            <span className="points text-white font-bold min-w-[140px] min-h-[28px] bg-[linear-gradient(90deg,_#306A24_0%,_#459A33_100%)] text-[14px] flex items-center justify-center absolute top-0 left-0 rounded-br-md rounded-tl-md  ">
              ¡Listo para canjear!<div className="!hidden"> - {idRoom}</div>
            </span>
          )}
        </div>
      </div>

      {showPoints && (
        <div className="w-full bg-cover text-center absolute   bottom-0 ">
          <div
            className="w-[129px] h-[29px] bg-contain text-center mx-auto flex items-center justify-center text-[14px] font-bold "
            style={{ backgroundImage: `url(${imgPtsInferior})` }}
          >
            <p
              className={clsx(
                `font-bold text-black text-center w-full`,
                isLVDS && `text-[12px]`
              )}
            >
              {beneficio.puntos_Min} ptos
            </p>
          </div>
        </div>
      )}

      {isOutStock && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/20 bg-opacity-50 flex items-center justify-center">
          <span className=" text-[14px] text-[#E81B00] bg-[#FBE4E4] font-bold min-w-[73px] h-[26px] flex items-center justify-center rounded-lg overflow-hidden">
            Agotado
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCardBeneficio;
