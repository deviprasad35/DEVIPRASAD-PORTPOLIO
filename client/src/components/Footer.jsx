import { FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const LINKS = [
  {
    href:  'mailto:biswaldeviprasad35@gmail.com',
    label: 'Send an email',
    Icon:  FiMail,
  },
  {
    href:  'https://wa.me/918260556219',
    label: 'Chat on WhatsApp',
    Icon:  FaWhatsapp,
    external: true,
  },
];

const Footer = () => (
  <footer
    role="contentinfo"
    aria-label="Site footer"
    style={{ background: '#0A0A12', borderTop: '1px solid rgba(255,255,255,0.1)' }}
    className="py-4"
  >
    <nav aria-label="Social media links">
      <ul className="flex justify-center gap-3" role="list">
        {LINKS.map(({ href, label, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center rounded-full border border-white/10 text-slate-500
                         transition-all duration-200
                         hover:-translate-y-0.5 hover:border-purple-500/50 hover:text-purple-400
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              style={{ width: 36, height: 36 }}
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);

export default Footer;
