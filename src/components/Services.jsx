import { useEffect, useRef } from 'react';

const services = [
  {
    title: 'Content Creation',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="36" height="36" rx="4" />
        <path d="M6 18h36M18 18v24" />
        <circle cx="32" cy="30" r="4" />
      </svg>
    ),
  },
  {
    title: 'Web Design',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="8" width="40" height="28" rx="3" />
        <path d="M4 16h40M14 40h20M24 36v4" />
      </svg>
    ),
  },
  {
    title: 'Branding',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 6v36M6 24h36M10 10l28 28M38 10L10 38" />
      </svg>
    ),
  },
  {
    title: 'Videos',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="10" width="30" height="28" rx="3" />
        <path d="M34 20l10-6v20l-10-6" />
      </svg>
    ),
  },
  {
    title: 'Social Media',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="6" />
        <circle cx="34" cy="14" r="6" />
        <circle cx="24" cy="34" r="6" />
        <path d="M19 17l5 14M29 17l-5 14" />
      </svg>
    ),
  },
  {
    title: 'Marketing',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 40V24M16 40V18M24 40V12M32 40V20M40 40V8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-10');
                card.classList.add('opacity-100', 'translate-y-0');
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-dark text-white" id="services" ref={sectionRef}>
      <div className="mx-auto px-6 sm:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
          <h2 className="text-fluid-h2 max-w-2xl leading-tight">
            From strategy to spotlight, we make brands <span className="text-accent italic">shine</span>
          </h2>
          <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group">
            Start a Project
            <span className="flex items-center justify-center w-7 h-7 bg-white text-black rounded-full group-hover:translate-x-1 transition-transform">
              <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 6h8M7 3l3 3-3 3" />
              </svg>
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="service-card opacity-0 translate-y-10 transition-all duration-700 ease-out bg-white/5 border border-white/10 rounded-2xl p-10 hover:border-accent hover:-translate-y-2 transition-transform cursor-pointer group">
              <div className="w-12 h-12 mb-6 text-accent group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
