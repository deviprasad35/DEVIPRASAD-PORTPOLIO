import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiGit,
  SiVscodium, SiPython,
} from 'react-icons/si';
import { DiMysql } from 'react-icons/di';
import {
  PenTool, MonitorSmartphone, Sparkles, Image,
  Webhook, Bot, MessageSquare, ArrowRight,
} from 'lucide-react';
import LogoLoop from '../reactbits/LogoLoop';
import AnimatedContent from '../reactbits/AnimatedContent';

/* ─────────────────────────────────────────────────────────────────────────
   Skills & Technologies — editorial row layout + sliding strip.
   Edit content in SKILL_ROWS below; icons resolve automatically.
───────────────────────────────────────────────────────────────────────── */

// Map every skill name to its icon element (16px for rows, 22px for strip).
const ICON_MAP = (size = 16) => ({
  'HTML5':              <SiHtml5          size={size} color="#E34F26" />,
  'CSS3':               <SiCss           size={size} color="#1572B6" />,
  'JavaScript':         <SiJavascript    size={size} color="#F7DF1E" />,
  'React':              <SiReact         size={size} color="#61DAFB" />,
  'Tailwind CSS':       <SiTailwindcss   size={size} color="#38BDF8" />,
  'Node.js':            <SiNodedotjs     size={size} color="#68A063" />,
  'Express':            <SiExpress       size={size} color="#E2E8F0" />,
  'MongoDB':            <SiMongodb       size={size} color="#47A248" />,
  'MySQL':              <DiMysql         size={size} color="#4479A1" />,
  'Git':                <SiGit           size={size} color="#F05032" />,
  'VS Code':            <SiVscodium      size={size} color="#007ACC" />,
  'Python':             <SiPython        size={size} color="#FFD43B" />,
  'UI/UX Design':       <PenTool         size={size} color="#C084FC" />,
  'Responsive Design':  <MonitorSmartphone size={size} color="#C084FC" />,
  'CSS Animations':     <Sparkles        size={size} color="#C084FC" />,
  'Image Editing':      <Image           size={size} color="#C084FC" />,
  'REST APIs':          <Webhook         size={size} color="#C084FC" />,
  'AI Automation':      <Bot             size={size} color="#C084FC" />,
  'Prompt Engineering': <MessageSquare   size={size} color="#C084FC" />,
});

const SKILL_ROWS = [
  {
    index: '01',
    category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    index: '02',
    category: 'Backend & Database',
    skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'REST APIs'],
  },
  {
    index: '03',
    category: 'Design',
    skills: ['UI/UX Design', 'Responsive Design', 'CSS Animations', 'Image Editing'],
  },
  {
    index: '04',
    category: 'Tools & AI',
    skills: ['Git', 'VS Code', 'Python', 'AI Automation', 'Prompt Engineering'],
  },
];

// Flat list of ALL skill names for the strip (order: row order, left to right).
const ALL_SKILLS = SKILL_ROWS.flatMap(r => r.skills);

// Strip items — pre-composed so icon + label sit horizontally side-by-side.
const STRIP_ITEMS = ALL_SKILLS.map(name => {
  const icons = ICON_MAP(22);
  return (
    <div key={name} className="flex items-center gap-2 flex-shrink-0">
      {icons[name] ?? null}
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: '#CBD5E1' }}>
        {name}
      </span>
    </div>
  );
});

