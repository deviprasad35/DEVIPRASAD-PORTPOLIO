import { useEffect, useRef, useState, useCallback } from 'react';
import CountUp from '../reactbits/CountUp';

/* ─────────────────────────────────────────────────────────────────────────
   Replace the [bracketed] placeholders with real bullet points.
───────────────────────────────────────────────────────────────────────── */
const ITEMS = [
  {
    type:    'work',
    dates:   'Aug – Oct 2026',
    big:     3,
    unit:    'MONTHS',
    title:   'Frontend Developer',
    org:     '11x',
    bullets: ['[What you built or shipped]'],
  },
  {
    type:    'work',
    dates:   'Jan – Jul 2026',
    big:     7,
    unit:    'MONTHS',
    title:   'Full-stack Intern',
    org:     'VidyaVistara',
    bullets: ['[What you built or shipped]'],
  },
  {
    type:    'education',
    dates:   '2022 – 2026',
    big:     4,
    unit:    'YEARS',
    title:   'B.Tech, Computer Science',
    org:     'N.M.I.E.T, Bhubaneswar',
    bullets: [],
  },
];

/* ── Helper: pad number to 2 digits ──────────────────────────────────── */
const pad2 = n => String(n).padStart(2, '0');

/* ── Dot styles ──────────────────────────────────────────────────────── */
const DOT_BASE = {
  width: 14,
  height: 14,
  borderRadius: '50%',
  flexShrink: 0,
  transition: 'background 300ms ease, border-color 300ms ease, outline-color 300ms ease',
};

function Dot({ type, lit }) {
  if (type === 'work') {
    return (
      <span
        style={{
          ...DOT_BASE,
          background: lit ? '#A855F7' : '#A855F7',
          outline: `1.5px solid rgba(168,85,247,${lit ? 0.5 : 0.25})`,
          outlineOffset: '3px',
          border: `3px solid #0A0A12`,
          boxSizing: 'content-box',
        }}
      />
    );
  }
  // education
  return (
    <span
      style={{
        ...DOT_BASE,
        background: '#0A0A12',
        border: `2px solid ${lit ? '#A855F7' : '#4b4b66'}`,
      }}
    />
  );
}

/* ── Ghost numeral block ─────────────────────────────────────────────── */
function Ghost({ big, unit, align, reduced, startCount }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
        gap: 2,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontSize: 84,
          fontWeight: 500,
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: `1.5px ${hovered ? '#A855F7' : '#3b3b56'}`,
          transition: 'WebkitTextStroke 300ms ease, -webkit-text-stroke 300ms ease',
          fontVariantNumeric: 'tabular-nums',
          display: 'block',
          /* Use text-stroke via CSS custom property trick */
          '--stroke-color': hovered ? '#A855F7' : '#3b3b56',
        }}
        className="ghost-numeral"
      >
        {reduced
          ? pad2(big)
          : <CountUp
              from={0}
              to={big}
              duration={1.4}
              delay={0}
              easing="easeOut"
              trigger="view"
              startWhen={startCount}
              format="standard"
            />
        }
        {!reduced && big < 10 && <span style={{ opacity: 0 }}>0</span>}
      </span>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.14em',
          color: '#94A3B8',
          textAlign: align === 'right' ? 'right' : 'left',
        }}
      >
        {unit}
      </span>
    </div>
  );
}

