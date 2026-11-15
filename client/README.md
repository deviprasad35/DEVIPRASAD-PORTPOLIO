# Devi Prasad Biswal — Portfolio (Frontend)

A production-quality personal portfolio built with **React + Vite + Tailwind CSS v4**, featuring React Bits animations, a WebGL gradient-wave hero background, and a fully-wired API layer ready for the backend phase.

---

## Quick Start

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Default | Purpose |
|---|---|---|
| `VITE_USE_MOCK_API` | `true` | `true` = mock mode (no backend needed), `false` = real backend |
| `VITE_API_URL` | `http://localhost:5000` | Backend base URL (only used when mock is off) |

> **Note:** The contact form is in mock mode and **does not send emails or store data** until `VITE_USE_MOCK_API=false` and the backend is running.

---

## How to Edit Content

All personal content is in two files:

### `src/config/siteConfig.js`
Edit this to change:
- Your name, initials, roles (typing animation)
- About text and education
- Stats counters (Projects, Technologies, Internship)
- Experience / internship entries
- Social links (email, LinkedIn, GitHub)
- SEO title, description, og:image URL, siteUrl

### `src/data/projects.js`
Edit this to change project cards:
- `title`, `description`, `techStack[]`
- `image` path (put screenshots in `/public/screenshots/`)
- `liveUrl`, `githubUrl`
- `featured: true` for the large hero card (only one should be featured)

---

## Replace Placeholder Files

| File | Where to put it | Notes |
|---|---|---|
| `public/photo.jpg` | `/client/public/photo.jpg` | Your profile photo. Recommended: square, ≥ 400×400px |
| `public/resume.pdf` | `/client/public/resume.pdf` | Your resume/CV PDF |
| `public/screenshots/project-1.png` etc. | `/client/public/screenshots/` | 16:9 aspect ratio recommended |
| `public/og-image.png` | `/client/public/og-image.png` | Open Graph image, 1200×630px |
| `public/favicon.svg` | `/client/public/favicon.svg` | Replace with your own (current is a "DP" gradient) |

---

## Mock Mode Explained

`VITE_USE_MOCK_API=true` (default):
- `api.getProjects()` returns data from `src/data/projects.js` with a 600ms artificial delay
- `api.sendContact()` logs to the console (dev only) and returns `{ success: true }` — **no email is sent, nothing is stored**

Switch to real backend:
1. Set `VITE_USE_MOCK_API=false` in `.env`
2. Set `VITE_API_URL=https://your-backend.com`
3. The backend must implement:
   - `GET /api/projects` → `[{ title, description, techStack, image, liveUrl, githubUrl, featured, order }]`
   - `POST /api/contact` with `{ name, email, message }` → `{ success: true }` or `{ success: false, error }`

---

## React Bits Components Used

| Section | React Bits Component | Source URL |
|---|---|---|
| Hero background | GradientWaves | https://reactbits.dev/backgrounds/gradient-waves |
| Hero typing | TextType | https://reactbits.dev/text-animations/text-type |
| Stats | CountUp | https://reactbits.dev/text-animations/count-up |
| About | AnimatedContent (custom impl) | https://reactbits.dev/animations/animated-content |
| Skills | LogoLoop | https://reactbits.dev/animations/logo-loop |
| Projects | SpotlightCard | https://reactbits.dev/components/spotlight-card |
| Experience | AnimatedContent | https://reactbits.dev/animations/animated-content |
| Contact social | Magnet | https://reactbits.dev/animations/magnet |
| Contact clicks | ClickSpark | https://reactbits.dev/animations/click-spark |

**Substitutions (noted per requirements):**
- ScrollReveal (About section heading) — replaced by `AnimatedContent` for general section reveal; `ScrollReveal` (GSAP-based) is included in `src/reactbits/ScrollReveal.jsx` and can be used for text paragraphs.
- LogoLoop — custom reimplementation matching the React Bits API (full source was truncated in registry fetch).
- AnimatedContent — faithful reimplementation matching the React Bits prop API, using IntersectionObserver.

---

## Deployment

### Vercel (recommended)

1. Push the `/client` folder to a Git repo (or the monorepo root).
2. Create a new Vercel project and set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Add environment variables in Vercel dashboard:
   - `VITE_USE_MOCK_API=true` (until backend is live)
   - `VITE_API_URL=https://your-backend.com` (backend phase)
5. Deploy.

### Netlify

1. Set **Base directory** to `client`.
2. Set **Build command** to `npm run build`.
3. Set **Publish directory** to `client/dist`.
4. Add environment variables in Netlify dashboard.
5. Add a `netlify.toml` for SPA routing:

```toml
[[redirects]]
  from = "/*"
  to   = "/index.html"
  status = 200
```

---

## Final Checklist — Replace Before Launch

- [ ] `public/photo.jpg` — your actual profile photo
- [ ] `public/resume.pdf` — your actual resume
- [ ] `src/config/siteConfig.js` — real about text, education details, experience
- [ ] `src/config/siteConfig.js` — real social links (email, LinkedIn, GitHub)
- [ ] `src/data/projects.js` — real project titles, descriptions, liveUrl, githubUrl
- [ ] `public/screenshots/project-*.png` — real project screenshots
- [ ] `public/og-image.png` — Open Graph image (1200×630)
- [ ] `index.html` → `og:url` / `siteUrl` in siteConfig — your deployed domain
- [ ] `public/favicon.svg` / `.png` — your custom favicon

---

## Project Structure

```
client/
├── public/
│   ├── favicon.svg
│   ├── photo.jpg          ← REPLACE
│   ├── resume.pdf         ← REPLACE
│   └── screenshots/       ← REPLACE
├── src/
│   ├── components/
│   │   ├── backgrounds/
│   │   │   └── GradientWaves.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── BackToTop.jsx
│   ├── config/
│   │   └── siteConfig.js  ← EDIT THIS
│   ├── data/
│   │   └── projects.js    ← EDIT THIS
│   ├── hooks/
│   │   ├── useScrollSpy.js
│   │   └── useReducedMotion.js
│   ├── reactbits/         ← React Bits component sources
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```