const Skills = () => {
  const icons = ICON_MAP(20);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ background: '#0A0A12' }}
    >
      {/* Top divider */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, #7C3AED, transparent)' }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">

        {/* ── Heading ────────────────────────────────────────────────── */}
        <AnimatedContent direction="vertical" distance={20}>
          <div className="mb-14 text-center">
            <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase">
              Tech Stack
            </span>
            <h2
              id="skills-heading"
              className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl"
            >
              Skills &amp; Technologies
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-3 h-1 w-16 rounded-full"
              style={{ background: 'linear-gradient(to right, #A855F7, #7C3AED)' }}
            />
          </div>
        </AnimatedContent>

        {/* ── Rows ───────────────────────────────────────────────────── */}
        <div role="list" aria-label="Skill categories">
          {SKILL_ROWS.map(({ index, category, skills }, rowIdx) => (
            <AnimatedContent
              key={index}
              direction="vertical"
              distance={16}
              delay={rowIdx * 70}
            >
              {/*
                Row wrapper — group for hover.
                Relative so the accent bar and hover overlay are positioned inside.
              */}
              <div
                role="listitem"
                className={`group relative overflow-hidden py-5 cursor-default
                  ${rowIdx > 0 ? 'border-t border-white/10' : ''}
                `}
                style={{ transition: 'background 300ms ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background =
                    'linear-gradient(to right, rgba(124,58,237,0.12), transparent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* 3px purple accent bar — slides in from left on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] rounded-r-full"
                  style={{
                    background: '#A855F7',
                    transform: 'scaleY(0)',
                    transformOrigin: 'center',
                    transition: 'transform 300ms ease',
                  }}
                  ref={el => {
                    if (!el) return;
                    const row = el.parentElement;
                    const show = () => { el.style.transform = 'scaleY(1)'; };
                    const hide = () => { el.style.transform = 'scaleY(0)'; };
                    row.addEventListener('mouseenter', show);
                    row.addEventListener('mouseleave', hide);
                  }}
                />

                {/*
                  Two-column grid:
                  left ~36% (category label), right ~64% (skills, centered).
                  On mobile: single column, stacked.
                */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(200px,0.7fr)_1.6fr] lg:items-center">

                  {/* LEFT — index + category + arrow */}
                  <div className="flex items-center gap-4 pl-5">
                    <span
                      className="font-mono text-xs font-semibold tabular-nums select-none flex-shrink-0"
                      style={{ color: '#7C3AED' }}
                      aria-hidden="true"
                    >
                      {index}
                    </span>
                    {/* Category name shifts right 8px on hover */}
                    <h3
                      className="text-xl font-semibold"
                      style={{
                        color: '#CBD5E1',
                        transition: 'color 300ms ease, transform 300ms ease',
                      }}
                      ref={el => {
                        if (!el) return;
                        const row = el.closest('[role="listitem"]');
                        if (!row) return;
                        const show = () => {
                          el.style.color = '#FFFFFF';
                          el.style.transform = 'translateX(8px)';
                        };
                        const hide = () => {
                          el.style.color = '#CBD5E1';
                          el.style.transform = 'translateX(0)';
                        };
                        row.addEventListener('mouseenter', show);
                        row.addEventListener('mouseleave', hide);
                      }}
                    >
                      {category}
                    </h3>
                    {/* Arrow fades in on hover, absolutely positioned at far right of left column */}
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      style={{
                        color: '#A855F7',
                        opacity: 0,
                        transition: 'opacity 300ms ease',
                        marginLeft: 'auto',
                        flexShrink: 0,
                      }}
                      ref={el => {
                        if (!el) return;
                        const row = el.closest('[role="listitem"]');
                        if (!row) return;
                        const show = () => { el.style.opacity = '1'; };
                        const hide = () => { el.style.opacity = '0'; };
                        row.addEventListener('mouseenter', show);
                        row.addEventListener('mouseleave', hide);
                      }}
                    />
                  </div>

                  {/* RIGHT — skills, no-wrap single line on lg+, centered */}
                  <ul
                    className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2
                               lg:flex-nowrap lg:justify-center"
                    aria-label={`${category} skills`}
                    style={{
                      transition: 'transform 300ms ease',
                    }}
                    ref={el => {
                      if (!el) return;
                      const row = el.closest('[role="listitem"]');
                      if (!row) return;
                      const show = () => { el.style.transform = 'translateX(10px)'; };
                      const hide = () => { el.style.transform = 'translateX(0)'; };
                      row.addEventListener('mouseenter', show);
                      row.addEventListener('mouseleave', hide);
                    }}
                  >
                    {skills.map(skill => (
                      <li
                        key={skill}
                        className="flex items-center gap-1.5 cursor-default flex-shrink-0 whitespace-nowrap"
                      >
                        <span className="flex-shrink-0" aria-hidden="true">
                          {icons[skill] ?? null}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: '#E2E8F0' }}
                        >
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </AnimatedContent>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/10" aria-hidden="true" />
        </div>

        {/* ── Sliding strip ──────────────────────────────────────────── */}
        <AnimatedContent direction="vertical" distance={16} delay={320}>
          <div className="mt-14 mx-auto max-w-4xl">
            <LogoLoop
              items={STRIP_ITEMS}
              speed={35}
              pauseOnHover
              direction="left"
              gap={40}
              fadeColor="#0A0A12"
              className="h-14"
              itemClassName=""
            />
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
};

export default Skills;
