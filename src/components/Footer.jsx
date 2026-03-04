import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const mainSection = document.getElementById("main-content");
    if (!mainSection || !footerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        end: "top 20%",
        onEnter: () => {
          gsap.to([mainSection, footerRef.current], {
            backgroundColor: "#ff4a17",
            color: "#000000",
            duration: 1,
            ease: "power2.inOut"
          });
        },
        onLeaveBack: () => {
          gsap.to([mainSection, footerRef.current], {
            backgroundColor: "#f5f5f5",
            color: "#000000",
            duration: 1,
            ease: "power2.inOut"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section pt-32 pb-10 bg-[#f5f5f5] text-black relative overflow-hidden" ref={footerRef} id="footer">
      <div className="mx-auto px-12 sm:px-24 lg:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 pb-32">
          
          {/* Left Column: Form */}
          <div className="contact-form-wrapper">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-12">Contact Us</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group border-b border-black/10 pb-2">
                <input type="text" placeholder="First Name" className="w-full bg-transparent outline-none py-2 placeholder:text-black/30 placeholder:uppercase placeholder:text-[12px] placeholder:font-bold placeholder:tracking-widest" />
              </div>
              <div className="form-group border-b border-black/10 pb-2">
                <input type="text" placeholder="Last Name" className="w-full bg-transparent outline-none py-2 placeholder:text-black/30 placeholder:uppercase placeholder:text-[12px] placeholder:font-bold placeholder:tracking-widest" />
              </div>
              <div className="form-group border-b border-black/10 pb-2">
                <input type="email" placeholder="Email Address" className="w-full bg-transparent outline-none py-2 placeholder:text-black/30 placeholder:uppercase placeholder:text-[12px] placeholder:font-bold placeholder:tracking-widest" />
              </div>
              <div className="form-group border-b border-black/10 pb-2">
                <input type="text" placeholder="Phone Number" className="w-full bg-transparent outline-none py-2 placeholder:text-black/30 placeholder:uppercase placeholder:text-[12px] placeholder:font-bold placeholder:tracking-widest" />
              </div>
              
              <div className="col-span-1 md:col-span-2 mt-8">
                <div className="grid grid-cols-2 gap-y-6">
                  {['Analytics', 'PPC Advertising', 'SEO', 'Web Design'].map((service) => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border-2 border-black/20 rounded flex items-center justify-center transition-all group-hover:border-black">
                        <input type="checkbox" className="hidden peer" />
                        <div className="w-3 h-3 bg-black opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className="text-[14px] font-medium">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 mt-12">
                <button type="submit" className="w-full py-6 bg-black text-white uppercase text-[14px] font-bold tracking-widest rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  Schedule a Call
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Links */}
          <div className="flex flex-col gap-24">
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/40 mb-8 font-sans">Say Hello</h2>
              <a href="mailto:info@themenectar.com" className="text-fluid-h2 font-medium tracking-tight hover:italic transition-all">
                info@themenectar.com
              </a>
            </div>
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/40 mb-8 font-sans">Get Social</h2>
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                {['LinkedIn', 'Facebook', 'Instagram'].map((item) => (
                  <a key={item} href="#" className="text-fluid-h2 font-medium tracking-tight hover:italic transition-all">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNAL Watermark */}
      <div className="signal-watermark w-full pointer-events-none select-none px-4">
        <div className="text-[25vw] font-black leading-[0.75] tracking-tightest uppercase text-black text-center">
          SIGNAL
        </div>
      </div>

      {/* Actual Bottom Footer */}
      <div className="mx-auto px-12 sm:px-24 lg:px-32 py-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] font-bold uppercase tracking-widest opacity-40">
        <span>© {new Date().getFullYear()} Signal Agency</span>
        <div className="flex gap-12">
          <a href="#" className="hover:text-black">Privacy Policy</a>
          <a href="#" className="hover:text-black">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
