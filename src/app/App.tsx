import { useEffect } from 'react';
import { useViewStore } from '@/store/viewStore';

import MiregaScreen from '@/feature/mirega/MiregaScreen';
import MiregaProducts from '@/feature/mirega/MiregaProducts';
import MiregaProductById from '@/feature/mirega/MiregaProductById';
import DoregaScreen from '@/feature/dorega/DoregaScreen';
import DoregaProducts from '@/feature/dorega/DoregaProducts';
import DoregaProductById from '@/feature/dorega/DoregaProductById';
import NoTournaments from '@/feature/NoTournaments';
import Loading from '@/feature/Loading';
import '@/app/index.css';
import Rooms from '@/feature/mirega/Rooms';
import BtnCasinoOnline from '@/shared/components/BtnCasinoOnline';
import { useUIStore } from '@/store/uiStore';
import ConfirmRedeem from '@/shared/components/ConfirmRedeem';
import PostRedeem from '@/shared/components/PostRedeem';
import PostExchange from '@/shared/components/PostExchange';
import WithOurTournaments from '@/shared/components/WithOurTournaments';

export default function App() {
  const resetUI = useUIStore((s) => s.resetUI);
  const { activeViews, selectedId, goTo } = useViewStore();
  const confirmRedeem = useUIStore((s) => s.confirmRedeem);
  const postRedeem = useUIStore((s) => s.postRedeem);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const promo = params.get('promo');

    if (promo === 'mirega') goTo('mirega');
    else if (promo === 'dorega') goTo('dorega');
    else goTo('rooms');
  }, [goTo]);

  useEffect(() => {
    resetUI();
  }, []);

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

      {activeViews['no-tournaments'] && <NoTournaments />}
      {activeViews.loading && <Loading />}
      {activeViews.rooms && <Rooms />}
      {confirmRedeem && <ConfirmRedeem id={'1'} />}
      {postRedeem && <PostRedeem id={'1'}></PostRedeem>}
    </>
  );
}
