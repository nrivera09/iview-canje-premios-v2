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
    if (status && isLVDS) return bgMiercolesPromoLVDSVIP;
    if (status && !isLVDS) return bgMiercolesPromoVIP;
    if (!status && isLVDS) return bgMiercolesPromoLVDS;
    return bgMiercolesPromo;
  }

  if (promo === 'dorega') {
    if (status && isLVDS) return bgDomingosPromoLVDSVIP;
    if (status && !isLVDS) return bgDomingosPromoVIP;
    if (!status && isLVDS) return bgDomingosPromoLVDS;
    return bgDomingosPromo;
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
