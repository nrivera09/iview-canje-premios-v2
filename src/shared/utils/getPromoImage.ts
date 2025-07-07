import bgDomingosPromo from '@/shared/assets/img/bgDomingosPromo.png';
import bgDomingosPromoVIP from '@/shared/assets/img/bgDomingosPromoVIP.png';
import bgMiercolesPromo from '@/shared/assets/img/bgMiercolesPromo.png';
import bgMiercolesPromoVIP from '@/shared/assets/img/bgMiercolesPromoVIP.png';

import logoMirega from '@/shared/assets/img/mirega.png';
import logoMiregaVIP from '@/shared/assets/img/miregaVIP.png';
import logoDorega from '@/shared/assets/img/dorega.png';
import logoDoregaVIP from '@/shared/assets/img/doregaVIP.png';

export const getPromoImage = (promo: string, status: boolean) => {
  if (promo === 'mirega') {
    return status === true ? bgMiercolesPromoVIP : bgMiercolesPromo;
  }

  if (promo === 'dorega') {
    return status === true ? bgDomingosPromoVIP : bgDomingosPromo;
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
