'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedContent — Wrapper that reveals content on scroll.
 * Source: React Bits (https://reactbits.dev/animations/animated-content)
 * Faithful reimplementation matching the React Bits API surface.
 */
const AnimatedContent = ({
  children,
  distance = 40,
  direction = 'vertical',
  reverse = false,
  config = { tension: 80, friction: 20 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  reset = false,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!reset) observer.disconnect();
        } else if (reset) {
          setVisible(false);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reset]);

  const getInitialTransform = () => {
    if (reduced) return 'none';
    const dist = reverse ? -distance : distance;
    if (direction === 'horizontal') return `translateX(${dist}px) scale(${scale})`;
    if (direction === 'vertical') return `translateY(${dist}px) scale(${scale})`;
    return `scale(${scale})`;
  };

  const transitionDuration = reduced ? 0 : Math.max(500, Math.round(1000 / (config.tension / 10)));
  const transitionStyle = reduced
    ? {}
    : {
        transition: `opacity ${transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform ${transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
      };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: animateOpacity ? (visible || reduced ? 1 : initialOpacity) : 1,
        transform: visible || reduced ? `translateX(0) translateY(0) scale(1)` : getInitialTransform(),
        ...transitionStyle,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;
