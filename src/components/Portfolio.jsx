import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Crystal Vibes', category: 'Art & Culture', image: '/images/crystal-vibes.png' },
  { title: 'Into the Heat', category: 'Concepts', image: '/images/into-the-heat.png' },
  { title: 'Radiant', category: 'eCommerce', image: '/images/radiant.png' },
  { title: 'Framework', category: 'Websites', image: '/images/framework.png' },
  { title: 'Balanced', category: 'Art & Culture', image: '/images/balanced.png' },
];

const filters = ['All', 'Art & Culture', 'Concepts', 'eCommerce', 'Websites'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
      }),
    });

    return () => trigger.kill();
  }, [filtered]);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const img = card.querySelector('.project-img');
    if (img) {
      img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = (card) => {
    const img = card.querySelector('.project-img');
    if (img) {
      img.style.transform = 'translate(0, 0) scale(1)';
    }
  };

  return (
    <section className="relative overflow-hidden bg-dark py-24 md:py-32" id="portfolio" ref={sectionRef}>
      <div className="mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-fluid-h2 font-bold tracking-tight">Featured Work</h2>
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeFilter === f 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white border-white/20 hover:border-white'
                }`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-nowrap gap-8 px-6 sm:px-10 lg:px-16" ref={trackRef}>
          {filtered.map((project) => (
            <article
              key={project.title}
              className="relative flex-none w-[85vw] md:w-[45vw] lg:w-[35vw] group cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img w-full h-full object-cover transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-accent text-sm font-bold uppercase tracking-widest">{project.category}</span>
                <h3 className="text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors">{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
