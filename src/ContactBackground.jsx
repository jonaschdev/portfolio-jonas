import React, { useState, useEffect } from 'react';
import SoftAurora from './SoftAurora';

export default function ContactBackground() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsLight(theme === 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-gradient-waves-wrapper" aria-hidden="true">
      <SoftAurora
        speed={0.5}
        scale={1.4}
        brightness={isLight ? 0.75 : 1.15}
        color1={isLight ? '#0284c7' : '#38bdf8'}
        color2={isLight ? '#38bdf8' : '#024bbf'}
        noiseFrequency={2.4}
        noiseAmplitude={0.65}
        bandHeight={0.45}
        bandSpread={1.2}
        octaveDecay={0.15}
        layerOffset={0.2}
        colorSpeed={0.8}
        enableMouseInteraction={true}
        mouseInfluence={0.22}
        lightMode={isLight}
      />
      <div className="contact-waves-top-fade" />
      <div className="contact-waves-bottom-fade" />
    </div>
  );
}
