import React, { useState, useEffect } from 'react';
import Particles from './Particles';

export default function GlobalParticlesBackground() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current);
    };

    // Observa mudanças no atributo data-theme da tag <html>
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateTheme();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('themechange', updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('themechange', updateTheme);
    };
  }, []);

  const isLight = theme === 'light';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Partículas em tons de azul escuro e ardósia exclusivo para o modo claro
  const lightColors = ['#0f172a', '#0369a1', '#0284c7', '#1e40af', '#2563eb'];

  return (
    <div className={`global-particles-wrapper ${isLight ? 'is-active' : ''}`} aria-hidden="true">
      <Particles
        particleColors={lightColors}
        particleCount={isMobile ? 50 : 160}
        particleSpread={isMobile ? 8 : 11}
        speed={0.12}
        particleBaseSize={isMobile ? 70 : 85}
        moveParticlesOnHover={!isMobile}
        particleHoverFactor={0.8}
        alphaParticles={true}
        disableRotation={false}
        sizeRandomness={0.9}
        cameraDistance={20}
      />
    </div>
  );
}

