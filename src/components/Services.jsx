import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const services = [
  {
    title: 'Marketing',
    tags: ['SEO', 'PPC', 'Conversion Optimization', 'A/B Testing', 'Analytics & Reporting'],
    image: '/images/into-the-heat.png'
  },
  {
    title: 'Content Creation',
    tags: ['Copywriting', 'Design', 'Production', 'Blogs & Articles', 'Creative Assets'],
    image: '/images/crystal-vibes.png'
  },
  {
    title: 'Web Design',
    tags: ['WordPress', 'Responsive Design', 'Prototyping', 'CMS', 'Lighthouse'],
    image: '/images/radiant.png'
  },
  {
    title: 'Branding',
    tags: ['Logo Design', 'Strategy', 'Print', 'Style Guides', 'Visual Identity'],
    image: '/images/balanced.png'
  },
  {
    title: 'Videos',
    tags: ['Storyboarding', 'Reels & Shorts', 'Filming', 'Editing', 'Motion Graphics'],
    image: '/images/framework.png'
  }
];

export default function Services() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    // Calculate total width of one set of items
    const scrollWidth = slider.scrollWidth;
    
    // We'll create a GSAP animation that moves the scrollLeft
    // For a smooth infinite feel, we animate to half the total scrollWidth (since we duplicate)
    const animation = gsap.to(slider, {
      scrollLeft: scrollWidth / 2,
      duration: 25, // Slightly faster for better feel
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        slider.scrollLeft = 0;
      }
    });

    // Pause on hover
    const onMouseEnter = () => animation.pause();
    const onMouseLeave = () => animation.play();

    slider.addEventListener('mouseenter', onMouseEnter);
    slider.addEventListener('mouseleave', onMouseLeave);

    return () => {
      animation.kill();
      slider.removeEventListener('mouseenter', onMouseEnter);
      slider.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5] text-black overflow-hidden" id="services">
      <div className="w-full">
        
        {/* Header Section */}
        <div className="mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12 md:mb-16">
          <h2 className="text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium max-w-4xl leading-[1.05] tracking-tight">
            From strategy to spotlight, we <br className="hidden md:block" /> make brands shine
          </h2>
          <a 
            href="#contact" 
            className="text-lg md:text-xl font-medium pb-1 border-b-[1.5px] border-black hover:text-gray-600 hover:border-gray-600 transition-colors shrink-0 mb-2 md:mb-4"
          >
            Start a Project
          </a>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6 md:gap-8 pb-12 px-6 sm:px-10 lg:px-16 whitespace-nowrap"
        >
          {/* Duplicate the services twice for a seamless infinite loop */}
          {[...services, ...services].map((service, index) => (
            <div 
              key={`${service.title}-${index}`} 
              className="relative flex-none w-[75vw] md:w-[40vw] lg:w-[350px] xl:w-[400px] h-[400px] xl:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden group"
            >
              {/* Background Image */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80"></div>

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10 text-white whitespace-normal">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  {service.title}
                </h3>
                
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-semibold tracking-wide text-white/90 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
