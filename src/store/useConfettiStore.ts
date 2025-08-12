// src/shared/stores/useConfettiStore.ts
import { create } from 'zustand';

interface ConfettiState {
  isActive: boolean;
  setTrue: () => void;
  setFalse: () => void;
  getValue: () => boolean;
}

export const useConfettiStore = create<ConfettiState>((set, get) => ({
  isActive: false,

  setTrue: () => set({ isActive: true }),
  setFalse: () => set({ isActive: false }),
  getValue: () => get().isActive,
}));
