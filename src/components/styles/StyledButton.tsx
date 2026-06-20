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
  const isGradient = (val: string) => val.startsWith('linear-gradient') || val.startsWith('radial-gradient');

  const getBgForVariant = () => {
    switch (variant) {
      case 'primary':
        return 'var(--style-primary-gradient)';
      case 'secondary':
        return 'var(--style-secondary-gradient)';
      default:
        return 'transparent';
    }
  };

  const bg = getBgForVariant();

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
    backdropFilter: 'var(--style-backdrop-filter)',
    textShadow: 'var(--style-text-shadow)',
  };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary': {
        const primaryIsGradient = isGradient(String(bg));
        return {
          background: bg,
          backgroundColor: primaryIsGradient ? undefined : 'var(--style-primary-color)',
          color: 'var(--style-text-color)',
          boxShadow: 'var(--style-shadow)',
          borderColor: 'var(--style-border-color)',
          opacity: 'var(--style-opacity)',
        };
      }
      case 'secondary': {
        const secondaryIsGradient = isGradient(String(bg));
        return {
          background: bg,
          backgroundColor: secondaryIsGradient ? undefined : 'var(--style-secondary-color)',
          color: 'var(--style-text-color)',
          boxShadow: 'var(--style-shadow)',
          borderColor: 'var(--style-border-color)',
        };
      }
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--style-text-color)',
          borderColor: 'var(--style-border-color)',
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--style-text-color)',
          borderColor: 'transparent',
          boxShadow: 'none',
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`styled-button ${className}`}
      style={{
        ...baseStyle,
        ...getVariantStyle(),
        opacity: disabled ? 0.5 : undefined,
      }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = 'var(--style-hover-shadow)';
          e.currentTarget.style.transform = 'translateY(-1px)';
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
