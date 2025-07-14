// src/shared/store/promocionesStore.ts

import { create } from 'zustand';
import { IPromocionesResponse } from '@/shared/types/iview.types';
import { fetchPromociones } from '@/shared/api/iviewApi';
import { useUserStore } from './userStore';

export interface PromocionesStore {
  data: IPromocionesResponse | null;
  loading: boolean;
  loadPromociones: () => Promise<void>;
}

export const usePromocionesStore = create<PromocionesStore>((set) => ({
  data: null,
  loading: false,
  loadPromociones: async () => {
    const tarjeta = useUserStore.getState().card;
    set({ loading: true });
    try {
      const response = await fetchPromociones(tarjeta);
      set({ data: response });
    } catch (error) {
      console.error('Error al cargar promociones:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
