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
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 12 : 24;
    return Array.from({ length: count }, (_, i) => {
      const size = Math.floor(Math.random() * 4) + 3; // 3px a 6px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = 16 + Math.random() * 18; // 16s a 34s
      const delay = -(Math.random() * 20);
      const opacity = 0.2 + Math.random() * 0.4;
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
