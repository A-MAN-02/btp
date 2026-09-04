import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AUTOPLAY_MS = 4200;

const STEPS = [
  {
    num: '01',
    title: 'AI JD Creation',
    body: 'A short intake call, auto-structured into a precise, role-ready JD.',
    icon: <path d="M9 12h6M9 16h6M9 8h2M6 3h9l4 4v14H6V3Z" />,
  },
  {
    num: '02',
    title: 'Engineering-Led Sourcing',
    body: 'Domain recruiters mine niche pools — GitHub, IEEE, alumni & referral networks.',
    icon: <path d="M11 4a7 7 0 1 0 4.9 12l4.1 4M11 4a7 7 0 0 1 4.9 12M11 4v0" />,
  },
  {
    num: '03',
    title: 'AI Resume Screening',
    body: 'Contextual, bias-checked screening cuts initial review time sharply.',
    icon: (
      <>
        <path d="M4 4h4M4 4v4M20 4h-4M20 4v4M4 20h4M4 20v-4M20 20h-4M20 20v-4" />
        <path d="M8 9h8M8 12h8M8 15h5" />
      </>
    ),
  },
  {
    num: '04',
    title: 'AI + Expert Technical Vet',
    body: 'AI first-pass screening and interview, then review by a matching-domain engineer.',
    icon: <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4Zm-1.4 12.6L7 11l1.4-1.4 2.2 2.2 4.6-4.6L16.6 8.6l-6 6Z" />,
  },
  {
    num: '05',
    title: 'Scored Shortlist',
    body: 'Auto-generated scorecards and structured feedback delivered with every profile.',
    icon: <path d="M9 11 12 14l6-7M20 12a8 8 0 1 1-4.3-7.1" />,
  },
  {
    num: '06',
    title: 'Client Interviews',
    body: 'Coordinated panels and fast feedback loops, with backup candidates on standby.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    num: '07',
    title: 'Offer & Onboarding',
    body: 'Offer support, notice-period management, and structured check-ins.',
    icon: (
      <>
        <circle cx="12" cy="8" r="7" />
        <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
      </>
    ),
  },
];

const FEATURES = [
  { label: 'AI-Accelerated', stat: 'Time-to-Shortlist' },
  { label: '3-Layer', stat: 'Technical Screening' },
  { label: 'Engineer-Vetted', stat: 'Every Profile' },
];

