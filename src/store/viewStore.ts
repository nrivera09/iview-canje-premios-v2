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
  | 'loading'
  | 'rooms'
  | 'post-exchange-day'
  | 'multiplicador'
  | 'derby';

interface ViewStore {
  activeViews: Record<View, boolean>;
  selectedId?: string;
  selectedType?: string;
  toggleView: (view: View, state?: boolean) => void;
  setSelectedId: (id: string) => void;
  setSelectedType: (type: string) => void;
  resetViews: () => void;
  goTo: (view: View, id?: string, type?: string) => void;
  goBack: () => void;
  previousId?: string;
  setPreviousId: (id: string) => void;
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
        rooms: false,
        multiplicador: false,
        derby: false,
        'post-exchange-day': false,
      },
      previousId: undefined,
      setPreviousId: (id) => set({ previousId: id }),

      selectedId: undefined,
      toggleView: (view, state) =>
        set((s) => ({
          activeViews: {
            ...s.activeViews,
            [view]: typeof state === 'boolean' ? state : !s.activeViews[view],
          },
        })),
      setSelectedId: (id) => set({ selectedId: id }),
      setSelectedType: (type) => set({ selectedType: type }),
      resetViews: () =>
        set((s) => ({
          activeViews: Object.fromEntries(
            Object.keys(s.activeViews).map((key) => [key, false])
          ) as Record<View, boolean>,
          selectedId: undefined,
          selectedType: undefined,
        })),
      goTo: (view, id, type) =>
        set((s) => ({
          activeViews: {
            ...(Object.fromEntries(
              Object.keys(s.activeViews).map((k) => [k, false])
            ) as Record<View, boolean>),
            [view]: true,
          },
          selectedId: id,
          selectedType: type,
        })),

      goBack: () =>
        set((s) => ({
          activeViews: {
            ...Object.fromEntries(
              Object.keys(s.activeViews).map((k) => [k, false])
            ),
            loading: true,
          } as Record<View, boolean>,
          selectedId: undefined,
          selectedType: undefined,
        })),
    }),

    { name: 'view-store' }
  )
);
