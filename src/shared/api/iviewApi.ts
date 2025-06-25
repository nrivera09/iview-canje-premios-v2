import { ENV } from '../config/env';
import { ISeccion, IPromocionesResponse } from '../types/iview.types';

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
      `https://dev-api-canje-regalo.acity.com.pe/api/Regalos/imagen?nombre=${nombre}`
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
