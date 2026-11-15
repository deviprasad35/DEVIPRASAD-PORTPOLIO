import { lazy, Suspense, useEffect, useState } from 'react';
import { FiArrowDown, FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import DotField from '../reactbits/DotField';
import siteConfig from '../config/siteConfig';
import useReducedMotion from '../hooks/useReducedMotion';
import avatarSrc from '../assets/avtar.png.png';

const TextType = lazy(() => import('../reactbits/TextType'));

const scrollToProjects = (e) => {
  e.preventDefault();
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SOCIAL = [
  {
    href:  siteConfig.social.email,
    Icon:  FiMail,
    label: 'Send an email',
    external: false,
  },
  {
    href:  siteConfig.social.whatsapp,
    Icon:  FaWhatsapp,
    label: 'Chat on WhatsApp',
    external: true,
  },
];

// Fades out as soon as the user scrolls so it never overlaps the next section.
const ScrollHint = ({ reduced }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      // Fully visible at 0, invisible at 120px scrolled.
      setOpacity(Math.max(0, 1 - window.scrollY / 120));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (opacity === 0) return null;

  return (
    <button
      onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10
        flex flex-col items-center gap-1 hover:text-purple-400
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded
        ${reduced ? '' : 'animate-bounce'}`}
      style={{ color: '#CBD5E1', opacity, transition: 'color 200ms' }}
      aria-label="Scroll down to About section"
      aria-hidden={opacity < 0.1}
      tabIndex={opacity < 0.1 ? -1 : 0}
    >
      <span className="text-xs tracking-[0.15em] uppercase font-mono">Scroll</span>
      <FiArrowDown size={16} aria-hidden="true" />
    </button>
  );
};

const Hero = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A0A12' }}
      aria-label="Hero section"
    >
      {/* ── DotField background ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          gradientFrom="#6D28D9"
          gradientTo="#3B82F6"
          baseOpacity={0.3}
          cursorRadius={200}
          bulgeStrength={0.5}
          glowRadius={140}
          opacity={0.8}
          interactive={!reduced}
          intro={!reduced}
          className="h-full w-full"
        />
      </div>

      {/* ── Shared content container — same edge as navbar ──────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pt-24 pb-16">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-end md:justify-between">

          {/* ── Left: text ─────────────────────────────────────────────── */}
          <div className="flex-1 text-center md:text-left pb-0 md:pb-12">

            {/* Eyebrow */}
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-purple-400 uppercase">
              Hi, I&rsquo;m
            </p>

            {/* Name */}
            <h1 className="mb-3 text-6xl leading-tight md:text-7xl" style={{ fontFamily: '"Samarkan", "Inter", sans-serif', fontWeight: 'normal' }}>
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </h1>

            {/* Typing roles */}
            <div className="mb-5 flex min-h-[2rem] items-center justify-center gap-2 text-lg font-medium md:justify-start sm:text-xl">
              <span className="text-purple-400 select-none">&gt;</span>
              <Suspense fallback={<span className="text-purple-300">{siteConfig.roles[0]}</span>}>
                {reduced ? (
                  <span className="text-purple-300">{siteConfig.roles[0]}</span>
                ) : (
                  <TextType
                    text={siteConfig.roles}
                    typingSpeed={55}
                    deletingSpeed={30}
                    pauseDuration={2200}
                    loop
                    className="text-purple-300"
                    cursorColor="#a78bfa"
                  />
                )}
              </Suspense>
            </div>

            {/* Bio */}
            <p className="mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed" style={{ color: '#CBD5E1' }}>
              I don&apos;t just write code. I engineer experiences, solve real problems, and turn impossible ideas into functional reality.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-full
                           bg-gradient-to-r from-purple-600 to-violet-600
                           px-6 py-2.5 text-sm font-semibold text-white
                           shadow-lg shadow-purple-900/30
                           transition-all duration-200 hover:scale-105 hover:shadow-purple-700/40
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                View Projects
                <FiArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/Devi_Prasad_Biswal_CV.pdf"
                download="Devi_Prasad_Biswal_CV.pdf"
                type="application/pdf"
                className="inline-flex items-center gap-2 rounded-full
                           border border-purple-500/50 bg-white/5
                           px-6 py-2.5 text-sm font-semibold
                           backdrop-blur-sm transition-all duration-200
                           hover:bg-white/10 hover:border-purple-400 hover:scale-105
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                style={{ color: '#CBD5E1' }}
                aria-label="Download CV (PDF)"
              >
                <FiDownload size={15} aria-hidden="true" />
                Download Resume
              </a>
            </div>

            {/* Social icon buttons */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {SOCIAL.map(({ href, Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="group flex items-center justify-center h-9 w-9 rounded-full
                             border border-white/10 bg-white/5
                             transition-all duration-200
                             hover:border-purple-500/60 hover:bg-purple-500/10
                             hover:-translate-y-0.5 hover:scale-110
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <Icon
                    size={20}
                    className="transition-colors duration-200 group-hover:text-purple-300"
                    style={{ color: '#94A3B8' }}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: avatar anchored to bottom ───────────────────────── */}
          <div className="flex-shrink-0 self-end">
            <div
              className={`
                transition-transform duration-500 ease-out
                hover:scale-105
                ${reduced ? '' : 'hover:[animation:float_3s_ease-in-out_infinite]'}
              `}
            >
              <img
                src={avatarSrc}
                alt="Devi Prasad Biswal — profile photo"
                loading="eager"
                style={{
                  height: 'clamp(340px, 38vw, 520px)',
                  width: 'auto',
                  display: 'block',
                  maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* ── Scroll cue — absolute bottom-center, fades out on scroll ── */}
      <ScrollHint reduced={reduced} />
    </section>
  );
};

export default Hero;
