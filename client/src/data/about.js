/**
 * about.js — All editable content for the About section.
 * Replace placeholder values with your real data.
 */

const aboutData = {
  // ── Stats ──────────────────────────────────────────────────────────────
  stats: [
    { value: 20, suffix: '+', label: 'Projects'    },
    { value: 10, suffix: '+', label: 'Technologies' },
    { value: 3,  suffix: '',  label: 'Internships'  },
  ],

  // ── Bio paragraphs ─────────────────────────────────────────────────────
  bio: [
    'I turn caffeine and curiosity into code. I\'m a B.Tech student who spends every spare hour building full-stack products that are fast, clean, and actually useful, from freelancing platforms to tools that solve real problems for real people.',
    'I work across the MERN stack and plug AI automation into everything I can, so software handles the boring work and people get the interesting part. Got an idea that sounds a little too ambitious? That\'s exactly my kind of project.',
  ],

  // ── Skill chips ────────────────────────────────────────────────────────
  chips: [
    'React', 'Node.js', 'MongoDB', 'Express',
    'Tailwind CSS', 'Python', 'AI Automation', 'REST APIs', 'Git',
  ],

  // ── Education ──────────────────────────────────────────────────────────
  education: {
    degree:  'B.Tech in Computer Science Engineering',
    college: 'N.M.I.E.T, Bhubaneswar',
    years:   '2022 – 2026',
  },

  // ── Photo  (src/assets/about-photo.jpg.jpg — place your image there) ──
  photo: new URL('../assets/about-photo.jpg.jpg', import.meta.url).href,

  // ── Resume ─────────────────────────────────────────────────────────────
  resume: '/Devi_Prasad_Biswal_CV.pdf',
};

export default aboutData;
