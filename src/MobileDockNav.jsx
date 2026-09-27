import React, { useState, useEffect, useRef } from 'react';
import Dock from './Dock';
import { Home, Code2, FolderGit2, Mail } from 'lucide-react';

const SECTIONS = ['inicio', 'tecnologias', 'projetos', 'contato'];

export default function MobileDockNav() {
  const [activeSection, setActiveSection] = useState('inicio');
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    function detectActiveSection() {
      // 1. Próximo ao final da página (Contato)
      const scrollBottom = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= totalHeight - 90) {
        return 'contato';
      }

      // 2. Topo da página (Início)
      if (window.scrollY < 100) {
        return 'inicio';
      }

      // 3. Ponto de leitura ideal na tela (42% do topo da janela)
      const triggerY = window.innerHeight * 0.42;
      let matchedId = 'inicio';

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Se o topo da seção já cruzou a linha de leitura, ela se torna ativa
          if (rect.top <= triggerY) {
            matchedId = id;
          }
        }
      }

      return matchedId;
    }

    function handleScroll() {
      if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('dock-item')) {
        document.activeElement.blur();
      }
      if (isClickingRef.current) return;
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentId = detectActiveSection();
        setActiveSection(currentId);
        ticking = false;
      });
      ticking = true;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const scrollToSection = id => {
    setActiveSection(id);
    isClickingRef.current = true;
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);

    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 64;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const items = [
    {
      id: 'inicio',
      icon: <Home size={20} strokeWidth={1.6} />,
      label: 'Início',
      onClick: () => scrollToSection('inicio')
    },
    {
      id: 'tecnologias',
      icon: <Code2 size={20} strokeWidth={1.6} />,
      label: 'Linguagens',
      onClick: () => scrollToSection('tecnologias')
    },
    {
      id: 'projetos',
      icon: <FolderGit2 size={20} strokeWidth={1.6} />,
      label: 'Projetos',
      onClick: () => scrollToSection('projetos')
    },
    {
      id: 'contato',
      icon: <Mail size={20} strokeWidth={1.6} />,
      label: 'Contato',
      onClick: () => scrollToSection('contato')
    }
  ];

  return (
    <div className="mobile-dock-wrapper">
      <Dock
        items={items}
        panelHeight={58}
        baseItemSize={44}
        magnification={58}
        distance={120}
        activeSection={activeSection}
      />
    </div>
  );
}
