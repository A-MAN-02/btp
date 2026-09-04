import { useEffect, useRef } from 'react';

export default function ProblemSection() {
  const sectionRef = useRef(null);

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
            setTimeout(() => el.classList.add('problem__reveal--show'), (i % 4) * 90);
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
    <section className="problem" ref={sectionRef}>
      <div className="problem__container">
        <h2 className="problem__heading problem__reveal">
          Your last recruiter couldn&rsquo;t tell an RF engineer from a r&eacute;sum&eacute; that
          just said &ldquo;RF.&rdquo;
        </h2>
        <p className="problem__body problem__reveal">
          Most staffing agencies run every requisition &mdash; from a frontend developer to an RTL
          design engineer &mdash; through the same generalist pipeline. Keyword-matched resumes.
          Recruiters with no technical grounding. Slow, manual screening that takes days. For
          deep-tech and product-engineering roles, that approach fails quietly: you interview
          candidates who look right on paper and aren&rsquo;t.
        </p>
      </div>

      <style>{`
        .problem {
          padding: clamp(56px, 8vw, 96px) 0;
        }

        .problem__container {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        .problem__heading {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(24px, 3.2vw, 36px);
          line-height: 1.3;
          color: var(--color-navy-deep);
        }

        .problem__body {
          margin: 22px 0 0;
          max-width: 680px;
          font-family: var(--font-body);
          font-size: clamp(15px, 1.2vw, 16.5px);
          line-height: 1.65;
          color: var(--color-text-muted);
        }

        .problem__reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .problem__reveal--show {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .problem__reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 720px) {
          .problem {
            padding: 44px 0;
          }
        }
      `}</style>
    </section>
  );
}