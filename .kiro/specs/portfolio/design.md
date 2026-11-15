# Design — Devi Prasad Biswal Portfolio

## 1. Visual Language

### Color Palette
| Token | Value | Usage |
|---|---|---|
| bg-base | #0a0a0f | Page background |
| bg-surface | #111118 | Card / section backgrounds |
| bg-elevated | #1a1a2e | Elevated cards, navbar |
| accent-primary | #7c3aed | Primary CTA (purple-600) |
| accent-secondary | #6d28d9 | Hover states (purple-700) |
| accent-blue | #3b82f6 | Secondary accents |
| accent-violet | #8b5cf6 | Gradient stops |
| text-primary | #f8fafc | Headings |
| text-secondary | #94a3b8 | Body copy |
| text-muted | #475569 | Placeholders, meta |
| border | #1e1e2e | Subtle borders |

### Typography
- **Display / Headings**: `Inter`, weights 600, 700, 800
- **Body**: `Inter`, weight 400, 500
- **Mono accent**: `JetBrains Mono` (small badges, tech tags)
- Loaded via Google Fonts in `index.html`

### Spacing & Layout
- Max content width: 1200px, centered with `mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-20` (desktop), `py-14` (mobile)
- Grid system: Tailwind grid/flex, 12-column mental model

### Gradients
- Hero heading: `bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent`
- CTA button: `bg-gradient-to-r from-purple-600 to-violet-600`
- Section dividers: subtle radial glow using pseudo-elements

## 2. Component Architecture

```
src/
├── components/
│   ├── Navbar.jsx            # Pill Nav (React Bits)
│   ├── Hero.jsx              # Hero section
│   ├── Stats.jsx             # Count Up strip
│   ├── About.jsx             # Scroll Reveal about
│   ├── Skills.jsx            # Logo Loop
│   ├── Projects.jsx          # Tilted/Spotlight cards
│   ├── Experience.jsx        # Animated timeline
│   ├── Contact.jsx           # Form + Magnet + Click Spark
│   ├── Footer.jsx            # Footer
│   ├── BackToTop.jsx         # Back to top button
│   └── backgrounds/
│       └── GradientWaves.jsx # Isolated animated background
├── config/
│   └── siteConfig.js         # All content / social / stats
├── data/
│   └── projects.js           # Static project data
├── services/
│   └── api.js                # Mock/real API layer
├── hooks/
│   ├── useScrollSpy.js       # Active nav section detection
│   └── useReducedMotion.js   # prefers-reduced-motion
└── assets/
    └── (images, svg icons)
```

## 3. Section Designs

### 3.1 Navbar
- Height: 64px; `backdrop-blur-md` on scroll; `bg-elevated/80`
- Logo "DP" in gradient text, font-bold
- Desktop: horizontal pill nav; Mobile: slide-down menu
- Active link: purple underline or pill highlight

### 3.2 Hero
- Full viewport height (`min-h-screen`)
- Two-column on desktop (text left, image right); stacked on mobile
- Heading hierarchy: small muted "Hi, I'm" → large bold name → medium roles typing
- Gradient Waves background at z-0, content at z-10
- CTA buttons: primary (gradient fill) + secondary (outline)
- Photo: 200×200px circle, border with purple glow

### 3.3 Stats Strip
- Three cards in a row, each with large count number + label
- Background: `bg-surface` with subtle border
- Numbers: gradient text color

### 3.4 About
- Two columns 40/60 on desktop; image has aspect-ratio box
- Section heading with decorative underline accent

### 3.5 Skills
- Full-width ticker/marquee, two rows or single row
- Each skill: icon + label chip
- CSS animation `marquee` with `animation-play-state: paused` on hover

### 3.6 Projects
- Featured card: full-width or 2/3 width with larger image
- Regular cards: 2-col grid
- Card: image top, content below, tech tags, two action buttons
- Hover: subtle lift + purple border glow (unless React Bits Tilted handles it)

### 3.7 Experience & Education
- Timeline style left column; education card right column
- Dot + line connector for timeline entries

### 3.8 Contact
- Two-column: form left (60%), social right (40%)
- Form: dark input fields with purple focus ring
- Social links: circular magnetic buttons

### 3.9 Footer
- Single row: copyright left, social icons center, back-to-top right

## 4. Animation Summary
| Section | React Bits Component | Fallback |
|---|---|---|
| Navbar | Pill Nav | Custom sticky nav |
| Hero BG | Gradient Waves | CSS gradient |
| Hero text | TextType (typing) | CSS blink cursor |
| Stats | CountUp | CSS counter |
| About | ScrollReveal | Intersection Observer fade |
| Skills | LogoLoop / Marquee | CSS infinite marquee |
| Projects | TiltedCard or SpotlightCard | CSS card with hover |
| Experience | AnimatedContent | Intersection Observer fade |
| Contact social | Magnet | CSS scale hover |
| Contact clicks | ClickSpark | CSS ripple |

## 5. Responsive Breakpoints
| Breakpoint | Width | Key changes |
|---|---|---|
| xs | 360px | Single column, 16px font base |
| sm | 640px | Minor layout adjustments |
| md | 768px | Two columns emerge |
| lg | 1024px | Full desktop layout |
| xl | 1280px | Max-width container clamps |

## 6. Accessibility
- All interactive elements reachable via Tab
- Focus ring: `focus-visible:ring-2 focus-visible:ring-purple-500`
- Reduced motion: `@media (prefers-reduced-motion: reduce)` removes transitions/animations
- Color contrast: text-primary on bg-base ≥ 7:1; text-secondary ≥ 4.5:1
- Images: meaningful alt text; decorative backgrounds have `aria-hidden="true"`
