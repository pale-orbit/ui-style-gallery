import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Check, Info, Palette, Ruler, Box, Droplets } from 'lucide-react';
import { getStyleById } from '@/data/styles';
import { StyleRenderer } from '@/components/styles/StyleRenderer';
import { StyleComponentShowcase } from '@/components/styles/StyleComponentShowcase';
import { ComponentGroup, componentGroupNames } from '@/types';
import { useCompareStore } from '@/store/useCompareStore';
import { StyledTabs } from '@/components/styles/StyledTabs';

const StyleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<ComponentGroup>('basic');
  const { isSelected, toggleStyle, canAddMore } = useCompareStore();

  const style = getStyleById(id!);

  if (!style) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">未找到该风格</p>
          <Link to="/" className="text-violet-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const selected = isSelected(style.id);
  const disabled = !selected && !canAddMore();

  const paramLabels: Array<{ key: string; label: string; icon: React.ElementType }> = [
    { key: 'borderRadius', label: '圆角', icon: Ruler },
    { key: 'shadow', label: '阴影', icon: Box },
    { key: 'primaryColor', label: '主色', icon: Palette },
    { key: 'backdropFilter', label: '模糊', icon: Droplets },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-violet-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>返回</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">{style.name}</h1>
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    {style.categoryName}
                  </span>
                </div>
                <p className="text-lg text-gray-500 mb-4">{style.nameEn}</p>
                <p className="text-gray-600 max-w-2xl">{style.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {style.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => !disabled && toggleStyle(style.id)}
                disabled={disabled}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selected
                    ? 'bg-violet-500 text-white'
                    : disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600'
                }`}
              >
                {selected ? <Check size={18} /> : <Plus size={18} />}
                {selected ? '已加入对比' : '加入对比'}
              </button>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Info size={18} className="text-violet-500" />
                <h3 className="font-semibold text-gray-700">核心参数</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paramLabels.map(({ key, label, icon: Icon }) => {
                  const value = style.params[key as keyof typeof style.params];
                  if (!value || value === 'none') return null;
                  return (
                    <div key={key} className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <Icon size={12} />
                        {label}
                      </div>
                      {key === 'primaryColor' || key === 'secondaryColor' ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-md border border-gray-200"
                            style={{ background: value as string }}
                          />
                          <span className="font-mono text-xs text-gray-700 truncate">
                            {value as string}
                          </span>
                        </div>
                      ) : (
                        <div className="font-mono text-xs text-gray-700 truncate">
                          {value as string}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-gray-900">组件展示</h2>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                {(Object.keys(componentGroupNames) as ComponentGroup[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGroup(g)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      group === g
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {componentGroupNames[g]}
                  </button>
                ))}
              </div>
            </div>

            <StyleRenderer style={style} className="rounded-2xl p-8 min-h-[600px]">
              <StyleComponentShowcase group={group} />
            </StyleRenderer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleDetail;
