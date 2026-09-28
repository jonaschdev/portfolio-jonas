'use client';

import React, { useRef } from 'react';
import './Dock.css';

function DockItem({
  children,
  className = '',
  onClick,
  baseItemSize = 44,
  label,
  isActive = false
}) {
  const ref = useRef(null);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  const handleClick = e => {
    if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') {
      e.currentTarget.blur();
    }
    onClick?.();
  };

  return (
    <div
      ref={ref}
      style={{
        width: baseItemSize,
        height: baseItemSize
      }}
      onClick={handleClick}
      className={`dock-item ${isActive ? 'active' : ''} ${className}`}
      role="button"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items = [],
  className = '',
  panelHeight = 58,
  baseItemSize = 44,
  activeSection = ''
}) {
  return (
    <div style={{ height: panelHeight }} className="dock-outer">
      <div
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className || ''}
            baseItemSize={baseItemSize}
            label={item.label}
            isActive={activeSection === item.id || item.isActive}
          >
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
