import { useEffect, useRef, useState } from 'react';

const FEATURED = { value: 100, suffix: '+', label: 'Talent Hired' };

const STATS = [
  { value: 25, suffix: '+', label: 'Global Customers' },
  { value: 1.5, suffix: 'M+', label: 'RFQ Units Managed', decimals: 1 },
  { value: 80, suffix: '+', label: 'Vetted Suppliers' },
  { value: 100, suffix: '+', label: 'Manufacturing Brands Sourced' },
  { value: 15, suffix: '+', label: 'Design Projects' },
];

const COUNT_MS = 1400;

function useCountUp(active, target, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let start;
    function tick(ts) {
      if (start === undefined) start = ts;
      const t = Math.min(1, (ts - start) / COUNT_MS);
      const eased = 1 - (1 - t) * (1 - t);
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [active, target, decimals]);

  return value;
}

function StatNum({ stat, active }) {
  const value = useCountUp(active, stat.value, stat.decimals || 0);
  return (
    <>
      {stat.decimals ? value.toFixed(stat.decimals) : Math.round(value)}
      {stat.suffix}
    </>
  );
}

export default function GroupStats() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.group-stats__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('group-stats__reveal--show'));
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('group-stats__reveal--show'), (i % 4) * 90);
            if (el.classList.contains('group-stats__bento')) setActive(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="group-stats" ref={sectionRef}>
      <div className="group-stats__container">
        <div className="group-stats__copy group-stats__reveal">
          <p className="group-stats__eyebrow">
            <span className="group-stats__eyebrow-dot" aria-hidden="true" />
            Built Over 8 Years
          </p>
          <h2 className="group-stats__heading">
            Eight years of engineering and sourcing operations before we hired our first
            candidate.
          </h2>
          <p className="group-stats__body">
            Bharyat Talent Partners didn&rsquo;t start as a staffing idea &mdash; it grew out of a
            group that has spent nearly a decade building supply chains, engineering design
            services, and sourcing-intelligence software for hardware companies. That&rsquo;s the
            bench our recruiters draw on.
          </p>
          <a href="#" className="group-stats__link">
            Read our story
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="group-stats__bento group-stats__reveal">
          <div className="group-stats__featured">
            <span className="group-stats__corner group-stats__corner--tl" />
            <span className="group-stats__corner group-stats__corner--br" />
            <div className="group-stats__featured-num">
              <StatNum stat={FEATURED} active={active} />
            </div>
            <span className="group-stats__featured-label">{FEATURED.label}</span>
          </div>

          <div className="group-stats__rail">
            {STATS.map((stat) => (
              <div className="group-stats__rail-row" key={stat.label}>
                <span className="group-stats__rail-num">
                  <StatNum stat={stat} active={active} />
                </span>
                <span className="group-stats__rail-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .group-stats {
          position: relative;
          background: var(--color-bg);
          padding: clamp(56px, 8vw, 96px) 0;
        }

        .group-stats__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 48px;
          align-items: center;
        }

        .group-stats__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 16px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-gold);
        }

        .group-stats__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .group-stats__heading {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3vw, 32px);
          line-height: 1.3;
          color: var(--color-navy-deep);
        }

        .group-stats__body {
          margin: 18px 0 0;
          max-width: 48ch;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.68;
          color: var(--color-text-muted);
        }

        .group-stats__link {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-navy-deep);
          padding: 10px 4px;
          border-bottom: 2px solid var(--color-gold);
          transition: gap 0.2s ease, color 0.2s ease;
        }

        .group-stats__link svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .group-stats__link:hover {
          color: var(--color-steel);
          gap: 12px;
        }

        .group-stats__link:hover svg {
          transform: translateX(2px);
        }

        /* ---------- Bento: featured card + stat rail ---------- */
        .group-stats__bento {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 20px;
          align-items: stretch;
        }

        .group-stats__featured {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
          padding: 28px 24px;
          background: linear-gradient(150deg, var(--color-navy-deep), var(--color-steel));
          border-radius: 16px;
          overflow: hidden;
          min-height: 220px;
        }

        .group-stats__corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 2px solid var(--color-gold-light);
          z-index: 1;
          pointer-events: none;
        }
        .group-stats__corner--tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
        .group-stats__corner--br { bottom: 12px; right: 12px; border-left: none; border-top: none; }

        .group-stats__featured-num {
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 700;
          font-size: clamp(40px, 5vw, 58px);
          line-height: 1;
          color: var(--color-gold-light);
          font-variant-numeric: tabular-nums;
        }

        .group-stats__featured-label {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: rgba(248, 245, 239, 0.78);
        }

        .group-stats__rail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 4px 24px;
        }

        .group-stats__rail-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
        }

        .group-stats__rail-row + .group-stats__rail-row {
          border-top: 1px solid var(--color-border);
        }

        .group-stats__rail-num {
          flex: none;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 700;
          font-size: 22px;
          color: var(--color-gold);
          font-variant-numeric: tabular-nums;
        }

        .group-stats__rail-label {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--color-text-muted);
          text-align: right;
        }

        .group-stats__reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .group-stats__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .group-stats__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 900px) {
          .group-stats__container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .group-stats__bento {
            grid-template-columns: 1fr;
          }
          .group-stats__featured {
            min-height: 140px;
          }
          .group-stats__rail-label {
            text-align: left;
          }
        }

        @media (max-width: 720px) {
          .group-stats {
            padding: 44px 0;
          }
        }
      `}</style>
    </section>
  );
}