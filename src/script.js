import React from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import TechLogoLoop from './TechLogoLoop';
import HeroAvatar from './HeroAvatar';
import ProjectsPixelCard from './ProjectsPixelCard';

/**
 * =========================================================================
 * 🚀 JAVASCRIPT & REACT BITS DO SEU PORTFÓLIO
 * =========================================================================
 * Funções nativas, animações e componentes React Bits integrados.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

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
  // MONTAGEM DO COMPONENTE <LogoLoop /> (REACT BITS)
  // Loop infinito de logos e linguagens com transição suave e física precisa
  // =======================================================================
  const logoLoopRootEl = document.getElementById('logoLoopRoot');
  if (logoLoopRootEl) {
    const root = createRoot(logoLoopRootEl);
    root.render(React.createElement(TechLogoLoop));
  }

  // =======================================================================
  // MONTAGEM DO COMPONENTE <PixelCard /> NA SEÇÃO DE PROJETOS (REACT BITS)
  // Efeito interativo de pixels luminosos com dissipação física no hover
  // =======================================================================
  const projectsPixelRootEl = document.getElementById('projectsPixelRoot');
  if (projectsPixelRootEl) {
    const projectsRoot = createRoot(projectsPixelRootEl);
    projectsRoot.render(React.createElement(ProjectsPixelCard));
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
  // 2. DOCK DE NAVEGAÇÃO FLUTUANTE MOBILE (SCROLL SPY & MAGNIFICATION)
  // =======================================================================
  const mobileDock = document.getElementById('mobileDock');
  if (mobileDock) {
    const dockItems = mobileDock.querySelectorAll('.dock-item');
    const sections = document.querySelectorAll('section[id]');

    // Scroll Spy para ativar automaticamente o ícone da seção visível
    function updateActiveDockSection() {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id') || '';
        }
      });

      if (!currentSectionId && window.scrollY < 200) {
        currentSectionId = 'inicio';
      }

      if (currentSectionId) {
        dockItems.forEach(item => {
          const targetSection = item.getAttribute('data-section');
          if (targetSection === currentSectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }

    window.addEventListener('scroll', updateActiveDockSection, { passive: true });
    updateActiveDockSection();
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
  // 5. FORMULÁRIO DE CONTATO DIRETO (FIREBASE FIRESTORE)
  // =======================================================================
  const contactForm = document.getElementById('contactFirebaseForm');
  const btnSubmitMessage = document.getElementById('btnSubmitMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (toast) {
          toast.textContent = 'Por favor, preencha todos os campos.';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 3000);
        }
        return;
      }

      // Estado de carregamento do botão
      if (btnSubmitMessage) {
        btnSubmitMessage.disabled = true;
        btnSubmitMessage.innerHTML = `
          <svg class="spin-animate" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          <span>Enviando...</span>
        `;
      }

      try {
        const { sendContactMessage } = await import('./firebase.ts');
        await sendContactMessage({ name, email, message });

        // Limpa o formulário
        contactForm.reset();

        // Notificação de sucesso
        if (toast) {
          toast.textContent = '✨ Mensagem enviada com sucesso! Obrigado pelo contato.';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      } catch (err) {
        console.error('Erro ao enviar mensagem:', err);
        if (toast) {
          toast.textContent = 'Ocorreu um erro ao enviar. Tente pelo e-mail direto!';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      } finally {
        if (btnSubmitMessage) {
          btnSubmitMessage.disabled = false;
          btnSubmitMessage.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span>Enviar Mensagem</span>
          `;
        }
      }
    });
  }

  // =======================================================================
  // 7. FUNDO ANIMADO DE ESTRELAS & CONSTELAÇÕES INTERATIVAS (CANVAS)
  // =======================================================================
  const canvas = document.getElementById('starfieldCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let stars = [];

    // Rastreamento do cursor do mouse/toque para interatividade
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      active: false
    };

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initStars();
    }

    // Gerador de estrelas com tamanhos, brilhos e cores cósmicas
    function initStars() {
      stars = [];
      // Quantidade equilibrada de acordo com o tamanho da tela
      const count = Math.floor((width * height) / 12000);
      const starCount = Math.min(Math.max(count, 45), 110);

      const colorPaletteDark = [
        'rgba(56, 189, 248, ',   // Azul ciano claro
        'rgba(14, 165, 233, ',   // Azul elétrico vibrante
        'rgba(96, 165, 250, ',   // Azul celeste suave
        'rgba(2, 132, 199, ',    // Azul oceano
        'rgba(147, 197, 253, '   // Azul bebê luminoso
      ];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius: Math.random() * 1.8 + 0.6,
          baseAlpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.012 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          colorIndex: Math.floor(Math.random() * colorPaletteDark.length)
        });
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Interatividade com Mouse e Touch
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Loop de animação fluida a 60fps
    function renderStars() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const colorPaletteDark = [
        'rgba(255, 255, 255, ',   // Estrela branca pura
        'rgba(241, 245, 249, ',   // Prata/branco suave
        'rgba(56, 189, 248, ',    // Azul ciano claro
        'rgba(147, 197, 253, ',   // Azul bebê luminoso
        'rgba(226, 232, 240, '    // Branco cinzento estelar
      ];
      const colorPaletteLight = [
        'rgba(15, 23, 42, ',     // Quase preto / Grafite obsidiana profundo
        'rgba(30, 41, 59, ',     // Grafite escuro
        'rgba(2, 132, 199, ',    // Azul oceano vibrante
        'rgba(3, 105, 161, ',    // Azul profundo
        'rgba(14, 165, 233, '    // Ciano contrastante
      ];
      const palette = isLight ? colorPaletteLight : colorPaletteDark;

      // Desenha e atualiza as estrelas
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Movimento suave
        star.x += star.vx;
        star.y += star.vy;

        // Rebote nas bordas
        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        else if (star.y > height) star.y = 0;

        // Cintilação suave (pulsar de estrela)
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase);
        const alpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle * 0.25));

        // Interação com o mouse: leve atração e linhas de constelação
        let extraGlow = 0;
        if (mouse.active) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            extraGlow = (1 - dist / mouse.radius) * 0.4;
            // Conexão sutil entre mouse e estrela próxima
            ctx.beginPath();
            ctx.strokeStyle = isLight 
              ? `rgba(15, 23, 42, ${(1 - dist / mouse.radius) * 0.25})`
              : `rgba(56, 189, 248, ${(1 - dist / mouse.radius) * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(star.x, star.y);
            ctx.stroke();
          }
        }

        const colorPrefix = palette[star.colorIndex % palette.length];
        const finalAlpha = Math.min(1, (isLight ? alpha * 0.85 : alpha) + extraGlow);

        // Desenho da estrela com brilho suave
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius + extraGlow * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix}${finalAlpha})`;
        ctx.shadowColor = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(56, 189, 248, 0.6)';
        ctx.shadowBlur = extraGlow > 0 ? 10 : (star.radius > 1.3 ? 5 : 2);
        ctx.fill();

        // Linhas de constelação entre estrelas vizinhas
        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j];
          const distDx = star.x - other.x;
          const distDy = star.y - other.y;
          const dist = Math.sqrt(distDx * distDx + distDy * distDy);

          const maxDist = 80;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isLight ? 0.12 : 0.13);
            ctx.beginPath();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = isLight ? `rgba(30, 41, 59, ${lineAlpha})` : `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderStars);
    }

    // Pausa animação quando a aba não estiver visível (economia de bateria/GPU)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        renderStars();
      }
    });

    renderStars();
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
    const fpsInterval = 1000 / 24; // 24 FPS para visual clássico de terminal hacker

    function renderMatrix(currentTime) {
      matrixFrameId = requestAnimationFrame(renderMatrix);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Rastro translúcido sobre o fundo
      ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.18)' : 'rgba(9, 9, 11, 0.18)';
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

    matrixFrameId = requestAnimationFrame(renderMatrix);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(matrixFrameId);
      } else {
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
  // 9. REACT BITS: DEPTH CAROUSEL 3D ENGINE (GSAP POWERED)
  // =======================================================================
  const depthCarouselEl = document.getElementById('techDepthCarousel');
  const depthCards = document.querySelectorAll('.depth-carousel__card');
  const depthPrevBtn = document.getElementById('depthPrevBtn');
  const depthNextBtn = document.getElementById('depthNextBtn');
  const depthDotsContainer = document.getElementById('depthDots');

  if (depthCarouselEl && depthCards.length > 0) {
    const totalCards = depthCards.length;
    const overlayRefs = document.querySelectorAll('.depth-carousel__tint');

    // Configurações do componente DepthCarousel (React Bits)
    const cfg = {
      count: totalCards,
      cardWidth: 480,
      cardHeight: 285,
      depth: 210,
      spread: 120,
      tilt: 18,
      tiltDirection: 'right',
      perspective: 1400,
      visibleCards: 4,
      falloff: 0.2,
      blur: 6,
      duration: 700,
      ease: 'power3.out',
      loop: true,
      autoplay: false // Sem auto-play automático, navegação exclusiva pelo usuário
    };

    let pos = 0;
    let focusIndex = 0;
    let currentTween = null;
    let scale = 1;
    let dragData = null;
    let wheelTimer = null;

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

    function layout(currentPos) {
      const n = cfg.count;
      if (!n) return;
      const dir = cfg.tiltDirection === 'left' ? -1 : 1;
      const sc = scale;

      for (let i = 0; i < n; i++) {
        const el = depthCards[i];
        if (!el) continue;

        let d = i - currentPos;
        if (cfg.loop && n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }

        const back = Math.max(0, d);
        const az = Math.abs(d);
        const shown = az <= cfg.visibleCards + 0.5;

        const tz = -cfg.depth * d;
        const tx = dir * cfg.spread * d;
        const ry = dir * cfg.tilt * clamp(d, 0, 1);

        let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
        if (!shown) opacity = 0;

        const brightness = Math.max(0.15, 1 - back * cfg.falloff);
        const blurPx = cfg.blur > 0 ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0;
        const zi = Math.round(2000 - d * 20);

        el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
        el.style.zIndex = String(zi);
        el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

        const ov = overlayRefs[i];
        if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3);
      }
    }

    function tweenTo(target, animate = true) {
      if (currentTween) currentTween.kill();
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
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - pos;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(pos + delta, animate);
      if (idx !== focusIndex) {
        focusIndex = idx;
        updateDots(idx);
      }
    }

    function navigateBy(step) {
      setFocus(focusIndex + step, true);
    }

    // Dimensionamento Responsivo
    function updateScale() {
      const w = depthCarouselEl.clientWidth;
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        cfg.spread = 44;
        cfg.depth = 135;
        cfg.tilt = 14;
        scale = clamp((w - 28) / (320 * 1.1), 0.82, 0.95);
      } else {
        cfg.spread = 120;
        cfg.depth = 210;
        cfg.tilt = 18;
        const needed = cfg.cardWidth + Math.abs(cfg.spread) * 2 + 60;
        scale = clamp(w / needed, 0.78, 1);
      }
      layout(pos);
    }

    window.addEventListener('resize', updateScale);
    updateScale();

    // Gestos de Arraste (Pointer / Touch Drag com Inércia)
    depthCarouselEl.addEventListener('pointerdown', (e) => {
      if (cfg.count < 2) return;
      if (currentTween) currentTween.kill();
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
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scale, 40);
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
        const stepPx = Math.max(cfg.cardWidth * 0.55 * scale, 40);
        const projected = pos - (dragData.v * 180) / stepPx;
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

    // Botões de Seta
    if (depthPrevBtn) {
      depthPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateBy(-1);
      });
    }

    if (depthNextBtn) {
      depthNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateBy(1);
      });
    }

    // Clique direto no Card para centralizar
    depthCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (dragData && dragData.moved) return;
        setFocus(idx, true);
      });
    });

    // Inicialização na primeira tecnologia (Inteligência Artificial)
    setFocus(0, false);
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

      // Configuração de luz HSL
      const base = '275deg 90% 75%';
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

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);

        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(2)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);
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
