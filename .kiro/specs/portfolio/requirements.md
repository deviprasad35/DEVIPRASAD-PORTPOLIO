# Requirements — Devi Prasad Biswal Portfolio (Frontend)

## 1. Overview
A single-page personal portfolio for Devi Prasad Biswal (Web Developer, B.Tech CSE). Frontend only; backend comes in a later phase. All future API calls are routed through `src/services/api.js` which operates in mock mode until the backend exists.

## 2. Functional Requirements

### 2.1 Navigation
- FR-1: Fixed navbar with logo "DP" on the left and links: About, Skills, Projects, Contact.
- FR-2: Active link highlights via scroll-spy.
- FR-3: Collapses to a hamburger / mobile menu on small screens.
- FR-4: Smooth scroll to target section on link click.

### 2.2 Hero
- FR-5: Display greeting "Hi, I'm", name "Devi Prasad Biswal", and a typing animation cycling through roles from siteConfig.
- FR-6: "View projects" button scrolls to #projects.
- FR-7: "Download resume" button downloads /resume.pdf.
- FR-8: Circular profile photo (public/photo.jpg) with graceful placeholder when missing.
- FR-9: Animated scroll cue at the bottom.
- FR-10: React Bits Gradient Waves background, isolated in components/backgrounds/.

### 2.3 Stats Strip
- FR-11: Three animated count-up counters: Projects, Technologies, Internship — values from siteConfig.
- FR-12: Animate only once when section enters viewport.

### 2.4 About Me
- FR-13: Left side image placeholder; right side: short intro + education line.
- FR-14: Content driven by siteConfig; placeholder text clearly marked.
- FR-15: Scroll-reveal animation on entry.

### 2.5 Skills
- FR-16: Infinite looping skill logo strip: React, Node.js, MongoDB, JavaScript, Tailwind CSS, Express, Git, HTML, CSS.
- FR-17: Pause animation on hover.

### 2.6 Projects
- FR-18: 1 featured card (larger) + 2 regular cards.
- FR-19: Each card: screenshot, title, description, tech tags, Live and GitHub buttons.
- FR-20: Data loaded via api.getProjects() (mock from projects.js with artificial delay).
- FR-21: Loading state and empty state displayed appropriately.
- FR-22: Placeholder projects with obviously fake "#" links.

### 2.7 Experience & Education
- FR-23: Left column: Internship entry + earlier role entry (placeholder).
- FR-24: Right column: B.Tech CSE education card (placeholder).
- FR-25: Animated content on scroll entry.

### 2.8 Contact
- FR-26: Form fields: Name, Email, Message, Send button.
- FR-27: Client-side validation: name 2–80 chars, valid email, message 10–2000 chars. Inline error messages.
- FR-28: Button disabled while sending.
- FR-29: Success and error state feedback; form clears on success.
- FR-30: Submit calls api.sendContact(); no direct fetch in component.
- FR-31: Right side: Magnet-effect social buttons (Email, LinkedIn, GitHub) from siteConfig, opening in new tab with rel="noopener noreferrer".
- FR-32: Click Spark effect on interactions within the section.

### 2.9 Footer
- FR-33: Copyright with auto-generated year.
- FR-34: Social icons.
- FR-35: "Back to top" button visible after scrolling down.

## 3. Data & API Layer
- FR-36: api.js exports getProjects() and sendContact().
- FR-37: Mock mode (VITE_USE_MOCK_API=true) uses local data with artificial delays.
- FR-38: Real mode (VITE_USE_MOCK_API=false) calls VITE_API_URL endpoints.
- FR-39: Real branch properly handles non-2xx responses.

## 4. Non-Functional Requirements
- NFR-1: Runs with zero errors and zero console warnings after npm install + npm run dev.
- NFR-2: npm run build succeeds; npm run preview works.
- NFR-3: Fully responsive at 360px, tablet, desktop. No horizontal scroll.
- NFR-4: prefers-reduced-motion respected — animations disabled or simplified.
- NFR-5: Semantic HTML, alt text, visible focus states, good contrast (WCAG AA target), aria-labels on icon-only buttons.
- NFR-6: SEO: title, meta description, Open Graph tags, favicon, lang="en".
- NFR-7: No real .env files committed; .env.example provided.
- NFR-8: Unique keys in lists; effects and listeners cleaned up on unmount.
- NFR-9: Lazy-load heavy components and images; images have width/height to prevent layout shift.
- NFR-10: Dark theme with purple/violet/blue accents.
- NFR-11: One font pair (Inter + mono accent) via Google Fonts.
