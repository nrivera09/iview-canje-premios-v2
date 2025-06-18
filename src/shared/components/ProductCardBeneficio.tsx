import { useViewStore } from '@/store/viewStore';
import React, { FC, useMemo } from 'react';
import { soundManager } from '../utils/SoundManager';
import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import clsx from 'clsx';
import { useUIStore } from '@/store/uiStore';

interface ProductCardBeneficioProps {
  idRoom: number;
}

const ProductCardBeneficio: FC<ProductCardBeneficioProps> = ({ idRoom }) => {
  const goTo = useViewStore((s) => s.goTo);
  const isReadyToExchange = false;

  const goRoomProducts = () => {
    soundManager.play('button');
    useUIStore.getState().toggle('loading', true);
    setTimeout(() => {
      goTo('mirega-products', idRoom.toString());
    }, 2000);
  };

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      onClick={goRoomProducts}
      style={{ backgroundImage: `url(${imgDemo})` }}
      className={clsx(
        'cursor-pointer bg-white rounded-xl bg-center xs:min-w-full min-w-[225px] min-h-[200px] relative overflow-hidden'
      )}
    >
      <div className={clsx(`card flex flex-col justify-start items-center `)}>
        <div className="w-full relative flex items-center justify-center">
          {!isReadyToExchange && (
            <span className="points text-white font-bold min-w-[140px] min-h-[28px] bg-[linear-gradient(90deg,_#306A24_0%,_#459A33_100%)] text-[14px] flex items-center justify-center absolute top-0 left-0 rounded-br-md rounded-tl-md  ">
              ¡Listo para canjear!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardBeneficio;
