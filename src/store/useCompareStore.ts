import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  selectedStyleIds: string[];
  maxSelection: number;
  addStyle: (id: string) => void;
  removeStyle: (id: string) => void;
  clearAll: () => void;
  replaceStyle: (oldId: string, newId: string) => void;
  toggleStyle: (id: string) => void;
  isSelected: (id: string) => boolean;
  canAddMore: () => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedStyleIds: [],
      maxSelection: 4,

      addStyle: (id: string) => {
        const { selectedStyleIds, maxSelection } = get();
        if (selectedStyleIds.length >= maxSelection) return;
        if (selectedStyleIds.includes(id)) return;
        set({ selectedStyleIds: [...selectedStyleIds, id] });
      },

      removeStyle: (id: string) => {
        set({
          selectedStyleIds: get().selectedStyleIds.filter((s) => s !== id),
        });
      },

      clearAll: () => {
        set({ selectedStyleIds: [] });
      },

      replaceStyle: (oldId: string, newId: string) => {
        set({
          selectedStyleIds: get().selectedStyleIds.map((id) =>
            id === oldId ? newId : id
          ),
        });
      },

      toggleStyle: (id: string) => {
        const { selectedStyleIds, maxSelection } = get();
        if (selectedStyleIds.includes(id)) {
          set({
            selectedStyleIds: selectedStyleIds.filter((s) => s !== id),
          });
        } else if (selectedStyleIds.length < maxSelection) {
          set({ selectedStyleIds: [...selectedStyleIds, id] });
        }
      },

      isSelected: (id: string) => {
        return get().selectedStyleIds.includes(id);
      },

      canAddMore: () => {
        return get().selectedStyleIds.length < get().maxSelection;
      },
    }),
    {
      name: 'ui-style-compare',
    }
  )
);
