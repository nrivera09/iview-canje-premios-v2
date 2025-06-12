// src/shared/store/userStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  card: string;
  asset: number;
  view: string;

  cardFake: string | null;
  assetFake: number | null;
  viewFake: string | null;

  setCard: (value: string) => void;
  setAsset: (value: number) => void;
  setView: (value: string) => void;

  setCardFake: (value: string | null) => void;
  setAssetFake: (value: number | null) => void;
  setViewFake: (value: string | null) => void;

  getEffectiveCard: () => string;
  getEffectiveAsset: () => number;
  getEffectiveView: () => string;

  resetUser: () => void;
  resetFakes: () => void; // <-- agregamos esto
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      card: '',
      asset: 0,
      view: '',

      cardFake: null,
      assetFake: null,
      viewFake: null,

      setCard: (value) => set({ card: value }),
      setAsset: (value) => set({ asset: value }),
      setView: (value) => set({ view: value }),

      setCardFake: (value) => set({ cardFake: value }),
      setAssetFake: (value) => set({ assetFake: value }),
      setViewFake: (value) => set({ viewFake: value }),

      getEffectiveCard: () => get().cardFake ?? get().card,
      getEffectiveAsset: () => get().assetFake ?? get().asset,
      getEffectiveView: () => get().viewFake ?? get().view,

      resetUser: () =>
        set({
          card: '',
          asset: 0,
          view: '',
          cardFake: null,
          assetFake: null,
          viewFake: null,
        }),

      resetFakes: () =>
        set({
          cardFake: null,
          assetFake: null,
          viewFake: null,
        }),
    }),
    {
      name: 'user-store',
    }
  )
);
