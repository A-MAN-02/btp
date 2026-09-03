import { useState } from 'react';
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
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
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
      <div className={`header__mobile-menu ${isOpen ? 'header__mobile-menu--open' : ''}`}>
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

      {/* All CSS for this component lives right here — edit freely */}
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 80px;
          background: #13c2c22b;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
        }

        .header__container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 clamp(20px, 4vw, 56px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

        /* Div 1 — Logo */
        .header__logo {
  flex-shrink: 0;
}

.header__logo img {
  height: clamp(50px, 5.5vw, 62px);
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
  gap: clamp(10px, 1.2vw, 20px);
  flex-wrap: nowrap;
}

.header__link {
  position: relative;
  font-size: clamp(16px, 1.5vw, 19px);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--color-navy-deep);
  padding: 6px 0;
  white-space: nowrap;
  transition: color 0.25s ease;
}

        .header__link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
          transform: translateX(-50%);
          transition: width 0.25s ease;
        }

        .header__link:hover,
        .header__link--active {
          color: var(--color-steel);
        }

        .header__link:hover::after,
        .header__link--active::after {
          width: 100%;
        }

        /* Div 3 — CTA + mobile toggle */
        .header__actions {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
}

.header__btn {
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: clamp(10px, 1vw, 13px) clamp(18px, 2vw, 28px);
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
          gap: 6px;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
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
          transform: translateY(8px) rotate(45deg);
        }
        .header__toggle--active span:nth-child(2) {
          opacity: 0;
        }
        .header__toggle--active span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile menu panel */
        .header__mobile-menu {
          display: none;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-surface);
        }

        .header__mobile-menu--open {
          display: block;
        }

        .header__mobile-list {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .header__mobile-list .header__link {
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .header__mobile-list .header__link::after {
          display: none;
        }

        .header__mobile-btn {
          margin-top: 12px;
          text-align: center;
          border-radius: 4px;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          color: #fff;
          padding: 13px;
          font-size: 14px;
          font-weight: 600;
        }

        @media (max-width: 968px) {
          .header__nav,
          .header__btn {
            display: none;
          }
          .header__toggle {
            display: flex;
          }
        }
          @media (max-width: 1180px) {
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