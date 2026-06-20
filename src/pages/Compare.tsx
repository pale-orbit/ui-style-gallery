import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Trash2,
  RefreshCw,
  Home,
  Highlighter,
  Palette,
  Ruler,
  Box,
  Droplets,
  X,
  Plus,
} from 'lucide-react';
import { getStyleById, styles } from '@/data/styles';
import { StyleRenderer } from '@/components/styles/StyleRenderer';
import { StyleComponentShowcase } from '@/components/styles/StyleComponentShowcase';
import { ComponentGroup, componentGroupNames, UIStyle } from '@/types';
import { useCompareStore } from '@/store/useCompareStore';

const Compare: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStyleIds, removeStyle, clearAll, replaceStyle, maxSelection, addStyle } =
    useCompareStore();
  const [group, setGroup] = useState<ComponentGroup>('basic');
  const [showDiff, setShowDiff] = useState(true);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);

  const selectedStyles = useMemo(() => {
    return selectedStyleIds.map((id) => getStyleById(id)).filter(Boolean) as UIStyle[];
  }, [selectedStyleIds]);

  const availableStylesToAdd = useMemo(() => {
    return styles.filter((s) => !selectedStyleIds.includes(s.id));
  }, [selectedStyleIds]);

  if (selectedStyles.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="text-violet-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">请先选择风格</h2>
          <p className="text-gray-600 mb-6">
            至少选择 2 种风格才能进行对比，最多可选择 {maxSelection} 种
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-xl font-semibold hover:bg-violet-600 transition-colors"
          >
            <Home size={18} />
            返回挑选
          </Link>
        </div>
      </div>
    );
  }

  const gridCols = selectedStyles.length === 2 ? 'grid-cols-2' : selectedStyles.length === 3 ? 'grid-cols-3' : 'grid-cols-4';

  const handleReplace = (index: number, newStyleId: string) => {
    const oldId = selectedStyleIds[index];
    replaceStyle(oldId, newStyleId);
    setReplacingIndex(null);
  };

  const paramLabels = [
    { key: 'borderRadius', label: '圆角', icon: Ruler },
    { key: 'shadow', label: '阴影', icon: Box },
    { key: 'primaryColor', label: '主色', icon: Palette },
    { key: 'backdropFilter', label: '模糊', icon: Droplets },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-full mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>返回</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
              {(Object.keys(componentGroupNames) as ComponentGroup[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    group === g
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {componentGroupNames[g]}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDiff(!showDiff)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                showDiff
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <Highlighter size={16} />
              差异高亮
            </button>

            {selectedStyleIds.length < maxSelection && (
              <div className="relative">
                <button
                  onClick={() => setReplacingIndex(replacingIndex === -1 ? null : -1)}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl text-sm font-medium hover:bg-violet-100 transition-colors"
                >
                  <Plus size={16} />
                  添加风格
                </button>
                {replacingIndex === -1 && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 max-h-80 overflow-y-auto">
                    {availableStylesToAdd.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          addStyle(s.id);
                          setReplacingIndex(null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>{s.name}</span>
                        <span className="text-xs text-gray-400">{s.categoryName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <Trash2 size={16} />
              清空全部
            </button>
          </div>
        </div>

        {showDiff && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium w-24">参数</th>
                  {selectedStyles.map((style) => (
                    <th key={style.id} className="text-left py-2 px-3 font-semibold text-gray-900">
                      {style.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paramLabels.map(({ key, label, icon: Icon }) => (
                  <tr key={key} className="border-t border-gray-50">
                    <td className="py-2 px-3 text-gray-500 flex items-center gap-2">
                      <Icon size={14} />
                      {label}
                    </td>
                    {selectedStyles.map((style) => {
                      const value = style.params[key as keyof typeof style.params];
                      const allValues = selectedStyles.map(
                        (s) => s.params[key as keyof typeof s.params]
                      );
                      const isDifferent = allValues.some((v) => v !== value);
                      return (
                        <td
                          key={style.id}
                          className={`py-2 px-3 font-mono text-xs ${
                            isDifferent ? 'bg-amber-50 text-amber-700' : 'text-gray-600'
                          }`}
                        >
                          {key === 'primaryColor' || key === 'secondaryColor' ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded border border-gray-200 flex-shrink-0"
                                style={{ background: value as string }}
                              />
                              <span className="truncate">{value as string}</span>
                            </div>
                          ) : (
                            <span className="truncate block">
                              {(value as string) || '-'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={`grid ${gridCols} gap-6`}>
          {selectedStyles.map((style, index) => (
            <div key={style.id} className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-2">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900">{style.name}</h3>
                    <p className="text-xs text-gray-500">{style.categoryName}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setReplacingIndex(replacingIndex === index ? null : index)
                        }
                        className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                        title="替换风格"
                      >
                        <RefreshCw size={16} />
                      </button>
                      {replacingIndex === index && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 max-h-80 overflow-y-auto">
                          {styles
                            .filter((s) => s.id !== style.id)
                            .map((s) => (
                              <button
                                key={s.id}
                                onClick={() => handleReplace(index, s.id)}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-between"
                              >
                                <span>{s.name}</span>
                                <span className="text-xs text-gray-400">{s.categoryName}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeStyle(style.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="移除"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <StyleRenderer style={style} className="rounded-2xl p-6 min-h-[600px]">
                <StyleComponentShowcase group={group} />
              </StyleRenderer>
            </div>
          ))}
        </div>
      </div>

      {replacingIndex !== null && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setReplacingIndex(null)}
        />
      )}
    </div>
  );
};

export default Compare;
