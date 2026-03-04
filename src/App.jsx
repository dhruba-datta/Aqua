import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import SlideOutMenu from './components/SlideOutMenu';
import Hero from './components/Hero';
import Services from './components/Services';
import Statement from './components/Statement';
import Portfolio from './components/Portfolio';
import Marquee from './components/Marquee';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Page load animation
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <SlideOutMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <div className={`content-wrapper ${menuOpen ? 'content-wrapper--menu-open' : ''}`}>
        <Header onMenuOpen={() => setMenuOpen(true)} />

        <main className="noise-bg">
          <Hero />
          <Services />
          <Statement />
          <Portfolio />
          <Marquee />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
