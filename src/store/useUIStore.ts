import { create } from "zustand";

interface UIState {
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isAddModalOpen: false,
    openAddModal: () => set({isAddModalOpen: true}),
    closeAddModal: () => set({isAddModalOpen: false})
}))
