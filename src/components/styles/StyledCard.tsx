import React from 'react';

interface StyledCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export const StyledCard: React.FC<StyledCardProps> = ({
  children,
  title,
  className = '',
  onClick,
}) => {
  const cardStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: 'var(--style-radius)',
    backgroundColor: 'var(--style-bg)',
    borderWidth: 'var(--style-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--style-border-color)',
    boxShadow: 'var(--style-shadow)',
    backdropFilter: 'var(--style-backdrop-filter)',
    opacity: 'var(--style-opacity)',
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
  };

  return (
    <div
      className={`styled-card ${className}`}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--style-hover-shadow)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--style-shadow)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {title && (
        <h3
          className="text-lg font-semibold mb-3"
          style={{
            fontFamily: 'var(--style-font)',
            textShadow: 'var(--style-text-shadow)',
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
