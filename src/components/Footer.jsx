import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
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
            backgroundColor: "#FF9101",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut"
          });
          gsap.to(footerRef.current, {
            backgroundColor: "#FF9101",
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
  }, []);

  return (
    <footer 
      className="footer-section pt-32 pb-12 bg-[#f5f5f5] text-black relative overflow-hidden min-h-[90vh] flex flex-col justify-between noise-bg" 
      ref={footerRef} 
      id="footer"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="mx-auto px-12 sm:px-24 lg:px-32 w-full max-w-[1600px] relative z-10 flex-1 flex flex-col">
        
        {/* Top Section */}
        <div className="max-w-5xl mb-24 md:mb-auto mt-8" id="contact">
          <div className="flex items-center gap-3 mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">Contact Us</span>
          </div>
          <h2 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-medium leading-[1.05] tracking-tight">
            Interested in working together, <span className="text-black/40">trying out the platform or simply learning more?</span>
          </h2>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mt-24">
          <div>
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-40 mb-4">Contact us at:</p>
            <a href="mailto:hello@signal.agency" className="text-2xl md:text-3xl font-medium flex items-center gap-3 transition-all group">
              hello@signal.agency
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] font-medium tracking-tight">
            {['Instagram', 'LinkedIn', 'Facebook', 'Twitter'].map((link) => (
              <a key={link} href="#" className="transition-all opacity-70 hover:opacity-100">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section (Logo and Copyright) */}
      <div className="w-full mt-24 border-t border-black/10 pt-10">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] font-bold uppercase tracking-widest opacity-40 px-12 sm:px-24 lg:px-32 w-full max-w-[1600px]">
          <span>© {new Date().getFullYear()} Signal. All rights reserved.</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
