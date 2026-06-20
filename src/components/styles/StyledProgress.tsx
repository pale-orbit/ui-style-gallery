import React from 'react';

interface StyledProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export const StyledProgress: React.FC<StyledProgressProps> = ({
  value,
  max = 100,
  className = '',
  showLabel = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const isGradient =
    typeof getComputedStyle(document.documentElement).getPropertyValue('--style-primary-gradient') === 'string' &&
    (getComputedStyle(document.documentElement).getPropertyValue('--style-primary-gradient').includes('gradient'));

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '12px',
    borderRadius: 'var(--style-radius)',
    background: 'var(--style-secondary-gradient)',
    backgroundColor: isGradient ? undefined : 'var(--style-secondary-color)',
    overflow: 'hidden',
    boxShadow: 'var(--style-inner-shadow)',
    borderWidth: 'var(--style-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--style-border-color)',
  };

  const barStyle: React.CSSProperties = {
    height: '100%',
    width: `${percentage}%`,
    background: 'var(--style-primary-gradient)',
    backgroundColor: isGradient ? undefined : 'var(--style-primary-color)',
    borderRadius: 'var(--style-radius)',
    transition: 'width 0.3s ease',
    boxShadow: 'var(--style-shadow)',
  };

  return (
    <div className={`styled-progress ${className}`}>
      {showLabel && (
        <div
          className="flex justify-between mb-1 text-sm"
          style={{ fontFamily: 'var(--style-font)', color: 'var(--style-text-color)' }}
        >
          <span>进度</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div style={containerStyle}>
        <div style={barStyle} />
      </div>
    </div>
  );
};
