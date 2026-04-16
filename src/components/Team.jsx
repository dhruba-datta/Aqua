import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

export default function Team() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const startLoop = () => {
      // Total width of ONE copy of the list (we render it twice)
      const setWidth = track.scrollWidth / 2;
      if (!setWidth) return;

      animationRef.current?.kill();
      gsap.set(track, { x: 0 });

      animationRef.current = gsap.to(track, {
        x: `-=${setWidth}`,
        duration: setWidth / 45, // ~45px/sec — slower, more editorial pace
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % setWidth),
        },
      });
    };

    // Wait for images to settle so scrollWidth is accurate
    const imgs = track.querySelectorAll('img');
    let loaded = 0;
    const onImgLoad = () => {
      loaded += 1;
      if (loaded >= imgs.length) startLoop();
    };
    if (imgs.length === 0) {
      startLoop();
    } else {
      imgs.forEach((img) => {
        if (img.complete) onImgLoad();
        else {
          img.addEventListener('load', onImgLoad, { once: true });
          img.addEventListener('error', onImgLoad, { once: true });
        }
      });
      // Fallback — start anyway after a short delay in case events don't fire
      setTimeout(startLoop, 800);
    }

    const handlePause = () => animationRef.current?.pause();
    const handleResume = () => animationRef.current?.resume();
    track.addEventListener('mouseenter', handlePause);
    track.addEventListener('mouseleave', handleResume);

    const onResize = () => startLoop();
    window.addEventListener('resize', onResize);

    return () => {
      animationRef.current?.kill();
      track.removeEventListener('mouseenter', handlePause);
      track.removeEventListener('mouseleave', handleResume);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Render the list twice for a seamless infinite loop
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
