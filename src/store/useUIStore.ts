import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TaskPriority, TaskStatus } from '../types/task';

export type FilterStatus = 'all' | TaskStatus;
export type FilterPriority = 'all' | TaskPriority;
export type ViewMode = 'grid' | 'kanban';

interface UIState {
  isAddModalOpen: boolean;
  searchQuery: string;
  statusFilter: FilterStatus;
  priorityFilter: FilterPriority;
  viewMode: ViewMode;
  openAddModal: () => void;
  closeAddModal: () => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: FilterStatus) => void;
  setPriorityFilter: (priority: FilterPriority) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isAddModalOpen: false,
      searchQuery: '',
      statusFilter: 'all',
      priorityFilter: 'all',
      viewMode: 'kanban',
      openAddModal: () => set({ isAddModalOpen: true }),
      closeAddModal: () => set({ isAddModalOpen: false }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
      setViewMode: (viewMode) => set({ viewMode }),
      resetFilters: () =>
        set({ searchQuery: '', statusFilter: 'all', priorityFilter: 'all' }),
    }),
    {
      name: 'karban-ui-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        statusFilter: state.statusFilter,
        priorityFilter: state.priorityFilter,
      }),
    }
  )
);