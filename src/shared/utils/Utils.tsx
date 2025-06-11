export const getDeterministicBoolean = (seed: number): boolean => {
  // Algoritmo simple basado en el ID para siempre obtener el mismo resultado
  const normalized = Math.sin(seed) * 10000;
  return normalized - Math.floor(normalized) < 0.5;
};
