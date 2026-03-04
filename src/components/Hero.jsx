import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// A pool of images to cycle through on mouse trail
const TRAIL_IMAGES = [
  "https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/desert.jpg",
  "https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/sky.jpg",
  "https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/office.jpg",
  "https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/orange-shirt.jpg",
  "https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/eye-769x1024.jpg",
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
  const trailItemsRef = useRef([]);

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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden text-black"
      ref={heroRef}
      id="hero"
    >
      {/* Trail image container */}
      <div
        ref={trailContainerRef}
        className="absolute inset-0 pointer-events-none z-20 hidden md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-16 mx-auto">
        <h1 className="flex flex-col items-center justify-center text-center">
          <div className="relative">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-fluid-hero font-black uppercase tracking-tightest leading-[0.8]">WE CREATE</span>
            </span>
          </div>
          <div className="relative">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-fluid-hero font-black uppercase tracking-tightest leading-[0.8]">THE HYPE</span>
            </span>
          </div>
        </h1>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-10 px-4 sm:px-10 lg:px-16 mx-auto uppercase">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-[0.65rem] sm:text-[0.75rem] font-semibold tracking-wider gap-2 md:gap-0">
          <span className="text-center md:text-left">Based in New York</span>
          <span className="text-center hidden md:block">A boutique marketing + creative agency</span>
          <span className="text-center md:text-right">Established 2013</span>
        </div>
      </div>
    </section>
  );
}
