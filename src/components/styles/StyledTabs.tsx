import React, { useState } from 'react';

interface StyledTabsProps {
  tabs: { id: string; label: string }[];
  className?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export const StyledTabs: React.FC<StyledTabsProps> = ({
  tabs,
  className = '',
  defaultTab,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    padding: '4px',
    borderRadius: 'var(--style-radius)',
    backgroundColor: 'var(--style-secondary)',
    gap: '4px',
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: 'var(--style-radius)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--style-font)',
    fontSize: '14px',
    fontWeight: 500,
    background: active ? 'var(--style-primary)' : 'transparent',
    color: active ? 'var(--style-text)' : 'var(--style-text)',
    opacity: active ? 1 : 0.7,
    boxShadow: active ? 'var(--style-shadow)' : 'none',
  });

  return (
    <div className={`styled-tabs ${className}`} style={containerStyle}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          style={tabStyle(activeTab === tab.id)}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};
