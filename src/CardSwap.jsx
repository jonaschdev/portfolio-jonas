import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass = '', children, ...rest }, ref) => (
  <div ref={ref} className={`card ${customClass}`} {...rest}>
    {children}
  </div>
));

Card.displayName = 'Card';

const makeSlot = (i, cardDistance, verticalDistance, total) => ({
  x: i * cardDistance,
  y: -i * verticalDistance,
  z: -i * cardDistance * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 75,
  delay = 5000,
  autoSwap = false,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

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

  // Função para avançar o card do topo ou trazer o card clicado para frente
  const swap = (targetIndex = null) => {
    if (order.current.length < 2) return;
    if (tlRef.current && tlRef.current.isActive()) return;

    let front;
    let rest;

    if (targetIndex !== null) {
      const currentPos = order.current.indexOf(targetIndex);
      // Se clicou no card que JÁ está na frente, não faz nada!
      if (currentPos === 0) {
        return;
      }

      // Traz o card clicado para a frente
      front = order.current[currentPos];
      rest = order.current.filter((_, idx) => idx !== currentPos);
      order.current = [front, ...rest];
      
      // Re-posiciona suavemente os cards nos seus novos slots
      const total = refs.length;
      const tl = gsap.timeline();
      tlRef.current = tl;

      order.current.forEach((idx, slotIdx) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total);
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            zIndex: slot.zIndex,
            duration: config.durMove * 0.7,
            ease: config.ease
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

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=480',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
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
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  };

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

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
  }, [cardDistance, verticalDistance, delay, autoSwap, pauseOnHover, skewAmount, easing]);

  const handleCardClick = (i, e) => {
    onCardClick?.(i);
    // Permite avançar ou trazer o card para a frente manualmente ao clicar
    swap(i);
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
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
