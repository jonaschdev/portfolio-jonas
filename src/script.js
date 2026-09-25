/**
 * =========================================================================
 * 🚀 JAVASCRIPT PURO DO SEU PORTFÓLIO
 * =========================================================================
 * Funções nativas e leves para interações do portfólio de Jonas.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

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
  // 2. MENU MOBILE (ABRIR E FECHAR)
  // =======================================================================
  const mobileToggleBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggleBtn && mobileNav) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isExpanded = mobileNav.classList.contains('active');
      mobileToggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      mobileToggleBtn.textContent = isExpanded ? '✕' : '☰';
    });

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggleBtn.textContent = '☰';
      });
    });
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
  // 5. CONTROLE DO PLAYER DE MÚSICA TEMA (FADE-OUT & FADE-IN GRADUAL)
  // =======================================================================
  const bgMusic = document.getElementById('bgMusic');
  const musicPlayerBtn = document.getElementById('musicPlayerBtn');
  const mobileMusicPlayerBtn = document.getElementById('mobileMusicPlayerBtn');
  const musicLabelText = document.getElementById('musicLabelText');
  const mobileMusicText = document.getElementById('mobileMusicText');

  if (bgMusic) {
    const TARGET_VOLUME = 0.3; // Volume desejado de 30%
    let fadeInterval = null;
    let isFadingOut = false;

    // Inicia zerado para entrada suave (fade-in)
    bgMusic.volume = 0;

    function updateMusicUI(isPlaying) {
      if (isPlaying) {
        if (musicPlayerBtn) {
          musicPlayerBtn.classList.add('playing');
          musicPlayerBtn.setAttribute('aria-label', 'Pausar música tema');
          musicPlayerBtn.setAttribute('title', 'Pausar música tema');
        }
        if (musicLabelText) musicLabelText.textContent = 'Tocando';
        if (mobileMusicPlayerBtn) {
          mobileMusicPlayerBtn.classList.add('playing');
        }
        if (mobileMusicText) mobileMusicText.textContent = 'Pausar Trilha Sonora';
      } else {
        if (musicPlayerBtn) {
          musicPlayerBtn.classList.remove('playing');
          musicPlayerBtn.setAttribute('aria-label', 'Tocar música tema');
          musicPlayerBtn.setAttribute('title', 'Tocar música tema');
        }
        if (musicLabelText) musicLabelText.textContent = 'Van Gogh';
        if (mobileMusicPlayerBtn) {
          mobileMusicPlayerBtn.classList.remove('playing');
        }
        if (mobileMusicText) mobileMusicText.textContent = 'Tocar Trilha Sonora';
      }
    }

    // Aumenta o volume gradualmente (Fade In)
    function fadeInMusic(durationMs = 800) {
      if (fadeInterval) clearInterval(fadeInterval);
      isFadingOut = false;
      updateMusicUI(true);

      const stepTime = 30; // Passo a cada 30ms
      const totalSteps = durationMs / stepTime;
      const volumeStep = TARGET_VOLUME / totalSteps;

      fadeInterval = setInterval(() => {
        if (bgMusic.volume + volumeStep < TARGET_VOLUME) {
          bgMusic.volume += volumeStep;
        } else {
          bgMusic.volume = TARGET_VOLUME;
          clearInterval(fadeInterval);
          fadeInterval = null;
        }
      }, stepTime);
    }

    // Diminui o volume gradualmente até o silêncio e depois pausa (Fade Out)
    function fadeOutMusic(durationMs = 900) {
      if (fadeInterval) clearInterval(fadeInterval);
      isFadingOut = true;
      updateMusicUI(false); // Atualiza o botão imediatamente para resposta visual rápida

      const stepTime = 30;
      const currentVol = bgMusic.volume;
      const totalSteps = durationMs / stepTime;
      const volumeStep = currentVol / totalSteps;

      fadeInterval = setInterval(() => {
        if (bgMusic.volume - volumeStep > 0.01) {
          bgMusic.volume -= volumeStep;
        } else {
          bgMusic.volume = 0;
          bgMusic.pause();
          isFadingOut = false;
          clearInterval(fadeInterval);
          fadeInterval = null;
        }
      }, stepTime);
    }

    function playMusic() {
      if (fadeInterval) clearInterval(fadeInterval);
      bgMusic.volume = 0;
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fadeInMusic(800);
          })
          .catch((_err) => {
            // Aguarda a primeira interação do usuário caso o navegador bloqueie autoplay
            function enableAudioOnFirstInteraction() {
              bgMusic.play().then(() => {
                fadeInMusic(800);
              }).catch(() => {});
              window.removeEventListener('click', enableAudioOnFirstInteraction);
              window.removeEventListener('touchstart', enableAudioOnFirstInteraction);
              window.removeEventListener('keydown', enableAudioOnFirstInteraction);
            }
            window.addEventListener('click', enableAudioOnFirstInteraction, { once: true });
            window.addEventListener('touchstart', enableAudioOnFirstInteraction, { once: true });
            window.addEventListener('keydown', enableAudioOnFirstInteraction, { once: true });
          });
      }
    }

    function toggleMusic() {
      if (bgMusic.paused || isFadingOut) {
        // Retoma com aumento gradual
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            fadeInMusic(700);
          }).catch((err) => {
            console.warn('Reprodução bloqueada:', err);
          });
        }
      } else {
        // Pausa com diminuição gradual (Fade Out)
        fadeOutMusic(900);
      }
    }

    if (musicPlayerBtn) {
      musicPlayerBtn.addEventListener('click', toggleMusic);
    }

    if (mobileMusicPlayerBtn) {
      mobileMusicPlayerBtn.addEventListener('click', toggleMusic);
    }

    bgMusic.addEventListener('ended', () => updateMusicUI(false));

    // Inicia a música com fade-in suave
    playMusic();
  }

  // =======================================================================
  // 6. FORMULÁRIO DE CONTATO DIRETO (FIREBASE FIRESTORE)
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
  // 9. ROLETA / CARROSSEL AUTOMÁTICO DE TECNOLOGIAS (TECH ROULETTE ENGINE)
  // =======================================================================
  const rouletteContainer = document.getElementById('techRouletteContainer');
  const rouletteViewport = document.getElementById('techRouletteViewport');
  const rouletteTrack = document.getElementById('techRouletteTrack');
  const rouletteCards = document.querySelectorAll('.tech-roulette-card');
  const roulettePrevBtn = document.getElementById('roulettePrevBtn');
  const rouletteNextBtn = document.getElementById('rouletteNextBtn');
  const rouletteScrollTrack = document.getElementById('rouletteScrollTrack');
  const rouletteScrollThumb = document.getElementById('rouletteScrollThumb');

  if (rouletteTrack && rouletteCards.length > 0) {
    let currentIndex = 0;
    let autoPlayTimer = null;
    let isPaused = false;
    const totalCards = rouletteCards.length;

    function getVisibleCardsCount() {
      const width = window.innerWidth;
      if (width <= 640) return 1;
      if (width <= 980) return 2;
      return 3;
    }

    function getMaxIndex() {
      const visible = getVisibleCardsCount();
      return Math.max(0, totalCards - visible);
    }

    function updateTrackPosition() {
      if (!rouletteCards[0]) return;
      const cardRect = rouletteCards[0].getBoundingClientRect();
      const cardWidth = cardRect.width;
      const gap = 20; // 20px gap entre os cards
      const offset = currentIndex * (cardWidth + gap);

      rouletteTrack.style.transform = `translateX(-${offset}px)`;

      // Atualiza a Barra de Progresso / Rolagem
      if (rouletteScrollThumb) {
        const visible = getVisibleCardsCount();
        const max = getMaxIndex();
        const thumbWidthPct = Math.min(100, Math.max(25, (visible / totalCards) * 100));
        rouletteScrollThumb.style.width = `${thumbWidthPct}%`;
        
        const progressRatio = max > 0 ? (currentIndex / max) : 0;
        const leftOffsetPct = progressRatio * (100 - thumbWidthPct);
        rouletteScrollThumb.style.left = `${leftOffsetPct}%`;
      }
    }

    // =======================================================================
    // MOTOR DE ARRASTAR (DRAGGING) DA BARRA DE ROLAGEM EM TEMPO REAL
    // =======================================================================
    let isScrollbarDragging = false;
    let dragStartX = 0;
    let initialRatio = 0;

    function handleScrollbarMove(clientX) {
      if (!rouletteScrollTrack || !rouletteScrollThumb) return;
      const trackRect = rouletteScrollTrack.getBoundingClientRect();
      const thumbWidth = rouletteScrollThumb.offsetWidth;
      const availableWidth = trackRect.width - thumbWidth;
      
      if (availableWidth <= 0) return;

      const deltaX = clientX - dragStartX;
      const newPixelLeft = (initialRatio * availableWidth) + deltaX;
      const clampedPixelLeft = Math.max(0, Math.min(availableWidth, newPixelLeft));
      const currentRatio = clampedPixelLeft / availableWidth;

      // Move o thumb instantaneamente
      const thumbWidthPct = Math.min(100, Math.max(25, (getVisibleCardsCount() / totalCards) * 100));
      rouletteScrollThumb.style.left = `${currentRatio * (100 - thumbWidthPct)}%`;

      // Rola os cards da roleta em tempo real 1:1
      const max = getMaxIndex();
      const cardRect = rouletteCards[0].getBoundingClientRect();
      const totalScrollWidth = max * (cardRect.width + 20);
      const trackOffset = currentRatio * totalScrollWidth;
      rouletteTrack.style.transform = `translateX(-${trackOffset}px)`;
    }

    function startScrollbarDrag(clientX) {
      isScrollbarDragging = true;
      isPaused = true;
      stopAutoPlay();

      rouletteScrollThumb.classList.add('is-dragging');
      rouletteTrack.classList.add('is-dragging');

      const trackRect = rouletteScrollTrack.getBoundingClientRect();
      const thumbWidth = rouletteScrollThumb.offsetWidth;
      const availableWidth = trackRect.width - thumbWidth;

      const currentPixelLeft = (rouletteScrollThumb.offsetLeft);
      initialRatio = availableWidth > 0 ? (currentPixelLeft / availableWidth) : 0;
      dragStartX = clientX;
    }

    function stopScrollbarDrag(clientX) {
      if (!isScrollbarDragging) return;
      isScrollbarDragging = false;
      isPaused = false;

      rouletteScrollThumb.classList.remove('is-dragging');
      rouletteTrack.classList.remove('is-dragging');

      // Encaixa (snap) suavemente no card mais próximo
      if (rouletteScrollTrack && rouletteScrollThumb) {
        const trackRect = rouletteScrollTrack.getBoundingClientRect();
        const thumbWidth = rouletteScrollThumb.offsetWidth;
        const availableWidth = trackRect.width - thumbWidth;
        const currentPixelLeft = rouletteScrollThumb.offsetLeft;
        const currentRatio = availableWidth > 0 ? (currentPixelLeft / availableWidth) : 0;
        const max = getMaxIndex();
        currentIndex = Math.round(currentRatio * max);
      }

      updateTrackPosition();
      resetAutoPlay();
    }

    if (rouletteScrollTrack) {
      // Clique ou Início de Arraste na Barra
      rouletteScrollTrack.addEventListener('mousedown', (e) => {
        const trackRect = rouletteScrollTrack.getBoundingClientRect();
        const thumbRect = rouletteScrollThumb.getBoundingClientRect();
        
        // Se clicou fora do thumb, centraliza o thumb no clique primeiro
        if (e.clientX < thumbRect.left || e.clientX > thumbRect.right) {
          const clickPos = e.clientX - trackRect.left - (thumbRect.width / 2);
          const available = trackRect.width - thumbRect.width;
          const ratio = Math.max(0, Math.min(1, clickPos / available));
          const max = getMaxIndex();
          currentIndex = Math.round(ratio * max);
          updateTrackPosition();
        }

        startScrollbarDrag(e.clientX);
      });

      rouletteScrollTrack.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          startScrollbarDrag(e.touches[0].clientX);
        }
      }, { passive: true });
    }

    // Escuta de Movimento Global para arraste suave mesmo se o mouse sair da barra
    window.addEventListener('mousemove', (e) => {
      if (isScrollbarDragging) {
        e.preventDefault();
        handleScrollbarMove(e.clientX);
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (isScrollbarDragging && e.touches && e.touches[0]) {
        handleScrollbarMove(e.touches[0].clientX);
      }
    }, { passive: false });

    window.addEventListener('mouseup', (e) => {
      if (isScrollbarDragging) {
        stopScrollbarDrag(e.clientX);
      }
    });

    window.addEventListener('touchend', (e) => {
      if (isScrollbarDragging) {
        stopScrollbarDrag(e.changedTouches ? e.changedTouches[0].clientX : 0);
      }
    });

    function goToSlide(index) {
      const max = getMaxIndex();
      if (index > max) {
        currentIndex = 0; // Loop infinito para o início
      } else if (index < 0) {
        currentIndex = max; // Loop para o final
      } else {
        currentIndex = index;
      }
      updateTrackPosition();
    }

    function nextSlide() {
      const max = getMaxIndex();
      if (currentIndex >= max) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }

    function prevSlide() {
      const max = getMaxIndex();
      if (currentIndex <= 0) {
        goToSlide(max);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    // Botões de navegação
    if (roulettePrevBtn) {
      roulettePrevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (rouletteNextBtn) {
      rouletteNextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    // Auto-Play: Rotação contínua a cada 3.5 segundos
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, 3500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pausa a roleta quando o usuário passa o mouse por cima para ler com calma
    if (rouletteContainer) {
      rouletteContainer.addEventListener('mouseenter', () => { isPaused = true; });
      rouletteContainer.addEventListener('mouseleave', () => { isPaused = false; });
      rouletteContainer.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
      rouletteContainer.addEventListener('touchend', () => { isPaused = false; });
    }

    // Suporte a gesto de arrastar/swipe no mobile e desktop
    let touchStartX = 0;
    let touchEndX = 0;

    if (rouletteViewport) {
      rouletteViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      rouletteViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoPlay();
      }
    }

    // Recalcula dimensões ao redimensionar a tela
    window.addEventListener('resize', () => {
      goToSlide(Math.min(currentIndex, getMaxIndex()));
    });

    // Inicialização
    updateTrackPosition();
    startAutoPlay();
  }

  console.log('✨ Portfólio de Jonas carregado com sucesso!');
});
