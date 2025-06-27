import { useViewStore } from '@/store/viewStore';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { soundManager } from '../utils/SoundManager';
import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import imgPtsInferior from '@/shared/assets/img/PuntosinferiorProducto.png';
import clsx from 'clsx';
import { useUIStore } from '@/store/uiStore';
import { IBeneficio, IBeneficioGRID } from '../types/iview.types';
import { fetchImgBase64 } from '../api/iviewApi';
import { useIsLVDS } from '../hooks/useDetectIview';

interface ProductCardTipoBeneficioGridProps {
  idRoom: number;
  beneficio: IBeneficioGRID;
  onClick?: () => void;
}

const ProductCardTipoBeneficioGrid: FC<ProductCardTipoBeneficioGridProps> = ({
  idRoom,
  beneficio,
  onClick,
}) => {
  const isLVDS = useIsLVDS();
  const [imgBase64, setImgBase64] = useState<any>(null);
  const goTo = useViewStore((s) => s.goTo);
  const isOutStock = beneficio.stock === 0;

  useEffect(() => {
    const getImg = async () => {
      const result = await fetchImgBase64(beneficio.nombreImagen);
      setImgBase64(result);
    };
    getImg();
  }, [beneficio.nombreImagen]);

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      onClick={() => {
        if (!isOutStock) {
          onClick && onClick();
        } else {
          soundManager.play('button');
        }
      }}
      className={clsx(
        'cursor-pointer bg-white rounded-xl bg-center xs:min-w-full  relative overflow-hidden bg-cover p-1',
        !isLVDS ? `min-w-[225px] min-h-[200px]` : `min-w-[160px] min-h-[144px]`
      )}
    >
      <div className={clsx(`card flex flex-col justify-start items-center `)}>
        <div className="w-full relative flex items-center justify-center"></div>
      </div>

      <div className="product flex flex-col w-full h-full">
        <img
          className={clsx(
            `img w-full  bg-cover rounded-lg overflow-hidden`,
            isLVDS ? 'min-h-[96px]' : 'min-h-[154px]',
            isOutStock && 'opacity-50'
          )}
          src={imgBase64 || imgDemo}
          alt=""
        />
        <div className="title flex-1 pt-1">
          <span className="text-[14px] text-black font-bold line-clamp-2">
            {beneficio.nombre}
          </span>
        </div>
      </div>

      {isOutStock && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 bg-opacity-70 flex items-center justify-center ">
          <span className=" text-[14px] text-[#E81B00] bg-[#FBE4E4] font-bold min-w-[73px] h-[26px] flex items-center justify-center rounded-lg overflow-hidden z-30">
            Agotado
          </span>
        </div>
      )}

      {!isOutStock && (
        <span className="flex items-center justify-center pts absolute left-0 top-0 min-w-[78px] h-[26px] bg-white font-bold text-black text-[14px] px-[8px] rounded-br-lg z-0">
          XX ptos.
        </span>
      )}
    </div>
  );
};

export default ProductCardTipoBeneficioGrid;
