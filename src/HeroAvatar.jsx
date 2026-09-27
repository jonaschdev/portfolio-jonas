import React from 'react';
import TiltedCard from './TiltedCard';

export default function HeroAvatar() {
  const badgeOverlay = (
    <div className="badge-overlay-container">
      {/* Nome minimalista na parte inferior */}
      <div className="badge-footer badge-footer-clean">
        <span className="badge-name">
          Jonas <span className="badge-name-secondary">• Ulquiorra Cifer</span>
        </span>
      </div>
    </div>
  );

  return (
    <div className="hero-avatar-tilted-wrapper holographic-card-container">
      <TiltedCard
        imageSrc="./src/perfil.jpg"
        altText="Jonas"
        captionText="⚡ Jonas • Disponível para Projetos"
        containerHeight="360px"
        containerWidth="100%"
        imageHeight="340px"
        imageWidth="300px"
        rotateAmplitude={14}
        scaleOnHover={1.04}
        showMobileWarning={false}
        showTooltip={false}
        overlayContent={badgeOverlay}
        displayOverlayContent={true}
      />
    </div>
  );
}
