import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);

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

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-orange-accent text-black" ref={heroRef} id="hero">
      <div className="absolute top-10 left-0 right-0 z-10 px-6 sm:px-12 md:px-16 lg:px-24 mx-auto max-w-[1440px]">
        <span className="font-extrabold text-[0.9rem] tracking-widest uppercase">SALIENT</span>
      </div>

      <div className="relative z-[2] w-full px-6 sm:px-12 md:px-16 lg:px-24 mx-auto max-w-[1440px]">
        <h1 className="flex flex-col">
          <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
            <span className="inline-block text-fluid-hero font-black uppercase tracking-tightest leading-[0.85]">WE CREATE</span>
          </span>
          <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
            <span className="inline-block text-fluid-hero font-black uppercase tracking-tightest leading-[0.85]">THE HYPE</span>
          </span>
        </h1>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 px-6 sm:px-12 md:px-16 lg:px-24 mx-auto max-w-[1440px] uppercase">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-[0.75rem] font-semibold tracking-wider gap-4 md:gap-0">
          <span className="text-left">BASED IN NEW YORK</span>
          <span className="text-center">A boutique marketing + creative agency</span>
          <span className="text-right">ESTABLISHED 2013</span>
        </div>
      </div>
    </section>
  );
}
