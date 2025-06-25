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
  const typePromo = beneficio.promocion;
  const isReadyToExchange = beneficio.puntos >= beneficio.puntos_Min;
  const showPoints = beneficio.tipo === 'Informativo';

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
      return `150px`;
    } else if (
      (showPoints && !isReadyToExchange) ||
      (isReadyToExchange && !showPoints)
    ) {
      return `140px`;
    } else {
      return `120px`;
    }
  };

  return (
    <div
      onMouseLeave={() => soundManager.play('pin')}
      onClick={onClick}
      style={{ backgroundImage: `url(${setBg(false)})` }}
      className={clsx(
        'cursor-pointer bg-white rounded-xl bg-center xs:min-w-full min-w-[225px] min-h-[200px] relative overflow-hidden bg-cover'
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
      <div className="w-full h-full flex items-center justify-center">
        <img src={setLogo()} alt="" style={{ width: setLogoSize() }} />
      </div>

      {showPoints && (
        <div className="w-full bg-cover text-center absolute   bottom-0 mb-[-1px]">
          <div
            className="w-[129px] h-[29px] bg-contain text-center mx-auto flex items-center justify-center text-[14px] font-bold "
            style={{ backgroundImage: `url(${imgPtsInferior})` }}
          >
            <p className="font-bold text-black text-center w-full">
              {beneficio.puntos_Min} ptos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardTipoBeneficio;