/* ── Text block ──────────────────────────────────────────────────────── */
function TextBlock({ item, align }) {
  return (
    <div style={{ textAlign: align }}>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          color: '#94A3B8',
          display: 'block',
        }}
      >
        {item.dates}
      </span>
      <h3
        style={{
          fontSize: 19,
          fontWeight: 500,
          color: '#fff',
          margin: '4px 0 0 0',
        }}
      >
        {item.title}
      </h3>
      <p style={{ fontSize: 14, color: '#A855F7', margin: '2px 0 0 0' }}>
        {item.org}
      </p>
      {item.bullets.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            margin: '8px 0 0 0',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {item.bullets.map((b, bi) => (
            <li
              key={bi}
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: '#CBD5E1',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6,
                flexDirection: align === 'right' ? 'row-reverse' : 'row',
              }}
            >
              <span style={{ color: '#A855F7', flexShrink: 0, marginTop: 2 }}>•</span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────────────── */
const Experience = () => {
  const sectionRef  = useRef(null);
  const spineRef    = useRef(null);  // the colored progress line
  const dotRefs     = useRef([]);    // one ref per dot
  const rafRef      = useRef(null);
  const [litDots, setLitDots]       = useState([false, false, false]);
  const [visibleRows, setVisibleRows] = useState([false, false, false]); // text slide-in
  const textRefs    = useRef([]);
  const ghostRefs   = useRef([]);
  const reduced     = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  /* ── Scroll-driven spine progress ─────────────────────────────────── */
  useEffect(() => {
    if (reduced) {
      // Fill spine fully
      if (spineRef.current) spineRef.current.style.height = '100%';
      setLitDots([true, true, true]);
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      const spine   = spineRef.current;
      if (!section || !spine) return;

      const { top, height } = section.getBoundingClientRect();
      const viewMid = window.innerHeight / 2;
      const progress = Math.min(1, Math.max(0, (viewMid - top) / height));
      spine.style.height = `${progress * 100}%`;

      // Light up dots as progress passes each one
      const spineH    = spine.parentElement.getBoundingClientRect().height;
      const spineTop  = spine.parentElement.getBoundingClientRect().top;
      const newLit = dotRefs.current.map(dotEl => {
        if (!dotEl) return false;
        const dotTop = dotEl.getBoundingClientRect().top;
        return dotTop <= viewMid + 8;
      });
      setLitDots(newLit);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = null; update(); });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // run once on mount
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  /* ── Text / ghost slide-in via IntersectionObserver ──────────────── */
  useEffect(() => {
    if (reduced) {
      setVisibleRows([true, true, true]);
      return;
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = Number(entry.target.dataset.rowIdx);
        setVisibleRows(v => { const n = [...v]; n[idx] = true; return n; });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    textRefs.current.forEach(el => { if (el) obs.observe(el); });
    ghostRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [reduced]);

  /* ── Alternating: row 0 → text right, row 1 → text left, row 2 → right ── */
  const textOnRight = i => i % 2 === 0; // 0=right, 1=left, 2=right

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      style={{ background: '#0A0A12', padding: '80px 0' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading — preserved exactly ──────────────────────────── */}
        <div className="mb-14 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase">
            Background
          </span>
          <h2
            id="experience-heading"
            className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl"
          >
            Experience &amp; Education
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(to right, #A855F7, #7C3AED)' }}
          />
        </div>

        {/* ── Desktop timeline (md+) ───────────────────────────────── */}
        <div className="hidden md:block mt-14">
          <div className="relative mx-auto max-w-4xl overflow-hidden">

            {/* Gray spine (background) */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 2,
                transform: 'translateX(-50%)',
                background: '#2a2a3a',
                zIndex: 0,
              }}
              aria-hidden="true"
            />

            {/* Colored progress spine (foreground) */}
            <div
              ref={spineRef}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                height: '0%',
                width: 2,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, #A855F7, #3B82F6)',
                zIndex: 1,
                transition: 'height 80ms linear',
              }}
              aria-hidden="true"
            />

            {/* Rows */}
            {ITEMS.map((item, i) => {
              const rightText  = textOnRight(i);
              const isLast     = i === ITEMS.length - 1;
              const isVisible  = visibleRows[i];

              /* Slide direction: text slides from its own edge toward spine */
              const textSlide = !reduced && !isVisible
                ? (rightText ? 'translateX(24px)' : 'translateX(-24px)')
                : 'translateX(0)';

              const ghostSlide = !reduced && !isVisible
                ? (rightText ? 'translateX(-24px)' : 'translateX(24px)')
                : 'translateX(0)';

              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 44px 1fr',
                    alignItems: 'center',
                    marginBottom: isLast ? 0 : 64,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Left cell */}
                  <div
                    ref={el => { if (!rightText) textRefs.current[i] = el; else ghostRefs.current[i] = el; }}
                    data-row-idx={i}
                    style={{
                      display: 'flex',
                      justifyContent: rightText ? 'flex-end' : 'flex-start',
                      paddingRight: rightText ? 0 : 0,
                      opacity: isVisible ? 1 : 0,
                      transform: rightText ? ghostSlide : textSlide,
                      transition: reduced ? 'none' : `opacity 500ms ease-out, transform 500ms ease-out ${rightText ? '150ms' : '0ms'}`,
                    }}
                  >
                    {rightText ? (
                      /* Ghost numeral on the left */
                      <div style={{ textAlign: 'right' }}>
                        <Ghost big={item.big} unit={item.unit} align="right" reduced={reduced} startCount={isVisible} />
                      </div>
                    ) : (
                      /* Text block on the left */
                      <div style={{ textAlign: 'right', maxWidth: 300 }}>
                        <TextBlock item={item} align="right" />
                      </div>
                    )}
                  </div>

                  {/* Center: dot */}
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    ref={el => { dotRefs.current[i] = el; }}
                  >
                    <Dot type={item.type} lit={litDots[i]} />
                  </div>

                  {/* Right cell */}
                  <div
                    ref={el => { if (rightText) textRefs.current[i] = el; else ghostRefs.current[i] = el; }}
                    data-row-idx={i}
                    style={{
                      display: 'flex',
                      justifyContent: rightText ? 'flex-start' : 'flex-end',
                      opacity: isVisible ? 1 : 0,
                      transform: rightText ? textSlide : ghostSlide,
                      transition: reduced ? 'none' : `opacity 500ms ease-out, transform 500ms ease-out ${rightText ? '0ms' : '150ms'}`,
                    }}
                  >
                    {rightText ? (
                      /* Text block on the right */
                      <div style={{ textAlign: 'left', maxWidth: 300 }}>
                        <TextBlock item={item} align="left" />
                      </div>
                    ) : (
                      /* Ghost numeral on the right */
                      <div style={{ textAlign: 'left' }}>
                        <Ghost big={item.big} unit={item.unit} align="left" reduced={reduced} startCount={isVisible} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile timeline (below md) ───────────────────────────── */}
        <div className="md:hidden mt-14">
          <div className="relative">

            {/* Mobile spine */}
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 0,
                bottom: 0,
                width: 2,
                background: reduced
                  ? 'linear-gradient(to bottom, #A855F7, #3B82F6)'
                  : '#2a2a3a',
              }}
              aria-hidden="true"
            />
            {!reduced && (
              <div
                ref={spineRef}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 0,
                  height: '0%',
                  width: 2,
                  background: 'linear-gradient(to bottom, #A855F7, #3B82F6)',
                  transition: 'height 80ms linear',
                }}
                aria-hidden="true"
              />
            )}

            {ITEMS.map((item, i) => {
              const isLast = i === ITEMS.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    paddingLeft: 40,
                    paddingBottom: isLast ? 0 : 40,
                    position: 'relative',
                  }}
                >
                  {/* Mobile dot */}
                  <div
                    ref={el => { dotRefs.current[i] = el; }}
                    style={{
                      position: 'absolute',
                      left: 6,
                      top: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Dot type={item.type} lit={litDots[i]} />
                  </div>

                  {/* Ghost numeral (small) */}
                  <div style={{ marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: 48,
                        fontWeight: 500,
                        lineHeight: 1,
                        color: 'transparent',
                        WebkitTextStroke: '1.5px #3b3b56',
                        display: 'block',
                      }}
                    >
                      {pad2(item.big)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        color: '#94A3B8',
                      }}
                    >
                      {item.unit}
                    </span>
                  </div>

                  <TextBlock item={item} align="left" />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Inline style for webkit-text-stroke on the ghost numeral */}
      <style>{`
        .ghost-numeral {
          -webkit-text-stroke: 1.5px var(--stroke-color, #3b3b56);
        }
      `}</style>
    </section>
  );
};

export default Experience;
