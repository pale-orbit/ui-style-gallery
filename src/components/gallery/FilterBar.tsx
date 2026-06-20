import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { Category, categoryNames } from '@/types';
import { useFilterStore } from '@/store/useFilterStore';

const categories: Array<{ id: Category | 'all'; name: string }> = [
  { id: 'all', name: '全部' },
  { id: 'flat-minimal', name: categoryNames['flat-minimal'] },
  { id: 'skeuomorphic', name: categoryNames['skeuomorphic'] },
  { id: 'glass-material', name: categoryNames['glass-material'] },
  { id: 'hand-drawn', name: categoryNames['hand-drawn'] },
  { id: 'pixel-retro', name: categoryNames['pixel-retro'] },
  { id: 'other', name: categoryNames['other'] },
];

const sortOptions = [
  { id: 'name-asc', name: '名称 A-Z' },
  { id: 'name-desc', name: '名称 Z-A' },
  { id: 'category', name: '按分类' },
] as const;

export const FilterBar: React.FC = () => {
  const { category, searchQuery, sortOrder, setCategory, setSearchQuery, setSortOrder, reset } =
    useFilterStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索风格名称、特征..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  category === cat.id
                    ? 'bg-violet-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={18} className="text-gray-500" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {(category !== 'all' || searchQuery || sortOrder !== 'name-asc') && (
          <button
            onClick={reset}
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-violet-600 transition-colors"
          >
            重置
          </button>
        )}
      </div>
    </div>
  );
};
