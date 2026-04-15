import { useState, useEffect } from "react";

export default function Header({ onMenuOpen, lenis }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#contact", {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}
    >
      <div
        className={`flex items-center justify-between mx-auto transition-all duration-500 max-w-[1600px] ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl rounded-full py-4 px-6 sm:px-10 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
            : "px-6 sm:px-10 lg:px-16 w-full"
        }`}
      >
        <div className="flex-none">
          <span
            className={`font-black text-[1.5rem] tracking-tighter uppercase transition-colors duration-500 ${scrolled ? "text-white" : "text-black"}`}
          >
            AQUA
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className={`hidden sm:inline-flex items-center px-8 py-3 border text-[0.9rem] font-bold uppercase tracking-widest rounded-full transition-colors duration-500 ${
              scrolled
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black/50 text-black hover:bg-black hover:text-white"
            }`}
          >
            Get Started
          </a>
          <button
            className="flex flex-col gap-[8px] py-2 cursor-pointer group"
            onClick={onMenuOpen}
            aria-label="Open menu"
          >
            <span
              className={`block w-9 h-[3px] transition-all duration-500 ${scrolled ? "bg-white" : "bg-black"}`}
            ></span>
            <span
              className={`block w-9 h-[3px] transition-all duration-500 ${scrolled ? "bg-white" : "bg-black"}`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
}
