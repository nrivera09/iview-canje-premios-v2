import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  loading: boolean;
  postRedeem: boolean;
  confirmRedeem: boolean;
  isExchange: boolean;
  noStock: boolean;

  toggle: (
    key: 'loading' | 'postRedeem' | 'confirmRedeem' | 'noStock',
    state?: boolean,
    isExchange?: boolean
  ) => void;

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

      toggle: (key, state, isExchange = false) => {
        set((prev) => {
          const newState = {
            [key]: typeof state === 'boolean' ? state : !prev[key],
          };

          if (key === 'postRedeem') {
            return {
              ...newState,
              isExchange,
            };
          }

          return newState;
        });
      },

      resetUI: () =>
        set({
          loading: false,
          postRedeem: false,
          confirmRedeem: false,
          isExchange: false,
        }),
    }),
    {
      name: 'ui-store',
    }
  )
);
