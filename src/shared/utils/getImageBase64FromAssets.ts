import { ENV } from '../config/env';
import { groupAssetFiles, GroupedAssets } from './groupAssetFiles';

export interface AssetItem {
  fileName: string;
  mimeType: string;
  base64: string;
}

type GroupedCache = Record<string, AssetItem[]>;
const folderCache: GroupedCache = {};

export const getGroupedAssetsByCodigo = async (
  beneficioCodigo: string
): Promise<GroupedAssets | null> => {
  try {
    if (folderCache[beneficioCodigo]) {
      return groupAssetFiles(folderCache[beneficioCodigo]);
    }

    const res = await fetch(`${ENV.API_IMG64}asset?folder=${beneficioCodigo}`);
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    folderCache[beneficioCodigo] = data;

    return groupAssetFiles(data);
  } catch (err) {
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
    return null;
  }
};
