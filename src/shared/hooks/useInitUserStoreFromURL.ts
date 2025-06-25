import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

export const useInitUserStoreFromURL = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const card = params.get('id') ?? '100007771';
    const assetRaw = params.get('asset') ?? '1103';
    const asset = Number(assetRaw);
    const view = (params.get('iview') ?? 'DM').toUpperCase();

    const store = useUserStore.getState();

    store.setCard(card);
    store.setAsset(asset);
    store.setView(view);
  }, []);
};
