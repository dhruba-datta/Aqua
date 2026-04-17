import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// A pool of images to cycle through on mouse trail
const TRAIL_IMAGES = [
  "/images/hero-trail/1.jpg",
  "/images/hero-trail/2.jpg",
  "/images/hero-trail/3.jpg",
  "/images/hero-trail/4.jpg",
  "/images/hero-trail/5.jpg",
  "/images/hero-trail/6.jpg",
  "/images/hero-trail/7.jpg",
  "/images/hero-trail/8.jpg",
  "/images/hero-trail/9.jpg",
  "/images/hero-trail/10.jpg",
  "/images/hero-trail/11.jpg",
  "/images/hero-trail/12.jpg",
];

// How many trail items to maintain at once
const TRAIL_COUNT = 5;
// Minimum pixel distance between spawning a new trail image
const SPAWN_DISTANCE = 80;
// Time (ms) before each trail item fades out
const LINGER_MS = 700;

export default function Hero() {
  const heroRef = useRef(null);
  const trailContainerRef = useRef(null);
  const lastPosRef = useRef({ x: -999, y: -999 });
  const imageIndexRef = useRef(0);

  // Heading entrance animation
  useEffect(() => {
    const lines = document.querySelectorAll(".hero__heading-line");
    lines.forEach((line, i) => {
      setTimeout(
        () => {
          line.classList.remove("opacity-0", "translate-y-[110%]");
          line.classList.add("opacity-100", "translate-y-0");
        },
        300 + i * 200,
      );
    });
  }, []);

  // Mouse trail effect
  useEffect(() => {
    const hero = heroRef.current;
    const container = trailContainerRef.current;
    if (!hero || !container) return;

    const dist = (a, b) =>
      Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

    const spawnTrailItem = (x, y) => {
      const idx = imageIndexRef.current % TRAIL_IMAGES.length;
      imageIndexRef.current++;

      const el = document.createElement("div");
      el.className = "hero-trail-item";
      el.style.cssText = `
        position: absolute;
        pointer-events: none;
        z-index: 5;
        width: 200px;
        border-radius: 12px;
        overflow: hidden;
        will-change: transform, opacity;
        transform-origin: center center;
        left: ${x}px;
        top: ${y}px;
        translate: -50% -50%;
        opacity: 0;
        scale: 0.7;
        rotate: ${(Math.random() - 0.5) * 18}deg;
      `;

      const img = document.createElement("img");
      img.src = TRAIL_IMAGES[idx];
      img.style.cssText = "width:100%; display:block; object-fit:cover; aspect-ratio:3/2;";
      img.draggable = false;
      el.appendChild(img);
      container.appendChild(el);

      // Animate in
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      // Animate out after linger
      const timer = setTimeout(() => {
        gsap.to(el, {
          opacity: 0,
          scale: 0.85,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => el.remove(),
        });
      }, LINGER_MS);

      return () => {
        clearTimeout(timer);
        el.remove();
      };
    };

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pos = { x, y };

      if (dist(pos, lastPosRef.current) < SPAWN_DISTANCE) return;
      lastPosRef.current = pos;

      spawnTrailItem(x, y);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden text-white"
      ref={heroRef}
      id="hero"
    >
      {/* Background image (slightly blurred) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/images/hero-bg.png')", filter: "blur(2px)" }}
        aria-hidden="true"
      />
      {/* Soft overlay to improve text contrast */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      {/* Trail image container */}
      <div
        ref={trailContainerRef}
        className="absolute inset-0 pointer-events-none z-20 hidden md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-32 mx-auto">
        <h1 className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-4 md:mb-6">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-[clamp(1rem,1.9vw,1.5rem)] font-semibold uppercase tracking-[0.2em] text-white/70">
                We don&apos;t just build brands
              </span>
            </span>
          </div>
          <div className="relative">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-[clamp(2.75rem,10.5vw,11rem)] font-black tracking-tightest leading-[0.88] uppercase">
                We Architect
              </span>
            </span>
          </div>
          <div className="relative">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-[clamp(2.75rem,10.5vw,11rem)] font-black tracking-tightest leading-[0.88] uppercase">
                Experiences
              </span>
            </span>
          </div>
          <div className="relative mt-4 md:mt-6">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-[clamp(1rem,1.9vw,1.5rem)] font-semibold uppercase tracking-[0.2em] text-white/70">
                That move people
              </span>
            </span>
          </div>
        </h1>

        <p className="max-w-2xl mx-auto text-center mt-10 md:mt-12 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-normal text-white/80 leading-relaxed">
          From concept to reality, Aqua Innovations merges creativity, technology, and architectural thinking to design experiences that influence, engage, and convert.
        </p>

      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-10 px-6 sm:px-12 lg:px-32 mx-auto uppercase">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-[0.65rem] sm:text-[0.75rem] font-semibold tracking-wider gap-2 md:gap-0">
          <span className="text-center md:text-left">Based in Dhaka, Bangladesh</span>
          <span className="text-center hidden md:block"></span>
          <span className="text-center md:text-right">Established 2024</span>
        </div>
      </div>
    </section>
  );
}
