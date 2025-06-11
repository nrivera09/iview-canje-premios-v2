// store/viewStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type View =
  | 'mirega'
  | 'mirega-products'
  | 'mirega-productbyid'
  | 'dorega'
  | 'dorega-products'
  | 'dorega-productbyid'
  | 'no-tournaments'
  | 'loading';

interface ViewStore {
  activeViews: Record<View, boolean>;
  selectedId?: string;
  toggleView: (view: View, state?: boolean) => void;
  setSelectedId: (id: string) => void;
  resetViews: () => void;
  goTo: (view: View, id?: string) => void; // 👈
}

export const useViewStore = create<ViewStore>()(
  persist(
    (set) => ({
      activeViews: {
        mirega: false,
        'mirega-products': false,
        'mirega-productbyid': false,
        dorega: false,
        'dorega-products': false,
        'dorega-productbyid': false,
        'no-tournaments': false,
        loading: false,
      },
      selectedId: undefined,
      toggleView: (view, state) =>
        set((s) => ({
          activeViews: {
            ...s.activeViews,
            [view]: typeof state === 'boolean' ? state : !s.activeViews[view],
          },
        })),
      setSelectedId: (id) => set({ selectedId: id }),
      resetViews: () =>
        set((s) => ({
          activeViews: Object.fromEntries(
            Object.keys(s.activeViews).map((key) => [key, false])
          ) as Record<View, boolean>,
          selectedId: undefined,
        })),
      goTo: (view, id) =>
        set((s) => ({
          activeViews: {
            ...(Object.fromEntries(
              Object.keys(s.activeViews).map((k) => [k, false])
            ) as Record<View, boolean>),
            [view]: true,
          } as Record<View, boolean>,
          selectedId: id,
        })),
    }),
    { name: 'view-store' }
  )
);
