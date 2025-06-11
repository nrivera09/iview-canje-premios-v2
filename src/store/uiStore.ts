import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  loading: boolean;
  postRedeem: boolean;
  confirmRedeem: boolean;
  toggle: (
    key: 'loading' | 'postRedeem' | 'confirmRedeem',
    state?: boolean
  ) => void;
  resetUI: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      loading: false,
      postRedeem: false,
      confirmRedeem: false,
      toggle: (key, state) =>
        set((s) => ({
          [key]: typeof state === 'boolean' ? state : !s[key],
        })),
      resetUI: () =>
        set({
          loading: false,
          postRedeem: false,
          confirmRedeem: false,
        }),
    }),
    { name: 'ui-store' }
  )
);
