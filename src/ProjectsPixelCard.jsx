import React, { useState, useEffect } from 'react';
import CardSwap, { Card } from './CardSwap';
import GhostFibers from './GhostFibers';

export default function ProjectsPixelCard() {
  const [isLight, setIsLight] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isStacked, setIsStacked] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 1180);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsLight(theme === 'light');
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const stacked = window.innerWidth <= 1180;
      setIsMobile(prev => (prev !== mobile ? mobile : prev));
      setIsStacked(prev => (prev !== stacked ? stacked : prev));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="projects-section-container">
      {/* GhostFibers Fundo Interativo WebGL com suavização e otimização por dispositivo */}
      <div className="projects-ghost-fibers-wrapper" aria-hidden="true">
        <GhostFibers
          lineColor={isLight ? '#0284c7' : '#0ea5e9'}
          glowColor={isLight ? '#0369a1' : '#0284c7'}
          speed={isMobile ? 0.1 : 0.15}
          scale={isMobile ? 1.8 : 2.2}
          rotation={0}
          rotationSpeed={0.2}
          layers={isMobile ? 2 : 4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.5}
          brightness={isLight ? 1.4 : 2}
          blueBoost={1.2}
          vignette={0.7}
          grain={isMobile ? 0.02 : 0.04}
          lightMode={isLight}
          dpr={isMobile ? 0.75 : 1}
          fps={isMobile ? 30 : 60}
        />
        <div className="ghost-fibers-top-fade" />
        <div className="ghost-fibers-bottom-fade" />
      </div>

      <div className="card-swap-showcase">
      {/* COLUNA ESQUERDA: APRESENTAÇÃO DOS PROJETOS (ESTILO EXATO DA FOTO DE REFERÊNCIA) */}
      <div className="showcase-left-col">
        <h2 className="showcase-title">
          Projetos
        </h2>

        <p className="showcase-bio-text">
          Acompanhe o desenvolvimento dos meus projetos em tempo real pelo meu GitHub.
        </p>

        <a
          href="https://github.com/jonaschdev"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link showcase-github-btn"
          aria-label="Ver perfil no GitHub"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>Ver perfil no GitHub</span>
        </a>
      </div>

      {/* COLUNA DIREITA: CARDSWAP COM OS CARDS CASCATEANDO NO CANTO INFERIOR DIREITO */}
      <div className="showcase-right-area">
        <CardSwap
          width={860}
          height={520}
          cardDistance={isStacked ? 22 : 60}
          verticalDistance={isStacked ? 24 : 65}
          autoSwap={false}
          pauseOnHover={false}
          skewAmount={isStacked ? 0 : 4}
          easing="smooth"
        >
          {/* CARD 1 (FRENTE): PORTFÓLIO PESSOAL COM VÍDEO DO PROJETO */}
          <Card customClass="showcase-card showcase-card-1">
            <div className="card-top-tab card-tab-1">
              <span className="card-tab-icon">&lt;/&gt;</span>
              <span>Portfólio</span>
            </div>

            <div className="card-inner-content card-portfolio-layout">
              {/* SAFARI / BROWSER MINIMALISTA MOCKUP */}
              <div className="safari-browser-frame">
                {/* SAFARI TOOLBAR / BARRA DE NAVEGAÇÃO */}
                <div className="safari-toolbar">
                  {/* TRÊS BONTÕES TRAFFIC LIGHTS (VERMELHO, AMARELO, VERDE) */}
                  <div className="safari-window-controls">
                    <span className="safari-dot dot-close"></span>
                    <span className="safari-dot dot-minimize"></span>
                    <span className="safari-dot dot-expand"></span>
                  </div>

                  {/* BARRA DE ENDEREÇO / URL MINIMALISTA */}
                  <div className="safari-address-bar">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="safari-lock-icon">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span className="safari-url-text">jonas.dev/portfolio</span>
                  </div>

                  {/* ÍCONE DE GITHUB INTEGRADO NA TOOLBAR */}
                  <a
                    href="https://github.com/jonaschdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="safari-action-btn"
                    onClick={(e) => e.stopPropagation()}
                    title="Ver no GitHub"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>

                {/* ÁREA DO CONTEÚDO / VÍDEO DENTRO DA JANELA DO SAFARI */}
                <div className="portfolio-video-wrapper">
                  <video
                    className="portfolio-project-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src="./public/portfolio-demo.mp4" type="video/mp4" />
                  </video>

                  {/* PLACEHOLDER ELEGANTE EXIBIDO ENQUANTO O ARQUIVO DE VÍDEO É ADICIONADO */}
                  <div className="portfolio-video-placeholder">
                    <div className="video-placeholder-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <span className="video-placeholder-title">Preview do Projeto #01</span>
                    <p className="video-placeholder-desc">
                      Portfólio Interativo <code>portfolio-demo.mp4</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CARD 2 (MEIO): EM BREVE (CAIXA LIMPA & MINIMALISTA) */}
          <Card customClass="showcase-card showcase-card-2">
            <div className="card-top-tab card-tab-2">
              <span className="card-tab-dot"></span>
              <span>Em Breve</span>
            </div>

            <div className="card-inner-content card-coming-soon-box">
              <div className="coming-soon-center">
                <div className="coming-soon-frame">
                  <div className="coming-soon-dashed-box">
                    <div className="coming-soon-glow"></div>
                    <span className="coming-soon-label">Em Desenvolvimento</span>
                    <p className="coming-soon-sub">Novo projeto em construção</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CARD 3 (FUNDO): EM BREVE (CAIXA LIMPA & MINIMALISTA) */}
          <Card customClass="showcase-card showcase-card-3">
            <div className="card-top-tab card-tab-3">
              <span className="card-tab-dot"></span>
              <span>Em Breve</span>
            </div>

            <div className="card-inner-content card-coming-soon-box">
              <div className="coming-soon-center">
                <div className="coming-soon-frame">
                  <div className="coming-soon-dashed-box">
                    <div className="coming-soon-glow"></div>
                    <span className="coming-soon-label">Em Desenvolvimento</span>
                    <p className="coming-soon-sub">Novo projeto em construção</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  </div>
  );
}
