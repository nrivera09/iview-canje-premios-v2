export const getDeterministicBoolean = (seed: number): boolean => {
  const normalized = Math.sin(seed) * 10000;
  return normalized - Math.floor(normalized) < 0.5;
};