export default function ProcessPreview() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Reveal is driven entirely by this one flag on the <section>, not by mutating
  // classList on individual children. Several children (e.g. the stepper) get a
  // dynamic className elsewhere (is-paused, is-active...); if we ever add a
  // "show" class straight onto those nodes ourselves, React overwrites it — and
  // the whole block silently disappears — the next time it re-renders those
  // nodes for an unrelated reason. Keeping visibility as one piece of state that
  // cascades down via CSS avoids that entirely.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || isPaused) return undefined;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const activeStep = STEPS[active];

  return (
    <section className={`process${isVisible ? ' process--visible' : ''}`} ref={sectionRef}>
      <div className="process__container">
        <div className="process__head">
          <div>
            <p className="process__eyebrow process__reveal">
              <span className="process__eyebrow-dot" aria-hidden="true" />
              How We Work
            </p>
            <h2 className="process__heading process__reveal" style={{ transitionDelay: '60ms' }}>
              The AI-Driven Talent Acquisition Engine.
            </h2>
            <p className="process__body process__reveal" style={{ transitionDelay: '120ms' }}>
              Seven steps, from job description to onboarded hire &mdash; with AI compressing
              the slow parts and engineers validating the parts that matter.
            </p>
          </div>

          <Link to="/how-we-work" className="process__cta process__reveal" style={{ transitionDelay: '150ms' }}>
            See the Full Methodology
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div
          className={`process__stepper process__reveal${isPaused ? ' is-paused' : ''}`}
          style={{ transitionDelay: '200ms' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="process__track" role="tablist" aria-label="How we work, steps 1 through 7">
            {STEPS.map((step, i) => (
              <div className="process__node-wrap" key={step.num}>
                <button
                  type="button"
                  role="tab"
                  id={`process-tab-${step.num}`}
                  aria-selected={i === active}
                  aria-controls="process-panel"
                  className={`process__node${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="process__node-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {step.icon}
                    </svg>
                  </span>
                  <span className="process__node-num">{step.num}</span>
                  <span className="process__node-title">{step.title}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <span className={`process__connector${i < active ? ' is-filled' : ''}`} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div
            className="process__panel"
            role="tabpanel"
            id="process-panel"
            aria-labelledby={`process-tab-${activeStep.num}`}
            key={active}
          >
            <span className="process__panel-eyebrow">Step {activeStep.num} of 07</span>
            <h3 className="process__panel-title">{activeStep.title}</h3>
            <p className="process__panel-body">{activeStep.body}</p>
            <span className="process__panel-progress" aria-hidden="true">
              <span className="process__panel-bar" />
            </span>
          </div>
        </div>

        <div className="process__features">
          {FEATURES.map((f, i) => (
            <div
              className="process__feature process__reveal"
              key={f.label}
              style={{ transitionDelay: `${260 + i * 70}ms` }}
            >
              <span className="process__feature-label">{f.label}</span>
              <span className="process__feature-stat">{f.stat}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process {
          padding: clamp(36px, 5vw, 60px) 0;
        }

        .process__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 36px);
        }

        .process__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: clamp(24px, 3.5vw, 36px);
        }

        .process__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 12px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-gold);
        }

        .process__eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .process__heading {
          margin: 0;
          max-width: 620px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3.2vw, 36px);
          line-height: 1.3;
          color: var(--color-navy-deep);
        }

        .process__body {
          margin: 12px 0 0;
          max-width: 52ch;
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.65;
          color: var(--color-text-muted);
        }

        .process__cta {
          flex: none;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          border-radius: 999px;
          border: 1.5px solid var(--color-border);
          font-family: var(--font-body);
          font-size: 14.5px;
          font-weight: 600;
          color: var(--color-navy-deep);
          white-space: nowrap;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, background 0.2s ease;
        }

        .process__cta svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .process__cta:hover {
          border-color: var(--color-gold);
          color: var(--color-steel);
          background: rgba(201, 151, 44, 0.06);
          transform: translateY(-2px);
        }

        .process__cta:hover svg {
          transform: translateX(3px);
        }

        /* ---------- Interactive stepper ---------- */
        .process__stepper {
          border: 1px solid var(--color-border);
          border-radius: 20px;
          background: var(--color-surface);
          padding: 20px clamp(14px, 2.5vw, 26px) 22px;
          box-shadow: 0 20px 44px -32px rgba(11, 30, 61, 0.32);
        }

        .process__track {
          display: flex;
          align-items: flex-start;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
        }

        .process__track::-webkit-scrollbar {
          display: none;
        }

        .process__node-wrap {
          display: flex;
          align-items: flex-start;
          flex: 1 1 auto;
        }

        .process__node-wrap:last-child {
          flex: none;
        }

        .process__node {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: none;
          width: 104px;
          padding: 6px 4px;
          text-align: center;
          border-radius: 12px;
          transition: transform 0.2s ease;
        }

        .process__node:hover {
          transform: translateY(-2px);
        }

        .process__node:focus-visible {
          outline: 2px solid var(--color-gold);
          outline-offset: 3px;
        }

        .process__node-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 1.5px solid var(--color-border);
          color: var(--color-text-muted);
          transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
        }

        .process__node-icon svg {
          width: 19px;
          height: 19px;
        }

        .process__node:hover .process__node-icon {
          border-color: rgba(201, 151, 44, 0.5);
        }

        .process__node.is-active .process__node-icon {
          border-color: var(--color-gold);
          color: var(--color-gold);
          background: rgba(201, 151, 44, 0.08);
        }

        .process__node.is-done .process__node-icon {
          border-color: rgba(201, 151, 44, 0.35);
          color: var(--color-gold);
        }

        .process__node-num {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          transition: color 0.2s ease;
        }

        .process__node-title {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          line-height: 1.25;
          color: var(--color-navy-deep);
          max-width: 100px;
          transition: color 0.2s ease;
        }

        .process__node.is-active .process__node-num,
        .process__node.is-active .process__node-title {
          color: var(--color-gold);
        }

        .process__connector {
          flex: 1 1 28px;
          min-width: 16px;
          height: 2px;
          margin-top: 27px;
          background: var(--color-border);
          position: relative;
          overflow: hidden;
        }

        .process__connector::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s ease;
        }

        .process__connector.is-filled::after {
          transform: scaleX(1);
        }

        .process__panel {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px dashed var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 5px;
          animation: processFade 0.35s ease;
        }

        .process__panel-eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-gold);
        }

        .process__panel-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(18px, 2vw, 21px);
          color: var(--color-navy-deep);
        }

        .process__panel-body {
          margin: 0;
          max-width: 58ch;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--color-text-muted);
        }

        .process__panel-progress {
          display: block;
          margin-top: 10px;
          width: 160px;
          max-width: 100%;
          height: 3px;
          border-radius: 2px;
          background: var(--color-border);
          overflow: hidden;
        }

        .process__panel-bar {
          display: block;
          height: 100%;
          width: 0%;
          background: var(--color-gold);
          animation: processProgress ${AUTOPLAY_MS}ms linear forwards;
        }

        .process__stepper.is-paused .process__panel-bar {
          animation-play-state: paused;
        }

        /* ---------- Feature chips ---------- */
        .process__features {
          margin-top: clamp(28px, 4vw, 40px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          border-top: 1px solid var(--color-border);
          padding-top: clamp(20px, 3vw, 28px);
        }

        .process__feature {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .process__feature-label {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gold);
        }

        .process__feature-stat {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--color-navy-deep);
        }

        .process__reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .process--visible .process__reveal {
          opacity: 1;
          transform: none;
        }

        @keyframes processFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }

        @keyframes processProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .process__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .process__panel {
            animation: none;
          }
          .process__panel-progress {
            display: none;
          }
          .process__connector::after {
            transition: none;
          }
        }

        @media (max-width: 900px) {
          .process__features {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 560px) {
          .process__features {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .process {
            padding: 28px 0;
          }
          .process__node {
            width: 84px;
          }
          .process__node-title {
            font-size: 11.5px;
            max-width: 82px;
          }
        }
      `}</style>
    </section>
  );
}