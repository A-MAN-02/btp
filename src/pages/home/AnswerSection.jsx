import { useEffect, useRef } from 'react';
import interviewPhoto from '../../assets/interview.jpeg';

const PILLARS = [
  {
    num: '01',
    title: 'Engineering DNA',
    body: 'Recruiters and reviewers who have shipped hardware and code, not just read resumes.',
    icon: (
      <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7V7Zm3 3h4v4h-4v-4Z" />
    ),
  },
  {
    num: '02',
    title: 'AI-Accelerated TAT',
    body: 'AI-assisted JD creation, screening and matching compress time-to-shortlist.',
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  },
  {
    num: '03',
    title: 'Domain Depth',
    body: 'Purpose-built pipelines across RF, FPGA, embedded, semiconductor, mechanical, cloud and AI.',
    icon: <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  {
    num: '04',
    title: 'Built on Trust',
    body: 'Every engagement backed by a mutual NDA and a clear Master Service Agreement.',
    icon: <path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Zm-1.4 12.4L7 10.8l1.4-1.4 2.2 2.2 4.6-4.6L16.6 8.4l-6 6Z" />,
  },
];

export default function AnswerSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.answer__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('answer__reveal--show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('answer__reveal--show'), (i % 6) * 90);
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
    <section className="answer" id="answer" ref={sectionRef}>
      <div className="answer__container">
        <div className="answer__bento">
          {/* Intro copy */}
          <div className="answer__intro answer__reveal">
            <p className="answer__eyebrow">
              <span className="answer__eyebrow-dot" aria-hidden="true" />
              Who We Are
            </p>
            <h2 className="answer__heading">Talent Acquisition, Engineered.</h2>
            <p className="answer__body">
              Bharyat Talent Partners is the staffing arm of Bharyat Advanced Systems, a
              full-stack product engineering company. We built our hiring process the way an
              engineering team hires &mdash; combining domain-fluent reviewers with an AI-driven
              sourcing and screening platform, so every candidate we present has already been
              evaluated the way your own technical panel would evaluate them.
            </p>
          </div>

          {/* Photo */}
          <div className="answer__photo-frame answer__reveal">
            <img
              className="answer__photo"
              src={interviewPhoto}
              alt="A hiring manager and candidate shaking hands after a technical interview"
            />
            <div className="answer__photo-glow" aria-hidden="true" />
            <span className="answer__photo-tag">Client Interview</span>
            <div className="answer__photo-stat">
              <strong>8 yrs</strong>
              <span>Engineering-led delivery</span>
            </div>
          </div>

          {/* Pillars — each its own bento cell */}
          {PILLARS.map((pillar, i) => (
            <div
              className={`answer__pillar answer__pillar--${i + 1} answer__reveal`}
              key={pillar.num}
            >
              <div className="answer__pillar-top">
                <div className="answer__pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {pillar.icon}
                  </svg>
                </div>
                <span className="answer__pillar-num">{pillar.num}</span>
              </div>
              <h3 className="answer__pillar-title">{pillar.title}</h3>
              <p className="answer__pillar-body">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .answer {
          position: relative;
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: clamp(56px, 8vw, 96px) 0;
          overflow: hidden;
        }

        .answer::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -6%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(201, 151, 44, 0.1), transparent 68%);
          pointer-events: none;
        }

        .answer__container {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        /* ---------- Bento grid ---------- */
        .answer__bento {
          display: grid;
          grid-template-columns: 0.85fr 0.85fr 1.35fr;
          grid-template-rows: auto 1fr 1fr;
          grid-template-areas:
            "intro intro photo"
            "p1 p2 photo"
            "p3 p4 photo";
          gap: 18px;
        }

        .answer__intro { grid-area: intro; padding: 6px 0 20px; }
        .answer__photo-frame { grid-area: photo; }
        .answer__pillar--1 { grid-area: p1; }
        .answer__pillar--2 { grid-area: p2; }
        .answer__pillar--3 { grid-area: p3; }
        .answer__pillar--4 { grid-area: p4; }

        .answer__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 16px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-gold);
        }

        .answer__eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .answer__heading {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.28;
          color: var(--color-navy-deep);
        }

        .answer__body {
          margin: 18px 0 0;
          max-width: 62ch;
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.68;
          color: var(--color-text-muted);
        }

        /* ---------- Photo cell ---------- */
        .answer__photo-frame {
          position: relative;
          min-height: 360px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 30px 60px -28px rgba(11, 30, 61, 0.4);
        }

        .answer__photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .answer__photo-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(11, 30, 61, 0) 55%, rgba(11, 30, 61, 0.6) 100%);
          pointer-events: none;
        }

        .answer__photo-tag {
          position: absolute;
          left: 16px;
          top: 16px;
          background: rgba(11, 30, 61, 0.88);
          color: var(--color-gold-light);
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(228, 184, 92, 0.3);
        }

        .answer__photo-stat {
          position: absolute;
          left: 16px;
          bottom: 16px;
          right: 16px;
          display: flex;
          align-items: baseline;
          gap: 8px;
          color: #fff;
        }

        .answer__photo-stat strong {
          font-family: 'Bruno Ace', var(--font-display);
          font-size: 26px;
          font-weight: 700;
          color: var(--color-gold-light);
        }

        .answer__photo-stat span {
          font-family: var(--font-body);
          font-size: 12.5px;
          color: rgba(248, 245, 239, 0.85);
        }

        /* ---------- Pillar cells ---------- */
        .answer__pillar {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 20px 20px 22px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .answer__pillar:hover {
          transform: translateY(-5px);
          background: var(--color-surface);
          border-color: rgba(201, 151, 44, 0.4);
          box-shadow: 0 20px 38px -20px rgba(11, 30, 61, 0.28);
        }

        .answer__pillar-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .answer__pillar-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 151, 44, 0.14);
          color: var(--color-gold);
        }

        .answer__pillar-icon svg {
          width: 20px;
          height: 20px;
        }

        .answer__pillar-num {
          font-family: 'Bruno Ace', var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-text-muted);
          opacity: 0.55;
        }

        .answer__pillar-title {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: 16px;
          color: var(--color-navy-deep);
        }

        .answer__pillar-body {
          margin: 8px 0 0;
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--color-text-muted);
        }

        .answer__reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .answer__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .answer__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 980px) {
          .answer__bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto auto;
            grid-template-areas:
              "intro intro"
              "photo photo"
              "p1 p2"
              "p3 p4";
          }
          .answer__photo-frame {
            min-height: 260px;
          }
        }

        @media (max-width: 560px) {
          .answer__bento {
            grid-template-columns: 1fr;
            grid-template-areas:
              "intro"
              "photo"
              "p1"
              "p2"
              "p3"
              "p4";
          }
        }

        @media (max-width: 720px) {
          .answer {
            padding: 44px 0;
          }
        }
      `}</style>
    </section>
  );
}