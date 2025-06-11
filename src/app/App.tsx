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

export default function App() {
  const { activeViews, selectedId, goTo } = useViewStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const promo = params.get('promo');

    if (promo === 'mirega') goTo('mirega');
    else if (promo === 'dorega') goTo('dorega');
    else goTo('loading');
  }, [goTo]);

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
    </>
  );
}
