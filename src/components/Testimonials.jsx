import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote:
      "AQUA doesn't just execute — they elevate the entire vision. Every touchpoint felt considered, every detail engineered.",
    author: 'Senior Marketing Manager',
    role: 'FMCG Brand',
  },
  {
    quote:
      'Their ability to merge architecture with brand storytelling is unmatched. It changed how we think about our physical spaces.',
    author: 'Corporate Client',
    role: 'Multinational Brand',
  },
  {
    quote:
      'From concept to delivery, everything felt precise, premium, and impactful. A rare combination of creativity and discipline.',
    author: 'Event Director',
    role: 'Hospitality Group',
  },
];

const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const quoteRef = useRef(null);
  const metaRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_MS);
  }, []);

  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  const goTo = (idx) => {
    setCurrent(((idx % testimonials.length) + testimonials.length) % testimonials.length);
    resetTimer();
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // autoplay (pauses on hover)
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer, paused]);

  // entrance animation on slide change
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
        );
      }
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [current]);

  const t = testimonials[current];
  const indexLabel = String(current + 1).padStart(2, '0');
  const totalLabel = String(testimonials.length).padStart(2, '0');

  return (
    <section
      className="py-20 md:py-32 text-black"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-4xl">
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
                Client Words
              </span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              Heard across the table.
            </h2>
          </div>
          <p className="text-[1rem] md:text-[1.125rem] leading-[1.55] text-black/60 max-w-sm md:mb-3">
            Fragments of the conversations that shape how we work and the partnerships we keep.
          </p>
        </div>

        {/* Stage */}
        <div className="relative border-t border-black/15">
          {/* Giant decorative quote — acts as a subtle backdrop watermark */}
          <span
            aria-hidden="true"
            className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 text-[14rem] sm:text-[18rem] md:text-[26rem] lg:text-[32rem] leading-[0.7] font-black text-black/[0.05] select-none pointer-events-none"
          >
            &ldquo;
          </span>

          <div className="relative pt-14 md:pt-24 pb-10 md:pb-14 px-0 md:px-6">
            {/* Slide index */}
            <div className="flex items-center justify-center gap-3 mb-10 md:mb-16">
              <span className="h-px w-8 bg-black/30" />
              <span className="text-[11px] font-bold tracking-widest uppercase opacity-50 tabular-nums">
                {indexLabel} &nbsp;/&nbsp; {totalLabel}
              </span>
              <span className="h-px w-8 bg-black/30" />
            </div>

            {/* Quote */}
            <blockquote
              ref={quoteRef}
              key={`quote-${current}`}
              className="mx-auto text-center max-w-5xl"
            >
              <p className="text-[1.375rem] sm:text-[1.75rem] md:text-[2.5rem] lg:text-[3.25rem] font-medium leading-[1.2] tracking-tight">
                {t.quote}
              </p>
            </blockquote>

            {/* Hairline divider */}
            <div className="mx-auto my-10 md:my-14 h-px w-20 md:w-24 bg-black/25" />

            {/* Attribution */}
            <div
              ref={metaRef}
              key={`meta-${current}`}
              className="text-center"
            >
              <p className="text-[12px] md:text-[13px] font-bold tracking-widest uppercase mb-2">
                {t.author}
              </p>
              <p className="text-[0.95rem] md:text-[1rem] text-black/50">
                {t.role}
              </p>
            </div>
          </div>
        </div>

        {/* Controls row — shared pattern with About / legal pages */}
        <div className="mt-10 md:mt-14 border-t border-black/15 pt-6 md:pt-8 flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="group inline-flex items-center gap-3 text-[13px] font-bold tracking-widest uppercase cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">
              Prev
            </span>
          </button>

          {/* Progress bars */}
          <div className="flex items-center gap-2 md:gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ease-out cursor-pointer ${
                  i === current
                    ? 'w-10 md:w-12 bg-black'
                    : 'w-5 md:w-6 bg-black/25 hover:bg-black/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="group inline-flex items-center gap-3 text-[13px] font-bold tracking-widest uppercase cursor-pointer"
          >
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">
              Next
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
