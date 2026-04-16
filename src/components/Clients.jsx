import { useEffect, useRef } from 'react';

// 36 client/partner logos resized to 400px squares in /public/images/Logos/
const logos = Array.from({ length: 36 }, (_, i) => ({
  src: `/images/Logos/${i + 1}.png`,
  alt: `Client logo ${i + 1}`,
}));

const SPEED_PX_PER_SEC = 55;

export default function Clients() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let setWidth = 0;
    let paused = false;
    let rafId = 0;
    let lastT = 0;

    const measure = () => {
      setWidth = track.scrollWidth / 2;
    };

    const apply = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const tick = (t) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      if (!paused && setWidth > 0) {
        x -= SPEED_PX_PER_SEC * dt;
        if (x <= -setWidth) x += setWidth;
        apply();
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      measure();
      lastT = performance.now();
      apply();
      rafId = requestAnimationFrame(tick);
    };

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
      setTimeout(kickoff, 2000);
    }

    const ro = new ResizeObserver(() => {
      measure();
      if (setWidth > 0) while (x <= -setWidth) x += setWidth;
    });
    ro.observe(track);

    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
      } else {
        paused = false;
        lastT = performance.now();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Render twice for seamless infinite loop.
  const loop = [...logos, ...logos];

  return (
    <section className="pt-2 md:pt-4 pb-14 md:pb-20 text-black overflow-hidden" id="clients" aria-label="Trusted by">
      {/* Eyebrow label, contained */}
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px] mb-16 md:mb-24">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-black/20" aria-hidden="true" />
          <span className="text-[12px] md:text-[13px] font-bold tracking-widest uppercase opacity-50">
            Trusted by brands, venues &amp; partners
          </span>
          <span className="h-px w-8 bg-black/20" aria-hidden="true" />
        </div>
      </div>

      {/* Full-bleed marquee with edge fade */}
      <div className="relative w-full overflow-hidden">
        {/* Edge gradient masks so logos dissolve at the left/right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-[#f5f5f5] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-[#f5f5f5] to-transparent"
        />

        <ul
          ref={trackRef}
          className="flex flex-nowrap items-center will-change-transform"
          aria-label="Client and partner logos"
        >
          {loop.map((logo, i) => (
            <li
              key={`${logo.src}-${i}`}
              // Fixed dimensions per cell guarantees a mathematical grid layout. 
              // Padding ensures guaranteed minimum spaces between logos.
              className="shrink-0 flex items-center justify-center w-[130px] sm:w-[160px] md:w-[190px] h-16 sm:h-20 md:h-24 px-6 sm:px-8"
              aria-hidden={i >= logos.length ? 'true' : undefined}
            >
              {/* 
                max-h/w constraints ensure logos have internal padding within their grid cell.
                Logos are fully colored as requested.
              */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-[85%] max-w-[85%] object-contain select-none"
                loading="lazy"
                draggable="false"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
