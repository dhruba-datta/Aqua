import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "AQUA doesn't just execute — they elevate the entire vision. Every touchpoint felt considered, every detail engineered.",
    author: 'Senior Marketing Manager',
    role: 'FMCG Brand',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    quote: "Their ability to merge architecture with brand storytelling is unmatched. It changed how we think about our physical spaces.",
    author: 'Corporate Client',
    role: 'Multinational Brand',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80'
  },
  {
    quote: "From concept to delivery, everything felt precise, premium, and impactful. A rare combination of creativity and discipline.",
    author: 'Event Director',
    role: 'Hospitality Group',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
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

  // Animation handling and Background Transition
  useEffect(() => {
    const mainSection = document.getElementById("main-content");
    
    const ctx = gsap.context(() => {
      // Slide transitions
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
    <section className="testimonial-section py-20 md:py-32" id="testimonials">
      <div className="w-full px-6 sm:px-12 lg:px-32 relative">
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
