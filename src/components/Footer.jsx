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
    const triggerText = document.getElementById("contact");
    if (!mainSection || !footerRef.current || !triggerText) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerText,
        start: "top 75%", // Triggers when the text is 75% down the viewport
        end: "top 85%", // Reverts when scrolling back up past this point
        onEnter: () => {
          gsap.to(mainSection, {
            backgroundColor: "#7DD8E6",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut"
          });
          gsap.to(footerRef.current, {
            backgroundColor: "#7DD8E6",
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
            <a href="mailto:hello@aquainnovations.com" className="text-2xl md:text-3xl font-medium flex items-center gap-3 transition-all group">
              hello@aquainnovations.com
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-40">Call us</p>
            <a href="tel:+880" className="text-2xl md:text-3xl font-medium">+880 XXX XXX XXXX</a>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[1rem] md:text-[1.15rem] font-medium tracking-tight mt-2">
              {['Instagram', 'LinkedIn', 'Facebook', 'Behance'].map((link) => (
                <a key={link} href="#" className="transition-all opacity-70 hover:opacity-100">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Logo and Copyright) */}
      <div className="w-full mt-16 md:mt-24 border-t border-black/10 pt-8 md:pt-10">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest opacity-40 px-6 sm:px-12 lg:px-32 w-full max-w-[1600px]">
          <span>© {new Date().getFullYear()} AQUA Innovations. All rights reserved.</span>
          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
