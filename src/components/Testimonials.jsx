import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: "The strategy sessions felt like creative therapy — and the final campaign? It stopped people in their tracks. Our audience finally sees us the way we always hoped they would.",
    author: 'Zak Reid',
    role: 'Founder',
    image: 'https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/king-alexander-grey-r4e9l7_ouQU-unsplash-240x300.jpg'
  },
  {
    quote: "It’s rare to find a partner that’s equally strategic and artistic. They understood goals, challenged assumptions, and turned big ideas into visuals that demand attention.",
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
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
  }, []);

  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Animation handling
  useEffect(() => {
    const ctx = gsap.context(() => {
      const activeSlide = containerRef.current?.querySelector('blockquote.active');
      if (activeSlide) {
        gsap.fromTo(activeSlide, 
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, ease: "power4.out" }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [current]);

  return (
    <section className="testimonial-section py-32 md:py-48" id="testimonials">
      <div className="w-full px-12 sm:px-24 lg:px-32 relative">
        <div className="testimonial_slider" ref={containerRef}>
          <div className="slides">
            {testimonials.map((testimonial, index) => (
              <blockquote
                key={index}
                className={index === current ? 'active' : 'no-trans'}
              >
                <div
                  className="image-icon has-bg loaded"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                ></div>
                <p>
                  <span className="open-quote">“</span>
                  {testimonial.quote}
                  <span className="close-quote">”</span>
                </p>
                <span className="testimonial-name">{testimonial.author}</span>
                <span className="title">{testimonial.role}</span>
              </blockquote>
            ))}
          </div>

          <div className="controls">
            <div className="control-wrap">
              <ul style={{ transform: `translateY(-${current * 20}px)`, transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                {testimonials.map((_, index) => (
                  <li key={index}>{index + 1}</li>
                ))}
              </ul>
            </div>
            <span className="out-of">/</span>
            <span className="total">{testimonials.length}</span>
          </div>

          <div className="testimonial-next-prev absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-between px-4 md:px-0">
            <a 
              href="#" 
              className="prev pointer-events-auto transition-transform hover:-translate-x-2" 
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              aria-label="Previous slide"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </a>
            <a 
              href="#" 
              className="next pointer-events-auto transition-transform hover:translate-x-2" 
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              aria-label="Next slide"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
