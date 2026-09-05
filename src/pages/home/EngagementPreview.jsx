import { useState } from 'react';
import { Link } from 'react-router-dom';

const MODELS = [
  {
    title: 'Dedicated Talent Pod',
    tag: 'Long-horizon',
    body: 'An embedded team, single client, working as a long-horizon partnership.',
    points: ['Embedded team, single client', 'Long-horizon partnership', '7-day onboarding SLA', 'Aligned quality bar'],
    icon: <path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" />,
  },
  {
    title: 'Contract-to-Hire',
    tag: 'Zero-risk',
    body: 'A working trial before you commit to a permanent hire.',
    points: ['Working trial before convert', 'Zero-risk permanent hire', 'Defined notice-period shift', 'Outcome-based'],
    icon: <path d="M9 12h6M9 16h6M8 21h8a2 2 0 0 0 2-2V7l-5-5H8a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2Z" />,
  },
  {
    title: 'Staff Augmentation',
    tag: 'On demand',
    body: 'Vetted engineers, on demand, managed under your direction.',
    points: ['Vetted engineers on demand', 'No geographic limits', 'Covered by MSA', 'Manager-direct'],
    icon: <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 10v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75" />,
  },
  {
    title: 'Direct / Permanent Hire',
    tag: 'Confidential',
    body: 'Full-cycle, confidential search for critical roles.',
    points: ['Full-cycle critical search', '90-day replacement cover', 'NDA + back-channel reference checks', 'Confidential mandate'],
    icon: <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 0-2 7 2-1.5L14 22l-2-7Z" />,
  },
  {
    title: 'RPO — Volume Hiring',
    tag: 'Scale-ready',
    body: "End-to-end recruitment process ownership when you're scaling fast.",
    points: ['Recruitment Process Ownership', 'Forecast-based hiring', 'Weekly pipeline metrics', 'Dedicated team'],
    icon: <path d="M4 6h16M4 12h16M4 18h10" />,
  },
  {
    title: 'Executive / Leadership Search',
    tag: 'Board-level',
    body: 'Confidential searches for CTO, VP, and Director-level mandates.',
    points: ['CTO / VP / Director searches', 'Confidential formulation', 'Long-list to close in 6 weeks', 'Board / advisor network'],
    icon: <path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Zm-1.4 12.4L7 10.8l1.4-1.4 2.2 2.2 4.6-4.6L16.6 8.4l-6 6Z" />,
  },
];

