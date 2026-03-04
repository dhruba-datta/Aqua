import { useEffect, useRef } from 'react';

export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-dark text-white overflow-hidden" ref={sectionRef}>
      <div className="mx-auto px-6 sm:px-10 lg:px-16 max-w-[1440px]">
        <p className="text-fluid-h1 font-bold leading-tight tracking-tight">
          In a{' '}
          <span className="text-white/40">
            world full of noise,
          </span>{' '}
          we help brands{' '}
          <span className="relative inline-block px-2 group">
            stand out
            <svg className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none opacity-0 [.is-visible_&]:opacity-100 transition-opacity duration-1000" viewBox="0 0 200 12" preserveAspectRatio="none">
              <path
                d="M2 8 C 30 2, 50 12, 80 6 S 130 2, 160 8 S 190 4, 198 6"
                fill="none"
                className="stroke-accent stroke-[3] stroke-linecap-round [stroke-dasharray:1000] [stroke-dashoffset:1000] [.is-visible_&]:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-[1500ms] delay-300"
              />
            </svg>
          </span>{' '}
          with clear ideas and{' '}
          <span className="relative inline-block px-4 group">
            good design
            <svg className="absolute -inset-2 w-[110%] h-[120%] pointer-events-none opacity-0 [.is-visible_&]:opacity-100 transition-opacity duration-1000" viewBox="0 0 220 80" preserveAspectRatio="none">
              <ellipse
                cx="110"
                cy="40"
                rx="105"
                ry="35"
                fill="none"
                className="stroke-accent stroke-[2.5] stroke-linecap-round [stroke-dasharray:1000] [stroke-dashoffset:1000] [.is-visible_&]:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-[1500ms] delay-700"
              />
            </svg>
          </span>{' '}
          that makes an{' '}
          <span className="text-white/40 italic">impact.</span>
        </p>
      </div>
    </section>
  );
}
