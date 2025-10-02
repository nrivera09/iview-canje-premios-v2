// /config/env.ts
export const ENV = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ?? '',
  API_BASE_URL_V1: process.env.REACT_APP_API_BASE_URL_V1 ?? '',
  REACT_APP_ACITY_SOCKET: process.env.REACT_APP_ACITY_SOCKET ?? '',
  API_IMG64: process.env.REACT_APP_API_IMG64 ?? '',
  API_KEY: process.env.REACT_APP_API_KEY,
};
