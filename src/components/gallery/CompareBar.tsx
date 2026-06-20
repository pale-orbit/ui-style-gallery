import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trash2, Layers } from 'lucide-react';
import { useCompareStore } from '@/store/useCompareStore';
import { getStyleById } from '@/data/styles';

export const CompareBar: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStyleIds, removeStyle, clearAll, maxSelection } = useCompareStore();

  const selectedStyles = selectedStyleIds.map((id) => getStyleById(id)).filter(Boolean);

  if (selectedStyleIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Layers className="text-violet-500" size={20} />
              <span className="font-semibold text-gray-700">
                已选择 {selectedStyleIds.length}/{maxSelection}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {selectedStyles.map((style) => (
                <div
                  key={style!.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg group"
                >
                  <span className="text-sm font-medium">{style!.name}</span>
                  <button
                    onClick={() => removeStyle(style!.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              清空全部
            </button>
            <button
              onClick={() => navigate('/compare')}
              disabled={selectedStyleIds.length < 2}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
                selectedStyleIds.length >= 2
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              开始对比
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
