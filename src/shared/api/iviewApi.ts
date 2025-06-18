import { IViewResponse } from '@/shared/types/iview.types';
import { ENV } from '@/shared/config/env';

export const fetchPromociones = async (
  tarjeta: string
): Promise<IViewResponse> => {
  const url = new URL(`${ENV.API_BASE_URL}IView/ListarPromocionesIviewJson`);
  url.searchParams.append('tarjeta', tarjeta);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status}`);
  }

  const data = (await response.json()) as IViewResponse;
  return data;
};
