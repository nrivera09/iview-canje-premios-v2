// /config/env.ts
// Si REACT_APP_IMG_FORCE_PROD=true, la función de imágenes usará PROD (key/host)
// aunque estés en testing o development.

const BOOL = (v?: string) => (v ?? '').toLowerCase() === 'true';

export const ENV = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ?? '',
  API_BASE_URL_V1: process.env.REACT_APP_API_BASE_URL_V1 ?? '',
  REACT_APP_ACITY_SOCKET: process.env.REACT_APP_ACITY_SOCKET ?? '',
  API_IMG64: process.env.REACT_APP_API_IMG64 ?? '',
  API_KEY: process.env.REACT_APP_API_KEY ?? '',

  // --- Overrides SOLO para la función de imágenes ---
  IMG_FORCE_PROD: BOOL(process.env.REACT_APP_IMG_FORCE_PROD),

  // Valores de PROD a usar cuando IMG_FORCE_PROD=true
  PROD_API_BASE_URL_V1: process.env.REACT_APP_PROD_API_BASE_URL_V1 ?? '',
  PROD_API_KEY: process.env.REACT_APP_PROD_API_KEY ?? '',

  // Computados: lo que debe usar fetchImgBase64()
  API_KEY_FOR_IMG:
    BOOL(process.env.REACT_APP_IMG_FORCE_PROD) &&
    process.env.REACT_APP_PROD_API_KEY
      ? (process.env.REACT_APP_PROD_API_KEY as string)
      : process.env.REACT_APP_API_KEY ?? '',

  API_BASE_URL_V1_FOR_IMG:
    BOOL(process.env.REACT_APP_IMG_FORCE_PROD) &&
    process.env.REACT_APP_PROD_API_BASE_URL_V1
      ? (process.env.REACT_APP_PROD_API_BASE_URL_V1 as string)
      : process.env.REACT_APP_API_BASE_URL_V1 ?? '',
};