export default function EngagementPreview() {
  const [active, setActive] = useState(0);
  const model = MODELS[active];

  return (
    <section className="eng" id="engagement">
      <div className="eng__container">
        <div className="eng__head">
          <div>
            <p className="eng__eyebrow">
              <span className="eng__eyebrow-dot" aria-hidden="true" />
              Ways to Engage
            </p>
            <h2 className="eng__heading">Engagement Models</h2>
            <p className="eng__body">
              From long-horizon dedicated pods to executive search &mdash; contracts that match
              your engagement horizon.
            </p>
          </div>

          <Link to="/services" className="eng__link">
            See engagement details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="eng__panel">
          {/* Tab rail */}
          <div className="eng__rail" role="tablist" aria-label="Engagement models">
            {MODELS.map((m, i) => (
              <button
                key={m.title}
                role="tab"
                aria-selected={active === i}
                className={`eng__tab ${active === i ? 'eng__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="eng__tab-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {m.icon}
                  </svg>
                </span>
                <span className="eng__tab-title">{m.title}</span>
                <svg className="eng__tab-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>

          {/* Detail view */}
          <div className="eng__detail" key={active}>
            <div className="eng__detail-top">
              <div className="eng__detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {model.icon}
                </svg>
              </div>
              <span className="eng__detail-tag">{model.tag}</span>
            </div>

            <h3 className="eng__detail-title">{model.title}</h3>
            <p className="eng__detail-body">{model.body}</p>

            <ul className="eng__detail-list">
              {model.points.map((point) => (
                <li key={point}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>

            <div className="eng__detail-progress">
              <span>
                {String(active + 1).padStart(2, '0')} / {String(MODELS.length).padStart(2, '0')}
              </span>
              <div className="eng__detail-progress-track">
                <div
                  className="eng__detail-progress-fill"
                  style={{ width: `${((active + 1) / MODELS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="eng__mobile-link-wrap">
          <Link to="/services" className="eng__link eng__link--mobile">
            See engagement details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .eng {
          position: relative;
          padding: clamp(36px, 5vw, 56px) 0;
        }

        .eng__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        .eng__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 24px;
        }

        .eng__eyebrow {
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

        .eng__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-gold);
          display: inline-block;
        }

        .eng__heading {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.25;
          color: var(--color-navy-deep);
        }

        .eng__body {
          margin: 10px 0 0;
          max-width: 56ch;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--color-text-muted);
        }

        .eng__link {
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

        .eng__link svg { width: 16px; height: 16px; transition: transform 0.2s ease; }
        .eng__link:hover { color: var(--color-steel); gap: 12px; }
        .eng__link:hover svg { transform: translateX(2px); }
        .eng__link--mobile { display: none; }

        /* ---------- Panel: rail + detail ---------- */
        .eng__panel {
          display: grid;
          grid-template-columns: 300px 1fr;
          border: 1px solid var(--color-border);
          border-radius: 20px;
          overflow: hidden;
          background: var(--color-surface);
          box-shadow: 0 30px 60px -34px rgba(11, 30, 61, 0.35);
        }

        .eng__rail {
          display: flex;
          flex-direction: column;
          background: var(--color-bg);
          border-right: 1px solid var(--color-border);
          padding: 10px;
        }

        .eng__tab {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          border: none;
          background: transparent;
          border-radius: 12px;
          padding: 12px 12px;
          font-family: var(--font-body);
          cursor: pointer;
          color: var(--color-text-muted);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .eng__tab-icon {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(11, 30, 61, 0.06);
          color: var(--color-steel);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .eng__tab-icon svg { width: 15px; height: 15px; }

        .eng__tab-title {
          flex: 1;
          font-size: 15.5px;
          font-weight: 700;
          line-height: 1.3;
        }

        .eng__tab-chevron {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .eng__tab:hover {
          background: rgba(11, 30, 61, 0.05);
          color: var(--color-navy-deep);
        }

        .eng__tab--active {
          background: var(--color-surface);
          color: var(--color-navy-deep);
          box-shadow: 0 6px 18px -10px rgba(11, 30, 61, 0.25);
        }

        .eng__tab--active .eng__tab-icon {
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          color: var(--color-gold-light);
        }

        .eng__tab--active .eng__tab-chevron {
          opacity: 1;
          transform: translateX(0);
          color: var(--color-gold);
        }

        .eng__detail {
          padding: clamp(24px, 3vw, 36px);
          animation: engFadeIn 0.35s ease;
        }

        @keyframes engFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }

        .eng__detail-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .eng__detail-icon {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          color: var(--color-gold-light);
        }

        .eng__detail-icon svg { width: 22px; height: 22px; }

        .eng__detail-tag {
          font-family: 'Courier New', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-gold);
          background: rgba(201, 151, 44, 0.14);
          padding: 6px 12px;
          border-radius: 999px;
        }

        .eng__detail-title {
          margin: 0 0 10px;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(19px, 2vw, 24px);
          color: var(--color-navy-deep);
        }

        .eng__detail-body {
          margin: 0 0 20px;
          max-width: 58ch;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--color-text-muted);
        }

        .eng__detail-list {
          list-style: none;
          margin: 0 0 24px;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }

        .eng__detail-list li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--color-navy-deep);
          font-weight: 500;
        }

        .eng__detail-list svg {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-top: 2px;
          color: var(--color-gold);
        }

        .eng__detail-progress {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px dashed var(--color-border);
        }

        .eng__detail-progress span {
          font-family: 'Courier New', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .eng__detail-progress-track {
          flex: 1;
          height: 4px;
          border-radius: 999px;
          background: var(--color-border);
          overflow: hidden;
        }

        .eng__detail-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
          transition: width 0.35s ease;
        }

        .eng__mobile-link-wrap { display: none; }

        @media (max-width: 900px) {
          .eng__panel {
            grid-template-columns: 1fr;
          }
          .eng__rail {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            overflow-x: visible;
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            gap: 8px;
          }
          .eng__tab {
            flex-shrink: initial;
            align-items: flex-start;
            gap: 8px;
            padding: 10px;
          }
          .eng__tab-title {
            white-space: normal;
            font-size: 14px;
          }
          .eng__tab-chevron {
            display: none;
          }
          .eng__detail-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .eng__rail {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .eng { padding: 32px 0; }
          .eng__head {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 20px;
          }
          .eng__link { display: none; }
          .eng__link--mobile { display: inline-flex; }
          .eng__mobile-link-wrap { display: block; margin-top: 20px; }
        }
      `}</style>
    </section>
  );
}