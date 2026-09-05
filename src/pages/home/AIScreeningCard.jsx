import { useEffect, useRef, useState } from 'react';

// ---- Timeline (ms) — tune these to speed up/slow down the loop ----
const SCAN_MS = 2200;   // skeleton shimmer / "reading resume" phase
const BADGE_MS = 900;   // stagger for the two match badges + Panel-ready pill
const SCORE_MS = 1400;  // fit-score ring fill duration
const HOLD_MS = 1800;   // pause on the finished state before looping
const CYCLE_MS = SCAN_MS + BADGE_MS + SCORE_MS + HOLD_MS;
const TARGET_SCORE = 92;

const SCORE_START = SCAN_MS + BADGE_MS;
const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const LOG_LINES = [
  { text: 'parsing JD_RF_Systems_Engineer.pdf', status: 'done' },
  { text: 'ranking candidate pool [247 profiles]', status: '' },
  { text: 'routing top match to domain engineer for review', status: '' },
];

export default function AIScreeningCard() {
  const [cycle, setCycle] = useState(0);
  const [score, setScore] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(undefined);

  useEffect(() => {
    let cancelled = false;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setScore(TARGET_SCORE);
      return undefined;
    }

    function tick(ts) {
      if (cancelled) return;
      if (startRef.current === undefined) startRef.current = ts;
      const elapsed = ts - startRef.current;

      if (elapsed < SCORE_START) {
        setScore(0);
      } else if (elapsed < SCORE_START + SCORE_MS) {
        const t = (elapsed - SCORE_START) / SCORE_MS;
        setScore(Math.round(TARGET_SCORE * Math.min(1, t)));
      } else {
        setScore(TARGET_SCORE);
      }

      if (elapsed >= CYCLE_MS) {
        startRef.current = ts;
        setCycle((c) => c + 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="ai-screen" key={cycle}>
      <div className="ai-screen__header">
        <span className="ai-screen__live">
          <span className="ai-screen__live-dot" aria-hidden="true" />
          AI SCREENING &mdash; LIVE
        </span>
        <span className="ai-screen__winctl" aria-hidden="true">
          <i /><i /><i />
        </span>
      </div>

      <div className="ai-screen__panel">
        <div className="ai-screen__resume">
          <span className="ai-screen__scanbar" aria-hidden="true" />
          <div className="ai-screen__line ai-screen__line--title" />
          <div className="ai-screen__line" style={{ width: '86%' }} />
          <div className="ai-screen__line" style={{ width: '94%' }} />
          <div className="ai-screen__line" style={{ width: '68%' }} />
          <div className="ai-screen__line" style={{ width: '78%' }} />
          <div className="ai-screen__line" style={{ width: '52%' }} />
        </div>

        <div className="ai-screen__side">
          <span className="ai-screen__match ai-screen__match--1">RF / mmWave &mdash; match</span>
          <span className="ai-screen__match ai-screen__match--2">6 yrs embedded C</span>
          <span className="ai-screen__ready">Panel-ready</span>

          <div className="ai-screen__score">
            <svg viewBox="0 0 84 84" className="ai-screen__ring">
              <circle className="ai-screen__ring-track" cx="42" cy="42" r={RADIUS} />
              <circle
                className="ai-screen__ring-fill"
                cx="42"
                cy="42"
                r={RADIUS}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="ai-screen__score-text">
              <strong>{score}%</strong>
              <span>FIT SCORE</span>
            </div>
          </div>
        </div>

        <div className="ai-screen__scorebar" aria-hidden="true">
          <span className="ai-screen__scorebar-fill" style={{ width: `${score}%` }} />
        </div>
      </div>

      <div className="ai-screen__log">
        {LOG_LINES.map((line, i) => (
          <p className="ai-screen__log-line" style={{ animationDelay: `${i * 260}ms` }} key={line.text}>
            <span className="ai-screen__log-caret">&gt;</span> {line.text}
            {line.status && <span className="ai-screen__log-status"> {line.status}</span>}
          </p>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .ai-screen {
          position: relative;
          width: 100%;
          max-width: 380px;
          background: linear-gradient(160deg, var(--color-navy-deep), var(--color-steel));
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 30px 60px -28px rgba(11, 30, 61, 0.55);
          font-family: var(--font-body);
          color: #fff;
        }

        .ai-screen__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .ai-screen__live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-gold-light);
        }

        .ai-screen__live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3ddc84;
          box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.6);
          animation: aiLivePulse 1.6s ease-out infinite;
        }

        .ai-screen__winctl {
          display: inline-flex;
          gap: 5px;
        }

        .ai-screen__winctl i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(248, 245, 239, 0.35);
          display: inline-block;
        }

        .ai-screen__panel {
          position: relative;
          background: rgba(248, 245, 239, 0.06);
          border: 1px solid rgba(228, 184, 92, 0.16);
          border-radius: 14px;
          padding: 16px 16px 14px;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 16px;
          overflow: hidden;
        }

        .ai-screen__resume {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 9px;
          overflow: hidden;
        }

        .ai-screen__scanbar {
          position: absolute;
          left: 0;
          right: 0;
          height: 22px;
          background: linear-gradient(180deg, rgba(228, 184, 92, 0.32), rgba(228, 184, 92, 0));
          animation: aiScan ${SCAN_MS}ms ease-in-out 1;
          pointer-events: none;
        }

        .ai-screen__line {
          height: 8px;
          width: 100%;
          border-radius: 5px;
          background: rgba(248, 245, 239, 0.14);
        }

        .ai-screen__line--title {
          width: 60%;
          height: 10px;
          background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
          opacity: 0.85;
        }

        .ai-screen__side {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .ai-screen__match {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #8be9b8;
          background: rgba(61, 220, 132, 0.12);
          border: 1px solid rgba(61, 220, 132, 0.35);
          border-radius: 999px;
          padding: 5px 12px;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          animation: aiFadeIn 0.5s ease forwards;
        }

        .ai-screen__match--1 { animation-delay: ${SCAN_MS}ms; }
        .ai-screen__match--2 { animation-delay: ${SCAN_MS + 260}ms; }

        .ai-screen__ready {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(248, 245, 239, 0.35);
          border: 1px solid rgba(248, 245, 239, 0.18);
          border-radius: 999px;
          padding: 4px 11px;
          transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          animation: aiReady 0.5s ease forwards;
          animation-delay: ${SCAN_MS + 520}ms;
        }

        .ai-screen__score {
          position: relative;
          width: 84px;
          height: 84px;
          margin-top: 6px;
        }

        .ai-screen__ring {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .ai-screen__ring-track {
          fill: none;
          stroke: rgba(248, 245, 239, 0.12);
          stroke-width: 6;
        }

        .ai-screen__ring-fill {
          fill: none;
          stroke: var(--color-gold-light);
          stroke-width: 6;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.15s linear;
        }

        .ai-screen__score-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ai-screen__score-text strong {
          font-family: 'Bruno Ace', var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        .ai-screen__score-text span {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(248, 245, 239, 0.6);
          margin-top: 3px;
        }

        .ai-screen__scorebar {
          grid-column: 1 / -1;
          height: 5px;
          border-radius: 3px;
          background: rgba(248, 245, 239, 0.1);
          overflow: hidden;
        }

        .ai-screen__scorebar-fill {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
          transition: width 0.15s linear;
        }

        .ai-screen__log {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ai-screen__log-line {
          margin: 0;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          font-size: 11.5px;
          color: rgba(248, 245, 239, 0.65);
          opacity: 0;
          transform: translateY(4px);
          animation: aiFadeIn 0.4s ease forwards;
        }

        .ai-screen__log-caret {
          color: var(--color-gold-light);
          margin-right: 2px;
        }

        .ai-screen__log-status {
          color: #8be9b8;
          font-weight: 700;
        }

        @keyframes aiScan {
          0%   { transform: translateY(0); opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(148px); opacity: 0; }
        }

        @keyframes aiFadeIn {
          to { opacity: 1; transform: none; }
        }

        @keyframes aiReady {
          to {
            color: var(--color-gold-light);
            border-color: rgba(228, 184, 92, 0.5);
            background: rgba(228, 184, 92, 0.12);
          }
        }

        @keyframes aiLivePulse {
          0%   { box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.55); }
          70%  { box-shadow: 0 0 0 7px rgba(61, 220, 132, 0); }
          100% { box-shadow: 0 0 0 0 rgba(61, 220, 132, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-screen__scanbar { animation: none; opacity: 0; }
          .ai-screen__match,
          .ai-screen__ready,
          .ai-screen__log-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .ai-screen__ready {
            color: var(--color-gold-light);
            border-color: rgba(228, 184, 92, 0.5);
            background: rgba(228, 184, 92, 0.12);
          }
        }

        @media (max-width: 420px) {
          .ai-screen__panel {
            grid-template-columns: 1fr;
          }
          .ai-screen__side {
            align-items: flex-start;
          }
          .ai-screen__score {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
