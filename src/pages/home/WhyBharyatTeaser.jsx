import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ROWS = [
  {
    generic: 'Keyword-matched resumes, reviewed by non-technical recruiters',
    bharyat: 'AI-powered resume screening, validated by practicing engineers',
  },
  {
    generic: 'Slow, manual screening — CV delivery in days, not hours',
    bharyat: 'AI-accelerated turnaround from JD to first shortlist',
  },
  {
    generic: 'One generic pipeline for every technical role',
    bharyat: 'Purpose-built pipelines by domain: RF, FPGA, Embedded, Cloud, AI, HW',
  },
  {
    generic: 'No engineering context on niche hardware / RF / firmware roles',
    bharyat: "Engineering pedigree from Bharyat Advanced Systems' own build teams",
  },
  {
    generic: 'Transactional — fee-for-CV relationship',
    bharyat: 'Partnership model — dedicated POC, backup candidates, replacement support',
  },
];

export default function WhyBharyatTeaser() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.why__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('why__reveal--show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('why__reveal--show'), (i % 6) * 90);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="why" ref={sectionRef}>
      <div className="why__container">
        <div className="why__head why__reveal">
          <div>
            <p className="why__eyebrow">
              <span className="why__eyebrow-dot" aria-hidden="true" />
              Our Difference
            </p>
            <h2 className="why__heading">Why Bharyat Talent Partners</h2>
          </div>

          <Link to="/why-bharyat" className="why__link">
            Read the full comparison
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Terminal window chrome */}
        <div className="why__window why__reveal">
          <div className="why__titlebar">
            <span className="why__dots">
              <span className="why__dot why__dot--red" />
              <span className="why__dot why__dot--yellow" />
              <span className="why__dot why__dot--green" />
            </span>
            <span className="why__filename">route_comparison.diff</span>
            <span className="why__titlebar-spacer" />
          </div>

          {/* Panel labels */}
          <div className="why__labels">
            <span className="why__label why__label--generic">
              <span className="why__label-dot" />
              usual_route.js
            </span>
            <span className="why__vs">VS</span>
            <span className="why__label why__label--bharyat">
              <span className="why__label-dot" />
              bharyat_route.js
            </span>
          </div>

        {/* Comparison rows */}
        <div className="why__table">
          {ROWS.map((row, i) => (
            <div className="why__row why__reveal" key={i}>
              <div className="why__cell why__cell--generic">
                <svg className="why__icon why__icon--x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
                <span>{row.generic}</span>
              </div>

              <div className="why__divider" aria-hidden="true">
                <span className="why__node" />
              </div>

              <div className="why__cell why__cell--bharyat">
                <svg className="why__icon why__icon--check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>{row.bharyat}</span>
              </div>
            </div>
          ))}

          <div className="why__cursor-row">
            <span className="why__cursor-prompt">$</span>
            <span className="why__cursor-text">bharyat --status engineered</span>
            <span className="why__cursor-blink" />
          </div>
        </div>
        </div>

        <div className="why__mobile-link-wrap">
          <Link to="/why-bharyat" className="why__link why__link--mobile">
            Read the full comparison
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .why {
          position: relative;
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: clamp(36px, 5vw, 56px) 0;
          overflow: hidden;
        }

        .why__container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        .why__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 24px;
        }

        .why__eyebrow {
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

        .why__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .why__heading {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.25;
          color: var(--color-navy-deep);
        }

        .why__link {
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

        .why__link svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .why__link:hover {
          color: var(--color-steel);
          gap: 12px;
        }

        .why__link:hover svg {
          transform: translateX(2px);
        }

        .why__link--mobile {
          display: none;
        }

        /* ---------- Terminal window chrome ---------- */
        .why__window {
          position: relative;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(120deg, rgba(201, 151, 44, 0.5), rgba(27, 75, 115, 0.35), rgba(201, 151, 44, 0.5));
          background-size: 220% 220%;
          animation: whyBorderGlow 6s ease infinite;
        }

        @keyframes whyBorderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .why__titlebar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          background: var(--color-navy-deep);
          border-radius: 17px 17px 0 0;
        }

        .why__dots {
          display: flex;
          gap: 6px;
        }

        .why__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .why__dot--red { background: #ec6a5e; }
        .why__dot--yellow { background: #f4bf4f; }
        .why__dot--green { background: #61c454; }

        .why__filename {
          font-family: 'Courier New', ui-monospace, monospace;
          font-size: 12px;
          color: rgba(248, 245, 239, 0.55);
          margin: 0 auto;
        }

        .why__titlebar-spacer {
          width: 44px;
        }

        /* ---------- Panel labels ---------- */
        .why__labels {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 14px clamp(16px, 3vw, 24px) 0;
          background: var(--color-surface);
        }

        .why__label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-self: start;
          font-family: 'Courier New', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 6px 12px;
          border-radius: 999px;
        }

        .why__label--generic {
          color: var(--color-text-muted);
          background: rgba(90, 100, 114, 0.1);
        }

        .why__label--bharyat {
          justify-self: end;
          color: var(--color-navy-deep);
          background: rgba(201, 151, 44, 0.16);
        }

        .why__label-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .why__label--generic .why__label-dot {
          background: var(--color-text-muted);
        }

        .why__label--bharyat .why__label-dot {
          background: var(--color-gold);
          box-shadow: 0 0 6px rgba(201, 151, 44, 0.7);
          animation: whyPulse 1.8s ease-in-out infinite;
        }

        @keyframes whyPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .why__vs {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: #fff;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(11, 30, 61, 0.3);
        }

        /* ---------- Table ---------- */
        .why__table {
          margin-top: 14px;
          border-radius: 0 0 17px 17px;
          overflow: hidden;
          background: repeating-linear-gradient(
            0deg,
            var(--color-bg),
            var(--color-bg) 1px,
            var(--color-surface) 1px,
            var(--color-surface) 2px
          );
        }

        .why__cursor-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          background: var(--color-navy-deep);
          font-family: 'Courier New', ui-monospace, monospace;
          font-size: 12.5px;
        }

        .why__cursor-prompt {
          color: var(--color-gold-light);
          font-weight: 700;
        }

        .why__cursor-text {
          color: rgba(248, 245, 239, 0.7);
        }

        .why__cursor-blink {
          width: 7px;
          height: 14px;
          background: var(--color-gold-light);
          animation: whyCursorBlink 1s steps(1) infinite;
        }

        @keyframes whyCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .why__row {
          display: grid;
          grid-template-columns: 1fr 34px 1fr;
          align-items: stretch;
        }

        .why__row:not(:last-child) {
          border-bottom: 1px solid var(--color-border);
        }

        .why__cell {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px;
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.5;
        }

        .why__cell--generic {
          background: var(--color-bg);
          color: var(--color-text-muted);
        }

        .why__cell--bharyat {
          background: linear-gradient(120deg, var(--color-navy-deep), var(--color-steel));
          color: rgba(248, 245, 239, 0.94);
          font-weight: 500;
        }

        .why__icon {
          flex-shrink: 0;
          width: 17px;
          height: 17px;
          margin-top: 1px;
        }

        .why__icon--x {
          color: rgba(90, 100, 114, 0.55);
        }

        .why__icon--check {
          color: var(--color-gold-light);
        }

        /* ---------- Center circuit divider ---------- */
        .why__divider {
          position: relative;
          background: var(--color-border);
        }

        .why__node {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-gold);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 4px rgba(201, 151, 44, 0.16);
        }

        .why__reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .why__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .why__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .why__label--bharyat .why__label-dot {
            animation: none;
          }
          .why__window {
            animation: none;
          }
          .why__cursor-blink {
            animation: none;
          }
        }

        .why__mobile-link-wrap {
          display: none;
        }

        @media (max-width: 760px) {
          .why {
            padding: 32px 0;
          }
          .why__head {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 20px;
          }
          .why__link {
            display: none;
          }
          .why__link--mobile {
            display: inline-flex;
          }
          .why__mobile-link-wrap {
            display: block;
            margin-top: 20px;
          }

          .why__labels {
            grid-template-columns: 1fr;
            gap: 8px;
            justify-items: stretch;
          }
          .why__label--generic,
          .why__label--bharyat {
            justify-self: stretch;
            justify-content: center;
          }
          .why__vs {
            display: none;
          }

          .why__row {
            grid-template-columns: 1fr;
          }
          .why__divider {
            display: none;
          }
          .why__cell--generic {
            order: 2;
          }
          .why__cell--bharyat {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}