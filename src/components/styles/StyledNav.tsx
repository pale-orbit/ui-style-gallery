import React, { useState } from 'react';
import { Home, Settings, User, Bell, Menu } from 'lucide-react';

interface StyledNavProps {
  className?: string;
}

export const StyledNav: React.FC<StyledNavProps> = ({ className = '' }) => {
  const [activeItem, setActiveItem] = useState('home');

  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'discover', label: '发现', icon: Bell },
    { id: 'profile', label: '我的', icon: User },
    { id: 'settings', label: '设置', icon: Settings },
  ];

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: 'var(--style-radius)',
    backgroundColor: 'var(--style-bg-color)',
    borderWidth: 'var(--style-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--style-border-color)',
    boxShadow: 'var(--style-shadow)',
    backdropFilter: 'var(--style-backdrop-filter)',
    color: 'var(--style-text-color)',
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: 'var(--style-radius)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--style-font)',
    background: active ? 'var(--style-primary-gradient)' : 'transparent',
    backgroundColor: active ? undefined : 'transparent',
    color: 'var(--style-text-color)',
    opacity: active ? 1 : 0.7,
    boxShadow: active ? 'var(--style-shadow)' : 'none',
  });

  return (
    <nav className={`styled-nav ${className}`} style={navStyle}>
      <Menu size={18} className="mr-2" />
      {navItems.map((item) => (
        <div
          key={item.id}
          style={itemStyle(activeItem === item.id)}
          onClick={() => setActiveItem(item.id)}
        >
          <item.icon size={16} />
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};
