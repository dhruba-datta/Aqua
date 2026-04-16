import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Approach from '../components/Approach';
import Statement from '../components/Statement';
import WhyAqua from '../components/WhyAqua';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Industries from '../components/Industries';

export default function HomePage({ lenis }) {
  return (
    <main className="noise-bg bg-orange-accent z-0" id="main-content">
      <Hero />
      <About />
      <Services lenis={lenis} />
      <Approach />
      <Statement />
      <WhyAqua />
      <Portfolio />
      <Testimonials />
      <Industries />
    </main>
  );
}
