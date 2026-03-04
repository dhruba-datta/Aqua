const menuLinks = [
  { label: "Index", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function SlideOutMenu({ isOpen, onClose, lenis }) {
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onClose();
    
    // Wait for the menu closing animation (700ms) before scrolling
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
  };

  return (
    <>
      {/* Mobile: Dark panel from right */}
      <div className={`md:hidden fixed inset-y-0 right-0 z-50 w-[85%] bg-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Close Button — top right */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Links — vertically centered, left-aligned */}
        <nav className="h-full flex items-center px-12">
          <ul className="flex flex-col gap-5">
            {menuLinks.map((link, i) => (
              <li 
                key={link.label}
                className={`transition-all duration-700 ease-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                style={{ transitionDelay: isOpen ? `${250 + i * 80}ms` : '0ms' }}
              >
                <a 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[1.65rem] font-normal text-white/90 hover:text-white transition-colors duration-300 inline-block hover-underline-slide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile backdrop */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Desktop: Full-screen overlay (existing behavior) */}
      <div className={`hidden md:flex fixed inset-0 z-50 items-center justify-end px-32 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className={`absolute left-[70%] top-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-2xl transition-all duration-700 delay-150 cursor-pointer ${isOpen ? 'opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100' : 'opacity-0 -translate-x-1/2 -translate-y-1/2 scale-50'}`}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="text-right">
          <ul className="flex flex-col gap-5">
            {menuLinks.map((link, i) => (
              <li 
                key={link.label}
                className={`transition-all duration-700 ease-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
                style={{ transitionDelay: isOpen ? `${200 + i * 100}ms` : '0ms' }}
              >
                <a 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[3.5rem] font-light text-white/40 hover:text-white hover:italic transition-all duration-300 relative group inline-block"
                >
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
