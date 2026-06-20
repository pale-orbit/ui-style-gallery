import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, X } from 'lucide-react';
import { UIStyle } from '@/types';
import { StyleRenderer } from '@/components/styles/StyleRenderer';
import { StyledButton } from '@/components/styles/StyledButton';
import { StyledInput } from '@/components/styles/StyledInput';
import { StyledSwitch } from '@/components/styles/StyledSwitch';
import { StyledCard } from '@/components/styles/StyledCard';
import { useCompareStore } from '@/store/useCompareStore';

interface StyleCardProps {
  style: UIStyle;
  index: number;
}

const StyleCardComponent: React.FC<StyleCardProps> = ({ style, index }) => {
  const navigate = useNavigate();
  const { isSelected, toggleStyle, canAddMore } = useCompareStore();

  const selected = isSelected(style.id);
  const disabled = !selected && !canAddMore();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.compare-checkbox')) return;
    navigate(`/style/${style.id}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      toggleStyle(style.id);
    }
  };

  return (
    <div
      className="relative group"
      style={{
        animation: `fadeInUp 0.5s ease ${index * 0.05}s both`,
      }}
    >
      <div
        className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
          selected ? 'ring-2 ring-violet-500 ring-offset-2' : ''
        }`}
        onClick={handleCardClick}
      >
        <StyleRenderer style={style} className="rounded-xl overflow-hidden h-full">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold" style={{ textShadow: 'var(--style-text-shadow)' }}>
                  {style.name}
                </h3>
                <p className="text-xs opacity-70">{style.nameEn}</p>
              </div>
              <div
                className={`compare-checkbox w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-all ${
                  selected
                    ? 'bg-violet-500 text-white'
                    : disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-white/50 border border-current'
                }`}
                onClick={handleCheckboxClick}
                title={disabled ? '已达最大选择数量' : selected ? '取消对比' : '加入对比'}
              >
                {selected ? (
                  <Check size={14} />
                ) : disabled ? (
                  <X size={14} />
                ) : (
                  <Plus size={14} />
                )}
              </div>
            </div>

            <span
              className="inline-block px-2 py-1 text-xs rounded-md mb-3"
              style={{
                background: 'var(--style-primary)',
                color: 'var(--style-text)',
                opacity: 0.8,
              }}
            >
              {style.categoryName}
            </span>

            <p className="text-sm mb-4 line-clamp-2 opacity-90">
              {style.description}
            </p>

            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {style.features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded opacity-80"
                    style={{ background: 'var(--style-secondary)' }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-current/10">
              <p className="text-xs opacity-60 mb-3">组件预览</p>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <StyledButton variant="primary" onClick={(e: any) => e.stopPropagation()}>
                    按钮
                  </StyledButton>
                  <StyledSwitch />
                </div>
                <StyledInput placeholder="输入框..." />
              </div>
            </div>
          </div>
        </StyleRenderer>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export const StyleCard = memo(StyleCardComponent);
