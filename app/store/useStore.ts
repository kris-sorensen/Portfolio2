import { create } from "zustand";

interface StoreState {
  ShowWorkExperience: boolean;
  setShowWorkExperience(value: boolean): void;
  toggleWorkExperience(): void;

  Page: number;
  setPage(page: number): void;
  nextPage(): void;
  prevPage(): void;

  Page2PropsActive: boolean;
  setPage2PropsActive(value: boolean): void;

  EnableShadows: boolean;
  setEnableShadows(value: boolean): void;
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
    set((state) => ({ Page: state.Page < 3 ? state.Page + 1 : state.Page })),
  prevPage: () =>
    set((state) => ({ Page: state.Page > 1 ? state.Page - 1 : state.Page })),

  Page2PropsActive: false,
  setPage2PropsActive: (value: boolean) =>
    set(() => ({ Page2PropsActive: value })),

  EnableShadows: false,
  setEnableShadows: (value) => set(() => ({ EnableShadows: value })),
}));

export default useStore;
