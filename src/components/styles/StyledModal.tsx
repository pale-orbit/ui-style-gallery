import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StyledButton } from './StyledButton';

interface StyledModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const StyledModal: React.FC<StyledModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  };

  const modalStyle: React.CSSProperties = {
    minWidth: '320px',
    maxWidth: '90vw',
    padding: '24px',
    borderRadius: 'var(--style-radius)',
    backgroundColor: 'var(--style-bg)',
    borderWidth: 'var(--style-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--style-border-color)',
    boxShadow: 'var(--style-shadow)',
    backdropFilter: 'var(--style-backdrop-filter)',
    position: 'relative',
  };

  return (
    <div className={`styled-modal ${className}`} style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--style-font)' }}
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded hover:opacity-70 transition-opacity"
            style={{ color: 'var(--style-text)' }}
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ fontFamily: 'var(--style-font)' }}>{children}</div>
        <div className="flex justify-end gap-2 mt-6">
          <StyledButton variant="secondary" onClick={onClose}>
            取消
          </StyledButton>
          <StyledButton variant="primary" onClick={onClose}>
            确定
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return { isOpen, open, close, toggle };
};
