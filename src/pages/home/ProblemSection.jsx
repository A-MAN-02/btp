import { useEffect, useRef } from 'react';

const FRICTION_POINTS = [
  'Keyword-matched resumes, reviewed by non-technical recruiters',
  'Slow, manual screening — CV delivery in days, not hours',
  'One generic pipeline thrown at every technical role',
  'Zero engineering context on niche RF, FPGA or firmware work',
];

const DOMAIN_TAGS = ['RF', 'FPGA', 'Embedded', 'Cloud', 'AI'];

const FLOAT_ICONS = [
  {
    label: 'RF',
    style: { top: '4%', left: '2%' },
    delay: '0s',
    path: 'M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0M12 12v8',
  },
  {
    label: 'Chip',
    style: { top: '10%', right: '3%' },
    delay: '1.4s',
    path: 'M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7V7Z',
  },
  {
    label: 'Cloud',
    style: { bottom: '6%', left: '5%' },
    delay: '0.8s',
    path: 'M7 18a4 4 0 0 1-.6-7.96A5 5 0 0 1 16 8a4.5 4.5 0 0 1 1 8.9',
  },
  {
    label: 'AI',
    style: { bottom: '2%', right: '6%' },
    delay: '2.1s',
    path: 'M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.problem__reveal') || [];
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('problem__reveal--show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('problem__reveal--show'), (i % 8) * 80);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Cursor-driven tilt + spotlight — skipped on touch / reduced-motion
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || isTouch) return;

    const handleMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 6;
      const rotateX = (0.5 - py) * 6;
      panel.style.setProperty('--mx', `${px * 100}%`);
      panel.style.setProperty('--my', `${py * 100}%`);
      panel.style.setProperty('--rx', `${rotateX}deg`);
      panel.style.setProperty('--ry', `${rotateY}deg`);
    };
    const handleLeave = () => {
      panel.style.setProperty('--rx', '0deg');
      panel.style.setProperty('--ry', '0deg');
    };

    panel.addEventListener('mousemove', handleMove);
    panel.addEventListener('mouseleave', handleLeave);
    return () => {
      panel.removeEventListener('mousemove', handleMove);
      panel.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section className="problem" ref={sectionRef}>
      {/* Ambient backdrop: grid, floating domain icons, connector lines */}
      <div className="problem__backdrop" aria-hidden="true">
        <div className="problem__backdrop-grid" />
        {FLOAT_ICONS.map((icon) => (
          <div
            className="problem__float-icon"
            style={{ ...icon.style, animationDelay: icon.delay }}
            key={icon.label}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={icon.path} />
            </svg>
            <span>{icon.label}</span>
          </div>
        ))}
        <svg className="problem__backdrop-lines" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <path className="problem__backdrop-path" d="M60,60 C220,60 220,180 380,180" />
          <path className="problem__backdrop-path" d="M1140,80 C960,80 960,220 800,220" />
          <path className="problem__backdrop-path" d="M70,640 C230,640 230,500 400,500" />
          <path className="problem__backdrop-path" d="M1130,620 C960,620 960,470 780,470" />
        </svg>
      </div>

      <div className="problem__container">
        <div className="problem__panel" ref={panelRef}>
          <div className="problem__spotlight" aria-hidden="true" />
          <svg className="problem__traces" viewBox="0 0 800 500" aria-hidden="true" preserveAspectRatio="none">
            <path d="M0,120 H240 V60 H520" />
            <path d="M0,340 H180 V420 H460 V460" />
            <path d="M800,90 H600 V180 H420" />
            <circle cx="240" cy="120" r="3" />
            <circle cx="520" cy="60" r="3" />
            <circle cx="180" cy="340" r="3" />
            <circle cx="460" cy="420" r="3" />
            <circle cx="600" cy="90" r="3" />
          </svg>

          <div className="problem__tag-row problem__reveal">
            {DOMAIN_TAGS.map((tag) => (
              <span className="problem__tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="problem__grid">
            <div className="problem__lead">
              <p className="problem__eyebrow problem__reveal">
                <span className="problem__eyebrow-dot" aria-hidden="true" />
                The Problem
              </p>
              <h2 className="problem__heading problem__reveal">
                Your last recruiter couldn&rsquo;t tell an RF engineer from a r&eacute;sum&eacute; that
                just said &ldquo;RF.&rdquo;
              </h2>
              <p className="problem__lead-sub problem__reveal">
                Most staffing agencies run every requisition through the same generalist pipeline &mdash;
                whether it&rsquo;s a frontend developer or an RTL design engineer.
              </p>
            </div>

            <div className="problem__detail">
              <p className="problem__list-label problem__reveal">Where it breaks down</p>
              <ul className="problem__list">
                {FRICTION_POINTS.map((point, i) => (
                  <li className="problem__item problem__reveal" key={point} style={{ transitionDelay: `${i * 60}ms` }}>
                    <span className="problem__item-index">{String(i + 1).padStart(2, '0')}</span>
                    <svg className="problem__item-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="problem__flag problem__reveal">
                <svg className="problem__flag-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v4M12 16.5h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>
                  <strong>The result:</strong> you interview candidates who look right on paper
                  and aren&rsquo;t &mdash; for deep-tech and product-engineering roles, that failure is silent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .problem {
          position: relative;
          padding: clamp(64px, 9vw, 108px) 0;
          overflow: hidden;
        }

        /* ---------- Ambient backdrop ---------- */
        .problem__backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .problem__backdrop-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(700px 420px at 50% 50%, #000 0%, transparent 78%);
          mask-image: radial-gradient(700px 420px at 50% 50%, #000 0%, transparent 78%);
          opacity: 0.5;
        }

        .problem__backdrop-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          fill: none;
          stroke: var(--color-gold);
          stroke-width: 1.4;
          stroke-dasharray: 4 6;
          opacity: 0.22;
        }

        .problem__float-icon {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 13px;
          border-radius: 999px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: 0 10px 26px -14px rgba(11, 30, 61, 0.3);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          color: var(--color-steel);
          animation: problemFloat 6s ease-in-out infinite;
        }

        .problem__float-icon svg {
          width: 15px;
          height: 15px;
          color: var(--color-gold);
        }

        /* ---------- Panel ---------- */
        .problem__container {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        .problem__panel {
          --mx: 50%;
          --my: 50%;
          --rx: 0deg;
          --ry: 0deg;
          position: relative;
          overflow: hidden;
          background: linear-gradient(155deg, var(--color-navy-deep), var(--color-navy) 60%, var(--color-steel));
          border: 1px solid rgba(228, 184, 92, 0.18);
          border-radius: 20px;
          padding: clamp(32px, 5vw, 52px) clamp(28px, 5vw, 60px) clamp(36px, 5vw, 60px);
          box-shadow: 0 40px 80px -32px rgba(11, 30, 61, 0.55);
          transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.25s ease;
          will-change: transform;
        }

        .problem__spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(420px circle at var(--mx) var(--my), rgba(228, 184, 92, 0.14), transparent 65%);
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 0;
        }

        .problem__traces {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          fill: none;
          stroke: rgba(228, 184, 92, 0.16);
          stroke-width: 1.4;
          pointer-events: none;
          z-index: 0;
        }

        .problem__traces circle {
          fill: rgba(228, 184, 92, 0.3);
          stroke: none;
        }

        .problem__tag-row {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 26px;
        }

        .problem__tag {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-gold-light);
          padding: 5px 11px;
          border-radius: 999px;
          border: 1px solid rgba(228, 184, 92, 0.3);
          background: rgba(228, 184, 92, 0.06);
        }

        .problem__grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: start;
        }

        .problem__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 16px;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gold-light);
        }

        .problem__eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-gold-light);
          display: inline-block;
          box-shadow: 0 0 0 0 rgba(228, 184, 92, 0.55);
          animation: problemPing 2.4s ease-out infinite;
        }

        .problem__heading {
          margin: 0;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3vw, 33px);
          line-height: 1.32;
          color: #F8F5EF;
        }

        .problem__lead-sub {
          margin: 18px 0 0;
          max-width: 46ch;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(248, 245, 239, 0.6);
        }

        .problem__list-label {
          margin: 0 0 14px;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(248, 245, 239, 0.45);
        }

        .problem__list {
          list-style: none;
          margin: 0 0 22px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .problem__item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.5;
          color: rgba(248, 245, 239, 0.78);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          cursor: default;
        }

        .problem__item:hover {
          background: rgba(248, 245, 239, 0.05);
          border-color: rgba(228, 184, 92, 0.22);
          transform: translateX(4px);
          color: #F8F5EF;
        }

        .problem__item-index {
          flex: none;
          font-family: 'Bruno Ace', var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: rgba(248, 245, 239, 0.32);
          width: 20px;
        }

        .problem__item-icon {
          flex: none;
          width: 18px;
          height: 18px;
          color: rgba(228, 184, 92, 0.75);
        }

        .problem__flag {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          border-radius: 12px;
          background: rgba(248, 245, 239, 0.06);
          border: 1px solid rgba(228, 184, 92, 0.28);
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .problem__flag:hover {
          border-color: rgba(228, 184, 92, 0.5);
          background: rgba(248, 245, 239, 0.09);
        }

        .problem__flag p {
          margin: 0;
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(248, 245, 239, 0.92);
        }

        .problem__flag strong {
          color: var(--color-gold-light);
        }

        .problem__flag-icon {
          flex: none;
          width: 22px;
          height: 22px;
          color: var(--color-gold-light);
          margin-top: 1px;
        }

        .problem__reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .problem__reveal--show {
          opacity: 1;
          transform: none;
        }

        @keyframes problemPing {
          0%   { box-shadow: 0 0 0 0 rgba(228, 184, 92, 0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(228, 184, 92, 0); }
          100% { box-shadow: 0 0 0 0 rgba(228, 184, 92, 0); }
        }

        @keyframes problemFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .problem__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .problem__panel {
            transform: none;
          }
          .problem__eyebrow-dot,
          .problem__float-icon {
            animation: none;
          }
        }

        @media (max-width: 1080px) {
          .problem__float-icon {
            display: none;
          }
        }

        @media (max-width: 820px) {
          .problem__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .problem {
            padding: 44px 0;
          }
          .problem__panel {
            transform: none !important;
          }
          .problem__backdrop-grid,
          .problem__backdrop-lines {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}