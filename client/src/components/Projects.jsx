import { useEffect, useRef, useState, useCallback } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

import img1 from '../assets/PROJECTS/project1-allergenscanner-phone.png.png';
import img2 from '../assets/PROJECTS/project2-hireu-phone.png.png';
import img3 from '../assets/PROJECTS/project3-arati-travells-phone.png.png';

/* ─────────────────────────────────────────────────────────────────────────
   Projects data — edit here.
   live / github: set to '' to hide that link.
───────────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'AllergenScanner',
    desc: 'Mobile app that scans food, menus and labels with AI and flags ingredients that clash with your allergy profile.',
    stack: 'React Native · Node.js · MongoDB · AI',
    image: img1,
    live: '',
    github: '',
  },
  {
    id: 2,
    title: 'HireU',
    desc: 'AI-powered freelancing platform that reads a job brief and matches clients with the best-fit freelancers.',
    stack: 'React · Node.js · Express · MongoDB',
    image: img2,
    live: '',
    github: '',
  },
  {
    id: 3,
    title: 'Arati Travells',
    desc: 'Travel website for tours and cabs, with a trip planner for destination, dates and group size.',
    stack: 'React · Tailwind CSS · Node.js',
    image: img3,
    live: '',
    github: '',
  },
];

/* ── Fade-up on first viewport entry ──────────────────────────────────── */
function useFadeUp(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 500ms ease, transform 500ms ease';
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      obs.disconnect();
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

/* ── Main component ───────────────────────────────────────────────────── */
const Projects = () => {
  const [active, setActive] = useState(0);
  const wrapRef   = useRef(null);   // fade-up target
  const sectionRef = useRef(null);  // hover / focus pause detection
  const pausedRef  = useRef(false);
  const timerRef   = useRef(null);
  const reduced    = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  useFadeUp(wrapRef);

  /* Auto-advance every 6 s; pause on hover/focus */
  const advance = useCallback(() => {
    if (pausedRef.current) return;
    setActive(a => (a + 1) % PROJECTS.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    timerRef.current = setInterval(advance, 6000);
    return () => clearInterval(timerRef.current);
  }, [advance, reduced]);

  const pause  = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      style={{ background: '#0A0A12', padding: '80px 0' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading — preserved exactly ───────────────────────────── */}
        <div className="mb-14 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase">
            My Work
          </span>
          <h2
            id="projects-heading"
            className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl"
          >
            Projects
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(to right, #A855F7, #7C3AED)' }}
          />
        </div>

        {/* ── Interactive block ─────────────────────────────────────── */}
        <div
          ref={wrapRef}
          className="mt-12"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          {/*
            Two-column grid on lg+.
            On mobile: phones first (order-first), list below.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">

            {/* ── LEFT: project list ──────────────────────────────── */}
            <div className="order-2 lg:order-1" ref={sectionRef}>
              <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {PROJECTS.map((p, i) => {
                  const isActive = active === i;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        aria-expanded={isActive}
                        aria-controls={`proj-detail-${p.id}`}
                        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 rounded-sm"
                        style={{ focusVisibleRingColor: '#A855F7' }}
                      >
                        <div
                          className="pl-4 py-4"
                          style={{
                            borderLeft: `2px solid ${isActive ? '#A855F7' : '#2a2a3a'}`,
                            transition: 'border-color 300ms ease',
                          }}
                        >
                          {/* Title */}
                          <span
                            className="block text-lg font-medium transition-colors duration-300"
                            style={{ color: isActive ? '#fff' : '#94A3B8' }}
                          >
                            {p.title}
                          </span>

                          {/* Expandable details — grid-rows trick for smooth height */}
                          <div
                            id={`proj-detail-${p.id}`}
                            style={{
                              display: 'grid',
                              gridTemplateRows: isActive ? '1fr' : '0fr',
                              transition: 'grid-template-rows 300ms ease',
                            }}
                          >
                            <div style={{ overflow: 'hidden' }}>
                              {/* Description */}
                              <p
                                className="mt-2 leading-relaxed"
                                style={{ fontSize: 13, color: '#CBD5E1', margin: '8px 0 0 0' }}
                              >
                                {p.desc}
                              </p>

                              {/* Stack */}
                              <span
                                style={{
                                  display: 'block',
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: 11,
                                  color: '#94A3B8',
                                  marginTop: 8,
                                }}
                              >
                                {p.stack}
                              </span>

                              {/* Links */}
                              {(p.live || p.github) && (
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: 16,
                                    alignItems: 'center',
                                    marginTop: 12,
                                  }}
                                >
                                  {p.live && (
                                    <a
                                      href={p.live}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        fontSize: 12,
                                        color: '#fff',
                                        textDecoration: 'none',
                                        borderBottom: '1.5px solid #A855F7',
                                        paddingBottom: 1,
                                      }}
                                    >
                                      <FiExternalLink size={11} aria-hidden="true" />
                                      Live demo
                                    </a>
                                  )}
                                  {p.github && (
                                    <a
                                      href={p.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        fontSize: 12,
                                        color: '#CBD5E1',
                                        textDecoration: 'none',
                                      }}
                                    >
                                      <FiGithub size={11} aria-hidden="true" />
                                      Code
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>

            </div>  {/* end left list */}

            {/* ── RIGHT: phone images ─────────────────────────────── */}
            <div className="order-1 lg:order-2">
              {/* Container: fixed height, overflow visible so active phone can lift */}
              <div
                className="flex justify-center items-center gap-6 mx-auto overflow-visible"
                style={{
                  maxWidth: 540,
                  height: 'clamp(260px, 28vw, 380px)',
                }}
              >
                {PROJECTS.map((p, i) => {
                  const isActive = active === i;
                  // Float class per phone index
                  const floatClass = ['phone-float-a', 'phone-float-b', 'phone-float-c'][i];

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`View ${p.title}`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded shrink-0"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        /* Wrapper carries the active/inactive positional transform */
                        transform: reduced
                          ? 'none'
                          : isActive
                            ? 'translateY(-14px) scale(1.1)'
                            : 'translateY(8px) scale(0.92)',
                        opacity: isActive ? 1 : 0.6,
                        zIndex: isActive ? 2 : 1,
                        position: 'relative',
                        transition: reduced
                          ? 'none'
                          : 'transform 300ms ease-out, opacity 300ms ease-out',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.opacity = '0.85';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.opacity = '0.6';
                      }}
                    >
                      {/* Image carries the float animation only — no transform conflict */}
                      <img
                        src={p.image}
                        alt={p.title}
                        draggable={false}
                        className={floatClass}
                        style={{
                          /* 300px on lg, 200px below — via clamp */
                          height: 'clamp(200px, 20vw, 300px)',
                          width: 'auto',
                          maxWidth: 'none',
                          display: 'block',
                          userSelect: 'none',
                          objectFit: 'contain',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
