import { FiBook, FiDownload } from 'react-icons/fi';
import CountUp       from '../reactbits/CountUp';
import ScrollReveal  from '../reactbits/ScrollReveal';
import SpotlightCard from '../reactbits/SpotlightCard';
import TiltedCard    from '../reactbits/TiltedCard';
import Magnet        from '../reactbits/Magnet';
import AnimatedContent from '../reactbits/AnimatedContent';
import aboutData     from '../data/about';

/*
 * About section — stats row + about-me layout.
 * All copy lives in src/data/about.js.
 */
const About = () => {
  const { stats, bio, chips, education, photo, resume } = aboutData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20"
      style={{ background: '#0A0A12' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── 1. Stats row ─────────────────────────────────────────────── */}
        <AnimatedContent direction="vertical" distance={24}>
          <ul
            className="flex flex-wrap justify-center gap-10 sm:gap-16 md:gap-24 mb-6"
            role="list"
            aria-label="Statistics"
          >
            {stats.map(({ value, suffix, label }) => (
              <li key={label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-4xl font-extrabold tabular-nums sm:text-5xl">
                  <CountUp
                    from={0}
                    to={value}
                    duration={2}
                    delay={0}
                    easing="easeOut"
                    trigger="view"
                    suffix={suffix}
                    className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                  />
                </span>
                <span
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ color: '#94A3B8' }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* Gradient divider */}
          <div
            aria-hidden="true"
            className="mb-14 h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent, #7C3AED, transparent)',
            }}
          />
        </AnimatedContent>

        {/* ── 2. Section heading ───────────────────────────────────────── */}
        <AnimatedContent direction="vertical" distance={20} delay={60}>
          <div className="mb-14 text-center">
            <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase">
              Who I am
            </span>
            <h2
              id="about-heading"
              className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl"
            >
              About Me
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-3 h-1 w-16 rounded-full"
              style={{
                background: 'linear-gradient(to right, #A855F7, #7C3AED)',
              }}
            />
          </div>
        </AnimatedContent>

        {/* ── 3. Two-column layout ─────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">

          {/* LEFT — TiltedCard photo with depth frame */}
          <AnimatedContent direction="horizontal" distance={40} reverse delay={80}>
            <div className="flex-shrink-0">
              {/*
                Outer container is 296×376 to absorb the 16px offset frame
                without shifting the card position.
              */}
              <div className="relative" style={{ width: 296, height: 376 }}>
                {/* Depth frame — 16px down and right of the card */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    width: 280,
                    height: 360,
                    borderRadius: '1rem',
                    border: '1px solid #7C3AED',
                    pointerEvents: 'none',
                  }}
                />

                {/* TiltedCard — parallax={0} removes the bleed that clips the top.
                    Image rendered as a child (not imageSrc) to control object-position. */}
                <TiltedCard
                  altText="Devi Prasad Biswal"
                  containerWidth={280}
                  containerHeight={360}
                  imageWidth={280}
                  imageHeight={360}
                  radius={16}
                  rotateAmplitude={10}
                  scaleOnHover={1.03}
                  glare={0.18}
                  shadow={0}
                  parallax={0}
                  showTooltip={false}
                  intro
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  <img
                    src={photo}
                    alt="Devi Prasad Biswal"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block',
                    }}
                  />
                </TiltedCard>
              </div>
            </div>
          </AnimatedContent>

          {/* RIGHT — text content */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Bio paragraphs — ScrollReveal word fade */}
            {bio.map((para, i) => (
              <ScrollReveal
                key={i}
                effect="fade"
                mode="enter"
                duration={0.9}
                baseOpacity={0.05}
                baseRotation={0}
                enableBlur={false}
                stagger={0.04}
                containerClassName="!my-0"
                textClassName="!text-base !font-normal !leading-relaxed"
                style={{ color: '#CBD5E1' }}
              >
                {para}
              </ScrollReveal>
            ))}

            {/* Skill chips with staggered entry */}
            <AnimatedContent direction="vertical" distance={16} delay={120}>
              <div className="flex flex-wrap gap-2 pt-1" role="list" aria-label="Skills">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    role="listitem"
                    className="cursor-default rounded-full border px-3 py-1 text-sm font-medium
                               transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: 'rgba(168,85,247,0.4)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#CBD5E1',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </AnimatedContent>

            {/* Education card — SpotlightCard */}
            <AnimatedContent direction="vertical" distance={20} delay={160}>
              <SpotlightCard
                spotlightColor="#7C3AED"
                intensity={0.14}
                theme="dark"
                className="!rounded-xl !p-5"
                style={{
                  '--spotlight-card-surface': '#0F0F1A',
                  '--spotlight-card-border': 'rgba(124,58,237,0.25)',
                  '--spotlight-card-shadow': 'none',
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 rounded-lg p-2"
                    style={{ background: 'rgba(124,58,237,0.2)' }}
                  >
                    <FiBook size={18} className="text-purple-400" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-100">
                      {education.degree}
                    </p>
                    <p className="mt-0.5 text-sm" style={{ color: '#94A3B8' }}>
                      {education.college}
                      {education.years && (
                        <span className="ml-2 font-mono text-xs opacity-70">
                          {education.years}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            {/* Resume button — Magnet pull + filled purple */}
            <AnimatedContent direction="vertical" distance={16} delay={200}>
              <Magnet magnetStrength={2.5} padding={80}>
                <a
                  href={resume}
                  download="Devi_Prasad_Biswal_CV.pdf"
                  type="application/pdf"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5
                             text-sm font-semibold text-white
                             transition-transform duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  style={{ background: 'linear-gradient(135deg, #A855F7, #7C3AED)' }}
                  aria-label="Download CV (PDF)"
                >
                  <FiDownload size={15} aria-hidden="true" />
                  Download Resume
                </a>
              </Magnet>
            </AnimatedContent>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
