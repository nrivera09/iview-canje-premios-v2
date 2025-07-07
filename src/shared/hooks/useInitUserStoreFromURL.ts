import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

export const useInitUserStoreFromURL = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const card = params.get('playerId') ?? '100007771';
    const assetRaw = params.get('machineId') ?? '1103';
    const asset = Number(assetRaw);
    const view = (params.get('layout') ?? 'DM').toUpperCase();

    const store = useUserStore.getState();

    store.setCard(card);
    store.setAsset(asset);
    store.setView(view);
  }, []);
};
