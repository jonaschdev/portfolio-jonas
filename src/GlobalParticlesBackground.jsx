import React, { useState, useEffect, useMemo } from 'react';

export default function GlobalParticlesBackground() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current);
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateTheme();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('themechange', updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('themechange', updateTheme);
    };
  }, []);

  const isLight = theme === 'light';

  // Partículas leves com aceleração nativa por hardware GPU (zero travamentos)
  const particles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const size = Math.floor(Math.random() * 5) + 3; // 3px a 7px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 18; // 14s a 32s
      const delay = -(Math.random() * 20);
      const opacity = 0.25 + Math.random() * 0.45;
      const colors = ['#0284c7', '#0369a1', '#38bdf8', '#2563eb', '#6366f1'];
      const color = colors[i % colors.length];

      return {
        id: i,
        size,
        top: `${top}%`,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        opacity,
        color
      };
    });
  }, []);

  if (!isLight) return null;

  return (
    <div className="global-particles-wrapper is-active" aria-hidden="true">
      <div className="ambient-css-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="ambient-css-dot"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
              backgroundColor: p.color,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>
    </div>
  );
}
