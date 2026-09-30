import React from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import GlobalParticlesBackground from './GlobalParticlesBackground';
import TechLogoLoop from './TechLogoLoop';
import HeroAvatar from './HeroAvatar';
import OpenToWorkButton from './OpenToWorkButton';
import DiscordProfileCard from './DiscordProfileCard';
import ContactMessageForm from './ContactMessageForm';
import MobileDockNav from './MobileDockNav';
import HeaderTalkButton from './HeaderTalkButton';
import EmailCopyButton from './EmailCopyButton';

/**
 * =========================================================================
 * 🚀 JAVASCRIPT & REACT BITS DO SEU PORTFÓLIO
 * =========================================================================
 * Funções nativas, animações e componentes React Bits integrados.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // =======================================================================
  // MONTAGEM DO FUNDO UNIFICADO DE PARTICULAS 3D (REACT BITS PARTICLES)
  // =======================================================================
  const globalParticlesRootEl = document.getElementById('globalParticlesRoot');
  if (globalParticlesRootEl) {
    const particlesRoot = createRoot(globalParticlesRootEl);
    particlesRoot.render(React.createElement(GlobalParticlesBackground));
  }

  // =======================================================================
  // MONTAGEM DO BOTÃO "FALAR COMIGO" DO CABEÇALHO (SPECULAR BUTTON)
  // =======================================================================
  const headerTalkRootEl = document.getElementById('headerTalkRoot');
  if (headerTalkRootEl) {
    const talkRoot = createRoot(headerTalkRootEl);
    talkRoot.render(React.createElement(HeaderTalkButton));
  }

  // =======================================================================
  // MONTAGEM DO BOTÃO DE COPIAR E-MAIL (SPECULAR BUTTON)
  // =======================================================================
  const emailCopyRootEl = document.getElementById('emailCopyRoot');
  if (emailCopyRootEl) {
    const emailRoot = createRoot(emailCopyRootEl);
    emailRoot.render(React.createElement(EmailCopyButton));
  }

  // =======================================================================
  // MONTAGEM DA FOTO DE PERFIL COM <TiltedCard /> (REACT BITS)
  // Tilt 3D interativo, tooltip flutuante personalizado e física fluida
  // =======================================================================
  const heroAvatarRootEl = document.getElementById('heroAvatarRoot');
  if (heroAvatarRootEl) {
    const avatarRoot = createRoot(heroAvatarRootEl);
    avatarRoot.render(React.createElement(HeroAvatar));
  }

  // =======================================================================
  // MONTAGEM DO BOTÃO INTERATIVO OPEN TO WORK (APPLE iOS GLASS MENU)
  // =======================================================================
  const openToWorkRootEl = document.getElementById('openToWorkRoot');
  if (openToWorkRootEl) {
    const otwRoot = createRoot(openToWorkRootEl);
    otwRoot.render(React.createElement(OpenToWorkButton));
  }

  // =======================================================================
  // MONTAGEM DO COMPONENTE <LogoLoop /> (REACT BITS)
  // Loop infinito de logos e linguagens com transição suave e física precisa
  // =======================================================================
  const logoLoopRootEl = document.getElementById('logoLoopRoot');
  if (logoLoopRootEl) {
    const root = createRoot(logoLoopRootEl);
    root.render(React.createElement(TechLogoLoop));
  }


  // =======================================================================
  // MONTAGEM DO CARD DO DISCORD (LANYARD API ESTILO GUNS.LOL)
  // =======================================================================
  const discordProfileRootEl = document.getElementById('discordProfileRoot');
  if (discordProfileRootEl) {
    const discordRoot = createRoot(discordProfileRootEl);
    discordRoot.render(React.createElement(DiscordProfileCard));
  }

  // =======================================================================
  // MONTAGEM DO FORMULÁRIO DE CONTATO (FIREBASE FIRESTORE)
  // =======================================================================
  const contactFormRootEl = document.getElementById('contactFormRoot');
  if (contactFormRootEl) {
    const formRoot = createRoot(contactFormRootEl);
    formRoot.render(React.createElement(ContactMessageForm));
  }

  // =======================================================================
  // ANIMAÇÃO DE TERMINAL / MÁQUINA DE ESCREVER (TYPEWRITER EFFECT)
  // Digita o título inicial: "Olá, eu sou o Jonas."
  // =======================================================================
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const fullText = "Olá, eu sou o Jonas.";
    let charIndex = 0;
    typewriterEl.textContent = "";

    function typeWriter() {
      if (charIndex < fullText.length) {
        typewriterEl.textContent += fullText.charAt(charIndex);
        charIndex++;
        const typingSpeed = 65 + Math.random() * 25;
        setTimeout(typeWriter, typingSpeed);
      } else {
        typewriterEl.innerHTML = 'Olá, eu sou o <span class="destaque-azul">Jonas</span>.';
      }
    }

    setTimeout(typeWriter, 350);
  }

  // =======================================================================
  // 1. COPIAR E-MAIL AO CLICAR NO ÍCONE DE COPIAR
  // =======================================================================
  const copyButtons = document.querySelectorAll('.js-copy-email');
  const toast = document.getElementById('toastNotice');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const email = button.getAttribute('data-email') || 'jonascc2018@gmail.com';

      navigator.clipboard.writeText(email).then(() => {
        const originalSvg = button.innerHTML;
        
        // Exibe ícone de checkmark minimalista
        button.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        button.classList.add('copied');

        // Exibe toast de confirmação
        if (toast) {
          toast.textContent = `E-mail "${email}" copiado com sucesso!`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2500);
        }

        // Restaura o ícone padrão após 2 segundos
        setTimeout(() => {
          button.innerHTML = originalSvg;
          button.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Erro ao copiar e-mail:', err);
      });
    });
  });

  // =======================================================================
  // 2. DOCK DE NAVEGAÇÃO FLUTUANTE MOBILE (REACT BITS DOCK - APPLE iOS LIQUID GLASS)
  // =======================================================================
  const mobileDockRootEl = document.getElementById('mobileDockRoot');
  if (mobileDockRootEl) {
    const dockRoot = createRoot(mobileDockRootEl);
    dockRoot.render(React.createElement(MobileDockNav));
  }

  // Scroll Spy para atualizar links do menu superior Desktop (Otimizado com RAF)
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
  if (desktopNavLinks.length > 0) {
    const desktopSectionIds = ['inicio', 'tecnologias', 'projetos', 'contato'];
    let scrollTicking = false;

    function updateDesktopNav() {
      scrollTicking = false;
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 90;
      if (isNearBottom) {
        setDesktopActive('contato');
        return;
      }
      if (window.scrollY < 100) {
        setDesktopActive('inicio');
        return;
      }
      const triggerY = window.innerHeight * 0.42;
      let matched = 'inicio';
      for (const id of desktopSectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          matched = id;
        }
      }
      setDesktopActive(matched);
    }

    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(updateDesktopNav);
        scrollTicking = true;
      }
    }

    function setDesktopActive(id) {
      desktopNavLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    updateDesktopNav();
  }

  // =======================================================================
  // 3. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
  // =======================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // =======================================================================
  // 4. ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
  // =======================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('LocalStorage inacessível:', e);
    }
    window.dispatchEvent(new Event('themechange'));
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
      toggleTheme();
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        if (mobileToggleBtn) mobileToggleBtn.textContent = '☰';
      }
    });
  }


  // =======================================================================
  // 7.1. EFEITO HACKER / MATRIX CODE RAIN NO LETREIRO DE LINGUAGENS
  // =======================================================================
  const matrixCanvas = document.getElementById('matrixCodeCanvas');
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let matrixFrameId = null;

    // Caracteres hacker, tokens de programação e símbolos de código
    const characters = '01{}[]<>/=;:~*&^%$#@!+-|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789constletfndefreturnimportexport';
    const fontSize = 11;
    let columns = 0;
    let drops = [];

    function resizeMatrixCanvas() {
      const rect = matrixCanvas.parentElement ? matrixCanvas.parentElement.getBoundingClientRect() : null;
      width = matrixCanvas.width = rect ? rect.width : window.innerWidth;
      height = matrixCanvas.height = rect ? rect.height : 60;
      columns = Math.max(1, Math.floor(width / fontSize));
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * (height / fontSize));
      }
    }

    resizeMatrixCanvas();
    window.addEventListener('resize', resizeMatrixCanvas);

    let lastTime = 0;
    const isMobile = window.innerWidth < 768;
    const fpsInterval = 1000 / (isMobile ? 18 : 24); // 18 FPS no mobile e 24 FPS no PC para economia de energia

    let isMatrixVisible = false;
    const matrixObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isMatrixVisible = entry.isIntersecting;
        if (isMatrixVisible && !matrixFrameId && !document.hidden) {
          lastTime = performance.now();
          matrixFrameId = requestAnimationFrame(renderMatrix);
        } else if (!isMatrixVisible && matrixFrameId) {
          cancelAnimationFrame(matrixFrameId);
          matrixFrameId = null;
        }
      });
    }, { threshold: 0.02 });
    matrixObserver.observe(matrixCanvas);

    function renderMatrix(currentTime) {
      if (!isMatrixVisible || document.hidden) {
        matrixFrameId = null;
        return;
      }
      matrixFrameId = requestAnimationFrame(renderMatrix);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Rastro translúcido sobre o fundo
      ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.22)' : 'rgba(9, 9, 11, 0.18)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const isHead = Math.random() > 0.88;
        if (isLight) {
          ctx.fillStyle = isHead ? 'rgba(2, 132, 199, 0.8)' : 'rgba(71, 85, 105, 0.35)';
        } else {
          ctx.fillStyle = isHead ? 'rgba(56, 189, 248, 0.9)' : (Math.random() > 0.5 ? 'rgba(52, 211, 153, 0.5)' : 'rgba(56, 189, 248, 0.4)');
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (matrixFrameId) {
          cancelAnimationFrame(matrixFrameId);
          matrixFrameId = null;
        }
      } else if (isMatrixVisible) {
        lastTime = performance.now();
        matrixFrameId = requestAnimationFrame(renderMatrix);
      }
    });
  }

  // =======================================================================
  // 8. ANIMAÇÕES DINÂMICAS AO ROLAR A PÁGINA (SCROLL REVEAL OBSERVER)
  // =======================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Desconecta após animar para otimizar performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // =======================================================================
  // 9. REACT BITS: 3D CIRCULAR ORBIT RING CAROUSEL (GSAP POWERED)
  // =======================================================================
  const depthCarouselEl = document.getElementById('techDepthCarousel');
  const depthCards = document.querySelectorAll('.depth-carousel__card');
  const depthPrevBtn = document.getElementById('depthPrevBtn');
  const depthNextBtn = document.getElementById('depthNextBtn');
  const depthDotsContainer = document.getElementById('depthDots');

  if (depthCarouselEl && depthCards.length > 0) {
    const totalCards = depthCards.length;
    const overlayRefs = document.querySelectorAll('.depth-carousel__tint');

    // Configurações do Carrossel Horizontal
    const cfg = {
      count: totalCards,
      cardWidth: 460,
      cardHeight: 285,
      cardSpacing: 380,
      duration: 620,
      ease: 'power2.out'
    };

    let pos = 0;
    let focusIndex = 0;
    let currentTween = null;
    let entranceTween = null;
    let hasEntered = false;
    let scale = 1;
    let dragData = null;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    // Criação dinâmica dos pontos indicadores (Dots)
    if (depthDotsContainer) {
      depthDotsContainer.innerHTML = '';
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `depth-carousel__dot${i === 0 ? ' is-active' : ''}`;
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Ir para tecnologia ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          setFocus(i, true);
        });
        depthDotsContainer.appendChild(dot);
      }
    }

    function updateDots(activeIdx) {
      if (!depthDotsContainer) return;
      const dots = depthDotsContainer.querySelectorAll('.depth-carousel__dot');
      dots.forEach((dot, i) => {
        if (i === activeIdx) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    // Engine Horizontal 3D Fluido: cards dispostos suavemente sem cortes bruscos
    function layout(currentPos, entranceObj = null) {
      const n = cfg.count;
      if (!n) return;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      const yOffset = entranceObj ? entranceObj.yOffset : 0;
      const spreadFactor = entranceObj ? entranceObj.spreadFactor : 1;
      const scaleFactor = entranceObj ? entranceObj.scaleFactor : 1;
      const opacityMult = entranceObj ? entranceObj.opacityMult : 1;

      for (let i = 0; i < n; i++) {
        const el = depthCards[i];
        if (!el) continue;

        // Distância cíclica normalizada no carrossel entre -n/2 e +n/2
        let diff = (i - currentPos) % n;
        if (diff < -n / 2) diff += n;
        if (diff > n / 2) diff -= n;

        const absDiff = Math.abs(diff);

        // Desativa cards muito distantes além do campo de visão (com folga contínua)
        if (absDiff > 2.25) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          el.style.visibility = 'hidden';
          el.style.transform = `translate(-50%, -50%) scale(0.6) translateX(${diff > 0 ? 600 : -600}px)`;
          continue;
        }

        el.style.visibility = 'visible';

        // Posição horizontal contínua no eixo X (sem quebra ou descontinuidade)
        const tx = diff * cfg.cardSpacing * spreadFactor;
        const tz = -Math.pow(absDiff, 1.15) * 80;
        const ry = clamp(-diff * 12, -18, 18);

        // Escala com transição contínua
        const cardScale = scale * Math.max(0.68, 1 - absDiff * 0.13) * scaleFactor;

        // Curva suave de opacidade: 1.0 no centro, 0.72 nos adjacentes, decaindo suavemente até 0 em 2.2
        let opacity = 0;
        if (absDiff <= 1) {
          opacity = 1 - absDiff * 0.28;
        } else if (absDiff < 2.2) {
          opacity = Math.max(0, 0.72 * (1 - (absDiff - 1) / 1.2));
        }
        opacity *= opacityMult;

        // Iluminação: 1.0 total no modo claro
        const brightness = isLight ? 1.0 : Math.max(0.78, 1 - absDiff * 0.14);

        // Z-Index: card central sempre à frente, diminuindo suavemente
        const zi = Math.round(100 - absDiff * 30);

        el.style.transform = `translate(-50%, calc(-50% + ${yOffset.toFixed(1)}px)) scale(${cardScale.toFixed(3)}) translateX(${tx.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`;
        el.style.filter = `brightness(${brightness.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zi);
        el.style.pointerEvents = absDiff < 1.1 ? 'auto' : 'none';

        const ov = overlayRefs[i];
        if (ov) {
          ov.style.opacity = '0';
        }
      }
    }

    function tweenTo(target, animate = true) {
      if (currentTween) currentTween.kill();
      if (entranceTween) {
        entranceTween.kill();
        entranceTween = null;
        hasEntered = true;
      }
      const proxy = { p: pos };
      const dur = animate ? cfg.duration / 1000 : 0;
      currentTween = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          pos = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0) pos = ((pos % n) + n) % n;
          layout(pos);
        }
      });
    }

    function setFocus(rawIndex, animate = true) {
      const n = cfg.count;
      if (!n) return;
      const idx = ((rawIndex % n) + n) % n;
      let delta = idx - pos;
      delta = ((delta % n) + n) % n;
      if (delta > n / 2) delta -= n;

      tweenTo(pos + delta, animate);
      if (idx !== focusIndex) {
        focusIndex = idx;
        updateDots(idx);
      }
    }

    function navigateBy(step) {
      if (entranceTween) {
        entranceTween.kill();
        entranceTween = null;
        hasEntered = true;
      }
      setFocus(focusIndex + step, true);
    }

    // Dimensionamento Responsivo
    function updateScale() {
      const w = depthCarouselEl.clientWidth;
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        cfg.cardWidth = 265;
        cfg.cardHeight = 385;
        cfg.cardSpacing = Math.min(w * 0.65, 230);
        scale = clamp((w - 24) / 290, 0.88, 1);
      } else {
        cfg.cardWidth = 460;
        cfg.cardHeight = 285;
        cfg.cardSpacing = clamp(w * 0.33, 310, 390);
        scale = clamp(w / 1150, 0.85, 0.96);
      }
      layout(pos);
    }

    window.addEventListener('resize', updateScale);
    updateScale();

    // Reajusta instantaneamente a iluminação ao alternar tema Claro/Escuro
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        setTimeout(() => layout(pos), 40);
      });
    }

    // Gestos de Arraste (Touch Drag) - EXCLUSIVO PARA MOBILE / TABLET TOUCH
    depthCarouselEl.addEventListener('pointerdown', (e) => {
      // Bloqueia qualquer arraste no Desktop com o mouse! O usuário quer setas no desktop e touch só no mobile/tablet
      const isTouch = e.pointerType === 'touch' || (window.innerWidth <= 1024 && e.pointerType !== 'mouse');
      if (!isTouch) return;
      if (e.target.closest('.depth-carousel__arrow, .depth-carousel__dot')) return;
      if (cfg.count < 2) return;
      if (currentTween) currentTween.kill();
      if (entranceTween) {
        entranceTween.kill();
        entranceTween = null;
        hasEntered = true;
      }
      dragData = {
        x: e.clientX,
        startPos: pos,
        lastX: e.clientX,
        lastT: performance.now(),
        v: 0,
        moved: false,
        id: e.pointerId
      };
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragData) return;
      const stepPx = Math.max(cfg.cardWidth * 0.45 * scale, 45);
      const dx = e.clientX - dragData.x;
      if (!dragData.moved && Math.abs(dx) > 4) {
        dragData.moved = true;
        try { depthCarouselEl.setPointerCapture(dragData.id); } catch (_) {}
      }
      if (!dragData.moved) return;
      const now = performance.now();
      const dt = Math.max(now - dragData.lastT, 1);
      dragData.v = (e.clientX - dragData.lastX) / dt;
      dragData.lastX = e.clientX;
      dragData.lastT = now;
      pos = dragData.startPos - dx / stepPx;
      layout(pos);
    });

    window.addEventListener('pointerup', () => {
      if (!dragData) return;
      if (dragData.moved) {
        const stepPx = Math.max(cfg.cardWidth * 0.45 * scale, 45);
        const projected = pos - (dragData.v * 160) / stepPx;
        setFocus(Math.round(projected), true);
      }
      dragData = null;
    });

    window.addEventListener('pointercancel', () => {
      if (!dragData) return;
      if (dragData.moved) {
        setFocus(Math.round(pos), true);
      }
      dragData = null;
    });

    // Teclado (Setas Esquerda / Direita)
    depthCarouselEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    });

    // Botões de Seta (Navegação Desktop & Mobile)
    if (depthPrevBtn) {
      depthPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateBy(-1);
      });
    }

    if (depthNextBtn) {
      depthNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateBy(1);
      });
    }

    // Clique direto no Card para centralizá-lo na frente
    depthCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (dragData && dragData.moved) return;
        if (entranceTween) {
          entranceTween.kill();
          entranceTween = null;
          hasEntered = true;
        }
        setFocus(idx, true);
      });
    });

    // Inicialização na primeira tecnologia (Inteligência Artificial)
    setFocus(0, false);

    // =======================================================================
    // ANIMAÇÃO DE CHEGADA DOS CARDS DE TECNOLOGIAS (GSAP ENTRANCE ANIMATION)
    // Os cards surgem subindo suavemente e abrindo em leque no carrossel
    // =======================================================================
    function triggerEntrance() {
      if (hasEntered) return;
      hasEntered = true;

      const entranceObj = {
        yOffset: 60,
        scaleFactor: 0.82,
        spreadFactor: 0.35,
        opacityMult: 0,
        posOffset: 0.35
      };

      if (entranceTween) entranceTween.kill();
      entranceTween = gsap.to(entranceObj, {
        yOffset: 0,
        scaleFactor: 1,
        spreadFactor: 1,
        opacityMult: 1,
        posOffset: 0,
        duration: 1.15,
        ease: 'power3.out',
        onUpdate: () => {
          layout(pos + entranceObj.posOffset, entranceObj);
        },
        onComplete: () => {
          entranceTween = null;
          layout(pos);
        }
      });
    }

    // Inicializa os cards preparados no estado de entrada suave
    layout(pos, {
      yOffset: 60,
      scaleFactor: 0.82,
      spreadFactor: 0.35,
      opacityMult: 0,
      posOffset: 0.35
    });

    // Observador para disparar a chegada fluida dos cards ao rolar até a seção
    if ('IntersectionObserver' in window) {
      const techObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerEntrance();
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.15
      });

      const techSectionEl = document.getElementById('tecnologias') || depthCarouselEl;
      techObserver.observe(techSectionEl);
    } else {
      triggerEntrance();
    }
  }

  // =======================================================================
  // 10. REACT BITS: BORDER GLOW SENSOR & MESH GRADIENT ENGINE
  // =======================================================================
  const borderGlowCards = document.querySelectorAll('.border-glow-card');

  function initBorderGlowCards() {
    if (!borderGlowCards.length) return;

    borderGlowCards.forEach((card) => {
      // Configuração de cores e variáveis do componente BorderGlow
      const rawColors = card.getAttribute('data-glow-colors');
      const colors = rawColors ? rawColors.split(',').map(c => c.trim()) : ['#c084fc', '#f472b6', '#38bdf8'];
      
      const positions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
      const keys = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
      const colorMap = [0, 1, 2, 0, 1, 2, 1];

      for (let i = 0; i < 7; i++) {
        const c = colors[Math.min(colorMap[i], colors.length - 1)];
        card.style.setProperty(keys[i], `radial-gradient(at ${positions[i]}, ${c} 0px, transparent 50%)`);
      }
      card.style.setProperty('--gradient-base', `linear-gradient(${colors[0]} 0 100%)`);

      // Configuração de luz HSL personalizada por tecnologia
      const hslMap = {
        '#c084fc': '275deg 90% 75%',
        '#f97316': '25deg 95% 60%',
        '#38bdf8': '199deg 95% 65%',
        '#facc15': '48deg 95% 55%',
        '#3b82f6': '217deg 90% 60%',
        '#f43f5e': '345deg 90% 65%'
      };
      const base = hslMap[colors[0]] || '275deg 90% 75%';
      const opacities = [100, 60, 50, 40, 30, 20, 10];
      const glowKeys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
      for (let i = 0; i < opacities.length; i++) {
        card.style.setProperty(`--glow-color${glowKeys[i]}`, `hsl(${base} / ${opacities[i]}%)`);
      }

      function getCenterOfElement(el) {
        const rect = el.getBoundingClientRect();
        return [rect.width / 2, rect.height / 2];
      }

      function getEdgeProximity(el, x, y) {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = cx / Math.abs(dx);
        if (dy !== 0) ky = cy / Math.abs(dy);
        return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      }

      function getCursorAngle(el, x, y) {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        if (dx === 0 && dy === 0) return 0;
        const radians = Math.atan2(dy, dx);
        let degrees = radians * (180 / Math.PI) + 90;
        if (degrees < 0) degrees += 360;
        return degrees;
      }

      let glowRafPending = false;
      card.addEventListener('pointermove', (e) => {
        if (glowRafPending) return;
        glowRafPending = true;
        const clientX = e.clientX;
        const clientY = e.clientY;

        requestAnimationFrame(() => {
          glowRafPending = false;
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;

          const edge = getEdgeProximity(card, x, y);
          const angle = getCursorAngle(card, x, y);

          card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(2)}`);
          card.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);
        });
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--edge-proximity', '0');
      });
    });
  }

  initBorderGlowCards();

  // =======================================================================
  // 11. FOTO DE PERFIL: FÍSICA DE PESO 3D SUAVE & REACT BITS GLAREHOVER
  // =======================================================================
  const avatarInteractiveWrapper = document.getElementById('avatarInteractiveWrapper');
  const avatarGlareFrame = document.getElementById('avatarGlareFrame');

  if (avatarInteractiveWrapper && avatarGlareFrame) {
    const maxTilt = 7; // Inclinação bem mais suave e equilibrada (sem afundar em excesso)
    let targetRotateX = 0;
    let targetRotateY = 0;

    avatarInteractiveWrapper.addEventListener('mouseenter', () => {
      avatarGlareFrame.style.transition = 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
    });

    avatarInteractiveWrapper.addEventListener('mousemove', (e) => {
      const rect = avatarGlareFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
      const normY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));

      // Efeito de peso sutil e natural
      targetRotateX = -normY * maxTilt;
      targetRotateY = normX * maxTilt;

      avatarGlareFrame.style.transform = `perspective(1000px) rotateX(${targetRotateX.toFixed(2)}deg) rotateY(${targetRotateY.toFixed(2)}deg) translateZ(0px) scale(1.008)`;
    });

    avatarInteractiveWrapper.addEventListener('mouseleave', () => {
      avatarGlareFrame.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      avatarGlareFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
  }

  console.log('✨ Portfólio de Jonas carregado com sucesso!');
});
