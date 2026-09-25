import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const HINGE_CONFIG = {
  top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -92 }
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function initFoldText(targetEl, options = {}) {
  if (!targetEl) return null;

  const {
    text = targetEl.getAttribute('data-fold-text') || targetEl.textContent || 'Olá, eu sou o Jonas.',
    highlightText = 'Jonas',
    highlightClass = 'destaque-azul',
    splitBy = 'char',
    hinge = 'top',
    duration = 0.65,
    stagger = 0.045,
    ease = 'power3.out',
    perspective = 700,
    creaseShading = 0.55,
    trigger = 'mount',
    fontSize = 'inherit',
    fontWeight = 'inherit',
    color = 'inherit',
    className = ''
  } = options;

  const hingeConfig = HINGE_CONFIG[hinge] || HINGE_CONFIG.top;
  const safeCrease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);

  // Geração dos segmentos visuais de dobra 3D
  let segmentsHtml = '';
  let segmentIndex = 0;

  const renderSegmentHtml = (content, split, isHighlight = false) => {
    segmentIndex += 1;
    const highlightSpan = isHighlight ? ` class="${highlightClass}"` : '';
    const safeContent = content === ' ' ? '&nbsp;' : (content || '&nbsp;');
    return `<span class="fold-text-segment" data-fold-split="${split}" style="--fold-perspective: ${safePerspective}px;"><span class="fold-text-piece" data-fold-hinge="${hinge}" style="transform-origin: ${hingeConfig.origin}; --fold-crease: 0;"><span${highlightSpan}>${safeContent}</span></span></span>`;
  };

  if (splitBy === 'word') {
    const parts = text.split(/(\s+)/);
    parts.forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        segmentsHtml += `<span class="fold-text-whitespace">&nbsp;</span>`;
      } else {
        const isHighlight = highlightText && part.includes(highlightText);
        segmentsHtml += renderSegmentHtml(part, 'word', isHighlight);
      }
    });
  } else {
    // splitBy === 'char'
    const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
    const highlightEnd = highlightStart !== -1 ? highlightStart + highlightText.length : -1;

    Array.from(text).forEach((char, idx) => {
      if (char === '\n') {
        segmentsHtml += '<br />';
        return;
      }
      const isHighlight = highlightStart !== -1 && idx >= highlightStart && idx < highlightEnd;
      segmentsHtml += renderSegmentHtml(char, 'char', isHighlight);
    });
  }

  // Configura estilos e estrutura de acessibilidade
  targetEl.className = `fold-text ${className}`.trim();
  if (fontSize !== 'inherit') targetEl.style.setProperty('--fold-text-font-size', typeof fontSize === 'number' ? `${fontSize}px` : fontSize);
  if (fontWeight !== 'inherit') targetEl.style.setProperty('--fold-text-font-weight', fontWeight);
  if (color !== 'inherit') targetEl.style.setProperty('--fold-text-color', color);

  targetEl.innerHTML = `
    <span class="fold-text-sr-only">${text}</span>
    <span class="fold-text-visual" aria-hidden="true">${segmentsHtml}</span>
  `;

  const pieces = Array.from(targetEl.querySelectorAll('.fold-text-piece'));
  if (!pieces.length) return null;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const activeDuration = reduceMotion ? Math.min(duration, 0.22) : duration;
  const activeStagger = reduceMotion ? Math.min(stagger, 0.038) : stagger;

  const fromVars = {
    opacity: 0,
    rotateX: reduceMotion ? 0 : hingeConfig.rotateX,
    rotateY: reduceMotion ? 0 : hingeConfig.rotateY,
    '--fold-crease': reduceMotion ? 0 : safeCrease,
    transformOrigin: hingeConfig.origin,
    force3D: true
  };

  const toVars = {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    '--fold-crease': 0,
    duration: activeDuration,
    ease: reduceMotion ? 'power1.out' : ease,
    stagger: activeStagger,
    clearProps: 'willChange'
  };

  let timeline = null;

  const killTimeline = () => {
    if (timeline) {
      timeline.kill();
      timeline = null;
    }
    gsap.killTweensOf(pieces);
  };

  const play = repeat => {
    killTimeline();
    timeline = gsap.timeline({ repeat: repeat ? -1 : 0, repeatDelay: repeat ? 0.75 : 0 });
    timeline.fromTo(pieces, fromVars, toVars);
    return timeline;
  };

  let scrollTrigger = null;
  let hoverHandler = null;

  if (trigger === 'hover') {
    gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0, transformOrigin: hingeConfig.origin });
    hoverHandler = () => play(false);
    targetEl.addEventListener('mouseenter', hoverHandler);
  } else if (trigger === 'scroll') {
    gsap.set(pieces, fromVars);
    scrollTrigger = ScrollTrigger.create({
      trigger: targetEl,
      start: 'top 85%',
      once: true,
      onEnter: () => play(false)
    });
  } else if (trigger === 'loop') {
    play(true);
  } else {
    // trigger === 'mount'
    setTimeout(() => {
      play(false);
    }, 180);
  }

  // Interatividade: Replay ao clicar
  targetEl.style.cursor = 'pointer';
  targetEl.setAttribute('title', 'Clique para desdobrar novamente');
  targetEl.addEventListener('click', () => {
    play(false);
  });

  return {
    play,
    destroy: () => {
      if (hoverHandler) targetEl.removeEventListener('mouseenter', hoverHandler);
      if (scrollTrigger) scrollTrigger.kill();
      killTimeline();
    }
  };
}

export default initFoldText;
