const menuLinks = [
  { label: "Index", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Work", href: "#portfolio" },
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
    <div className={`fixed inset-0 z-50 flex items-center justify-end px-10 md:px-32 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Floating Close Button */}
      <button 
        onClick={onClose}
        className={`absolute left-[90%] md:left-[70%] top-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black shadow-2xl transition-all duration-700 delay-150 ${isOpen ? 'opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100' : 'opacity-0 -translate-x-1/2 -translate-y-1/2 scale-50'}`}
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <nav className="text-right">
        <ul className="flex flex-col gap-4 md:gap-5">
          {menuLinks.map((link, i) => (
            <li 
              key={link.label}
              className={`transition-all duration-700 ease-out delay-[${200 + i * 100}ms] ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
            >
               <a 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[2.5rem] md:text-[3.5rem] font-light text-white/40 hover:text-white transition-colors duration-300 relative group inline-block"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
