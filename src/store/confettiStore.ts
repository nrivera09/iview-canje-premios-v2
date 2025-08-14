import { create } from 'zustand';

type ConfettiState = {
  active: boolean; // ¿Mostrar confetti ahora?
  lastTriggerAt: number | null; // Marca de tiempo para evitar solapes
  trigger: () => void; // Enciende confetti hasta que lo apagues manualmente
  reset: () => void; // Apaga confetti
  pulse: (ms?: number) => void; // Enciende confetti y lo apaga solo después de X ms
};

export const useConfettiStore = create<ConfettiState>((set, get) => ({
  active: false,
  lastTriggerAt: null,

  trigger: () => set({ active: true, lastTriggerAt: Date.now() }),

  reset: () => set({ active: false }),

  pulse: (ms = 6000) => {
    const now = Date.now();
    set({ active: true, lastTriggerAt: now });
    // Auto–reset, pero sin apagar si hubo otro trigger más reciente
    setTimeout(() => {
      if (get().lastTriggerAt === now) {
        set({ active: false });
      }
    }, ms);
  },
}));
