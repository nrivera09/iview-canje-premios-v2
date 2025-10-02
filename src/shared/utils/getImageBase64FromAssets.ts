import { ENV } from '../config/env';
import { groupAssetFiles, GroupedAssets } from './groupAssetFiles';

export interface AssetItem {
  fileName: string;
  mimeType: string;
  base64: string;
}

type GroupedCache = Record<string, AssetItem[]>;
const folderCache: GroupedCache = {};

// Header común con API Key
const API_HEADERS: HeadersInit = {
  'X-Api-Key': ENV.API_KEY || '',
  'Content-Type': 'application/json',
};

export const getGroupedAssetsByCodigo = async (
  beneficioCodigo: string
): Promise<GroupedAssets | null> => {
  try {
    if (folderCache[beneficioCodigo]) {
      return groupAssetFiles(folderCache[beneficioCodigo]);
    }

    const res = await fetch(`${ENV.API_IMG64}asset?folder=${beneficioCodigo}`, {
      headers: API_HEADERS,
    });

    if (!res.ok) {
      throw new Error(`Error al obtener assets: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) return null;

    folderCache[beneficioCodigo] = data;

    return groupAssetFiles(data);
  } catch (err) {
    console.error('Error en getGroupedAssetsByCodigo:', err);
    return null;
  }
};

export const getImageBase64FromAssets = async (
  beneficioCodigo: string,
  fileName: string
): Promise<string | null> => {
  try {
    const grouped = await getGroupedAssetsByCodigo(beneficioCodigo);
    if (!grouped) return null;

    // Buscar en todos los grupos, incluyendo branding y others
    const allItems = [
      ...grouped.branding,
      ...grouped.dm,
      ...grouped.lvds,
      ...grouped.others,
    ];

    const match = allItems.find((file) => file.fileName.endsWith(fileName));
    return match?.base64 ?? null;
  } catch (err) {
    console.error('Error en getImageBase64FromAssets:', err);
    return null;
  }
};
