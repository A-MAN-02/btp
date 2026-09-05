import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const DOMAINS = [
  {
    title: 'IT Products & Services',
    tags: ['Full-Stack', 'Product Mgmt', 'QA', 'Pre-Sales', 'DevOps Mgmt'],
    icon: <path d="M4 5h16v11H4V5Zm0 11-2 4h20l-2-4M9 20h6" />,
  },
  {
    title: 'Cloud & AI',
    tags: ['AWS / Azure / GCP', 'MLOps', 'GenAI & LLM', 'SRE', 'IaC'],
    icon: <path d="M7 16a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 0 1 17 16H7Z" />,
  },
  {
    title: 'Semiconductor & Engineering',
    tags: ['FPGA / ASIC', 'RTL Design', 'Chip Design', 'DFT'],
    icon: <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7V7Zm3 3h4v4h-4v-4Z" />,
  },
  {
    title: 'RF, mmWave & Wireless',
    tags: ['5G / Satellite', 'Antenna Design', 'SI / PI', 'RFSoC & SDR'],
    icon: <path d="M12 20a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM8.5 15a5 5 0 0 1 7 0M5.5 11.5a9.5 9.5 0 0 1 13 0M2.5 8a14 14 0 0 1 19 0" />,
  },
  {
    title: 'Mechanical & Systems',
    tags: ['CFD / FEA', 'Chassis Design', 'DFM / DFA', 'Reliability'],
    icon: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.4 5.5-1.6.5a7 7 0 0 1-.8 1.9l.9 1.4-1.4 1.4-1.4-.9a7 7 0 0 1-1.9.8l-.5 1.6h-2l-.5-1.6a7 7 0 0 1-1.9-.8l-1.4.9-1.4-1.4.9-1.4a7 7 0 0 1-.8-1.9l-1.6-.5v-2l1.6-.5a7 7 0 0 1 .8-1.9l-.9-1.4 1.4-1.4 1.4.9a7 7 0 0 1 1.9-.8l.5-1.6h2l.5 1.6a7 7 0 0 1 1.9.8l1.4-.9 1.4 1.4-.9 1.4a7 7 0 0 1 .8 1.9l1.6.5v2Z" />,
  },
  {
    title: 'Hardware & Embedded',
    tags: ['Embedded C/C++', 'BSP & Firmware', 'IoT & Edge', 'RTOS / Drivers'],
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  },
];

