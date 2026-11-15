/*
 * Contact.jsx
 *
 * Messages open in WhatsApp or SMS on the visitor's device — no backend needed.
 */

import { useEffect, useRef, useState } from 'react';
import {
  FiMail, FiMapPin, FiCopy, FiCheck,
  FiArrowUpRight, FiSend,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const EMAIL    = 'biswaldeviprasad35@gmail.com';
const WA_HREF  = 'https://wa.me/918260556219';
const WA_LABEL = '+91 82605 56219';
const LOCATION = 'Bhubaneswar, Odisha, India';

/* ── Fade-up helper ───────────────────────────────────────────────────── */
function useFadeUp(ref, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      obs.disconnect();
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

/* ── Validation ───────────────────────────────────────────────────────── */
const validateField = (name, value) => {
  if (name === 'name'    && !value.trim()) return 'Name is required.';
  if (name === 'email'   && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email.';
  if (name === 'message' && !value.trim()) return 'Message is required.';
  if (name === 'message' && value.trim().length < 5) return 'Message must be at least 5 characters.';
  return '';
};

/* ── Contact row ──────────────────────────────────────────────────────── */
function ContactRow({ icon: Icon, label, children }) {
  return (
    <div
      className="flex items-center gap-4 py-4"
      style={{ borderBottom: '1px solid #2a2a3a' }}
    >
      <Icon size={20} color="#A855F7" aria-hidden="true" style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#94A3B8',
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Underline field ──────────────────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, onBlur, error, disabled, placeholder }) {
  const [focused, setFocused] = useState(false);
  const isTextarea = type === 'textarea';
  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `${focused ? '1.5px' : '1px'} solid ${focused ? '#A855F7' : error ? '#F87171' : '#2a2a3a'}`,
    outline: 'none',
    padding: '8px 0',
    fontSize: 14,
    color: '#fff',
    resize: 'none',
    transition: 'border-color 200ms ease',
    display: 'block',
    fontFamily: 'inherit',
  };
  const labelStyle = {
    display: 'block',
    fontSize: 12,
    color: focused ? '#A855F7' : '#94A3B8',
    marginBottom: 6,
    transition: 'color 200ms ease',
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); onBlur?.(e); }}
          disabled={disabled}
          rows={4}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-err` : undefined}
          aria-invalid={!!error}
          style={{ ...inputStyle, paddingLeft: 0 }}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); onBlur?.(e); }}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={id === 'email' ? 'email' : id === 'name' ? 'name' : 'off'}
          aria-describedby={error ? `${id}-err` : undefined}
          aria-invalid={!!error}
          style={inputStyle}
        />
      )}
      {error && (
        <p id={`${id}-err`} role="alert" style={{ fontSize: 12, color: '#F87171', marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
const INITIAL = { name: '', email: '', message: '' };

const Contact = () => {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  useFadeUp(leftRef, 0);
  useFadeUp(rightRef, 120);

  /* Copy email state */
  const [copied, setCopied] = useState(false);
  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  /* Form state */
  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  /* Mobile detection (pointer: coarse = touch device) */
  const isMobile = typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  /* Build the message text */
  const buildText = () => {
    const { name, email, message } = form;
    const intro = email.trim()
      ? `Hi Devi, I'm ${name.trim()} (${email.trim()}).`
      : `Hi Devi, I'm ${name.trim()}.`;
    return `${intro} ${message.trim()}`;
  };

  /* Validate required fields; return true if all good */
  const validateAll = () => {
    const newErrors = {
      name:    validateField('name',    form.name),
      email:   validateField('email',   form.email),
      message: validateField('message', form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors(p => ({ ...p, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setErrors(p => ({ ...p, [name]: validateField(name, value) }));
  };

  const handleWhatsApp = e => {
    e.preventDefault();
    if (!validateAll()) return;
    const url = `https://wa.me/918260556219?text=${encodeURIComponent(buildText())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSMS = e => {
    e.preventDefault();
    if (!validateAll()) return;
    window.location.href = `sms:+918260556219?&body=${encodeURIComponent(buildText())}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ background: '#0A0A12', padding: '80px 0 96px' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading — preserved exactly ───────────────────────────── */}
        <div className="mb-14 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase">
            Get in touch
          </span>
          <h2
            id="contact-heading"
            className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl"
          >
            Contact Me
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(to right, #A855F7, #7C3AED)' }}
          />
        </div>

        {/* ── Two-column block ─────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-12 md:gap-16 items-start">

          {/* ── LEFT ────────────────────────────────────────────────── */}
          <div ref={leftRef}>
            <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 500, color: '#fff', lineHeight: 1.3, margin: 0 }}>
              Have an idea or an opening? Let&rsquo;s talk.
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#CBD5E1', marginTop: 12, marginBottom: 24 }}>
              I&rsquo;m open to internships and full-time roles as a MERN developer.
            </p>

            {/* Contact rows */}
            <div style={{ borderTop: '1px solid #2a2a3a' }}>

              {/* EMAIL */}
              <ContactRow icon={FiMail} label="EMAIL">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <a
                    href={`mailto:${EMAIL}`}
                    style={{ fontSize: 14, color: '#fff', wordBreak: 'break-all', textDecoration: 'none', transition: 'color 200ms' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#A855F7'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#fff'; }}
                  >
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? 'Copied' : 'Copy email address'}
                    style={{
                      background: 'none', border: 'none', padding: 4, cursor: 'pointer',
                      color: copied ? '#A855F7' : '#94A3B8', flexShrink: 0,
                      display: 'flex', alignItems: 'center', gap: 4,
                      transition: 'color 200ms', fontSize: 12,
                    }}
                    onMouseEnter={e => { if (!copied) e.currentTarget.style.color = '#A855F7'; }}
                    onMouseLeave={e => { if (!copied) e.currentTarget.style.color = '#94A3B8'; }}
                  >
                    {copied
                      ? <><FiCheck size={16} aria-hidden="true" /> Copied</>
                      : <FiCopy size={18} aria-hidden="true" />
                    }
                  </button>
                </div>
              </ContactRow>

              {/* WHATSAPP */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none' }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.wa-value').style.color = '#A855F7';
                  const arrow = e.currentTarget.querySelector('.wa-arrow');
                  if (arrow) arrow.style.transform = 'translate(2px, -2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.wa-value').style.color = '#fff';
                  const arrow = e.currentTarget.querySelector('.wa-arrow');
                  if (arrow) arrow.style.transform = 'translate(0, 0)';
                }}
              >
                <div className="flex items-center gap-4 py-4" style={{ borderBottom: '1px solid #2a2a3a' }}>
                  <FaWhatsapp size={20} color="#A855F7" aria-hidden="true" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>
                      WHATSAPP
                    </div>
                    <span className="wa-value" style={{ fontSize: 14, color: '#fff', transition: 'color 200ms' }}>
                      {WA_LABEL}
                    </span>
                  </div>
                  <FiArrowUpRight size={18} color="#94A3B8" className="wa-arrow"
                    style={{ flexShrink: 0, transition: 'transform 200ms ease' }} aria-hidden="true" />
                </div>
              </a>

              {/* BASED IN */}
              <ContactRow icon={FiMapPin} label="BASED IN">
                <span style={{ fontSize: 14, color: '#fff' }}>{LOCATION}</span>
              </ContactRow>

            </div>
          </div>

          {/* ── RIGHT — form ──────────────────────────────────────── */}
          <div ref={rightRef}>
            <form noValidate aria-label="Contact form">

              <Field
                id="name"
                label="Name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                placeholder="Your name"
              />
              <Field
                id="email"
                label="Email (optional)"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                placeholder="you@company.com"
              />
              <Field
                id="message"
                label="Message"
                type="textarea"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                placeholder="Tell me about the role or project"
              />

              {/* Helper text */}
              <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
                Your message opens in WhatsApp or SMS, ready to send.
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>

                {/* WhatsApp — always visible */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#7C3AED', color: '#fff',
                    fontSize: 14, fontWeight: 500,
                    padding: '10px 20px', borderRadius: 10, border: 'none',
                    cursor: 'pointer',
                    transition: 'background 200ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#A855F7'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#7C3AED'; }}
                >
                  <FiSend size={16} aria-hidden="true" />
                  Send via WhatsApp
                </button>

                {/* SMS — mobile only */}
                {isMobile && (
                  <button
                    type="button"
                    onClick={handleSMS}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: 'transparent', color: '#CBD5E1',
                      fontSize: 14, fontWeight: 500,
                      padding: '9px 18px', borderRadius: 10,
                      border: '1px solid #3b3b56',
                      cursor: 'pointer',
                      transition: 'border-color 200ms ease, color 200ms ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#A855F7';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#3b3b56';
                      e.currentTarget.style.color = '#CBD5E1';
                    }}
                  >
                    Send via SMS
                  </button>
                )}

              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
