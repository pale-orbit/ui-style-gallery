import React from 'react';

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderStyle: 'solid',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    borderRadius: 'var(--style-radius)',
    borderWidth: 'var(--style-border-width)',
    fontFamily: 'var(--style-font)',
  };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--style-primary)',
          color: 'var(--style-text)',
          boxShadow: 'var(--style-shadow)',
          borderColor: 'var(--style-border-color)',
        };
      case 'secondary':
        return {
          background: 'var(--style-secondary)',
          color: 'var(--style-text)',
          boxShadow: 'var(--style-shadow)',
          borderColor: 'var(--style-border-color)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--style-text)',
          borderColor: 'var(--style-border-color)',
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--style-text)',
          borderColor: 'transparent',
          boxShadow: 'none',
        };
      default:
        return {};
    }
  };

  const hoverStyle: React.CSSProperties = {
    boxShadow: 'var(--style-hover-shadow)',
    transform: 'translateY(-1px)',
  };

  return (
    <button
      className={`styled-button ${className}`}
      style={{
        ...baseStyle,
        ...getVariantStyle(),
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = baseStyle.boxShadow as string;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </button>
  );
};
