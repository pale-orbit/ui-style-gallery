import React, { useMemo } from 'react';
import { Sparkles, Palette, Layers, GitCompare } from 'lucide-react';
import { styles, searchStyles, getStylesByCategory } from '@/data/styles';
import { useFilterStore } from '@/store/useFilterStore';
import { FilterBar } from '@/components/gallery/FilterBar';
import { StyleCard } from '@/components/gallery/StyleCard';
import { CompareBar } from '@/components/gallery/CompareBar';
import { useCompareStore } from '@/store/useCompareStore';
import { styles as allStyles } from '@/data/styles';

const Gallery: React.FC = () => {
  const { category, searchQuery, sortOrder } = useFilterStore();
  const { selectedStyleIds } = useCompareStore();

  const filteredStyles = useMemo(() => {
    let result = [...allStyles];

    if (category !== 'all') {
      result = getStylesByCategory(category);
    }

    if (searchQuery) {
      result = searchStyles(searchQuery);
    }

    switch (sortOrder) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'zh-CN'));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return result;
  }, [category, searchQuery, sortOrder]);

  const stats = {
    total: styles.length,
    categories: 6,
    selected: selectedStyleIds.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>20+ 种 UI 设计风格一网打尽</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                UI 风格橱窗
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              沉浸式感受每种设计风格的视觉语言，真实组件渲染，支持并排对比
            </p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600">{stats.total}</div>
                <div className="text-sm text-gray-500">设计风格</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.categories}</div>
                <div className="text-sm text-gray-500">分类</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{stats.selected}</div>
                <div className="text-sm text-gray-500">已选对比</div>
              </div>
            </div>
          </div>

          <FilterBar />

          {filteredStyles.length === 0 ? (
            <div className="text-center py-16">
              <Palette className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">没有找到匹配的风格，试试其他关键词</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
              {filteredStyles.map((style, index) => (
                <StyleCard key={style.id} style={style} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CompareBar />
    </div>
  );
};

export default Gallery;
