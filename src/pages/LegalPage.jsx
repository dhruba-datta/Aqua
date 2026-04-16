import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = '#48D5CD';
const CONTENT_BG = '#f5f5f5';

export default function LegalPage({ eyebrow, title, intro, updated, sections, lenis }) {
  const mainRef = useRef(null);
  const contentRef = useRef(null);

  // Jump to top when landing on a legal page
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis, title]);

  // Background transition: aqua hero → off-white content (reverts on scroll back)
  useEffect(() => {
    if (!mainRef.current || !contentRef.current) return;

    // Seed the initial color so GSAP controls it cleanly
    gsap.set(mainRef.current, { backgroundColor: HERO_BG });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 75%',
        end: 'top 85%',
        onEnter: () => {
          gsap.to(mainRef.current, {
            backgroundColor: CONTENT_BG,
            duration: 0.8,
            ease: 'power2.inOut',
          });
        },
        onLeaveBack: () => {
          gsap.to(mainRef.current, {
            backgroundColor: HERO_BG,
            duration: 0.8,
            ease: 'power2.inOut',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -120, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      ref={mainRef}
      className="noise-bg text-black"
      id="main-content"
      style={{ backgroundColor: HERO_BG }}
    >
      {/* Hero / Header */}
      <section className="relative pt-36 md:pt-52 pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
          <div className="flex items-center gap-3 mb-8">
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
              {eyebrow}
            </span>
          </div>

          <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-medium leading-[1] tracking-tight max-w-5xl">
            {title}
          </h1>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
            <p className="md:col-span-8 text-[1rem] md:text-[1.25rem] leading-[1.55] text-black/65 max-w-3xl">
              {intro}
            </p>
            <div className="md:col-span-4 flex md:justify-end">
              <div className="flex flex-col gap-1 text-[11px] sm:text-[12px] font-bold tracking-widest uppercase">
                <span className="opacity-50">Last Updated</span>
                <span>{updated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="pb-24 md:pb-36 pt-8 md:pt-12">
        <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Index / TOC */}
            <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-32 md:self-start">
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-[13px] font-bold tracking-widest uppercase opacity-50">
                  Index
                </p>
                <p className="text-[13px] font-bold tracking-widest uppercase opacity-30">
                  {String(sections.length).padStart(2, '0')} items
                </p>
              </div>
              <ol className="border-t border-black/15">
                {sections.map((s, i) => (
                  <li key={s.id} className="border-b border-black/15">
                    <a
                      href={`#${s.id}`}
                      onClick={scrollToId(s.id)}
                      className="group grid grid-cols-12 gap-3 items-center py-4 px-3 -mx-3 rounded-lg transition-colors duration-300 hover:bg-black/[0.04]"
                    >
                      <span className="col-span-2 text-[11px] font-bold tracking-widest uppercase opacity-40">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="col-span-9 text-[0.95rem] md:text-[1rem] font-medium tracking-tight leading-[1.25]">
                        {s.title}
                      </span>
                      <span className="col-span-1 flex justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg
                          width="12"
                          height="12"
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
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Main content */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="max-w-3xl">
                {sections.map((s, i) => (
                  <article
                    key={s.id}
                    id={s.id}
                    className="scroll-mt-32 py-10 md:py-14 border-b border-black/15 first:pt-0 first:border-t-0"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[11px] font-bold tracking-widest uppercase opacity-40">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-black/15" />
                    </div>
                    <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.25rem] font-medium tracking-tight leading-[1.1] mb-6">
                      {s.title}
                    </h2>
                    <div className="space-y-5 text-[1rem] md:text-[1.0625rem] leading-[1.65] text-black/70">
                      {s.body.map((block, bi) => {
                        if (block.type === 'p') {
                          return <p key={bi}>{block.text}</p>;
                        }
                        if (block.type === 'list') {
                          return (
                            <ul key={bi} className="space-y-3 pl-0">
                              {block.items.map((item, ii) => (
                                <li
                                  key={ii}
                                  className="flex gap-4 items-start"
                                >
                                  <span className="mt-[0.55rem] block w-2 h-2 rounded-full bg-black/40 shrink-0" />
                                  <span className="flex-1">{item}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        if (block.type === 'note') {
                          return (
                            <p
                              key={bi}
                              className="text-[0.95rem] md:text-[1rem] italic text-black/55 border-l-2 border-black/20 pl-5"
                            >
                              {block.text}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </article>
                ))}

                {/* Closing */}
                <div className="pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
                  <p className="md:col-span-8 text-[1.25rem] sm:text-[1.5rem] md:text-[1.875rem] font-medium leading-[1.25] tracking-tight">
                    Questions about this document?{' '}
                    <span className="text-black/45">
                      Reach the team — we respond personally.
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
          </div>
        </div>
      </section>
    </main>
  );
}
