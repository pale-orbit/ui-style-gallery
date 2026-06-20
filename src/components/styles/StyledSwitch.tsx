import React, { useState } from 'react';

interface StyledSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
}

export const StyledSwitch: React.FC<StyledSwitchProps> = ({
  checked: controlledChecked,
  defaultChecked,
  onChange,
  className = '',
  label,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const trackStyle: React.CSSProperties = {
    width: '48px',
    height: '26px',
    borderRadius: 'var(--style-radius)',
    borderWidth: 'var(--style-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--style-border-color)',
    background: checked ? 'var(--style-primary)' : 'var(--style-secondary)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: 'var(--style-shadow)',
  };

  const thumbStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    borderRadius: 'var(--style-radius)',
    background: '#ffffff',
    position: 'absolute',
    top: '3px',
    left: checked ? '25px' : '3px',
    transition: 'all 0.2s ease',
    boxShadow: 'var(--style-shadow)',
  };

  return (
    <div className={`styled-switch flex items-center gap-2 ${className}`}>
      <div style={trackStyle} onClick={handleToggle} role="switch" aria-checked={checked}>
        <div style={thumbStyle} />
      </div>
      {label && <span style={{ fontFamily: 'var(--style-font)' }}>{label}</span>}
    </div>
  );
};
