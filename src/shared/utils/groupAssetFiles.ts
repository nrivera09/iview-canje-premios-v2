import { AssetItem } from './getImageBase64FromAssets';

export interface GroupedAssets {
  hidden: boolean;
  branding: AssetItem[];
  dm: AssetItem[];
  lvds: AssetItem[];
  others: AssetItem[];
}

export const groupAssetFiles = (files: AssetItem[]): GroupedAssets => {
  const branding: AssetItem[] = [];
  const dm: AssetItem[] = [];
  const lvds: AssetItem[] = [];
  const others: AssetItem[] = [];

  let hasLogo = false;
  let hasBgLogo = false;

  for (const file of files) {
    const name = file.fileName;

    // Branding
    if (name === 'logo.png' || name === 'logo_vip.png') {
      branding.push(file);
      hasLogo = true;
      continue;
    }
    if (name === 'bg_logo.png' || name === 'bg_logo_vip.png') {
      branding.push(file);
      hasBgLogo = true;
      continue;
    }

    // Agrupaciones
    const parts = name.split('/');
    const topFolder = parts[0];

    if (topFolder === 'DM') {
      dm.push(file);
    } else if (topFolder === 'LVDS') {
      lvds.push(file);
    } else {
      others.push(file);
    }
  }

  return {
    hidden: !(hasLogo && hasBgLogo),
    branding,
    dm,
    lvds,
    others,
  };
};
