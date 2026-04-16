import { useEffect, useRef } from 'react';

const team = [
  {
    name: 'Sikder Istiaque Ahmed',
    role: 'Director, Strategy & Planning',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Asif Bahar',
    role: 'Chief Operating Officer',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'MD Nawaz Sharief',
    role: 'Architect',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Shifat Ahmed',
    role: 'General Manager',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Shayekh Rahman Khan',
    role: 'Manager, Brand Communication',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'M Sabbir Hossain',
    role: 'Chief Technology Officer',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Taif Shehab',
    role: 'Creative Manager',
    photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=80',
  },
];

const SPEED_PX_PER_SEC = 45;

export default function Team() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respect accessibility preference.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let setWidth = 0;
    let paused = false;
    let rafId = 0;
    let lastT = 0;

    const measure = () => {
      // The list is rendered twice; one copy's width is half the total scroll width.
      setWidth = track.scrollWidth / 2;
    };

    const applyTransform = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const tick = (t) => {
      // Clamp dt so tab-switches or long pauses don't produce a jump.
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      if (!paused && setWidth > 0) {
        x -= SPEED_PX_PER_SEC * dt;
        // Seamless wrap — the second copy slides into the first copy's position.
        if (x <= -setWidth) x += setWidth;
        applyTransform();
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      measure();
      lastT = performance.now();
      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    // Wait for images to settle so scrollWidth is accurate before we start.
    const imgs = Array.from(track.querySelectorAll('img'));
    let started = false;
    const kickoff = () => {
      if (started) return;
      started = true;
      start();
    };

    if (imgs.length === 0) {
      kickoff();
    } else {
      let loaded = 0;
      const onImg = () => {
        loaded += 1;
        if (loaded >= imgs.length) kickoff();
      };
      imgs.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) onImg();
        else {
          img.addEventListener('load', onImg, { once: true });
          img.addEventListener('error', onImg, { once: true });
        }
      });
      // Safety: start within 1.5s even if a request stalls.
      setTimeout(kickoff, 1500);
    }

    // Re-measure when layout changes — without resetting position, so no jump.
    const ro = new ResizeObserver(() => {
      measure();
      // If we're now past the wrap point (e.g. after a resize shrinks the track), normalize.
      if (setWidth > 0) {
        while (x <= -setWidth) x += setWidth;
      }
    });
    ro.observe(track);

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
      lastT = performance.now(); // avoid a dt spike on resume
    };
    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
      } else {
        paused = false;
        lastT = performance.now();
      }
    };

    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Render the list twice for a seamless infinite loop.
  const loop = [...team, ...team];

  return (
    <section className="py-20 md:py-32 text-black overflow-hidden" id="team">
      {/* Header (contained to page gutter) */}
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
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
                aria-hidden="true"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">
                Our Team
              </span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              The minds behind <span className="text-black/40">every experience.</span>
            </h2>
          </div>
          <p className="text-[1rem] md:text-[1.125rem] leading-[1.55] text-black/60 max-w-sm md:mb-3">
            Architects, strategists, and engineers — working across disciplines so every detail is intentional.
          </p>
        </div>
      </div>

      {/* Full-bleed marquee track */}
      <div className="relative w-full overflow-hidden">
        <ul
          ref={trackRef}
          className="flex flex-nowrap gap-6 md:gap-8 pl-6 sm:pl-12 lg:pl-32 will-change-transform"
          aria-label="Team members"
        >
          {loop.map((member, i) => (
            <li
              key={`${member.name}-${i}`}
              className="group shrink-0 w-[72vw] xs:w-[55vw] sm:w-[38vw] md:w-[28vw] lg:w-[20vw] xl:w-[18vw] max-w-[320px]"
              aria-hidden={i >= team.length ? 'true' : undefined}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/5">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <h3 className="mt-5 text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] font-medium tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#0891b2]">
                {member.name}
              </h3>
              <p className="mt-1 text-[11px] md:text-[12px] font-bold tracking-widest uppercase opacity-50">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
