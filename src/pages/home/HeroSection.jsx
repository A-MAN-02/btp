import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero-bg.jpeg'; // Adjust the path as necessary

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero__image-bg" aria-hidden="true">
        <img
          className="hero__image"
          src={heroImage}
          alt=""
        />
        <div className="hero__image-overlay" />
      </div>

      <div className="hero__grid-bg" aria-hidden="true" />

      <div className="hero__container">
        {/* Left — content */}
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Strategic Talent Solutions
          </p>

          <h1 className="hero__headline">
            <span className="hero__headline-line hero__headline-line--navy">
              Engineering-Led Search.
            </span>
            <span className="hero__headline-line hero__headline-line--steel">
              AI-Accelerated Delivery.
            </span>
          </h1>

          <p className="hero__subheadline">
            We hire the engineers other staffing firms can&rsquo;t qualify — RF,
            FPGA, embedded, semiconductor, cloud and AI talent, screened by
            people who&rsquo;ve actually built this stuff.
          </p>

          <div className="hero__actions">
            <Link to="/contact" className="hero__cta-primary">
              Start a Search
            </Link>
            <Link to="/how-we-work" className="hero__cta-secondary">
              See How We Work
            </Link>
          </div>

          <p className="hero__trust">
            <span className="hero__trust-mark" aria-hidden="true" />
            A Bharyat Advanced Systems Company
          </p>
        </div>

        {/* Right — animated engineering-core graphic */}
        <div className="hero__visual" aria-hidden="true">
          <svg viewBox="0 0 500 500" className="hero__svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E4B85C" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#C9972C" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#C9972C" stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* traces — top row: Cloud / AI / Embedded, bottom row: HW/PCB / FPGA / RF */}
            <g className="trace-group">
              <path className="trace" d="M250,250 L250,170 L100,170 L100,90" />
              <path className="trace" d="M250,250 L250,90" />
              <path className="trace" d="M250,250 L250,170 L400,170 L400,90" />
              <path className="trace" d="M250,250 L250,330 L100,330 L100,410" />
              <path className="trace" d="M250,250 L250,410" />
              <path className="trace" d="M250,250 L250,330 L400,330 L400,410" />
            </g>

            {/* vias */}
            <circle className="via" cx="250" cy="170" r="3.5" />
            <circle className="via" cx="100" cy="170" r="3.5" />
            <circle className="via" cx="400" cy="170" r="3.5" />
            <circle className="via" cx="250" cy="330" r="3.5" />
            <circle className="via" cx="100" cy="330" r="3.5" />
            <circle className="via" cx="400" cy="330" r="3.5" />

            {/* endpoint badges — top row */}
            <g className="badge" transform="translate(100,90)">
              <rect x="-38" y="-17" width="76" height="34" rx="7" className="badge-bg" />
              <text textAnchor="middle" dy="5" className="badge-text">Cloud</text>
            </g>
            <g className="badge" transform="translate(250,90)">
              <rect x="-30" y="-17" width="60" height="34" rx="7" className="badge-bg" />
              <text textAnchor="middle" dy="5" className="badge-text">AI</text>
            </g>
            <g className="badge" transform="translate(400,90)">
              <rect x="-46" y="-17" width="92" height="34" rx="7" className="badge-bg" />
              <text textAnchor="middle" dy="5" className="badge-text">Embedded</text>
            </g>

            {/* endpoint badges — bottom row */}
            <g className="badge" transform="translate(100,410)">
              <rect x="-44" y="-17" width="88" height="34" rx="7" className="badge-bg" />
              <text textAnchor="middle" dy="5" className="badge-text">HW/PCB</text>
            </g>
            <g className="badge" transform="translate(250,410)">
              <rect x="-38" y="-17" width="76" height="34" rx="7" className="badge-bg" />
              <text textAnchor="middle" dy="5" className="badge-text">FPGA</text>
            </g>
            <g className="badge" transform="translate(400,410)">
              <rect x="-34" y="-17" width="68" height="34" rx="7" className="badge-bg" />
              <text textAnchor="middle" dy="5" className="badge-text">RF</text>
            </g>

            {/* core */}
            <circle className="core-glow" cx="250" cy="250" r="70" fill="url(#coreGlow)" />
            <circle className="core-ring" cx="250" cy="250" r="42" />
            <rect className="core-chip" x="230" y="230" width="40" height="40" rx="6" />
            <g className="core-pins">
              <line x1="238" y1="230" x2="238" y2="218" />
              <line x1="262" y1="230" x2="262" y2="218" />
              <line x1="238" y1="270" x2="238" y2="282" />
              <line x1="262" y1="270" x2="262" y2="282" />
              <line x1="230" y1="238" x2="218" y2="238" />
              <line x1="230" y1="262" x2="218" y2="262" />
              <line x1="270" y1="238" x2="282" y2="238" />
              <line x1="270" y1="262" x2="282" y2="262" />
            </g>

            {/* traveling signal pulses */}
            <circle className="pulse pulse--cloud" r="4.5" filter="url(#softGlow)" />
            <circle className="pulse pulse--ai" r="4.5" filter="url(#softGlow)" />
            <circle className="pulse pulse--embedded" r="4.5" filter="url(#softGlow)" />
            <circle className="pulse pulse--hwpcb" r="4.5" filter="url(#softGlow)" />
            <circle className="pulse pulse--fpga" r="4.5" filter="url(#softGlow)" />
            <circle className="pulse pulse--rf" r="4.5" filter="url(#softGlow)" />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

        .hero {
          position: relative;
          overflow: hidden;
          min-height: 88vh;
          display: flex;
          align-items: center;
          padding: 56px 0 64px;
        }

        @media (max-width: 900px) {
          .hero {
            min-height: auto;
            padding: 130px 0 48px;
          }
        }

        .hero__image-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.62;
}

