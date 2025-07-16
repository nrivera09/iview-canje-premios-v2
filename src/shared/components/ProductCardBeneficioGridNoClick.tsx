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
import LoadingGrid from './LoadingGrid';
import Loading from '@/feature/Loading';
import { getGroupedAssetsByCodigo } from '../utils/getImageBase64FromAssets';

interface ProductCardBeneficioGridNoClickProps {
  idRoom: number;
  beneficio: IBeneficioGRID;
  onClick?: () => void;
  puntos?: number;
}

const ProductCardBeneficioGridNoClick: FC<
  ProductCardBeneficioGridNoClickProps
> = ({ idRoom, beneficio, onClick, puntos }) => {
  const isLVDS = useIsLVDS();
  const [imgBase64, setImgBase64] = useState<any>(null);
  const goTo = useViewStore((s) => s.goTo);
  const isOutStock = false;

  useEffect(() => {
    const getImg = async () => {
      const result = await fetchImgBase64(beneficio.nombreImagen);
      setImgBase64(result);
    };
    getImg();
  }, [beneficio.nombreImagen]);

  /* if (!imgBase64) return <LoadingGrid />;*/
  return (
    <div className={clsx(`flex flex-col`, isLVDS && `w-1/4`)}>
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
          'cursor-pointer bg-white/20 border-2  border-white/20 rounded-xl bg-center xs:min-w-full  relative overflow-hidden bg-cover flex items-center justify-center',
          !isLVDS ? `min-w-[160px] h-[110px]` : `w-full h-[80px]`
        )}
      >
        <div className="backdrop-blur-sm h-auto flex items-center justify-center">
          <div className="product flex flex-col w-full h-full">
            <img
              className={clsx(
                `img w-full  object-contain object-center rounded-lg overflow-hidden`,
                isLVDS
                  ? 'min-h-[70px] h-[70px] max-h-[70px]'
                  : 'min-h-[98px] h-[98px] max-h-[98px]',
                isOutStock && 'opacity-50'
              )}
              src={imgBase64 || imgDemo}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="title flex-1 pt-1">
        <span
          className={clsx(
            `text-white text-center font-bold truncate-2-lines uppercase`,
            !isLVDS ? `text-[14px]` : `text-[10px]`
          )}
        >
          {beneficio.nombre}
        </span>
      </div>
    </div>
  );
};

export default ProductCardBeneficioGridNoClick;
