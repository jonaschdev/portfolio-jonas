import React from 'react';

export default function HeaderTalkButton() {
  const handleClick = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="nav-link btn-header-talk"
      title="Ir para a seção de contato"
    >
      <span>Falar Comigo</span>
    </button>
  );
}
