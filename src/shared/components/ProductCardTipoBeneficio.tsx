import { soundManager } from '../utils/SoundManager';
import imgDemo from '@/shared/assets/img/product-demo-overlay.png';
import imgPtsInferior from '@/shared/assets/img/PuntosinferiorProducto.png';
import clsx from 'clsx';
import { IBeneficio } from '../types/iview.types';

import bgDorega from '@/shared/assets/img/btnMiregaDorega/bgDorega.png';
import bgDoregaVIP from '@/shared/assets/img/btnMiregaDorega/bgDoregaVIP.png';
import bgMirega from '@/shared/assets/img/btnMiregaDorega/bgMirega.png';
import bgMiregaVIP from '@/shared/assets/img/btnMiregaDorega/bgMiregaVIP.png';

import logoDoregaGrande from '@/shared/assets/img/btnMiregaDorega/logoDoregaGrande.png';
import logoDoregaGrandeVIP from '@/shared/assets/img/btnMiregaDorega/logoDoregaGrandeVIP.png';
import logoDoregaPequeno from '@/shared/assets/img/btnMiregaDorega/logoDoregaPequeno.png';
import logoDoregaPequenoVIP from '@/shared/assets/img/btnMiregaDorega/logoDoregaPequenoVIP.png';

import logoMiregaGrande from '@/shared/assets/img/btnMiregaDorega/logoMiregaGrande.png';
import logoMiregaGrandeVIP from '@/shared/assets/img/btnMiregaDorega/logoMiregaGrandeVIP.png';
import logoMiregaPequeno from '@/shared/assets/img/btnMiregaDorega/logoMiregaPequeno.png';
import logoMiregaPequenoVIP from '@/shared/assets/img/btnMiregaDorega/logoMiregaPequenoVIP.png';
import { useIsLVDS } from '../hooks/useDetectIview';
import { useEffect, useState } from 'react';
import {
  getGroupedAssetsByCodigo,
  getImageBase64FromAssets,
} from '../utils/getImageBase64FromAssets';
import LoadingGrid from './LoadingGrid';
import { groupAssetFiles } from '../utils/groupAssetFiles';

interface ProductCardTipoBeneficioProps {
  idRoom: number;
  beneficio: IBeneficio;
  onClick?: () => void;
}

const ProductCardTipoBeneficio = ({
  idRoom,
  beneficio,
  onClick,
}: ProductCardTipoBeneficioProps) => {
  const isLVDS = useIsLVDS();
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [bgBase64, setBgBase64] = useState<string | null>(null);
  const [assets, setAssets] = useState<Awaited<
    ReturnType<typeof getGroupedAssetsByCodigo>
  > | null>(null);

  const typePromo = beneficio.promocion;
  const isReadyToExchange =
    beneficio.puntos >= beneficio.puntos_Min &&
    (typePromo === 'MIREGA' || typePromo === 'DOREGA') &&
    beneficio?.tipo === 'Canje' &&
    !beneficio?.canjeado;

  const showPoints = beneficio.tipo === 'Canje';

  const setBg = (vip: boolean = false) => {
    if (typePromo === 'MIREGA' && !vip) {
      return bgMirega;
    } else if (typePromo === 'MIREGA' && vip) {
      return bgMiregaVIP;
    } else if (typePromo === 'DOREGA' && !vip) {
      return bgDorega;
    } else {
      return bgDoregaVIP;
    }
  };

  const setLogo = () => {
    if (typePromo === 'MIREGA') {
      if (!isReadyToExchange && !showPoints) {
        return logoMiregaGrande;
      } else if (
        (!isReadyToExchange && showPoints) ||
        (isReadyToExchange && showPoints) ||
        (isReadyToExchange && !showPoints)
      ) {
        return logoMiregaGrandeVIP;
      }
    } else {
      if (!isReadyToExchange && !showPoints) {
        return logoDoregaGrande;
      } else if (
        (!isReadyToExchange && showPoints) ||
        (isReadyToExchange && showPoints) ||
        (isReadyToExchange && !showPoints)
      ) {
        return logoDoregaGrandeVIP;
      }
    }
  };

  const setLogoSize = () => {
    if (!isReadyToExchange && !showPoints) {
      return `120px`;
    } else if (
      (showPoints && !isReadyToExchange) ||
      (isReadyToExchange && !showPoints)
    ) {
      return `100px`;
    } else {
      return `84px`;
    }
  };

  useEffect(() => {
    const fetchAssets = async () => {
      const grouped = await getGroupedAssetsByCodigo(beneficio.promocionCodigo);

      setAssets(grouped);

      const background = grouped?.branding.find(
        (item) =>
          item.fileName ===
          (beneficio?.isVIP ? 'bg_logo_vip.png' : 'bg_logo.png')
      )?.base64;
      setBgBase64(background ?? null);

      const logo = grouped?.branding.find(
        (item) =>
          item.fileName === (beneficio?.isVIP ? 'logo_vip.png' : 'logo.png')
      )?.base64;
      setLogoBase64(logo ?? null);
    };

    fetchAssets();
  }, [beneficio.promocionCodigo, beneficio?.isVIP]);

  if (!assets && !bgBase64 && !logoBase64) {
    return <LoadingGrid />;
  }
  return (
    <>
      {assets && (
        <div
          onMouseLeave={() => soundManager.play('pin')}
          onClick={onClick}
          style={{
            backgroundImage: `url(${bgBase64})`,
            backgroundSize: `103% 103%`,
          }}
          className={clsx(
            'cursor-pointer bg-white rounded-xl bg-center xs:min-w-full  relative overflow-hidden ',
            !isLVDS
              ? `w-[160px] min-w-[160px] h-[144px]`
              : `w-[160px] min-w-[160px] h-[144px] `
          )}
        >
          <div
            className={clsx(`card flex flex-col justify-start items-center `)}
          >
            <div className="w-full relative flex items-center justify-center">
              {isReadyToExchange && (
                <span className="points text-white font-bold min-w-[140px] min-h-[28px] bg-[linear-gradient(90deg,_#306A24_0%,_#459A33_100%)] text-[14px] flex items-center justify-center absolute top-0 left-0 rounded-br-md rounded-tl-md  ">
                  ¡Listo para canjear!
                  <div className="!hidden"> - {idRoom}</div>
                </span>
              )}
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {!logoBase64 ? (
              <div></div>
            ) : (
              <img
                src={logoBase64}
                alt="Logo"
                className="object-contain"
                style={{ width: setLogoSize(), height: setLogoSize() }}
              />
            )}
          </div>

          {showPoints && (
            <div className="w-full bg-cover text-center absolute   bottom-0 mb-[-1px]">
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
        </div>
      )}
    </>
  );
};

export default ProductCardTipoBeneficio;
