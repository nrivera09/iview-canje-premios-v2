import { useViewStore } from '@/store/viewStore';
import React, { FC, useMemo } from 'react';
import { soundManager } from '../utils/SoundManager';

import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import clsx from 'clsx';
import { useUserStore } from '@/store/userStore';

interface ProductCardByIdProps {
  idRoom: number;
  producto?: any;
}

const ProductCardById: FC<ProductCardByIdProps> = ({ idRoom, producto }) => {
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const goTo = useViewStore((s) => s.goTo);
  const isOutStock = producto?.stock === 0;

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      onClick={() => {
        soundManager.play('button');
        goTo('mirega-productbyid', idRoom.toString());
      }}
      className="cursor-pointer  xs:min-w-full min-w-[362px] min-h-[154px] relative overflow-hidden"
    >
      <div
        className={clsx(
          `card flex flex-col justify-start items-center p-[4px] gap-[4px] bg-white rounded-xl `,
          isOutStock && `opacity-50`
        )}
      >
        <div className="w-full relative flex items-center justify-center">
          {!isOutStock && (
            <span className="points text-black font-bold min-w-[75px] min-h-[26px] bg-white text-[14px] flex items-center justify-center absolute top-0 left-0 rounded-br-[8px] ">
              {beneficio?.puntos_Min} ptos
            </span>
          )}
          <img
            src={producto?.nombreImagen ?? imgDemo}
            alt=""
            className="object-cover object-center w-full h-[251.74px]"
          />
        </div>
      </div>

      <p className="truncate-2-lines text-white text-[24px] font-bold break-words text-left w-full mt-[16px] ">
        {producto?.nombre}
      </p>
      {beneficio?.puntos_Falta !== undefined && beneficio.puntos_Falta > 0 && (
        <p className="text-white font-light">
          Le faltan <span className="font-bold">{beneficio.puntos_Falta}</span>{' '}
          para canjear
        </p>
      )}

      <div className="stock text-[14px] font-normal bg-white/10 text-white rounded max-w-[103px] min-h-[26px] flex items-center justify-center mt-[24px]">
        Stock: {producto?.stock} {producto?.stock > 1 ? `uds.` : `ud.`}
      </div>

      {isOutStock && (
        <div className="xs:min-w-full min-w-[225px] min-h-[154px] flex items-center justify-center absolute mt-[24px]">
          <span className="bg-[#FBE4E4]  text-[#E81B00]  z-10 text-[14px] py-[4.5px] px-[8px] rounded-[8px] font-bold">
            Agotado
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCardById;
