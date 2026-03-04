import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Content Creation',
    tags: ['Copywriting', 'Design', 'Production', 'Blogs & Articles', 'Creative Assets'],
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/content_creation.jpg'
  },
  {
    title: 'Web Design',
    tags: ['WordPress', 'Responsive Design', 'Prototyping', 'CMS', 'Lighthouse'],
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/ipad-mockup-studio.jpg'
  },
  {
    title: 'Branding',
    tags: ['Logo Design', 'Strategy', 'Print', 'Style Guides', 'Visual Identity'],
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/10/abstract-o.jpg'
  },
  {
    title: 'Videos',
    tags: ['Storyboarding', 'Reels & Shorts', 'Filming', 'Editing', 'Motion Graphics'],
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/10/laptop-top.jpg'
  },
  {
    title: 'Social Media',
    tags: ['Strategy', 'Paid Ads', 'Analytics', 'Content Scheduling', 'Management'],
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/10/flower-field.jpg'
  },
  {
    title: 'Marketing',
    tags: ['SEO', 'PPC', 'Conversion Optimization', 'A/B Testing', 'Analytics & Reporting'],
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/10/lamp.jpg'
  }
];

export default function Services() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;
    const mainSection = document.getElementById("main-content");

    if (!slider || !mainSection) return;

    // Background color transition using ScrollTrigger
    const colorTransition = ScrollTrigger.create({
      trigger: "#services",
      start: "top center", // When the top of the Services section hits the center of the viewport
      end: "bottom center",
      animation: gsap.to(mainSection, {
        backgroundColor: "#f5f5f5", // Light color
        color: "#000000",
        duration: 1,
        ease: "power2.inOut"
      }),
      toggleActions: "play reverse play reverse", // Play forward when entering down, reverse when leaving up
    });

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
      colorTransition.kill();
      slider.removeEventListener('mouseenter', onMouseEnter);
      slider.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 md:py-32 overflow-hidden" id="services">
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
          className="flex overflow-x-hidden gap-[10px] pb-12 px-6 sm:px-10 lg:px-16 whitespace-nowrap"
        >
          {/* Duplicate the services twice for a seamless infinite loop */}
          {[...services, ...services].map((service, index) => (
            <div 
              key={`${service.title}-${index}`} 
              className="relative flex-none w-[85vw] md:w-[45vw] lg:w-[400px] xl:w-[437.5px] h-[493.35px] rounded-[1.25rem] overflow-hidden group flex flex-col justify-between"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              
              {/* Dark Gradient Overlay for text readability - Exact Match */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(0deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 36%)',
                  opacity: 0.2
                }}
              ></div>

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-between p-[20px] text-white whitespace-normal z-10 w-full">
                <h3 className="text-[28px] font-medium tracking-tight leading-tight">
                  {service.title}
                </h3>
                
                <div className="flex flex-wrap gap-[8px] items-start content-start">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-[12px] py-[6px] bg-[rgba(0,0,0,0.09)] rounded-[20px] text-[10px] md:text-[12px] font-medium tracking-wide text-white"
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
