import { create } from "zustand";

interface StoreState {
  ShowWorkExperience: boolean;
  setShowWorkExperience(page: boolean): void;
  toggleWorkExperience(): void; // New method

  Page: number;
  setPage(page: number): void;
  nextPage(): void;
  prevPage(): void;

  Page2PropsActive: boolean;
  setPage2PropsActive(value: boolean): void;
}

const useStore = create<StoreState>((set) => ({
  ShowWorkExperience: false,
  setShowWorkExperience: (value: boolean) =>
    set(() => ({ ShowWorkExperience: value })),

  toggleWorkExperience: () =>
    set((state) => ({ ShowWorkExperience: !state.ShowWorkExperience })),

  Page: 1,
  setPage: (page: number) => set(() => ({ Page: page })),

  nextPage: () =>
    set((state) => {
      const newPage = state.Page < 3 ? state.Page + 1 : state.Page;
      return { Page: newPage };
    }),

  prevPage: () =>
    set((state) => {
      const newPage = state.Page > 1 ? state.Page - 1 : state.Page;
      return { Page: newPage };
    }),

  Page2PropsActive: false,
  setPage2PropsActive: (value: boolean) =>
    set(() => ({ Page2PropsActive: value })),
}));

export default useStore;
