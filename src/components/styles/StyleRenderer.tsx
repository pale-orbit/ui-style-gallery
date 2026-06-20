import React, { CSSProperties } from 'react';
import { UIStyle } from '@/types';

interface StyleRendererProps {
  style: UIStyle;
  children: React.ReactNode;
  className?: string;
  showBackground?: boolean;
}

export const StyleRenderer: React.FC<StyleRendererProps> = ({
  style,
  children,
  className = '',
  showBackground = true,
}) => {
  const cssVars: CSSProperties = {
    '--style-radius': style.params.borderRadius,
    '--style-shadow': style.params.shadow,
    '--style-blur': style.params.blur,
    '--style-primary': style.params.primaryColor,
    '--style-secondary': style.params.secondaryColor,
    '--style-bg': style.params.backgroundColor,
    '--style-text': style.params.textColor,
    '--style-border-width': style.params.borderWidth,
    '--style-border-color': style.params.borderColor,
    '--style-backdrop-filter': style.params.backdropFilter || 'none',
    '--style-opacity': style.params.opacity || 1,
    '--style-font': style.params.fontFamily || 'inherit',
    '--style-inner-shadow': style.params.innerShadow || 'none',
    '--style-text-shadow': style.params.textShadow || 'none',
    '--style-hover-shadow': style.params.hoverShadow || style.params.shadow,
  } as CSSProperties;

  const containerStyle: CSSProperties = {
    ...cssVars,
    fontFamily: style.params.fontFamily,
    backgroundColor: showBackground ? style.params.backgroundColor : 'transparent',
    color: style.params.textColor,
    position: 'relative',
    overflow: 'hidden',
  };

  if (style.id === 'aurora' || style.id === 'vaporwave' || style.id === 'cyberpunk') {
    containerStyle.backgroundImage = style.params.backgroundColor;
  }

  return (
    <div className={`style-renderer ${className}`} style={containerStyle}>
      {style.id === 'glassmorphism' || style.id === 'liquid-glass' || style.id === 'acrylic' ? (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          }}
        />
      ) : null}
      {children}
    </div>
  );
};
