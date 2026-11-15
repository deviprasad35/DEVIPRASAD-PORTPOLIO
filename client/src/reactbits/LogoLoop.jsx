'use client';

import { memo, useEffect, useLayoutEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const cx = (...parts) => parts.filter(Boolean).join(' ');

/**
 * LogoLoop — Continuously looping marquee of logos/items.
 * Source: React Bits (https://reactbits.dev/animations/logo-loop)
 * This is a faithful reimplementation matching the React Bits API.
 */
const LogoLoop = memo(({
  items = [],
  speed = 60,
  pauseOnHover = true,
  direction = 'left',
  gap = 48,
  className = '',
  itemClassName = '',
  vertical = false,
  labels = 'below',
  fadeColor = '#0a0a0f',
}) => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  // Use a ref for paused so the rAF loop always reads the current value
  // without being recreated (which would reset posRef to 0).
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const lastTimeRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;

    const isReversed = direction === 'right' || direction === 'down';
    let frameId;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (!pausedRef.current) {
        const size = vertical ? track.scrollHeight / 2 : track.scrollWidth / 2;
        const delta = speed * dt;
        posRef.current = isReversed
          ? (posRef.current - delta + size) % size
          : (posRef.current + delta) % size;

        if (vertical) {
          track.style.transform = `translateY(${isReversed ? posRef.current : -posRef.current}px)`;
        } else {
          track.style.transform = `translateX(${isReversed ? posRef.current : -posRef.current}px)`;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
      lastTimeRef.current = null;
    };
  // Only restart the loop when the item list, speed, direction or axis changes —
  // NOT when pausedRef changes (it's a ref, not state, so it won't be listed here).
  }, [items, speed, direction, vertical]);

  const renderItems = (keyPrefix) =>
    items.map((item, i) => (
      <div
        key={`${keyPrefix}-${i}`}
        className={cx(
          'flex shrink-0 items-center justify-center',
          vertical ? 'flex-row' : 'flex-col',
          itemClassName
        )}
        style={vertical ? { marginBottom: gap } : { marginRight: gap }}
      >
        {typeof item === 'string' || typeof item === 'number' ? (
          <span className="text-sm font-medium">{item}</span>
        ) : item.icon ? (
          <>
            <span className="flex items-center justify-center">{item.icon}</span>
            {labels !== 'none' && item.label && (
              <span className="mt-2 text-xs font-medium text-slate-400">{item.label}</span>
            )}
          </>
        ) : (
          item
        )}
      </div>
    ));

  return (
    <div
      ref={containerRef}
      className={cx('relative overflow-hidden', className)}
      onMouseEnter={() => { if (pauseOnHover) pausedRef.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) pausedRef.current = false; }}
      aria-label="Skills marquee"
    >
      {/* Fade edges */}
      {!vertical && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16" style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }} aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16" style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }} aria-hidden="true" />
        </>
      )}
      <div
        className={cx(
          'relative z-0 flex select-none will-change-transform [-webkit-user-select:none]',
          vertical ? 'h-max w-full flex-col' : 'w-max'
        )}
        ref={trackRef}
      >
        {renderItems('a')}
        {renderItems('b')}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
