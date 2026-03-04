import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "The strategy sessions felt like creative therapy — and the final campaign? It stopped people in their tracks. Our audience finally sees us the way we always hoped they would.",
    author: 'Sarah Mitchell',
    role: 'CMO, Luminary Brands',
  },
  {
    quote: "It's rare to find a partner that's equally strategic and artistic. They understood our goals, challenged our assumptions, and turned big ideas into visuals that demand attention.",
    author: 'James Rivera',
    role: 'Founder, Pulse Studio',
  },
  {
    quote: "Working with this team was a turning point for our brand. They didn't just deliver a new identity — they uncovered what made us different and gave it a voice.",
    author: 'Elena Park',
    role: 'Director, Flowstate',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-dark text-white" id="testimonials">
      <div className="mx-auto px-6 sm:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-4xl min-h-[300px]">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-1000 ease-in-out ${
                  i === current 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-10 text-white/90 italic truncate-lines-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex flex-col items-center gap-2">
                  <span className="text-lg font-bold text-white uppercase tracking-widest">{t.author}</span>
                  <span className="text-sm font-semibold text-accent uppercase tracking-widest">{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="flex gap-4 mt-20">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-12 h-1 rounded-full transition-all duration-500 ${
                  i === current ? 'bg-accent' : 'bg-white/20 hover:bg-white/40'
                }`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
