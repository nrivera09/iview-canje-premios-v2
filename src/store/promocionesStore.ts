import { create } from 'zustand';
import {
  IBeneficioRegalo,
  IPromocionesResponse,
  ISeccion,
  IBeneficio,
} from '@/shared/types/iview.types';
import { fetchPromociones } from '@/shared/api/iviewApi';
import { useUserStore } from './userStore';

export interface PromocionesStore {
  data: IPromocionesResponse | null;
  loading: boolean;
  loadPromociones: () => Promise<void>;
  getProductoCanjeableById: (id_articulo: number) => IBeneficioRegalo | null;
  updateStockById: (id_articulo: number, nuevoStock: number) => void;
}

export const usePromocionesStore = create<PromocionesStore>((set, get) => ({
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

  getProductoCanjeableById: (id_articulo: number): IBeneficioRegalo | null => {
    const promociones: ISeccion[] = get().data?.data ?? [];

    const beneficios = promociones.find((s) => s.nombre === 'Beneficios');
    if (!beneficios) return null;

    const promocionesCanje = (beneficios.lista as IBeneficio[]).filter(
      (promo) => promo.promocion === 'MIREGA' || promo.promocion === 'DOREGA'
    );

    for (const promo of promocionesCanje) {
      const producto = promo.lista_Regalos?.find(
        (item) => item.id_articulo === id_articulo
      );
      if (producto) return producto;
    }

    return null;
  },

  updateStockById: (id_articulo: number, nuevoStock: number) => {
    set((state) => {
      if (!state.data) return state;

      const nuevasSecciones = state.data.data.map((seccion) => {
        if (seccion.nombre !== 'Beneficios') return seccion;

        return {
          ...seccion,
          lista: (seccion.lista as IBeneficio[]).map((beneficio) => {
            if (!beneficio.lista_Regalos) return beneficio;

            return {
              ...beneficio,
              lista_Regalos: beneficio.lista_Regalos.map((regalo) =>
                regalo.id_articulo === id_articulo
                  ? { ...regalo, stock: nuevoStock }
                  : regalo
              ),
            };
          }),
        };
      });

      return {
        data: {
          ...state.data,
          data: nuevasSecciones,
        },
      };
    });
  },
}));
