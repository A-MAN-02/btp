const LOCATIONS = ['Bengaluru', 'New Delhi', 'Noida', 'United States', 'Germany'];

export default function TrustStrip() {
  // duplicate list for seamless marquee loop
  const loopLocations = [...LOCATIONS, ...LOCATIONS];

  return (
    <section className="trust-strip">
      <div className="trust-strip__container">
        <p className="trust-strip__lead">
          Backed by <strong>8 years</strong> of Bharyat Group engineering &amp; sourcing operations
          across
        </p>

        <div className="trust-strip__marquee-mask">
          <div className="trust-strip__track">
            {loopLocations.map((loc, i) => (
              <span className="trust-strip__chip" key={`${loc}-${i}`}>
                <span className="trust-strip__dot" aria-hidden="true" />
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .trust-strip {
          position: relative;
          background: linear-gradient(135deg, var(--color-navy-deep), var(--color-steel));
          padding: 22px 0;
          overflow: hidden;
        }

        .trust-strip__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .trust-strip__lead {
          margin: 0;
          flex: none;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: rgba(248, 245, 239, 0.82);
          white-space: nowrap;
        }

        .trust-strip__lead strong {
          color: var(--color-gold-light);
          font-weight: 700;
        }

        .trust-strip__marquee-mask {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 8%,
            #000 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 8%,
            #000 92%,
            transparent 100%
          );
        }

        .trust-strip__track {
          display: flex;
          align-items: center;
          gap: 14px;
          width: max-content;
          animation: trustMarquee 22s linear infinite;
        }

        .trust-strip__marquee-mask:hover .trust-strip__track {
          animation-play-state: paused;
        }

        .trust-strip__chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(228, 184, 92, 0.28);
          background: rgba(248, 245, 239, 0.05);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(248, 245, 239, 0.92);
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .trust-strip__chip:hover {
          background: rgba(228, 184, 92, 0.12);
          border-color: rgba(228, 184, 92, 0.55);
        }

        .trust-strip__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-gold-light);
          flex: none;
        }

        @keyframes trustMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-strip__track {
            animation: none;
          }
        }

        @media (max-width: 640px) {
          .trust-strip__container {
            gap: 14px;
          }
          .trust-strip__lead {
            white-space: normal;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}