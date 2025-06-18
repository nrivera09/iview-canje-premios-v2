import { create } from 'zustand';
import { IViewResponse } from '@/shared/types/iview.types';
import { fetchPromociones } from '@/shared/api/iviewApi';
import { useUserStore } from './userStore';

interface PromocionesStore {
  data: IViewResponse | null;
  loading: boolean;
  loadPromociones: () => Promise<void>;
}

export const usePromocionesStore = create<PromocionesStore>((set) => ({
  data: null,
  loading: false,

  loadPromociones: async () => {
    const tarjeta = useUserStore.getState().card; // <<< tomamos la tarjeta desde el store global
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
