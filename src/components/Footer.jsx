import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { pathname } = useLocation();
  const footerRef = useRef(null);

  useEffect(() => {
    const mainSection = document.getElementById("main-content");
    if (!mainSection || !footerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        // Use the footer itself so the transition fires only once it's clearly
        // in view — not while the user is still reading the section above.
        trigger: footerRef.current,
        start: "top 60%", // fires when the top of the footer hits 60% down the viewport (roughly 40% of the footer already visible)
        end: "bottom top",
        onEnter: () => {
          gsap.to(mainSection, {
            backgroundColor: "#48D5CD",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut"
          });
          gsap.to(footerRef.current, {
            backgroundColor: "#48D5CD",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut"
          });
        },
        onLeaveBack: () => {
          gsap.to(mainSection, {
            backgroundColor: "#f5f5f5",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut"
          });
          gsap.to(footerRef.current, {
            backgroundColor: "#f5f5f5",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut"
          });
        }
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <footer 
      className="footer-section pt-20 sm:pt-32 pb-8 sm:pb-12 bg-[#f5f5f5] text-black relative overflow-hidden min-h-[70vh] sm:min-h-[90vh] flex flex-col justify-between noise-bg" 
      ref={footerRef} 
      id="footer"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="mx-auto px-6 sm:px-12 lg:px-32 w-full max-w-[1600px] relative z-10 flex-1 flex flex-col">
        
        {/* Top Section */}
        <div className="max-w-5xl mb-16 md:mb-auto mt-4 md:mt-8" id="contact">
          <div className="flex items-center gap-3 mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">Contact Us</span>
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
            Let&apos;s turn your vision <span className="text-black/40">into a measurable experience.</span>
          </h2>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 md:gap-16 mt-16 md:mt-24">
          <div>
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-40 mb-4">Contact us at:</p>
            <a href="mailto:communications@aquabd.pro" className="text-2xl md:text-3xl font-medium flex items-center gap-3 transition-all group">
              communications@aquabd.pro
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-40">Call us</p>
            <a href="tel:+8801705776667" className="text-2xl md:text-3xl font-medium">01705-776667</a>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[1rem] md:text-[1.15rem] font-medium tracking-tight mt-2">
              <a
                href="https://www.instagram.com/aquainnovationsco/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow AQUA on Instagram"
                className="inline-flex items-center gap-1.5 transition-all opacity-70 hover:opacity-100"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568183817324"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow AQUA on Facebook"
                className="inline-flex items-center gap-1.5 transition-all opacity-70 hover:opacity-100"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Level+5%2C+Flat-B%2C+House-15%2C+Road-7%2C+Block-C%2C+Niketan%2C+Gulshan%2C+Dhaka%2C+Bangladesh%2C+1212"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our location on Google Maps"
                className="inline-flex items-center gap-1.5 transition-all opacity-70 hover:opacity-100"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Location
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Logo and Copyright) */}
      <div className="w-full mt-16 md:mt-24 border-t border-black/10 pt-8 md:pt-10">
        <div className="mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-6 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest opacity-40 px-6 sm:px-12 lg:px-32 w-full max-w-[1600px] text-center md:text-left">
          <span>© {new Date().getFullYear()} AQUA Innovations. All rights reserved.</span>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10">
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
