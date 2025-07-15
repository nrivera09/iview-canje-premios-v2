export const getDeterministicBoolean = (seed: number): boolean => {
  const normalized = Math.sin(seed) * 10000;
  return normalized - Math.floor(normalized) < 0.5;
};

export const calculatePuntosPorcentaje = (
  puntos: number,
  puntosMin: number
): number => {
  if (puntosMin === 0) return 0;
  const porcentaje = (puntos / puntosMin) * 100;
  return Math.min(Math.max(porcentaje, 0), 100);
};

export const getTodayType = (): 'MIERCOLES' | 'VIERNES' | 'OTRO' => {
  const day = new Date().getDay(); // Domingo = 0, Miércoles = 3

  if (day === 5) return 'VIERNES';
  if (day === 3) return 'MIERCOLES';
  return 'OTRO';
};

export const formatFechaLatina = (fecha: string | null): string => {
  if (!fecha) return 'SIN FECHA';

  const date = new Date(fecha);
  const dia = date.getDate();
  const mes = date.toLocaleString('es-PE', { month: 'long' }).toUpperCase();
  return `${dia} DE ${mes}`;
};

export const removeExtension = (filename: string): string => {
  return filename.split('.').slice(0, -1).join('.');
};

export const isPeruTimeAfterAPI = (apiDateStr: string): boolean => {
  // Convertir la fecha del API a objeto Date
  const apiDate = new Date(apiDateStr);

  // Obtener la hora actual en Lima, Perú (UTC-5) usando Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value;

  const peruDateStr = `${get('year')}-${get('month')}-${get('day')}T${get(
    'hour'
  )}:${get('minute')}:${get('second')}`;
  const peruDate = new Date(peruDateStr);

  // Comparación
  return peruDate > apiDate;
};
