import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import useScrollSpy from '../hooks/useScrollSpy';
import siteConfig from '../config/siteConfig';
import logoSrc from '../assets/logo.svg';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

const Navbar = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [logoShift, setLogoShift] = useState(0);   // px to slide logo left
  const activeId = useScrollSpy(SECTION_IDS);
  const logoRef  = useRef(null);

  // ── Logo slide on scroll ─────────────────────────────────────────────
  useEffect(() => {
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Measure the logo's natural left position (before any transform).
    // We store this once and only re-measure on resize.
    const measure = () => {
      if (reduced || window.innerWidth < 768 || !logoRef.current) {
        setLogoShift(0);
        return;
      }
      // Temporarily remove any existing transform so we measure the true layout position.
      const el = logoRef.current;
      const prev = el.style.transform;
      el.style.transform = 'none';
      const left = el.getBoundingClientRect().left;
      el.style.transform = prev;
      setLogoShift(Math.max(0, left - 24));
    };

    measure();

    const onResize = () => {
      measure();
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Determine whether to apply the shift (scrolled > 80px, desktop, no reduced motion).
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onScroll = () => {
      if (reduced || window.innerWidth < 768) { setScrolled(false); return; }
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (href) => activeId === href.replace('#', '');

  return (
    <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      {/* Shared container — same max-w and px as hero content */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10"
        style={{ height: '64px' }}
        aria-label="Main navigation"
      >
        {/* ── Logo — slides left on scroll ── */}
        <a
          ref={logoRef}
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex-shrink-0 hover:scale-105
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
          aria-label="Devi Prasad Biswal — Go to home"
          style={{
            transform: scrolled ? `translateX(-${logoShift}px)` : 'translateX(0)',
            transition: 'transform 400ms ease, scale 200ms ease',
            willChange: 'transform',
          }}
        >
          <img
            src={logoSrc}
            alt="DP logo"
            style={{ height: '52px', width: 'auto', display: 'block', background: 'transparent' }}
          />
        </a>

        {/* ── Desktop links — stay in place ── */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`
                  relative py-1.5 px-1 text-sm font-medium transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded
                  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full
                  after:bg-gradient-to-r after:from-purple-400 after:to-blue-400
                  after:transition-all after:duration-300
                  ${isActive(href)
                    ? 'text-purple-300 after:w-full'
                    : 'text-slate-300 hover:text-white after:w-0 hover:after:w-full'}
                `}
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white
                     transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          onClick={() => setMenuOpen((p) => !p)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul
          className="flex flex-col gap-1 mx-auto max-w-7xl px-6 pb-4 bg-[#0A0A12]/95 backdrop-blur-md border-b border-white/10"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`block w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                  ${isActive(href) ? 'text-purple-300 bg-purple-600/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
