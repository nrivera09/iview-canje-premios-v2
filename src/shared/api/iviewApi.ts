import { useUIStore } from '@/store/uiStore';
import { ENV } from '../config/env';
import {
  ISeccion,
  IPromocionesResponse,
  CanjeRequest,
} from '../types/iview.types';
import { usePromocionesStore } from '@/store/promocionesStore';
import { useUserStore } from '@/store/userStore';
import { useViewStore } from '@/store/viewStore';

export const fetchPromociones = async (
  tarjeta: string
): Promise<IPromocionesResponse> => {
  const url = new URL(`${ENV.API_BASE_URL}IView/ListarPromocionesIviewJson`);
  url.searchParams.append('tarjeta', tarjeta);

  const response = await fetch(url.toString());
  if (!response.ok)
    throw new Error(`Error en la solicitud: ${response.status}`);

  const raw = await response.json();
  const secciones: ISeccion[] = Array.isArray(raw.data) ? raw.data : [];

  const ordenadas = secciones.sort((a, b) => a.orden - b.orden);

  return {
    status: raw.status,
    success: raw.success,
    message: raw.message,
    errors: raw.errors,
    data: ordenadas,
  };
};

export const fetchImgBase64 = async (nombre: string) => {
  try {
    const response = await fetch(
      `${ENV.API_BASE_URL_V1}Regalos/imagen?nombre=1658`
    );

    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching imagen:', error);
    return null;
  }
};

export const canjearPremio2 = async (): Promise<boolean> => {
  const resetUI = useUIStore.getState().resetUI;
  const selectedId = useViewStore.getState().selectedId;

  try {
    const user = useUserStore.getState();
    const beneficio = user.selectedBeneficioData;

    if (!beneficio) {
      console.error('No hay beneficio seleccionado para canje.');
      return false;
    }

    /*const payload: CanjeRequest = {
      promocionid: beneficio.promocion_Tipo_Id,
      tarjeta: Number(user.getEffectiveCard()),
      regalo: Number(selectedId),
      asset: user.getEffectiveAsset(),
      puntos: beneficio.puntos,
    };*/

    const payload: CanjeRequest = {
      tarjeta: user.getEffectiveCard(),
      id_articulo: Number(selectedId),
      id_promocion: beneficio.promocion_Tipo_Id,
      puntos: 150,
      asset: user.getEffectiveAsset().toString(),
      usuario_registro: 'front',
    };

    const response = await fetch(
      `${ENV.API_BASE_URL}Regalos/canje-regalo-reservar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) throw new Error('Error en el canje del premio');

    const result = await response.json();

    if (result === true) {
      usePromocionesStore.getState().loadPromociones();
      useUIStore.getState().toggle('confirmRedeem', true);
      resetUI();
    }

    return result === true;
  } catch (error) {
    console.error('Error al canjear premio:', error);
    return false;
  }
};

export const canjearPremio = async (): Promise<boolean> => {
  const beneficio = useUserStore.getState().selectedBeneficioData;

  const resetUI = useUIStore.getState().resetUI;
  const selectedId = useViewStore.getState().selectedId;
  debugger;
  try {
    const user = useUserStore.getState();
    const beneficio = user.selectedBeneficioData;
    if (!beneficio) {
      console.error('No hay beneficio seleccionado para canje.');
      return false;
    }

    const idPromocion = beneficio.id;
    const idArticulo = Number(selectedId);

    // 1. Validar stock
    const stockRes = await fetch(
      `${ENV.API_BASE_URL_V1}Regalos/obtener-stock?Id_promocion=${idPromocion}&Id_articulo=${idArticulo}`
    );

    if (!stockRes.ok) throw new Error('No se pudo verificar el stock');

    const stockData = await stockRes.json();
    const stock = stockData?.value?.stock ?? 0;

    if (stock <= 0) {
      console.warn('Producto sin stock disponible');
      useUIStore.getState().toggle('noStock', true);
      return false;
    }

    // 2. Realizar canje
    const payload: CanjeRequest = {
      tarjeta: user.getEffectiveCard(),
      id_articulo: idArticulo,
      id_promocion: idPromocion,
      puntos: beneficio?.puntos,
      asset: user.getEffectiveAsset().toString(),
      usuario_registro: 'front',
    };
    //https://dev-api-canjeregalo-acity.com.pe/api/Regalos/canje-regalo-reservar
    const response = await fetch(
      `${ENV.API_BASE_URL_V1}Regalos/canje-regalo-reservar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) throw new Error('Error en el canje del premio');

    const result = await response.json();

    if (result) {
      if (result.isSuccess) {
        usePromocionesStore.getState().loadPromociones();
        useUIStore.getState().toggle('confirmRedeem', true);
        resetUI();
      }
    }

    return result === true;
  } catch (error) {
    console.error('Error al canjear premio:', error);
    return false;
  }
};
