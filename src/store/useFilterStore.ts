import { create } from 'zustand';
import { Category } from '@/types';

type SortOrder = 'name-asc' | 'name-desc' | 'category';

interface FilterState {
  category: Category | 'all';
  searchQuery: string;
  sortOrder: SortOrder;
  setCategory: (category: Category | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSortOrder: (order: SortOrder) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: 'all',
  searchQuery: '',
  sortOrder: 'name-asc',

  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortOrder: (sortOrder) => set({ sortOrder }),

  reset: () =>
    set({
      category: 'all',
      searchQuery: '',
      sortOrder: 'name-asc',
    }),
}));
