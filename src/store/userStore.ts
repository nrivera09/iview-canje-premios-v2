import { IBeneficio } from '@/shared/types/iview.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  selectedBeneficioData: IBeneficio | null;
  setSelectedBeneficioData: (beneficio: IBeneficio | null) => void;

  card: string;
  asset: number;
  view: string;

  cardFake: string | null;
  assetFake: number | null;
  viewFake: string | null;
  forceRedeemFake: boolean | null;

  oldcard: string;
  oldasset: number;
  oldview: string;

  userDataPoints: IBeneficio[];
  setUserDataPoints: (value: IBeneficio[]) => void;
  addUserDataPoint: (value: IBeneficio) => void;
  clearUserDataPoints: () => void;

  setCard: (value: string) => void;
  setAsset: (value: number) => void;
  setView: (value: string) => void;

  setOldCard: (value: string) => void;
  setOldAsset: (value: number) => void;
  setOldView: (value: string) => void;

  setCardFake: (value: string | null) => void;
  setAssetFake: (value: number | null) => void;
  setViewFake: (value: string | null) => void;
  setForceRedeemFake: (value: boolean | null) => void;

  getEffectiveCard: () => string;
  getEffectiveAsset: () => number;
  getEffectiveView: () => string;
  getEffectiveForceRedeem: () => boolean | null;

  resetUser: () => void;
  resetFakes: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      card: '',
      asset: 0,
      view: '',

      selectedBeneficioData: null,
      setSelectedBeneficioData: (beneficio) =>
        set({ selectedBeneficioData: beneficio }),

      cardFake: null,
      assetFake: null,
      viewFake: null,
      forceRedeemFake: null,

      oldcard: '',
      oldasset: 0,
      oldview: '',

      userDataPoints: [],
      setUserDataPoints: (value) => set({ userDataPoints: value }),
      addUserDataPoint: (value) =>
        set((state) => ({
          userDataPoints: [...state.userDataPoints, value],
        })),
      clearUserDataPoints: () => set({ userDataPoints: [] }),

      setCard: (value) => set({ card: value }),
      setAsset: (value) => set({ asset: value }),
      setView: (value) => set({ view: value }),

      setOldCard: (value) => set({ oldcard: value }),
      setOldAsset: (value) => set({ oldasset: value }),
      setOldView: (value) => set({ oldview: value }),

      setCardFake: (value) => set({ cardFake: value }),
      setAssetFake: (value) => set({ assetFake: value }),
      setViewFake: (value) => set({ viewFake: value }),
      setForceRedeemFake: (value) => set({ forceRedeemFake: value }),

      getEffectiveCard: () => get().cardFake ?? get().card,
      getEffectiveAsset: () => get().assetFake ?? get().asset,
      getEffectiveView: () => get().viewFake ?? get().view,
      getEffectiveForceRedeem: () => get().forceRedeemFake,

      resetUser: () =>
        set({
          card: '',
          asset: 0,
          view: '',
          cardFake: null,
          assetFake: null,
          viewFake: null,
          forceRedeemFake: null,
          oldcard: '',
          oldasset: 0,
          oldview: '',
          userDataPoints: [],
        }),

      resetFakes: () =>
        set({
          cardFake: null,
          assetFake: null,
          viewFake: null,
          forceRedeemFake: null,
        }),
    }),
    {
      name: 'user-store',
    }
  )
);
