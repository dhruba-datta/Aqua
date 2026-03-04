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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`flex items-center justify-between mx-auto px-6 sm:px-10 lg:px-16 transition-all duration-500 max-w-[1440px] ${scrolled ? "bg-black/80 backdrop-blur-2xl rounded-full py-3" : ""}`}>
        <div className="flex-none">
          <span className={`font-black text-[1rem] tracking-tighter uppercase transition-colors duration-500 ${scrolled ? 'text-white' : 'text-black'}`}>
            SALIENT
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className={`hidden sm:inline-flex items-center px-5 py-2 border text-[0.7rem] font-bold uppercase tracking-widest rounded-full transition-colors duration-500 ${
              scrolled
                ? 'border-white text-white hover:bg-white hover:text-black'
                : 'border-black/50 text-black hover:bg-black hover:text-white'
            }`}
          >
            Get Started
          </a>
          <button
            className="flex flex-col gap-[6px] py-2 cursor-pointer group"
            onClick={onMenuOpen}
            aria-label="Open menu"
          >
            <span className={`block w-7 h-[2px] transition-all duration-500 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
            <span className={`block w-7 h-[2px] transition-all duration-500 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
