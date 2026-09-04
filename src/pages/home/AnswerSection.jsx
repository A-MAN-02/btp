import { useEffect, useRef } from 'react';
import interviewPhoto from '../../assets/interview-handshake.jpg';

const PILLARS = [
  {
    num: '01',
    title: 'Engineering DNA',
    body: 'Recruiters and reviewers who have shipped hardware and code, not just read resumes.',
  },
  {
    num: '02',
    title: 'AI-Accelerated TAT',
    body: 'AI-assisted JD creation, screening and matching compress time-to-shortlist.',
  },
  {
    num: '03',
    title: 'Domain Depth',
    body: 'Purpose-built pipelines across RF, FPGA, embedded, semiconductor, mechanical, cloud and AI.',
  },
  {
    num: '04',
    title: 'Built on Trust',
    body: 'Every engagement backed by a mutual NDA and a clear Master Service Agreement.',
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
            setTimeout(() => el.classList.add('answer__reveal--show'), (i % 4) * 90);
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
        <div className="answer__top">
          <div>
            <p className="answer__eyebrow answer__reveal">
              <span className="answer__eyebrow-dot" aria-hidden="true" />
              Who We Are
            </p>
            <h2 className="answer__heading answer__reveal">Talent Acquisition, Engineered.</h2>
            <p className="answer__body answer__reveal">
              Bharyat Talent Partners is the staffing arm of Bharyat Advanced Systems, a
              full-stack product engineering company. We built our hiring process the way an
              engineering team hires &mdash; combining domain-fluent reviewers with an AI-driven
              sourcing and screening platform, so every candidate we present has already been
              evaluated the way your own technical panel would evaluate them.
            </p>
          </div>

          <div className="answer__photo-frame answer__reveal">
            <img
              className="answer__photo"
              src={interviewPhoto}
              alt="A hiring manager and candidate shaking hands after a technical interview"
            />
            <span className="answer__photo-tag">Client Interview</span>
          </div>
        </div>

        <div className="answer__pillars">
          {PILLARS.map((pillar) => (
            <div className="answer__pillar answer__reveal" key={pillar.num}>
              <div className="answer__pillar-num">{pillar.num}</div>
              <h3 className="answer__pillar-title">{pillar.title}</h3>
              <p className="answer__pillar-body">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .answer {
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: clamp(56px, 8vw, 96px) 0;
        }

        .answer__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        .answer__top {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }

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
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3.2vw, 36px);
          line-height: 1.3;
          color: var(--color-navy-deep);
        }

        .answer__body {
          margin: 20px 0 0;
          max-width: 460px;
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.65;
          color: var(--color-text-muted);
        }

        .answer__photo-frame {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 24px 50px -26px rgba(11, 30, 61, 0.35);
        }

        .answer__photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .answer__photo-tag {
          position: absolute;
          left: 16px;
          bottom: 16px;
          background: rgba(11, 30, 61, 0.88);
          color: var(--color-gold-light);
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 7px 12px;
          border-radius: 2px;
          border: 1px solid rgba(228, 184, 92, 0.3);
        }

        .answer__pillars {
          margin-top: 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--color-border);
          border: 1px solid var(--color-border);
        }

        .answer__pillar {
          background: var(--color-surface);
          padding: 24px 22px;
        }

        .answer__pillar-num {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-gold);
        }

        .answer__pillar-title {
          margin: 10px 0 0;
          font-family: var(--font-display);
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

        @media (max-width: 900px) {
          .answer__top {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 820px) {
          .answer__pillars {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 720px) {
          .answer {
            padding: 44px 0;
          }
        }

        @media (max-width: 520px) {
          .answer__pillars {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}