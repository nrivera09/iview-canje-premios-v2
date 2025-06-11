import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  // agrega más si necesitas
}

interface DataStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  resetData: () => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      resetData: () => set({ products: [] }),
    }),
    { name: 'data-store' }
  )
);
