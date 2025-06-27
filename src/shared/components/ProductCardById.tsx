import { useViewStore } from '@/store/viewStore';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { soundManager } from '../utils/SoundManager';

import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import clsx from 'clsx';
import { useUserStore } from '@/store/userStore';
import { fetchImgBase64 } from '../api/iviewApi';
import { useIsLVDS } from '../hooks/useDetectIview';
import BtnCasinoOnline from './BtnCasinoOnline';
import { useUIStore } from '@/store/uiStore';

interface ProductCardByIdProps {
  idRoom: number;
  producto?: any;
  disableButton?: boolean;
}

const ProductCardById: FC<ProductCardByIdProps> = ({
  idRoom,
  producto,
  disableButton = false,
}) => {
  const setSelectedId = useViewStore((state) => state.setSelectedId);
  const isLVDS = useIsLVDS();
  const [imgBase64, setImgBase64] = useState<any>(null);
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  const goTo = useViewStore((s) => s.goTo);
  const isOutStock = producto?.stock === 0;

  const confirmRedeem = useUIStore((s) => s.confirmRedeem);

  useEffect(() => {
    const getImg = async () => {
      const result = await fetchImgBase64(producto?.nombreImagen);
      setImgBase64(result);
    };
    getImg();
  }, [producto?.nombreImagen]);

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      className={clsx(
        `cursor-pointer  xs:min-w-full min-w-[362px] min-h-[154px] relative overflow-hidden`,
        isLVDS && `flex flex-row gap-[16px]`
      )}
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
            src={imgBase64 || imgDemo}
            alt=""
            className={clsx(
              !isLVDS ? ` w-full h-[251.74px]` : ` w-[244px] h-[176px]`,
              `object-cover object-center rounded-xl overflow-hidden`
            )}
          />
        </div>
      </div>

      <div
        className={clsx(isLVDS && `flex flex-col gap-[24px] justify-between`)}
      >
        <div>
          <p
            className={clsx(
              `truncate-2-lines text-white  font-bold break-words text-left w-full  `,
              !isLVDS ? `text-[24px] mt-[16px]` : `text-[20px]`
            )}
          >
            {producto?.nombre}
          </p>
          {beneficio &&
            typeof beneficio.puntos === 'number' &&
            typeof beneficio.puntos_Min === 'number' &&
            beneficio.puntos < beneficio.puntos_Min && (
              <p className="text-white font-light">
                Le faltan{' '}
                <span className="font-bold">
                  {beneficio.puntos_Min - beneficio.puntos}
                </span>{' '}
                para canjear
              </p>
            )}

          <div
            className={clsx(
              !isLVDS ? ` mt-[24px]` : `mt-[12px]`,
              `stock text-[14px] font-normal bg-white/10 text-white rounded max-w-[103px] min-h-[26px] flex items-center justify-center`
            )}
          >
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
        {isLVDS && (
          <BtnCasinoOnline
            minWidth="93px"
            label="CANJEAR"
            disabled={disableButton}
            onClick={() => {
              soundManager.play('button');
              if (!disableButton) {
                useViewStore.getState().setSelectedId(producto.id_articulo);
                useUIStore.getState().toggle('confirmRedeem', true);
              }
            }}
          ></BtnCasinoOnline>
        )}
      </div>
    </div>
  );
};

export default ProductCardById;
