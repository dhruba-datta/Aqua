import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PAGE_BG = '#f5f5f5';

export default function NotFound({ lenis }) {
  const mainRef = useRef(null);
  const digitsRef = useRef(null);
  const location = useLocation();

  // Jump to top on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  // Entrance animation for the 404 digits + supporting copy
  useEffect(() => {
    if (!mainRef.current) return;
    // Lock the page to the neutral off-white; footer handles its own colour transition
    gsap.set(mainRef.current, { backgroundColor: PAGE_BG });

    const ctx = gsap.context(() => {
      gsap.from('.notfound__digit', {
        y: '110%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.1,
      });
      gsap.from('.notfound__reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.35,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const suggestions = [
    { num: '01', title: 'Return home', desc: 'Start from the top and explore what AQUA does.', to: '/' },
    { num: '02', title: 'Privacy policy', desc: 'How we handle the information you share with us.', to: '/privacy' },
    { num: '03', title: 'Terms of service', desc: 'The agreement that frames how we work together.', to: '/terms' },
  ];

  return (
    <main
      ref={mainRef}
      className="noise-bg text-black min-h-screen flex flex-col"
      id="main-content"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* Hero */}
      <section className="relative pt-36 md:pt-52 pb-12 md:pb-16 overflow-hidden">
        <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
          <div className="flex items-center gap-3 mb-8 notfound__reveal">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">
              Error · Page Not Found
            </span>
          </div>

          {/* Giant 404 */}
          <div
            ref={digitsRef}
            className="flex items-center justify-center md:justify-start gap-2 md:gap-4 leading-none tracking-tightest uppercase select-none mt-2 md:mt-4"
            aria-hidden="true"
          >
            {['4', '0', '4'].map((d, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden"
              >
                <span
                  className="notfound__digit inline-block text-[clamp(6rem,22vw,20rem)] font-black leading-[0.8]"
                >
                  {d}
                </span>
              </span>
            ))}
          </div>

          <h1 className="sr-only">404 — Page not found</h1>

          {/* Subtitle + meta */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="md:col-span-8 notfound__reveal">
              <p className="text-[1.5rem] sm:text-[1.875rem] md:text-[2.25rem] lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight">
                <span className="block">This page drifted off course.</span>
                <span className="block text-black/40 md:whitespace-nowrap">
                  Let&apos;s get you back to solid ground.
                </span>
              </p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end notfound__reveal">
              <div className="flex flex-col gap-1 text-[11px] sm:text-[12px] font-bold tracking-widest uppercase">
                <span className="opacity-50">Requested path</span>
                <span className="break-all">{location.pathname || '/'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions — editorial row list, same language as About pillars */}
      <section className="pb-20 md:pb-28 flex-1">
        <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
          <div className="max-w-5xl mx-auto notfound__reveal">
            <div className="flex items-baseline justify-between mb-6 md:mb-8">
              <p className="text-[13px] font-bold tracking-widest uppercase opacity-50">
                Where to next
              </p>
              <p className="text-[13px] font-bold tracking-widest uppercase opacity-30 hidden md:block">
                03 options
              </p>
            </div>

            <div className="border-t border-black/15">
              {suggestions.map((s) => (
                <Link
                  key={s.num}
                  to={s.to}
                  className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-6 md:py-8 px-4 md:px-10 border-b border-black/15 transition-colors duration-400 hover:bg-black/[0.03]"
                >
                  <span className="col-span-2 md:col-span-1 text-[11px] md:text-[12px] font-bold tracking-widest uppercase opacity-40">
                    {s.num}
                  </span>
                  <div className="col-span-8 md:col-span-4">
                    <h3 className="text-[1.375rem] sm:text-[1.5rem] md:text-[1.875rem] font-medium tracking-tight leading-[1]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="col-span-12 md:col-span-6 text-[0.95rem] md:text-[1rem] leading-[1.5] text-black/60 md:pr-6">
                    {s.desc}
                  </p>
                  <span className="hidden md:flex md:col-span-1 justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            {/* Closing row */}
            <div className="pt-10 md:pt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
              <p className="md:col-span-8 text-[1.125rem] sm:text-[1.25rem] md:text-[1.5rem] font-medium leading-[1.3] tracking-tight">
                Or tell us what you were looking for —{' '}
                <span className="text-black/45">
                  we&apos;ll point you in the right direction.
                </span>
              </p>
              <Link
                to="/"
                className="md:col-span-4 inline-flex items-center gap-3 text-[13px] font-bold tracking-widest uppercase md:justify-end group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">
                  Back to home
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-x-1 transition-transform rotate-180"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip — mirrors hero row on Home */}
      <div className="w-full px-6 sm:px-12 lg:px-32 pb-6 sm:pb-10 uppercase">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-[0.65rem] sm:text-[0.75rem] font-semibold tracking-wider gap-2 md:gap-0 opacity-60">
          <span className="text-center md:text-left">AQUA Innovations · Dhaka, BD</span>
          <span className="text-center hidden md:block">Error 404</span>
          <span className="text-center md:text-right">Established 2025</span>
        </div>
      </div>
    </main>
  );
}
