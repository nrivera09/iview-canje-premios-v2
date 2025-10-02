// shared/utils/fetchPromoBackground.ts

import { ENV } from '../config/env';

interface IAPISection {
  nombre: string;
  orden: number;
  lista: any[];
}

export interface IAssetFile {
  fileName: string;
  mimeType: string;
  base64: string;
}

// Header común con API Key
const API_HEADERS: HeadersInit = {
  'X-Api-Key': ENV.API_KEY || '',
};

export const fetchPromoBackground = async (
  targetPromoName: string,
  tarjetaId: string
): Promise<{ promocionCodigo: string; assets: IAssetFile[] } | null> => {
  try {
    const res = await fetch(
      `${ENV.API_BASE_URL}IView/ListarPromocionesIviewJson?tarjeta=${tarjetaId}`,
      {
        headers: {
          ...API_HEADERS,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }

    const raw = await res.json();
    const data: IAPISection[] = Array.isArray(raw) ? raw : raw.data ?? [];

    const beneficios = data.find((d) => d.nombre === 'Beneficios')?.lista ?? [];

    const match = beneficios.find(
      (item) =>
        typeof item.promocionCodigo === 'string' &&
        item.promocionCodigo.trim().toUpperCase() ===
          targetPromoName.trim().toUpperCase()
    );

    if (!match || !match.promocionCodigo) {
      console.warn('Promoción no encontrada:', targetPromoName);
      return null;
    }

    const promocionCodigo = match.promocionCodigo;

    const assetsRes = await fetch(
      `${ENV.API_IMG64}asset?folder=${promocionCodigo}`,
      {
        headers: {
          ...API_HEADERS,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!assetsRes.ok) {
      throw new Error(`Error al obtener assets: ${assetsRes.status}`);
    }

    const assets: IAssetFile[] = await assetsRes.json();

    return {
      promocionCodigo,
      assets,
    };
  } catch (err) {
    console.error('Error al buscar imagen de fondo:', err);
    return null;
  }
};
