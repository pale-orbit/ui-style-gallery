import React, { useState } from 'react';

interface StyledInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: 'text' | 'password' | 'email';
}

export const StyledInput: React.FC<StyledInputProps> = ({
  placeholder = '请输入...',
  value,
  onChange,
  className = '',
  type = 'text',
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onChange?.(val);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: 'var(--style-radius)',
    borderWidth: 'var(--style-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--style-border-color)',
    backgroundColor: 'var(--style-bg-color)',
    color: 'var(--style-text-color)',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--style-font)',
    boxShadow: focused ? 'var(--style-hover-shadow)' : 'var(--style-shadow)',
    backdropFilter: 'var(--style-backdrop-filter)',
  };

  return (
    <input
      type={type}
      className={`styled-input ${className}`}
      style={inputStyle}
      placeholder={placeholder}
      value={value !== undefined ? value : internalValue}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};
