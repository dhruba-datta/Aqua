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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden text-black" ref={heroRef} id="hero">

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 mx-auto">
        <h1 className="flex flex-col items-center justify-center text-center">
          <div className="relative">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-fluid-hero font-black uppercase tracking-tightest leading-[0.8] whitespace-nowrap">WE CREATE</span>
            </span>
          </div>
          <div className="relative">
            <span className="block overflow-hidden hero__heading-line transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-[110%]">
              <span className="inline-block text-fluid-hero font-black uppercase tracking-tightest leading-[0.8] whitespace-nowrap">THE HYPE</span>
            </span>
          </div>
        </h1>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 px-6 sm:px-10 lg:px-16 mx-auto uppercase">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-[0.75rem] font-semibold tracking-wider gap-4 md:gap-0">
          <span className="text-left">Based in New York</span>
          <span className="text-center">A boutique marketing + creative agency</span>
          <span className="text-right">Established 2013</span>
        </div>
      </div>
    </section>
  );
}
