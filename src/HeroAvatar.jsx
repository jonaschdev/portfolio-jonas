import React from 'react';
import TiltedCard from './TiltedCard';

export default function HeroAvatar() {
  return (
    <div className="hero-avatar-tilted-wrapper">
      <TiltedCard
        imageSrc="./src/perfil.jpg"
        altText="Jonas"
        captionText="Jonas"
        containerHeight="240px"
        containerWidth="100%"
        imageHeight="230px"
        imageWidth="230px"
        rotateAmplitude={14}
        scaleOnHover={1.06}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={false}
      />
    </div>
  );
}
