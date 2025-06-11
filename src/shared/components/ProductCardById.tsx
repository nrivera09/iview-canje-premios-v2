import { useViewStore } from '@/store/viewStore';
import React, { FC, useMemo } from 'react';
import { soundManager } from '../utils/SoundManager';
import imgDemo from '@/shared/assets/img/product-demo.jpg';
import clsx from 'clsx';

interface ProductCardByIdProps {
  idRoom: number;
}

const ProductCardById: FC<ProductCardByIdProps> = ({ idRoom }) => {
  const goTo = useViewStore((s) => s.goTo);
  const isOutStock = false;

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
              {idRoom} ptos
            </span>
          )}
          <img
            src={imgDemo}
            alt=""
            className="object-cover object-center w-full h-[251.74px]"
          />
        </div>
      </div>

      <p className="truncate-2-lines text-white text-[24px] font-bold break-words text-left w-full mt-[16px] ">
        Xoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxo
      </p>
      <p className="text-white font-light">
        Le faltan <span className="font-bold">77 puntos</span> para canjear
      </p>
      <div className="stock text-[14px] font-normal bg-white/10 text-white rounded max-w-[103px] min-h-[26px] flex items-center justify-center mt-[24px]">
        Stock: 20 uds.
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
