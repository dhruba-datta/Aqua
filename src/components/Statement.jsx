import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll('.statement-word');
    const images = section.querySelectorAll('.statement-img');

    // Create the scroll-triggered timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',         // Start when section is visible (text appears grey first)
        end: 'bottom 50%',        // Finish with room before next section
        scrub: 0.8,
      }
    });

    // Animate all words from grey to black with stagger
    // Total 21 words, stagger 0.05 each → last word starts at t=1.0
    tl.to(words, {
      color: 'rgba(0, 0, 0, 1)',
      duration: 0.3,
      stagger: 0.05,
      ease: 'none'
    }, 0);

    // Each image expands at the exact moment the color wave reaches it.
    // Word order: In(0), a(1), [IMG1], world(2), full(3), of(4),
    //   noise(5), we(6), help(7), brands(8), [IMG2], stand(9), out(10), with(11),
    //   clear(12), ideas(13), and(14), [IMG3], good(15), design(16), that(17),
    //   makes(18), an(19), [IMG4], impact(20)
    // Image appears when the word BEFORE it turns black:
    const imageTimings = [
      1 * 0.05,   // IMG1: after "a" (word 1)
      9 * 0.05,   // IMG2: after "brands" (word 8) → before "stand"
      15 * 0.05,  // IMG3: after "and" (word 14)
      20 * 0.05,  // IMG4: after "an" (word 19)
    ];

    images.forEach((img, i) => {
      tl.to(img, {
        width: '1em',
        marginLeft: '0.12em',
        marginRight: '0.12em',
        duration: 0.3,
        ease: 'power2.out',
      }, imageTimings[i]);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="py-24 md:py-48 overflow-hidden" ref={sectionRef}>
      <div className="statement-container">
        <h2 className="statement-heading">

          {/* Line 1: In a [img] world full of */}
          <div className="statement-line"><div className="statement-word">In</div> <div className="statement-word">a</div> <span className="statement-img"><img src="https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/good-faces-xmSWVeGEnJw-unsplash-6-1-1024x789.jpg" alt="" /></span> <div className="statement-word">world</div> <div className="statement-word">full</div> <div className="statement-word">of</div></div>

          {/* Line 2: noise, we help brands */}
          <div className="statement-line"><div className="statement-word">noise,</div> <div className="statement-word">we</div> <div className="statement-word">help</div> <div className="statement-word">brands</div></div>

          {/* Line 3: [img] stand out with */}
          <div className="statement-line"><span className="statement-img"><img src="https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/dale-alejandro-pmLFJlorrN4-unsplash-1.jpg" alt="" /></span> <div className="statement-word">stand</div> <div className="statement-word">out</div> <div className="statement-word">with</div></div>

          {/* Line 4: clear ideas and [img] */}
          <div className="statement-line"><div className="statement-word">clear</div> <div className="statement-word">ideas</div> <div className="statement-word">and</div> <span className="statement-img"><img src="https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/levi-stute-ic8AIr02-7g-unsplash-1.jpg" alt="" /></span></div>

          {/* Line 5: good design that */}
          <div className="statement-line"><div className="statement-word">good</div> <div className="statement-word">design</div> <div className="statement-word">that</div></div>

          {/* Line 6: makes an [img] impact. */}
          <div className="statement-line"><div className="statement-word">makes</div> <div className="statement-word">an</div> <span className="statement-img"><img src="https://themenectar.com/salient/signal/wp-content/uploads/sites/45/2025/11/orange-bg-minimal-1.jpg" alt="" /></span> <div className="statement-word">impact.</div></div>

        </h2>
      </div>
    </section>
  );
}
