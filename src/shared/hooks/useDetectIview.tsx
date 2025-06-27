// src/shared/hooks/useIsLVDS.ts
import { useMediaQuery } from "react-responsive";

export const useIsLVDS = (): boolean => {
  return useMediaQuery({
    query: "(max-width: 700px) and (max-height: 240px)",
  });
};
