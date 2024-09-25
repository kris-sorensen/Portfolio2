import { create } from "zustand";

interface StoreState {
  Page: number;
  setPage(page: number): void;
  nextPage(): void;
  prevPage(): void;
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
}));

export default useStore;
