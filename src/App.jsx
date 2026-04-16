import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import SlideOutMenu from './components/SlideOutMenu';
import Footer from './components/Footer';
import OceanSound from './components/OceanSound';
import HomePage from './pages/HomePage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lenis] = useState(() => new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  }));
  const [scrollOrigin, setScrollOrigin] = useState("left center");
  const location = useLocation();

  // Drive Lenis with requestAnimationFrame + clean up on unmount
  useEffect(() => {
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [lenis]);

  // Page load animation
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Scroll to top on route change (unless the target page handles it itself)
  const scrollToTarget = location.state?.scrollTo;
  useEffect(() => {
    if (!lenis) return;
    // If navigation carries an intent to scroll to a hash, let the target handle it
    if (scrollToTarget) {
      // Small delay so the home page mounts first
      setTimeout(() => {
        lenis.scrollTo(scrollToTarget, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }, 100);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenis, scrollToTarget]);

  // Handle scroll lock accurately with Lenis
  useEffect(() => {
    if (lenis) {
      if (menuOpen) {
        lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenis.start();
        document.body.style.overflow = '';
      }
    } else {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, lenis]);

  const handleMenuOpen = () => {
    setScrollOrigin(`0px ${window.scrollY + window.innerHeight / 2}px`);
    setMenuOpen(true);
  };

  return (
    <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <SlideOutMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} lenis={lenis} />

      <div
        className={`content-wrapper ${menuOpen ? 'content-wrapper--menu-open' : ''}`}
        style={{ transformOrigin: scrollOrigin }}
      >
        <Header onMenuOpen={handleMenuOpen} lenis={lenis} />

        <Routes>
          <Route path="/" element={<HomePage lenis={lenis} />} />
          <Route path="/privacy" element={<Privacy lenis={lenis} />} />
          <Route path="/terms" element={<Terms lenis={lenis} />} />
          <Route path="*" element={<NotFound lenis={lenis} />} />
        </Routes>

        <Footer />
      </div>

      <OceanSound />
    </div>
  );
}
