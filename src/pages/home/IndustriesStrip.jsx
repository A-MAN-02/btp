import { useEffect, useRef } from 'react';

const INDUSTRIES = [
  {
    title: 'Aerospace & Defense',
    icon: <path d="M10 13 3 16v-2l7-4V5a2 2 0 0 1 4 0v5l7 4v2l-7-3v4l2 1.5V16l-3-1-3 1v-1.5L10 17v-4Z" />,
  },
  {
    title: 'Telecom & 5G / RAN',
    icon: (
      <>
        <path d="M12 21V10M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M7 8a7 7 0 0 0 0 8M17 8a7 7 0 0 1 0 8M4.5 5.5a11 11 0 0 0 0 13M19.5 5.5a11 11 0 0 1 0 13" />
      </>
    ),
  },
  {
    title: 'Semiconductor & Chip Design',
    icon: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
      </>
    ),
  },
  {
    title: 'Consumer Electronics',
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M10.5 18.5h3" />
      </>
    ),
  },
  {
    title: 'Automotive & EV',
    icon: (
      <>
        <path d="M4 16V11l2-4h9l3 4h1v5" />
        <circle cx="8" cy="17" r="1.8" />
        <circle cx="16.5" cy="17" r="1.8" />
        <path d="M4 16h2M17.5 16H20v-2" />
      </>
    ),
  },
  {
    title: 'Industrial IoT',
    icon: (
      <>
        <path d="M3 20V10l5 3V10l5 3V8l6-3v15H3Z" />
        <path d="M7 20v-3M11.5 20v-3M16 20v-4" />
      </>
    ),
  },
  {
    title: 'Enterprise Software',
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="12" rx="1.5" />
        <path d="M3.5 8.5h17M8 20.5h8" />
      </>
    ),
  },
  {
    title: 'Data, Cloud & AI',
    icon: (
      <>
        <path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 8a4.5 4.5 0 0 1 1 8.9" />
        <path d="M12 18v3M9 21h6" />
      </>
    ),
  },
];

export default function IndustriesStrip() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.industries__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('industries__reveal--show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('industries__reveal--show'), (i % 8) * 50);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="industries" id="industries" ref={sectionRef}>
      <div className="industries__container">
        <div className="industries__intro industries__reveal">
          <p className="industries__eyebrow">
            <span className="industries__eyebrow-dot" aria-hidden="true" />
            Where We Add Value
          </p>
          <h2 className="industries__heading">Industries We Serve</h2>
          <p className="industries__body">
            Our reach spans deep-tech engineering &mdash; rooted in Bharyat Advanced
            Systems&rsquo; own OEM relationships &mdash; as well as the software, cloud and data
            functions every technology business runs on.
          </p>

          <div className="industries__stat">
            <span className="industries__stat-figure">08</span>
            <span className="industries__stat-divider" aria-hidden="true" />
            <span className="industries__stat-label">Verticals we design, build and ship for</span>
          </div>
        </div>

        <div className="industries__grid">
          <span className="industries__tick industries__tick--tl" aria-hidden="true" />
          <span className="industries__tick industries__tick--tr" aria-hidden="true" />
          <span className="industries__tick industries__tick--bl" aria-hidden="true" />
          <span className="industries__tick industries__tick--br" aria-hidden="true" />

          {INDUSTRIES.map((industry) => (
            <div className="industries__cell industries__reveal" key={industry.title} tabIndex={0}>
              <span className="industries__cell-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {industry.icon}
                </svg>
              </span>
              <span className="industries__cell-title">{industry.title}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .industries {
          position: relative;
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: clamp(56px, 8vw, 96px) 0;
        }

        .industries__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 48px;
        }

        /* ---------- Intro column ---------- */
        .industries__intro {
          align-self: start;
          position: sticky;
          top: 100px;
        }

        .industries__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 14px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-gold);
        }

        .industries__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .industries__heading {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.25;
          color: var(--color-navy-deep);
        }

        .industries__body {
          margin: 16px 0 0;
          max-width: 42ch;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--color-text-muted);
        }

        /* A grounded, real stat (8 items above) instead of empty space below the copy */
        .industries__stat {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
        }

        .industries__stat-figure {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 36px;
          line-height: 1;
          color: var(--color-gold);
        }

        .industries__stat-divider {
          width: 1px;
          height: 30px;
          background: var(--color-border);
          flex-shrink: 0;
        }

        .industries__stat-label {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.45;
          color: var(--color-text-muted);
          max-width: 20ch;
        }

        /* ---------- Grid ---------- */
        .industries__grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--color-border);
          border: 1px solid var(--color-border);
        }

        .industries__tick {
          position: absolute;
          width: 12px;
          height: 12px;
          color: var(--color-gold);
          opacity: 0.55;
          pointer-events: none;
        }

        .industries__tick::before,
        .industries__tick::after {
          content: '';
          position: absolute;
          background: currentColor;
        }

        .industries__tick::before {
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          transform: translateY(-50%);
        }

        .industries__tick::after {
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          transform: translateX(-50%);
        }

        .industries__tick--tl { top: -6px; left: -6px; }
        .industries__tick--tr { top: -6px; right: -6px; }
        .industries__tick--bl { bottom: -6px; left: -6px; }
        .industries__tick--br { bottom: -6px; right: -6px; }

        .industries__cell {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 22px 22px 19px;
          background: var(--color-surface);
          border-left: 3px solid transparent;
          outline: none;
          cursor: default;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .industries__cell:hover,
        .industries__cell:focus-visible {
          background: var(--color-bg);
          border-left-color: var(--color-gold);
        }

        .industries__cell-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 151, 44, 0.12);
          color: var(--color-gold);
          transition: background 0.2s ease;
        }

        .industries__cell-icon svg {
          width: 18px;
          height: 18px;
        }

        .industries__cell:hover .industries__cell-icon,
        .industries__cell:focus-visible .industries__cell-icon {
          background: rgba(201, 151, 44, 0.2);
        }

        .industries__cell-title {
          font-family: var(--font-body);
          font-size: 15.5px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--color-navy-deep);
        }

        /* ---------- Reveal animation ---------- */
        .industries__reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .industries__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .industries__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .industries__container {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .industries__intro {
            position: static;
          }
          .industries__body {
            max-width: 60ch;
          }
        }

        @media (max-width: 640px) {
          .industries__grid {
            grid-template-columns: 1fr;
          }
          .industries__cell {
            padding: 18px 18px 18px 16px;
          }
        }

        @media (max-width: 720px) {
          .industries {
            padding: 44px 0;
          }
        }
      `}</style>
    </section>
  );
}