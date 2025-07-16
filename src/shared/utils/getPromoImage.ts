import bgDomingosPromo from '@/shared/assets/img/bgDomingosPromo.png';
import bgDomingosPromoVIP from '@/shared/assets/img/bgDomingosPromoVIP.png';
import bgMiercolesPromo from '@/shared/assets/img/bgMiercolesPromo.png';
import bgMiercolesPromoVIP from '@/shared/assets/img/bgMiercolesPromoVIP.png';

import bgDomingosPromoLVDS from '@/shared/assets/img/bgDomingosPromoLVDS.png';
import bgDomingosPromoLVDSVIP from '@/shared/assets/img/bgDomingosPromoVIPLVDS.png';
import bgMiercolesPromoLVDS from '@/shared/assets/img/bgMiercolesPromoLVDS.png';
import bgMiercolesPromoLVDSVIP from '@/shared/assets/img/bgMiercolesPromoVIPLVDS.png';

import logoMirega from '@/shared/assets/img/mirega.png';
import logoMiregaVIP from '@/shared/assets/img/miregaVIP.png';
import logoDorega from '@/shared/assets/img/dorega.png';
import logoDoregaVIP from '@/shared/assets/img/doregaVIP.png';

export const getPromoImage = (
  promo: string,
  status: boolean,
  isLVDS: boolean
) => {
  if (promo === 'mirega') {
    return status === true
      ? isLVDS
        ? bgMiercolesPromoLVDSVIP
        : bgMiercolesPromoLVDS
      : !isLVDS
      ? bgMiercolesPromoVIP
      : bgMiercolesPromo;
  }

  if (promo === 'dorega') {
    return status === true
      ? isLVDS
        ? bgDomingosPromoLVDSVIP
        : bgDomingosPromoLVDS
      : !isLVDS
      ? bgDomingosPromoVIP
      : bgDomingosPromo;
  }

  return null;
};

export const getPromoImageLogo = (promo: string, status: boolean) => {
  if (promo === 'mirega') {
    return status === true ? logoMiregaVIP : logoMirega;
  }

  if (promo === 'dorega') {
    return status === true ? logoDoregaVIP : logoDorega;
  }

  return null;
};
