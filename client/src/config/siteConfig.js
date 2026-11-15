/**
 * siteConfig.js — All static content for the portfolio.
 * Edit this file to update your personal information, social links,
 * stats, roles, about text, experience, and education.
 */

const siteConfig = {
  // ── Personal Info ──────────────────────────────────────────────────────────
  name: 'Devi Prasad Biswal',
  initials: 'DP',
  tagline: 'Building modern web experiences',

  // ── Roles shown in the Hero typing animation ──────────────────────────────
  roles: [
    'MERN Stack Developer',
    'Full-Stack Developer',
    'AI Enthusiast',
    'Creative Problem Solver',
  ],

  // ── About text ─────────────────────────────────────────────────────────────
  // TODO: Replace with your actual bio
  about: {
    paragraphs: [
      'I am a passionate web developer with a strong foundation in modern JavaScript frameworks and full-stack development. I enjoy crafting clean, performant, and accessible user interfaces.',
      'Currently pursuing my B.Tech in Computer Science Engineering, I am constantly learning and building projects that solve real-world problems.',
    ],
    // TODO: Replace with your actual education details
    education: {
      degree: 'B.Tech in Computer Science Engineering',
      institution: '[Your College Name]',
      year: '[Year of Graduation]',
    },
  },

  // ── Stats counters ─────────────────────────────────────────────────────────
  stats: [
    { value: 10, label: 'Projects', suffix: '+' },
    { value: 9, label: 'Technologies', suffix: '+' },
    { value: 1, label: 'Internship', suffix: '' },
  ],

  // ── Experience ─────────────────────────────────────────────────────────────
  // TODO: Replace with your actual experience
  experience: [
    {
      type: 'internship',
      role: '[Your Role]',
      company: '[Company Name]',
      duration: '[Start Date] – [End Date]',
      bullets: [
        'Developed and maintained frontend features using React.js.',
        'Collaborated with backend team to integrate REST APIs.',
        'Improved page load performance by optimising bundle size.',
      ],
    },
    {
      type: 'earlier',
      role: '[Earlier Role / Project]',
      company: '[Organization / Self]',
      duration: '[Period]',
      bullets: [
        'Built a full-stack application using the MERN stack.',
        'Implemented authentication and role-based access control.',
      ],
    },
  ],

  // ── Social links ───────────────────────────────────────────────────────────
  social: {
    email:    'mailto:biswaldeviprasad35@gmail.com?subject=Portfolio%20Inquiry',
    whatsapp: 'https://wa.me/918260556219?text=Hi%20Devi%2C%20I%20saw%20your%20portfolio',
    linkedin: 'https://linkedin.com/in/your-profile',
    github:   'https://github.com/your-username',
  },

  // ── SEO / Meta ─────────────────────────────────────────────────────────────
  seo: {
    title: 'Devi Prasad Biswal — Web Developer & MERN Stack Developer',
    description:
      'Portfolio of Devi Prasad Biswal, a web developer and MERN stack developer specialising in building modern, accessible, and performant web applications.',
    ogImage: '/og-image.png',
    siteUrl: 'https://your-domain.com', // TODO: set your deployment URL
  },
};

export default siteConfig;
