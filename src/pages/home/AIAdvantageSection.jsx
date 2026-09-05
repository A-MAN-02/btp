import { useEffect, useRef } from 'react';
import AIScreeningCard from './AIScreeningCard';

const STEPS = [
  {
    num: '01',
    title: 'Structured JD, in minutes',
    body: 'A short intake call becomes a precise, structured job description — tech stack, seniority, and team context captured automatically, not left to a generic template.',
    icon: <path d="M8 3h6l4 4v14H8V3Zm6 0v4h4M10 12h6M10 15.5h6M10 8.5h3" />,
  },
  {
    num: '02',
    title: 'AI-ranked sourcing',
    body: 'The engine mines niche pools — GitHub, IEEE communities, alumni and referral networks — and ranks candidates against the JD before a recruiter opens a single profile.',
    icon: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 17-4.35-4.35" />,
  },
  {
    num: '03',
    title: 'Human validation, always',
    body: 'Every AI-scored shortlist passes through a matching-domain engineer before it reaches you. AI narrows the field; it never makes the final call.',
    icon: <path d="M4 12.5 9.5 18 20 6" />,
  },
];

export default function AIAdvantageSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.aiadv__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('aiadv__reveal--show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('aiadv__reveal--show'), (i % 5) * 90);
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
    <section className="aiadv" id="ai-advantage" ref={sectionRef}>
      <div className="aiadv__grid" aria-hidden="true" />

      <div className="aiadv__container">
        <div className="aiadv__hero">
          <div className="aiadv__copy aiadv__reveal">
            <p className="aiadv__eyebrow">
              <span className="aiadv__eyebrow-dot" aria-hidden="true" />
              Where AI Actually Helps
            </p>
            <h2 className="aiadv__heading">AI runs the search. Engineers judge the fit.</h2>
            <p className="aiadv__body">
              We&rsquo;re specific about where AI belongs in a hiring process, because most
              staffing pitches aren&rsquo;t. AI does the parts that are fast, repetitive and
              objective. A person who has built RF systems or written firmware does the parts
              that require judgment. Neither one does the other&rsquo;s job.
            </p>
          </div>

          <div className="aiadv__demo aiadv__reveal">
            <div className="aiadv__demo-glow" aria-hidden="true" />
            <AIScreeningCard />
          </div>
        </div>

        <div className="aiadv__steps">
          {STEPS.map((step) => (
            <div className="aiadv__step aiadv__reveal" key={step.num} tabIndex={0}>
              <div className="aiadv__step-top">
                <div className="aiadv__step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {step.icon}
                  </svg>
                </div>
                <span className="aiadv__step-num">{step.num}</span>
              </div>
              <h3 className="aiadv__step-title">{step.title}</h3>
              <p className="aiadv__step-body">{step.body}</p>
              <span className="aiadv__step-trace" aria-hidden="true" />
            </div>
          ))}
        </div>

        <p className="aiadv__note aiadv__reveal">
          Nothing in this pipeline replaces a technical interview. The AI layer exists to make
          sure the people who do interview are spending their time on candidates worth
          interviewing.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .aiadv {
          position: relative;
          background: var(--color-navy-deep);
          padding: clamp(56px, 8vw, 96px) 0;
          overflow: hidden;
        }

        .aiadv__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201, 151, 44, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 151, 44, 0.07) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(ellipse 70% 90% at 15% 15%, black, transparent);
          mask-image: radial-gradient(ellipse 70% 90% at 15% 15%, black, transparent);
        }

        .aiadv__container {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        /* ---------- Hero-style split: copy left, demo right ---------- */
        .aiadv__hero {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          margin-bottom: 52px;
        }

        .aiadv__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 16px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-gold-light);
        }

        .aiadv__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-gold-light);
          display: inline-block;
        }

        .aiadv__heading {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(26px, 3.2vw, 38px);
          line-height: 1.22;
          color: #fff;
        }

        .aiadv__body {
          margin: 18px 0 0;
          max-width: 50ch;
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.68;
          color: rgba(248, 245, 239, 0.68);
        }

        .aiadv__demo {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .aiadv__demo-glow {
          position: absolute;
          inset: -30px;
          background: radial-gradient(circle at 60% 40%, rgba(201, 151, 44, 0.18), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .aiadv__demo > * {
          position: relative;
          z-index: 1;
        }

        /* ---------- Interactive step row ---------- */
        .aiadv__steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .aiadv__step {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 22px 20px 24px;
          background: rgba(248, 245, 239, 0.03);
          border: 1px solid rgba(248, 245, 239, 0.1);
          border-radius: 14px;
          outline: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .aiadv__step:hover,
        .aiadv__step:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(228, 184, 92, 0.4);
          background: rgba(248, 245, 239, 0.05);
        }

        .aiadv__step-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .aiadv__step-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(228, 184, 92, 0.12);
          color: var(--color-gold-light);
          transition: background 0.25s ease, color 0.25s ease;
        }

        .aiadv__step-icon svg {
          width: 18px;
          height: 18px;
        }

        .aiadv__step:hover .aiadv__step-icon,
        .aiadv__step:focus-visible .aiadv__step-icon {
          background: rgba(228, 184, 92, 0.22);
        }

        .aiadv__step-num {
          font-family: 'Bruno Ace', var(--font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(248, 245, 239, 0.35);
        }

        .aiadv__step-title {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: 17px;
          line-height: 1.3;
          color: #fff;
        }

        .aiadv__step-body {
          margin: 10px 0 0;
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(248, 245, 239, 0.58);
        }

        .aiadv__step-trace {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: var(--color-gold-light);
          transition: width 0.3s ease;
        }

        .aiadv__step:hover .aiadv__step-trace,
        .aiadv__step:focus-visible .aiadv__step-trace {
          width: 100%;
        }

        .aiadv__note {
          margin: 40px 0 0;
          padding-left: 16px;
          border-left: 2px solid rgba(201, 151, 44, 0.55);
          max-width: 62ch;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.65;
          font-style: italic;
          color: rgba(248, 245, 239, 0.55);
        }

        .aiadv__reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .aiadv__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .aiadv__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 980px) {
          .aiadv__hero {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .aiadv__body {
            max-width: 62ch;
          }
        }

        @media (max-width: 760px) {
          .aiadv__steps {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .aiadv {
            padding: 44px 0;
          }
        }
      `}</style>
    </section>
  );
}