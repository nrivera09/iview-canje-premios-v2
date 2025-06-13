import { create } from 'zustand';

interface DebugUIStore {
  activePanel: 'none' | 'debug' | 'fakeId';
  openDebug: () => void;
  openFakeId: () => void;
  closeAll: () => void;
  toggleDebug: () => void;
  toggleFakeId: () => void;
}

export const useDebugUIStore = create<DebugUIStore>()((set, get) => ({
  activePanel: 'none',

  openDebug: () => set({ activePanel: 'debug' }),
  openFakeId: () => set({ activePanel: 'fakeId' }),
  closeAll: () => set({ activePanel: 'none' }),

  toggleDebug: () => {
    const { activePanel } = get();
    set({ activePanel: activePanel === 'debug' ? 'none' : 'debug' });
  },
  toggleFakeId: () => {
    const { activePanel } = get();
    set({ activePanel: activePanel === 'fakeId' ? 'none' : 'fakeId' });
  },
}));
