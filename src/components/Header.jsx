import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/how-we-work', label: 'How We Work' },
  { path: '/expertise', label: 'Expertise' },
  { path: '/industries', label: 'Industries' },
  { path: '/why-bharyat', label: 'Why Bharyat' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Div 1 — Logo */}
        <div className="header__logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Bharyat Talent Partners" />
          </Link>
        </div>

        {/* Div 2 — Nav links */}
        <nav className="header__nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Div 3 — CTA + mobile toggle */}
        <div className="header__actions">
          <Link to="/contact" className="header__btn">
            Start a Search
          </Link>

          <button
            className={`header__toggle ${isOpen ? 'header__toggle--active' : ''}`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`header__mobile-menu ${isOpen ? 'header__mobile-menu--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="header__mobile-list">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={closeMenu} className="header__mobile-btn">
            Start a Search
          </Link>
        </div>
      </div>

      {/* Backdrop behind the mobile menu */}
      {isOpen && <button className="header__backdrop" aria-label="Close menu" onClick={closeMenu} />}

      {/* All CSS for this component lives right here — edit freely */}
      <style>{`
        * { box-sizing: border-box; }

        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          height: 78px;
          background: linear-gradient(135deg, rgba(196, 232, 253, 0.85), rgba(166, 216, 247, 0.72));
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          border-bottom: 1px solid rgba(27, 75, 115, 0.16);
          transition: box-shadow 0.25s ease, background 0.25s ease, height 0.25s ease;
        }

        .header--scrolled {
          height: 68px;
          background: linear-gradient(135deg, rgba(210, 238, 253, 0.96), rgba(178, 222, 249, 0.92));
          box-shadow: 0 8px 24px -14px rgba(11, 30, 61, 0.35);
        }

        .header__container {
          max-width: 1440px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 0 clamp(18px, 3vw, 48px) 0 clamp(8px, 1.4vw, 20px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* Div 1 — Logo */
        .header__logo {
          flex-shrink: 0;
          min-width: 0;
          margin-left: clamp(-14px, -1.2vw, -6px);
        }

        .header__logo img {
          height: clamp(42px, 4.2vw, 54px);
          width: auto;
          display: block;
          transition: transform 0.2s ease;
        }

        .header__logo:hover img {
          transform: scale(1.03);
        }

        /* Div 2 — Nav links */
        .header__nav {
          display: flex;
          align-items: center;
          gap: clamp(2px, 0.4vw, 6px);
          flex-wrap: nowrap;
          flex-shrink: 1;
          min-width: 0;
        }

        .header__link {
          position: relative;
          display: inline-block;
          font-size: 14.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--color-navy-deep);
          padding: 8px 12px;
          border-radius: 999px;
          white-space: nowrap;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .header__link:hover {
          color: var(--color-steel);
          background: rgba(27, 75, 115, 0.08);
        }

        .header__link--active {
          color: var(--color-navy-deep);
          font-weight: 700;
          background: rgba(201, 151, 44, 0.14);
        }

        /* Div 3 — CTA + mobile toggle */
        .header__actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .header__btn {
          display: inline-flex;
          align-items: center;
          border: none;
          border-radius: 999px;
          color: #fff;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          padding: 11px 22px;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          box-shadow: 0 4px 14px rgba(11, 30, 61, 0.25);
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .header__btn:hover {
          background: linear-gradient(135deg, var(--color-steel), var(--color-navy-deep));
          box-shadow: 0 6px 20px rgba(11, 30, 61, 0.35);
          transform: translateY(-2px);
        }

        .header__toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 32px;
          height: 32px;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .header__toggle span {
          display: block;
          height: 2px;
          width: 100%;
          background-color: var(--color-navy-deep);
          border-radius: 2px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .header__toggle--active span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .header__toggle--active span:nth-child(2) {
          opacity: 0;
        }
        .header__toggle--active span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Backdrop */
        .header__backdrop {
          position: fixed;
          inset: 78px 0 0 0;
          border: none;
          padding: 0;
          background: rgba(11, 30, 61, 0.35);
          z-index: 45;
          cursor: default;
          animation: headerFadeIn 0.2s ease;
        }

        @keyframes headerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Mobile menu panel */
        .header__mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 46;
          max-height: 0;
          overflow: hidden;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          box-shadow: 0 16px 32px -18px rgba(11, 30, 61, 0.3);
          transition: max-height 0.32s ease;
        }

        .header__mobile-menu--open {
          max-height: 640px;
        }

        .header__mobile-list {
          max-width: 1440px;
          margin: 0 auto;
          padding: 12px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .header__mobile-list .header__link {
          border-radius: 8px;
          padding: 13px 14px;
        }

        .header__mobile-btn {
          margin-top: 12px;
          text-align: center;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          color: #fff;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
        }

        /* Single, reliable breakpoint — nav + CTA hide together, hamburger takes over.
           Raised so long nav labels never get squeezed into overflow first. */
        @media (max-width: 1260px) {
          .header__nav,
          .header__btn {
            display: none;
          }
          .header__toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}