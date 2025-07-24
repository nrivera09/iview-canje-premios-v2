import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  loading: boolean;
  postRedeem: boolean;
  confirmRedeem: boolean;
  isExchange: boolean;
  noStock: boolean;
  loadingLabel?: string;

  toggle: (
    key: 'loading' | 'postRedeem' | 'confirmRedeem' | 'noStock',
    state?: boolean,
    isExchange?: boolean
  ) => void;

  setLoadingLabel: (label?: string) => void;

  resetUI: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      loading: false,
      postRedeem: false,
      confirmRedeem: false,
      isExchange: false,
      noStock: false,
      loadingLabel: undefined,

      toggle: (key, state, isExchange = false) => {
        set((prev) => {
          const newState = {
            [key]: typeof state === 'boolean' ? state : !prev[key],
          };

          if (key === 'postRedeem') {
            return {
              ...prev,
              ...newState,
              isExchange,
            };
          }

          return {
            ...prev,
            ...newState,
          };
        });
      },

      setLoadingLabel: (label) =>
        set(() => ({
          loadingLabel: label,
        })),

      resetUI: () =>
        set({
          loading: false,
          loadingLabel: undefined,
          postRedeem: false,
          confirmRedeem: false,
          isExchange: false,
          noStock: false,
        }),
    }),
    {
      name: 'ui-store',
    }
  )
);