export default function ExpertisePreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.expertise__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('expertise__reveal--show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('expertise__reveal--show'), (i % 7) * 80);
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
    <section className="expertise" id="expertise" ref={sectionRef}>
      <div className="expertise__container">
        <div className="expertise__head expertise__reveal">
          <div>
            <p className="expertise__eyebrow">
              <span className="expertise__eyebrow-dot" aria-hidden="true" />
              What We Hire For
            </p>
            <h2 className="expertise__heading">Technical Domains We Hire For</h2>
            <p className="expertise__body">
              Specialised pipelines across six strategic pillars &mdash; not one generic pool
              stretched across every requisition.
            </p>
          </div>

          <Link to="/expertise" className="expertise__link">
            Explore all technical domains
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="expertise__grid">
          {DOMAINS.map((domain) => (
            <div className="expertise__card expertise__reveal" key={domain.title} tabIndex={0}>
              <div className="expertise__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {domain.icon}
                </svg>
              </div>

              <h3 className="expertise__card-title">{domain.title}</h3>

              <div className="expertise__card-tags">
                {domain.tags.map((tag) => (
                  <span className="expertise__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <span className="expertise__card-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
          ))}
        </div>

        <div className="expertise__mobile-link-wrap">
          <Link to="/expertise" className="expertise__link expertise__link--mobile">
            Explore all technical domains
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .expertise {
          position: relative;
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: clamp(36px, 5vw, 56px) 0;
          overflow: hidden;
        }

        .expertise::before {
          content: '';
          position: absolute;
          bottom: -12%;
          left: -8%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(201, 151, 44, 0.08), transparent 68%);
          pointer-events: none;
        }

        .expertise__container {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        .expertise__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 28px;
        }

        .expertise__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 10px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-gold);
        }

        .expertise__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .expertise__heading {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.25;
          color: var(--color-navy-deep);
          max-width: 640px;
        }

        .expertise__body {
          margin: 10px 0 0;
          max-width: 56ch;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--color-text-muted);
        }

        .expertise__link {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: var(--color-navy-deep);
          padding: 10px 4px;
          border-bottom: 2px solid var(--color-gold);
          white-space: nowrap;
          transition: gap 0.2s ease, color 0.2s ease;
        }

        .expertise__link svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .expertise__link:hover {
          color: var(--color-steel);
          gap: 12px;
        }

        .expertise__link:hover svg {
          transform: translateX(2px);
        }

        .expertise__link--mobile {
          display: none;
        }

        /* ---------- Grid ---------- */
        .expertise__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .expertise__card {
          position: relative;
          isolation: isolate;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 18px 18px 20px;
          cursor: default;
          outline: none;
          transition: box-shadow 0.28s ease, border-color 0.28s ease;
        }

        /* Hover / keyboard-focus driven entirely by CSS — no JS state,
           so a transform-triggered mouseleave can never cause a flicker loop. */
        .expertise__card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .expertise__card > * {
          position: relative;
          z-index: 1;
        }

        .expertise__card:hover,
        .expertise__card:focus-visible {
          border-color: transparent;
          box-shadow: 0 16px 34px -18px rgba(11, 30, 61, 0.4);
        }

        .expertise__card:hover::before,
        .expertise__card:focus-visible::before {
          opacity: 1;
        }

        .expertise__card-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 151, 44, 0.14);
          color: var(--color-gold);
          margin-bottom: 12px;
          transition: background 0.28s ease, color 0.28s ease;
        }

        .expertise__card-icon svg {
          width: 19px;
          height: 19px;
        }

        .expertise__card:hover .expertise__card-icon,
        .expertise__card:focus-visible .expertise__card-icon {
          background: rgba(228, 184, 92, 0.18);
          color: var(--color-gold-light);
        }

        .expertise__card-title {
          margin: 0 0 10px;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: 16.5px;
          line-height: 1.28;
          color: var(--color-navy-deep);
          transition: color 0.28s ease;
        }

        .expertise__card:hover .expertise__card-title,
        .expertise__card:focus-visible .expertise__card-title {
          color: #fff;
        }

        .expertise__card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .expertise__tag {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-text-muted);
          background: rgba(11, 30, 61, 0.06);
          border: 1px solid var(--color-border);
          border-radius: 999px;
          padding: 4px 10px;
          transition: background 0.28s ease, color 0.28s ease, border-color 0.28s ease;
        }

        .expertise__card:hover .expertise__tag,
        .expertise__card:focus-visible .expertise__tag {
          background: rgba(248, 245, 239, 0.12);
          color: rgba(248, 245, 239, 0.92);
          border-color: rgba(228, 184, 92, 0.35);
        }

        .expertise__card-arrow {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          background: rgba(201, 151, 44, 0.12);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .expertise__card-arrow svg {
          width: 13px;
          height: 13px;
        }

        .expertise__card:hover .expertise__card-arrow,
        .expertise__card:focus-visible .expertise__card-arrow {
          opacity: 1;
          background: rgba(228, 184, 92, 0.22);
        }

        .expertise__reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .expertise__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .expertise__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .expertise__mobile-link-wrap {
          display: none;
        }

        @media (max-width: 900px) {
          .expertise__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 720px) {
          .expertise {
            padding: 32px 0;
          }
          .expertise__head {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 22px;
          }
          .expertise__link {
            display: none;
          }
          .expertise__link--mobile {
            display: inline-flex;
          }
          .expertise__mobile-link-wrap {
            display: block;
            margin-top: 20px;
          }
        }

        @media (max-width: 560px) {
          .expertise__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}