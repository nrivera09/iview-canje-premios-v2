import { useEffect, useState } from 'react';
import { useViewStore } from '@/store/viewStore';

import MiregaScreen from '@/feature/mirega/MiregaScreen';
import MiregaProducts from '@/feature/mirega/MiregaProducts';
import MiregaProductById from '@/feature/mirega/MiregaProductById';
import DoregaScreen from '@/feature/dorega/DoregaScreen';
import DoregaProducts from '@/feature/dorega/DoregaProducts';
import DoregaProductById from '@/feature/dorega/DoregaProductById';
import Loading from '@/feature/Loading';
import '@/app/index.css';
import Rooms from '@/feature/Rooms';
import { useUIStore } from '@/store/uiStore';
import ConfirmRedeem from '@/shared/components/ConfirmRedeem';
import PostRedeem from '@/shared/components/PostRedeem';
import { useInitUserStoreFromURL } from '@/shared/hooks/useInitUserStoreFromURL';
import IViewDebug from '@/shared/components/IViewDebug';
import IViewFakeId from '@/shared/components/IViewFakeId';
import WithOurTournaments from '@/shared/components/WithOurTournaments';
import PostExchangeDay from '@/shared/components/PostExchangeDay';

import { HelmetProvider } from 'react-helmet-async';
import clsx from 'clsx';
import { useStockSignalR } from '@/shared/hooks/useStockSignalR';
import { useUserStore } from '@/store/userStore';
import { usePromocionesStore } from '@/store/promocionesStore';

export default function App() {
  const tarjetaId = useUserStore((s) => s.card);
  const resetUI = useUIStore((s) => s.resetUI);
  const loading = useUIStore((s) => s.loading);
  const { activeViews, selectedId, goTo } = useViewStore();
  const confirmRedeem = useUIStore((s) => s.confirmRedeem);
  const postRedeem = useUIStore((s) => s.postRedeem);

  useInitUserStoreFromURL();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const promo = params.get('promo');

    if (promo === 'mirega') goTo('mirega');
    else if (promo === 'dorega') goTo('dorega');
    else goTo('rooms');
  }, [goTo]);

  const warmupImages = () => {
    const urls = [
      '/assets/bgDomingosPromo.png',
      '/assets/bgDomingosPromoVIP.png',
      '/assets/bgMiercolesPromo.png',
      '/assets/bgMiercolesPromoVIP.png',
      '/assets/loading.png',
      '/assets/backScreen.png',
      '/assets/product-demo.jpg',
      '/assets/trofeopng.png',
    ];

    urls.forEach((url) => {
      fetch(url, { cache: 'force-cache' });
    });
  };

  useEffect(() => {
    warmupImages();
  }, []);

  useEffect(() => {
    resetUI();
  }, [resetUI]);

  useStockSignalR((data) => {
    console.log('📦 Actualización de stock:', data);
    usePromocionesStore.getState().loadPromociones();
  });

  return (
    <>
      {activeViews.mirega && <MiregaScreen />}
      {activeViews['mirega-products'] && <MiregaProducts />}
      {activeViews['mirega-productbyid'] && selectedId && (
        <MiregaProductById id={selectedId} />
      )}

      {activeViews.dorega && <DoregaScreen />}
      {activeViews['dorega-products'] && <DoregaProducts />}
      {activeViews['dorega-productbyid'] && selectedId && (
        <DoregaProductById id={selectedId} />
      )}

      {activeViews['no-tournaments'] && <WithOurTournaments />}
      {activeViews.loading && <Loading />}
      {activeViews.rooms && <Rooms />}
      {confirmRedeem && <ConfirmRedeem id={'1'} />}
      {postRedeem && <PostRedeem id={'1'}></PostRedeem>}
      {activeViews['post-exchange-day'] && <PostExchangeDay id={'1'} />}

      {process.env.NODE_ENV === 'development' && <IViewDebug />}
      {process.env.NODE_ENV === 'development' && <IViewFakeId />}

      <div className={clsx(loading ? 'block' : 'hidden')}>
        <Loading />
      </div>
    </>
  );
}
