import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Events & Activation',
    desc: 'Immersive brand environments that transform audiences into participants.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Social Media Marketing',
    desc: 'Performance-driven content strategies engineered for visibility, engagement, and conversion.',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Branding',
    desc: 'From identity to positioning — we craft brands that command attention and loyalty.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Video Production',
    desc: 'Cinematic storytelling designed to influence perception and elevate brand value.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Content Creation',
    desc: 'High-impact, platform-native content that resonates with modern audiences.',
    image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Sports Marketing',
    desc: 'We turn passion into performance through strategic sports-driven engagement.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Website & Automation',
    desc: 'Smart digital ecosystems that streamline operations and enhance user journeys.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Architectural Design',
    desc: 'We design physical spaces that communicate brand identity and human experience.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function Services({ lenis }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;
    const mainSection = document.getElementById("main-content");

    if (!slider || !mainSection) return;

    // Background color transition using ScrollTrigger
    const aboutTrigger = document.getElementById("about") ? "#about" : "#services";
    const colorTransition = ScrollTrigger.create({
      trigger: aboutTrigger,
      start: "top 80%",
      end: "top 30%",
      animation: gsap.to(mainSection, {
        backgroundColor: "#f5f5f5", // Light color
        color: "#000000",
        duration: 1,
        ease: "power2.inOut"
      }),
      toggleActions: "play none none reverse", // Play forward into white, reverse back to orange only when going up to Hero
    });

    // Infinite marquee via transform + modifier wrap
    // We duplicate the list, so total width = 2 * set width. Animating -50% loops seamlessly.
    let animation;
    const startLoop = () => {
      const setWidth = slider.scrollWidth / 2;
      if (!setWidth) return;
      animation?.kill();
      gsap.set(slider, { x: 0 });
      animation = gsap.to(slider, {
        x: `-=${setWidth}`,
        duration: setWidth / 60, // ~60px/sec, consistent speed regardless of card count
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % setWidth),
        },
      });
    };

    startLoop();

    // Re-init on resize so widths stay in sync
    const onResize = () => startLoop();
    window.addEventListener("resize", onResize);

    return () => {
      animation?.kill();
      colorTransition.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#contact", {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-32 overflow-hidden text-black" id="services">
      <div className="w-full">
        
        {/* Header Section */}
        <div className="mx-auto px-6 sm:px-12 lg:px-32 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-10 md:mb-16">
          <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium max-w-4xl leading-[1.05] tracking-tight">
            Integrated solutions. <br className="hidden md:block" /> One strategic core.
          </h2>
          <a 
            href="#contact" 
            onClick={handleScrollToContact}
            className="text-[1.25rem] md:text-[1.5rem] font-medium text-black/50 hover:text-black transition-colors duration-300 relative group inline-block shrink-0 mb-2 md:mb-4"
          >
            <span className="relative z-10">Start a Project</span>
            <span className="absolute bottom-0 md:bottom-[2px] left-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full"></span>
          </a>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="overflow-hidden pb-8 md:pb-12 px-6 sm:px-12 lg:px-32">
          <div
            ref={scrollRef}
            className="flex gap-[10px] w-max will-change-transform"
          >
          {/* Duplicate the services twice for a seamless infinite loop */}
          {[...services, ...services].map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="relative flex-none w-[78vw] sm:w-[85vw] md:w-[45vw] lg:w-[400px] xl:w-[437.5px] h-[380px] md:h-[493.35px] rounded-[1.25rem] overflow-hidden flex flex-col justify-end"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>

              {/* Bottom gradient fade for text readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0) 55%)'
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-7 text-white whitespace-normal">
                <h3 className="text-[22px] md:text-[26px] font-medium tracking-tight leading-[1.15] mb-2">
                  {service.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[1.5] text-white/80 max-w-[32ch]">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
