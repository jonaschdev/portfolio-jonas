import React, { useState, useEffect, useRef } from 'react';
import './CardSwap.css';

export default function ProjectsPixelCard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Lazy playback via IntersectionObserver: só reproduz o vídeo quando a seção estiver visível
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="projects-section-container">
      {/* 1. APRESENTAÇÃO IGUAL O DE LÍNGUAS E TECS (SEM CARD ATRÁS) */}
      <div className="section-header-centered projects-header-centered">
        <h2 className="section-title">Projetos</h2>
        <p className="section-desc">
          Acompanhe o desenvolvimento dos meus projetos em tempo real pelo meu GitHub.
        </p>
      </div>

      {/* 2. CARD DO PROJETO EM DESTAQUE (CENTRALIZADO) */}
      <div className="projects-showcase-layout">
        <div ref={cardRef} className="portfolio-single-card">
          {/* JANELA SAFARI NO TOPO DO VÍDEO */}
          <div className="single-card-media-wrapper">
            <div className="single-card-safari-bar">
              <div className="single-card-dots">
                <span className="single-card-dot red" />
                <span className="single-card-dot yellow" />
                <span className="single-card-dot green" />
              </div>
              <div className="single-card-url">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>https://jonaschdev.github.io/portfolio-jonas/</span>
              </div>
              <div style={{ width: 40 }} />
            </div>

            {/* VÍDEO DO PROJETO COMPRIMIDO COM POSTER E CONTROLE DE PLAY/PAUSE */}
            <div
              className="single-card-video-box"
              onClick={togglePlay}
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? "Pausar demonstração" : "Reproduzir demonstração"}
            >
              <video
                ref={videoRef}
                className="single-card-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="./portfolio-poster.jpg"
              >
                <source src="./portfolio-demo.mp4" type="video/mp4" />
                <source src="/portfolio-demo.mp4" type="video/mp4" />
              </video>

              <div className="single-card-play-overlay">
                <span className="single-card-play-badge">
                  {isPlaying ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span>Clique para reproduzir</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* INFORMAÇÕES DO PROJETO */}
          <h3 className="single-card-title">Portfólio Pessoal</h3>
          <p className="single-card-desc">
            Esse projeto é literalmente o que você está acessando agora. É o meu portfólio profissional feito por mim com o auxilio do Gemini. Fiz e tentei otimizar ao máximo para garantir a melhor exeriência de visualização em desktop e mobile.
          </p>

          <div className="single-card-tech-tags">
            <span className="single-card-tech-pill">React</span>
            <span className="single-card-tech-pill">TypeScript</span>
            <span className="single-card-tech-pill"> CSS</span>
            <span className="single-card-tech-pill">Vite</span>
          </div>
        </div>

        {/* 3. BOTÃO DE VER PERFIL NO GITHUB ABAIXO DO CARD (ELABORADO & ELEGANTE) */}
        <div className="projects-github-cta-wrapper">
          <a
            href="https://github.com/jonaschdev"
            target="_blank"
            rel="noopener noreferrer"
            className="elaborate-github-cta"
            aria-label="Ver perfil completo no GitHub"
          >
            <div className="elaborate-github-content">
              <div className="elaborate-github-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <div className="elaborate-github-text">
                <span className="elaborate-github-title">Ver perfil completo no GitHub</span>
                <span className="elaborate-github-desc">@jonaschdev • Repositórios, e projetos em andamento</span>
              </div>
              <div className="elaborate-github-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
