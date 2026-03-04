import { useState, useEffect } from "react";

export default function Header({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`flex items-center justify-between mx-auto px-6 sm:px-10 lg:px-16 transition-all duration-500 max-w-[1440px] ${scrolled ? "bg-black/70 backdrop-blur-2xl border border-white/10 rounded-full py-3" : ""}`}>
        <div className="w-10"></div> {/* Hidden logo placeholder */}
        <div className="flex items-center gap-5">
          <a href="#contact" className="hidden sm:inline-flex items-center px-6 py-2 border-2 border-black text-black text-[0.75rem] font-bold uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-colors">
            Get Started
          </a>
          <button
            className="flex flex-col gap-1.5 p-2 group"
            onClick={onMenuOpen}
            aria-label="Open menu"
          >
            <span className="block w-7 h-[2.5px] bg-black group-hover:translate-x-1 transition-transform border-none rounded-full"></span>
            <span className="block w-7 h-[2.5px] bg-black group-hover:-translate-x-1 transition-transform border-none rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