.hero__image-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(240, 246, 252, 0.98) 0%, rgba(240, 246, 252, 0.9) 28%, rgba(240, 246, 252, 0.5) 48%, rgba(240, 246, 252, 0.14) 74%, rgba(240, 246, 252, 0.06) 100%),
    linear-gradient(180deg, rgba(240, 246, 252, 0.05), rgba(234, 243, 251, 0.2));
}

@media (max-width: 900px) {
 /* .hero__image-overlay {
    background:
      linear-gradient(180deg, rgba(240, 246, 252, 0.92), rgba(240, 246, 252, 0.86) 55%, rgba(234, 243, 251, 0.7));
  } */
}

        .hero__grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(1100px 520px at 78% 20%, #000 0%, transparent 72%);
          mask-image: radial-gradient(1100px 520px at 78% 20%, #000 0%, transparent 72%);
          opacity: 0.55;
          pointer-events: none;
          z-index: 1;
        }

        .hero__container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: center;
          gap: clamp(32px, 5vw, 64px);
        }

        /* ---- Content ---- */
        .hero__content {
          max-width: 640px;
        }

        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 20px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-gold);
          opacity: 0;
          animation: heroRise 0.7s ease-out forwards;
        }

        .hero__eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-gold);
          box-shadow: 0 0 0 0 rgba(201, 151, 44, 0.55);
          animation: heroPing 2.4s ease-out infinite;
        }

        .hero__headline {
          margin: 0 0 22px;
          font-family: 'Bruno Ace', var(--font-display);
          font-weight: 600;
          font-size: clamp(2.3rem, 4.6vw, 3.7rem);
          line-height: 1.12;
          letter-spacing: -0.01em;
        }

        .hero__headline-line {
          display: block;
          opacity: 0;
          animation: heroRise 0.75s ease-out forwards;
        }

        .hero__headline-line--navy {
          color: var(--color-navy-deep);
          animation-delay: 0.1s;
        }

        .hero__headline-line--steel {
          color: var(--color-steel);
          animation-delay: 0.26s;
        }

        .hero__subheadline {
          margin: 0 0 34px;
          max-width: 46ch;
          font-family: var(--font-body);
          font-size: clamp(16px, 1.3vw, 18.5px);
          line-height: 1.65;
          color: var(--color-text-muted);
          opacity: 0;
          animation: heroRise 0.75s ease-out forwards;
          animation-delay: 0.42s;
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 26px;
          opacity: 0;
          animation: heroRise 0.75s ease-out forwards;
          animation-delay: 0.56s;
        }

        .hero__cta-primary,
        .hero__cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          padding: 14px 30px;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .hero__cta-primary {
          color: #fff;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          box-shadow: 0 6px 20px rgba(11, 30, 61, 0.28);
        }

        .hero__cta-primary:hover {
          background: linear-gradient(135deg, var(--color-steel), var(--color-navy-deep));
          box-shadow: 0 8px 26px rgba(11, 30, 61, 0.38);
          transform: translateY(-2px);
        }

        .hero__cta-secondary {
          color: var(--color-navy-deep);
          background: transparent;
          border: 1.5px solid var(--color-border);
        }

        .hero__cta-secondary:hover {
          border-color: var(--color-steel);
          color: var(--color-steel);
          transform: translateY(-2px);
        }

        .hero__trust {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-text-muted);
          opacity: 0;
          animation: heroRise 0.75s ease-out forwards;
          animation-delay: 0.7s;
        }

        .hero__trust-mark {
          width: 16px;
          height: 2px;
          background: var(--color-gold);
          display: inline-block;
        }

        /* ---- Visual ---- */
        .hero__visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: heroVisualIn 0.9s ease-out forwards;
          animation-delay: 0.3s;
        }

        .hero__svg {
          width: 100%;
          max-width: 480px;
          height: auto;
          overflow: visible;
        }

        .trace {
          fill: none;
          stroke: var(--color-steel);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.28;
        }

        .via {
          fill: var(--color-steel);
          opacity: 0.45;
        }

        .badge-bg {
          fill: var(--color-surface);
          stroke: var(--color-border);
          stroke-width: 1.2;
        }

        .badge-text {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          fill: var(--color-navy-deep);
        }

        .core-ring {
          fill: none;
          stroke: var(--color-gold);
          stroke-width: 1.5;
          opacity: 0.5;
        }

        .core-chip {
          fill: var(--color-navy-deep);
        }

        .core-pins {
          stroke: var(--color-gold);
          stroke-width: 2;
          opacity: 0.7;
        }

        .core-glow {
          animation: coreBreathe 3.2s ease-in-out infinite;
          transform-origin: 250px 250px;
        }

        .pulse {
          fill: var(--color-gold-light);
          transform-origin: 0 0;
        }

        .pulse--cloud    { animation: travelCloud 3.4s ease-in-out infinite; animation-delay: 0s; }
        .pulse--ai       { animation: travelAI 3.4s ease-in-out infinite; animation-delay: 0.4s; }
        .pulse--embedded { animation: travelEmbedded 3.4s ease-in-out infinite; animation-delay: 0.8s; }
        .pulse--hwpcb    { animation: travelHwPcb 3.4s ease-in-out infinite; animation-delay: 1.2s; }
        .pulse--fpga     { animation: travelFpga 3.4s ease-in-out infinite; animation-delay: 1.6s; }
        .pulse--rf       { animation: travelRf 3.4s ease-in-out infinite; animation-delay: 2s; }

        @keyframes travelCloud {
          0%   { transform: translate(250px,250px); opacity: 0; }
          10%  { opacity: 1; }
          33%  { transform: translate(250px,170px); }
          66%  { transform: translate(100px,170px); }
          92%  { opacity: 1; }
          100% { transform: translate(100px,90px); opacity: 0; }
        }
        @keyframes travelAI {
          0%   { transform: translate(250px,250px); opacity: 0; }
          10%  { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(250px,90px); opacity: 0; }
        }
        @keyframes travelEmbedded {
          0%   { transform: translate(250px,250px); opacity: 0; }
          10%  { opacity: 1; }
          33%  { transform: translate(250px,170px); }
          66%  { transform: translate(400px,170px); }
          92%  { opacity: 1; }
          100% { transform: translate(400px,90px); opacity: 0; }
        }
        @keyframes travelHwPcb {
          0%   { transform: translate(250px,250px); opacity: 0; }
          10%  { opacity: 1; }
          33%  { transform: translate(250px,330px); }
          66%  { transform: translate(100px,330px); }
          92%  { opacity: 1; }
          100% { transform: translate(100px,410px); opacity: 0; }
        }
        @keyframes travelFpga {
          0%   { transform: translate(250px,250px); opacity: 0; }
          10%  { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(250px,410px); opacity: 0; }
        }
        @keyframes travelRf {
          0%   { transform: translate(250px,250px); opacity: 0; }
          10%  { opacity: 1; }
          33%  { transform: translate(250px,330px); }
          66%  { transform: translate(400px,330px); }
          92%  { opacity: 1; }
          100% { transform: translate(400px,410px); opacity: 0; }
        }

        @keyframes coreBreathe {
          0%, 100% { opacity: 0.75; transform: scale(0.96); }
          50%      { opacity: 1; transform: scale(1.04); }
        }

        @keyframes heroPing {
          0%   { box-shadow: 0 0 0 0 rgba(201, 151, 44, 0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(201, 151, 44, 0); }
          100% { box-shadow: 0 0 0 0 rgba(201, 151, 44, 0); }
        }

        @keyframes heroRise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroVisualIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero__eyebrow,
          .hero__headline-line,
          .hero__subheadline,
          .hero__actions,
          .hero__trust,
          .hero__visual {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .hero__eyebrow-dot,
          .pulse,
          .core-glow {
            animation: none;
          }
        }

        @media (max-width: 900px) {
          .hero__container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero__content {
            max-width: 100%;
            margin: 0 auto;
          }
          .hero__subheadline {
            margin-left: auto;
            margin-right: auto;
          }
          .hero__actions,
          .hero__trust {
            justify-content: center;
          }
          .hero__visual {
            order: -1;
            max-width: 340px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}