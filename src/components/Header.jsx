import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// Center loop sequence, repeated to fill the pill width.
// Starts with Brand Architect so the big left AQ logo isn't followed by another AQ.
const LOOP_LOGOS = [
  { src: "/images/brand-architect-white.png", alt: "Brand Architect", ratio: 1800 / 349 },
  { src: "/images/aqua-wordmark-white.png", alt: "AQUA", ratio: 3600 / 1348 },
  { src: "/images/aqua-logo.png", alt: "AQUA", ratio: 1800 / 1456 },
];
const LOOP_H = 48; // px — matches the left AQ logo's rendered height (md:h-12)
const LOOP_GAP = 28; // px — minimum gap between looped logos
const LOOP_MAX = 60; // safety cap

export default function Header({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const loopRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fit a whole number of looped logos into the available center width.
  useEffect(() => {
    const el = loopRef.current;
    if (!el) return;

    const compute = () => {
      const available = el.clientWidth;
      let used = 0;
      let n = 0;
      while (n < LOOP_MAX) {
        const w = LOOP_H * LOOP_LOGOS[n % LOOP_LOGOS.length].ratio;
        const need = n === 0 ? w : w + LOOP_GAP;
        if (used + need > available) break;
        used += need;
        n += 1;
      }
      setLoopCount(n);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Home hero has a dark image bg, so navbar stays white.
  // Other pages use a light hero bg, so start black and turn white only inside the dark scrolled pill.
  const showLight = scrolled || isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}
    >
      <div
        className={`relative flex items-center justify-between mx-auto transition-all duration-500 max-w-[1600px] ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl rounded-full py-4 px-6 sm:px-10 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
            : "px-6 sm:px-10 lg:px-16 w-full"
        }`}
      >
        <div className="flex-none">
          <Link to="/" className="inline-block" aria-label="AQUA home">
            <img
              src="/images/aqua-logo.png"
              alt="AQUA"
              className={`h-10 md:h-12 w-auto transition-[filter] duration-500 ${showLight ? "" : "invert"}`}
              draggable="false"
            />
          </Link>
        </div>

        <div
          ref={loopRef}
          aria-hidden="true"
          className={`hidden md:flex flex-1 min-w-0 mx-4 items-center justify-between overflow-hidden transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ gap: `${LOOP_GAP}px` }}
        >
          {scrolled &&
            Array.from({ length: loopCount }).map((_, i) => {
              const logo = LOOP_LOGOS[i % LOOP_LOGOS.length];
              return (
                <img
                  key={i}
                  src={logo.src}
                  alt=""
                  className="w-auto flex-none"
                  style={{ height: `${LOOP_H}px` }}
                  draggable="false"
                />
              );
            })}
        </div>

        <div className="flex items-center gap-6">
          <button
            className="flex flex-col gap-[8px] py-2 cursor-pointer group"
            onClick={onMenuOpen}
            aria-label="Open menu"
          >
            <span
              className={`block w-9 h-[3px] transition-all duration-500 ${showLight ? "bg-white" : "bg-black"}`}
            ></span>
            <span
              className={`block w-9 h-[3px] transition-all duration-500 ${showLight ? "bg-white" : "bg-black"}`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
}
