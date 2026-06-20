import React, { CSSProperties } from 'react';
import { UIStyle } from '@/types';

interface StyleRendererProps {
  style: UIStyle;
  children: React.ReactNode;
  className?: string;
  showBackground?: boolean;
}

const darkStyleIds = [
  'aurora',
  'vaporwave',
  'cyberpunk',
  'pixel-art',
  'glassmorphism',
];

const glassStyleIds = [
  'glassmorphism',
  'liquid-glass',
  'acrylic',
];

export const StyleRenderer: React.FC<StyleRendererProps> = ({
  style,
  children,
  className = '',
  showBackground = true,
}) => {
  const isDark = darkStyleIds.includes(style.id);
  const isGlass = glassStyleIds.includes(style.id);

  const cssVars: CSSProperties = {
    '--style-radius': style.params.borderRadius,
    '--style-shadow': style.params.shadow,
    '--style-blur': style.params.blur,
    '--style-border-width': style.params.borderWidth,
    '--style-border-color': style.params.borderColor,
    '--style-backdrop-filter': style.params.backdropFilter || 'none',
    '--style-opacity': style.params.opacity ?? 1,
    '--style-font': style.params.fontFamily || 'inherit',
    '--style-inner-shadow': style.params.innerShadow || 'none',
    '--style-text-shadow': style.params.textShadow || 'none',
    '--style-hover-shadow': style.params.hoverShadow || style.params.shadow,
    '--style-primary-color': extractSolidColor(style.params.primaryColor),
    '--style-secondary-color': extractSolidColor(style.params.secondaryColor),
    '--style-primary-gradient': style.params.primaryColor,
    '--style-secondary-gradient': style.params.secondaryColor,
    '--style-bg-color': style.params.backgroundColor === 'transparent' ? '#1a1a2e' : style.params.backgroundColor,
    '--style-text-color': style.params.textColor,
  } as CSSProperties;

  let displayBackground: CSSProperties['background'] = style.params.backgroundColor;

  if (isGlass) {
    displayBackground = 'linear-gradient(135deg, #1e3a8a 0%, #6d28d9 50%, #831843 100%)';
  } else if (style.id === 'aurora') {
    displayBackground = 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)';
  } else if (style.id === 'vaporwave') {
    displayBackground = 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)';
  } else if (style.id === 'cyberpunk') {
    displayBackground = 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #0d0221 100%)';
  } else if (style.id === 'pixel-art') {
    displayBackground = '#1a1a2e';
  } else if (style.id === 'neumorphism') {
    displayBackground = '#e0e5ec';
  }

  const containerStyle: CSSProperties = {
    ...cssVars,
    fontFamily: style.params.fontFamily,
    background: showBackground ? displayBackground : 'transparent',
    color: style.params.textColor,
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div
      className={`style-renderer ${className}`}
      style={containerStyle}
      data-style-id={style.id}
      data-is-dark={isDark}
    >
      {isGlass && (
        <>
          <div
            className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-40 -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
              transform: 'translate(-20%, -20%)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-60 h-60 rounded-full opacity-40 -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(240,147,251,0.5) 0%, transparent 70%)',
              transform: 'translate(20%, 20%)',
            }}
          />
        </>
      )}
      {style.id === 'aurora' && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(102,126,234,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(240,147,251,0.3) 0%, transparent 50%)',
          }}
        />
      )}
      {style.id === 'vaporwave' && (
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,106,213,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      )}
      {style.id === 'cyberpunk' && (
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
          }}
        />
      )}
      {children}
    </div>
  );
};

function extractSolidColor(value: string): string {
  if (value.startsWith('linear-gradient') || value.startsWith('radial-gradient')) {
    const match = value.match(/#[A-Fa-f0-9]{6}|rgba?\([^)]+\)/);
    return match ? match[0] : '#8B5CF6';
  }
  return value;
}
