import { create } from "zustand";

interface StoreState {
  Page: number;
  setPage(page: number): void;
  nextPage(): void;
  prevPage(): void;

  Page2PropsActive: boolean;
  setPage2PropsActive(value: boolean): void;
}

const useStore = create<StoreState>((set, get) => ({
  Page: 1,
  setPage: (page: number) => set(() => ({ Page: page })),

  // Method to increment page with boundary checks
  nextPage: () => {
    set((state) => {
      const newPage = state.Page < 3 ? state.Page + 1 : state.Page;
      return { Page: newPage };
    });
  },

  // Method to decrement page with boundary checks
  prevPage: () => {
    set((state) => {
      const newPage = state.Page > 1 ? state.Page - 1 : state.Page;
      return { Page: newPage };
    });
  },

  // In middle of page transition Animation the properties of god rays and other components change like vis
  Page2PropsActive: false,
  setPage2PropsActive: (value: boolean) =>
    set(() => ({ Page2PropsActive: value })),
}));

export default useStore;
