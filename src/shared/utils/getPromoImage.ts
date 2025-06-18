import bgDomingosPromo from '@/shared/assets/img/bgDomingosPromo.png';
import bgDomingosPromoVIP from '@/shared/assets/img/bgDomingosPromoVIP.png';
import bgMiercolesPromo from '@/shared/assets/img/bgMiercolesPromo.png';
import bgMiercolesPromoVIP from '@/shared/assets/img/bgMiercolesPromoVIP.png';

export const getPromoImage = (promo: string, status: string) => {
  if (promo === 'mirega') {
    return status === 'vip' ? bgMiercolesPromoVIP : bgMiercolesPromo;
  }

  if (promo === 'dorega') {
    return status === 'vip' ? bgDomingosPromoVIP : bgDomingosPromo;
  }

  return null;
};
