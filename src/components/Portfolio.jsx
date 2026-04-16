import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Corporate Summit',
    categories: ['events'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    href: '#',
  },
  {
    title: 'Brand Activation',
    categories: ['events'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
    href: '#',
  },
  {
    title: 'Digital Ecosystem',
    categories: ['digital'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    href: '#',
  },
  {
    title: 'Architectural Install',
    categories: ['digital'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    href: '#',
  },
  {
    title: 'Sports Campaign',
    categories: ['events'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80',
    href: '#',
  },
];

const filters = [
  { label: 'All', value: '-1' },
  { label: 'Events', value: 'events' },
  { label: 'Digital', value: 'digital' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('-1');
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const activeItemRef = useRef(null);

  const filtered =
    activeFilter === '-1'
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  // Floating image follow effect
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let rafId;
    const follow = () => {
      gsap.to(image, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.4,
        ease: 'power3.out',
      });
      rafId = requestAnimationFrame(follow);
    };
    rafId = requestAnimationFrame(follow);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleItemEnter = (project) => {
    activeItemRef.current = project;
    const image = imageRef.current;
    if (!image) return;

    const img = image.querySelector('img');
    if (img) img.src = project.image;

    gsap.to(image, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleItemLeave = () => {
    activeItemRef.current = null;
    const image = imageRef.current;
    if (!image) return;

    gsap.to(image, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      className="relative py-20 md:py-32 w-full"
      id="portfolio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="w-full px-6 sm:px-12 lg:px-32">
        {/* Header: Label and Filters Flex Layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 w-full">
          <p className="uppercase text-[18px] md:text-[22px] font-bold tracking-widest text-black m-0 shrink-0">
            Featured Work
          </p>
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-2 md:pb-0 -mx-1 px-1 no-scrollbar">
            {filters.map((f) => (
              <a
                key={f.value}
                href="#"
                className={`text-[12px] uppercase font-bold tracking-wider transition-colors ${
                  activeFilter === f.value ? 'text-black' : 'text-black/30 hover:text-black'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFilter(f.value);
                }}
              >
                {f.label}
              </a>
            ))}
          </div>
        </div>

        {/* Vertical List */}
        <div className="portfolio-list border-t border-black/10">
          {filtered.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="portfolio-item group block border-b border-black/10 transition-colors duration-400 hover:bg-[#121213] hover:text-[#85ffff] text-black"
              onMouseEnter={() => handleItemEnter(project)}
              onMouseLeave={handleItemLeave}
            >
              <div className="portfolio-item-inner flex items-center justify-between py-4 md:py-6 px-2 md:px-8 transition-transform duration-400 group-hover:translate-x-4 md:group-hover:translate-x-8">
                <h2 className="portfolio-item-title text-[clamp(1.4rem,3.5vw,3.2rem)] leading-none tracking-[-0.03em] font-normal m-0">
                  {project.title}
                </h2>
                <div className="portfolio-item-arrow-wrap transition-transform duration-400 group-hover:-translate-x-8 md:group-hover:-translate-x-16">
                  <svg
                    className="portfolio-item-arrow w-[28px] h-[28px] md:w-[36px] md:h-[36px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="60 58 140 140"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating cursor-follow image */}
      <div className="portfolio-hover-image hidden md:block absolute top-0 left-0 w-[400px] h-[280px] pointer-events-none z-10 opacity-0 scale-90 overflow-hidden rounded-xl will-change-[transform,opacity] -ml-[200px] -mt-[140px]" ref={imageRef}>
        <img
          alt=""
          src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
