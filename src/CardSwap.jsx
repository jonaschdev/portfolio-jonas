import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass = '', children, ...rest }, ref) => (
  <div ref={ref} className={`card ${customClass}`} {...rest}>
    {children}
  </div>
));

Card.displayName = 'Card';

const makeSlot = (i, cardDistance, verticalDistance, total, isMobile) => {
  if (isMobile) {
    return {
      x: i * (cardDistance * 0.42),
      y: -i * (verticalDistance * 0.35),
      z: -i * 20,
      zIndex: total - i,
      scale: 1 - i * 0.04,
      opacity: i === 0 ? 1 : Math.max(0.65, 1 - i * 0.18)
    };
  }
  return {
    x: i * cardDistance,
    y: -i * verticalDistance,
    z: -i * cardDistance * 1.2,
    zIndex: total - i,
    scale: 1,
    opacity: 1
  };
};

const placeNow = (el, slot, skew, isMobile) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: isMobile ? 0 : skew,
    scale: slot.scale ?? 1,
    opacity: slot.opacity ?? 1,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 58,
  verticalDistance = 68,
  delay = 5000,
  autoSwap = false,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 4,
  easing = 'smooth',
  children
}) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 1180);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1180;
      setIsMobile(prev => (prev !== mobile ? mobile : prev));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Pausa/Play inteligente de vídeos para economizar 100% de CPU/GPU em cards secundários
  const syncVideos = useCallback((frontIndex) => {
    refs.forEach((ref, idx) => {
      const el = ref.current;
      if (!el) return;
      const videos = el.querySelectorAll('video');
      videos.forEach(video => {
        if (idx === frontIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    });
  }, [refs]);

<<<<<<< HEAD
  // Transição rápida e otimizada para GPU
=======
  // Transição rápida, fluida e otimizada para GPU (zero travamentos)
>>>>>>> deaff1ab9c68493c4dcd365d55fe01b5b64aa059
  const swap = useCallback((targetIndex = null) => {
    if (order.current.length < 2) return;
    if (tlRef.current && tlRef.current.isActive()) return;

    let front;
    let rest;

    if (targetIndex !== null) {
      const currentPos = order.current.indexOf(targetIndex);
      if (currentPos === 0) return;

      front = order.current[currentPos];
      rest = order.current.filter((_, idx) => idx !== currentPos);
      order.current = [front, ...rest];
      setActiveIdx(front);
      syncVideos(front);

      const total = refs.length;
      const tl = gsap.timeline();
      tlRef.current = tl;

      order.current.forEach((idx, slotIdx) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total, isMobile);
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: slot.scale,
            opacity: slot.opacity,
            zIndex: slot.zIndex,
            duration: 0.42,
            ease: 'power2.out',
            force3D: true
          },
          0
        );
      });
      return;
    } else {
      [front, ...rest] = order.current;
    }

    const elFront = refs[front].current;
    if (!elFront) return;

    const newFront = rest[0];
    setActiveIdx(newFront);
    syncVideos(newFront);

    const tl = gsap.timeline();
    tlRef.current = tl;

    const dropDistance = isMobile ? 220 : 360;

    // Desce o card da frente
    tl.to(elFront, {
      y: `+=${dropDistance}`,
      opacity: 0.2,
      duration: 0.38,
      ease: 'power2.inOut',
      force3D: true
    });

    tl.addLabel('promote', '-=0.28');

<<<<<<< HEAD
    // Promove os cards de trás para a frente com aceleração
=======
    // Promove os cards de trás para a frente com aceleração nativa
>>>>>>> deaff1ab9c68493c4dcd365d55fe01b5b64aa059
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, isMobile);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          scale: slot.scale,
          opacity: slot.opacity,
          duration: 0.42,
          ease: 'power2.out',
          force3D: true
        },
        `promote+=${i * 0.04}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length, isMobile);
    tl.addLabel('return', 'promote+=0.15');

    tl.call(
      () => {
        if (elFront) {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        }
      },
      undefined,
      'return'
    );

    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        scale: backSlot.scale,
        opacity: backSlot.opacity,
        duration: 0.38,
        ease: 'power2.out',
        force3D: true
      },
      'return'
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  }, [cardDistance, verticalDistance, isMobile, refs, syncVideos]);

  // Inicialização e posicionamento
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        const slot = makeSlot(i, cardDistance, verticalDistance, total, isMobile);
        placeNow(r.current, slot, skewAmount, isMobile);
      }
    });

    syncVideos(order.current[0]);

    if (autoSwap && delay > 0) {
      intervalRef.current = window.setInterval(swap, delay);

      if (pauseOnHover) {
        const node = container.current;
        if (node) {
          const pause = () => {
            tlRef.current?.pause();
            clearInterval(intervalRef.current);
          };
          const resume = () => {
            tlRef.current?.play();
            intervalRef.current = window.setInterval(swap, delay);
          };
          node.addEventListener('mouseenter', pause);
          node.addEventListener('mouseleave', resume);
          return () => {
            node.removeEventListener('mouseenter', pause);
            node.removeEventListener('mouseleave', resume);
            clearInterval(intervalRef.current);
          };
        }
      }
      return () => clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, autoSwap, pauseOnHover, skewAmount, isMobile]);

  const handleCardClick = (i, e) => {
    onCardClick?.(i);
    swap(i);
  };

  // Suporte a gestos Swipe Touch rápidos e nativos no Mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;
    const timeElapsed = Date.now() - touchStartRef.current.time;

    // Se foi um gesto horizontal de swipe rápido
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.4 && timeElapsed < 400) {
      swap();
    }
  };

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            handleCardClick(i, e);
          }
        })
      : child
  );

  return (
    <div className="card-swap-outer-wrapper">
      <div className="card-swap-deck-box">
        <div
          ref={container}
          className="card-swap-container"
          style={{ width, height }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {rendered}
        </div>
      </div>

      {/* Indicadores Minimalistas Interativos no Mobile para troca instantânea */}
      <div className="card-swap-indicators" role="tablist" aria-label="Navegação dos projetos">
        {childArr.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`card-indicator-dot ${activeIdx === idx ? 'is-active' : ''}`}
            onClick={() => swap(idx)}
            aria-label={`Ver projeto ${idx + 1}`}
            aria-selected={activeIdx === idx}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSwap;

