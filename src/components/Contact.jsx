import { useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 overflow-hidden" id="contact-section" ref={sectionRef}>
      <div className="mx-auto px-6 sm:px-10 lg:px-16 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 opacity-0 translate-y-10 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 transition-all duration-1000">
          <div className="flex flex-col gap-6">
            <span className="text-accent text-sm font-bold uppercase tracking-widest">Say Hello</span>
            <a href="mailto:hello@signal.agency" className="text-4xl md:text-5xl lg:text-6xl font-semibold hover:text-accent transition-colors">
              hello@signal.agency
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-accent text-sm font-bold uppercase tracking-widest">Get Social</span>
            <div className="flex flex-col gap-4">
              {['LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                <a key={social} href="#" className="flex items-center gap-4 text-2xl md:text-3xl font-medium group">
                  <span className="group-hover:translate-x-3 transition-transform duration-300">{social}</span>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-300">
                    <path d="M4 12L12 4M12 4H6M12 4V10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto opacity-0 translate-y-10 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 transition-all duration-1000 delay-300">
          <h2 className="text-fluid-h2 font-black leading-tight mb-12">
            Let&apos;s create something <span className="text-accent italic">extraordinary</span> together.
          </h2>
          <a href="mailto:hello@signal.agency" className="inline-flex items-center gap-4 px-10 py-5 bg-accent text-white rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all group shadow-2xl">
            Start a Project
            <span className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full group-hover:translate-x-2 transition-transform">
              <svg viewBox="0 0 12 12" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 6h8M7 3l3 3-3 3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
