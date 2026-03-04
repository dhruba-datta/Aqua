import { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    quote: "The strategy sessions felt like creative therapy — and the final campaign? It stopped people in their tracks. Our audience finally sees us the way we always hoped they would.",
    author: 'Zak Reid',
    role: 'Founder',
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/king-alexander-grey-r4e9l7_ouQU-unsplash-240x300.jpg'
  },
  {
    quote: "It’s rare to find a partner that’s equally strategic and artistic. They understood our goals, challenged our assumptions, and turned big ideas into visuals that demand attention.",
    author: 'Eve Crawford',
    role: 'Product Designer',
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/09/testimonial-1-296x300.jpg'
  },
  {
    quote: "Working with this team was a turning point for our brand. They didn’t just deliver a new identity — they uncovered what made us different and gave it a voice.",
    author: 'Aura Brooks',
    role: 'Graphic Designer',
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/10/testimonial-2-1.jpg'
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="testimonial-section py-32 md:py-48 bg-[#f9f9f9]" id="testimonials">
      <div className="container mx-auto px-6 max-w-7xl relative">
        
        {/* Navigation Arrows - Moved outside to prevent overlap with slides */}
        <div className="testimonial-nav">
          <button 
            onClick={prevSlide}
            className="nav-btn prev group absolute left-0 md:left-4 top-[50%] -translate-y-[100px] md:translate-y-0 p-4 z-50 transition-all opacity-30 hover:opacity-100"
            aria-label="Previous testimonial"
          >
            <div className="flex items-center transition-transform duration-300 group-hover:-translate-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </button>
          <button 
            onClick={nextSlide}
            className="nav-btn next group absolute right-0 md:right-4 top-[50%] -translate-y-[100px] md:translate-y-0 p-4 z-50 transition-all opacity-30 hover:opacity-100"
            aria-label="Next testimonial"
          >
            <div className="flex items-center transition-transform duration-300 group-hover:translate-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <div className="hidden group-hover:block transition-all duration-300 ml-[-12px] opacity-0 group-hover:opacity-100 w-4 h-[1px] bg-black"></div>
            </div>
          </button>
        </div>

        <div className="testimonial-slider relative min-h-[600px] flex flex-col items-center">
          
          {/* Slides Container */}
          <div className="slides-container w-full relative h-full flex flex-col items-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-1000 ease-in-out ${
                  index === current 
                    ? 'opacity-100 translate-y-0 z-20 pointer-events-auto' 
                    : 'opacity-0 translate-y-4 z-10 pointer-events-none'
                }`}
              >
                {/* Fixed position-like feel: center elements stay in place, only content changes */}
                <div className="contents">
                  <div 
                    className="testimonial-image mb-12 w-16 h-16 md:w-20 md:h-20 rounded-full bg-cover bg-center grayscale shadow-sm border-[6px] border-white"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  ></div>
                  
                  <p className="testimonial-quote text-[24px] md:text-[2.2vw] leading-[1.4] font-medium tracking-tight mb-12 max-w-4xl mx-auto px-4 text-[#121213]">
                    “{testimonial.quote}”
                  </p>
                  
                  <div className="testimonial-info">
                    <span className="testimonial-name block text-[20px] font-bold text-black mb-1">{testimonial.author}</span>
                    <span className="testimonial-title block text-[15px] font-medium text-black/40">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Counter - Fixed at the bottom of the slider container */}
          <div className="testimonial-controls absolute bottom-0 flex items-center justify-center gap-2 text-[13px] font-bold tracking-widest text-black/40">
            <span className="current text-black">
              {current + 1}
            </span>
            <span className="separator">/</span>
            <span className="total">
              {testimonials.length}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
