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

export const fetchPromoBackground = async (
  targetPromoName: string,
  tarjetaId: string
): Promise<{ promocionCodigo: string; assets: IAssetFile[] } | null> => {
  try {
    const res = await fetch(
      `${ENV.API_BASE_URL}IView/ListarPromocionesIviewJson?tarjeta=${tarjetaId}`
    );

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
      `${ENV.API_IMG64}asset?folder=${promocionCodigo}`
    );

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
